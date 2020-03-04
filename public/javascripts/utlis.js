//Center the element
$.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + "px");
    this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
    return this;
};

var baseUrl = window.location.protocol + '//' + window.location.host;
var progressInterval;
var oldLang = Cookies.get('lang')
var soundMusic = (localStorage.getItem("soundMusic")== null ? "true" :localStorage.getItem("soundMusic"))
var soundMaster = (localStorage.getItem("soundMaster") == null ? "true" :localStorage.getItem("soundMaster") )
var playsoundMusic = null
var playsoundMaster = null

$(document).ready(()=>{
    playSoundEx('fun',true);
    $('#changeLangThai').click(()=>{
        playSoundEx('click');
        setLanguage('th')
        closeModal('#modal-language')
    })

    $('#changeLangEng').click(()=>{
        playSoundEx('click');
        setLanguage('en')
        closeModal('#modal-language')
    })
})

/*
 *Description: Block UI with preloader.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 7 Fabuary 2019
 *@required jQuery,jQueryUI.
 */
function blockUI() {
    var message = '<div id = "vivus-animation"></div>';
    $.blockUI({
        css: {
            backgroundColor: 'transparent',
            border: 'none'
        },
        centerX: true,
        centerY: true,
        message: message,
        baseZ: 2000,
        overlayCSS: {
            backgroundColor: 'rgb(0, 0, 0);',
            opacity: 0.3,
            cursor: 'url("/assets/cursor-pointer-clicked.png"), pointer'
        }
    });
    let file = [baseUrl + "/assets/svg/salad.svg", baseUrl + "/assets/svg/noodle.svg", baseUrl + "/assets/svg/mushroom.svg", baseUrl + "/assets/svg/salmon.svg", baseUrl + "/assets/svg/steak.svg", baseUrl + "/assets/svg/curryrice.svg"];
    var fileIndex = Math.floor(Math.random() * file.length);

    let animationSpeed = 3.5;
    let animationDuration = 450;
    let rotateTime = 500;
    let delayTime = 200;

    fileIndex >= file.length ? fileIndex = 0 : '';
    let vivus = new Vivus('vivus-animation', {
        file: file[fileIndex],
        onReady: function (myVivus) {
            // `el` property is the SVG element
            myVivus.el.setAttribute('height', '100px');
            myVivus.el.setAttribute('width', '100px');
            vivus.play(animationSpeed, function () {
                $(myVivus.el).addClass('play_rotate_center');
                setTimeout(function () {
                    fileIndex++;
                    vivus.reset().destroy();
                    myVivus.el.remove();
                }, animationDuration);
            });
        }
    });
    progressInterval = setInterval(function () {
        fileIndex >= file.length ? fileIndex = 0 : '';
        let vivus = new Vivus('vivus-animation', {
            file: file[fileIndex],
            onReady: function (myVivus) {
                // `el` property is the SVG element
                myVivus.el.setAttribute('height', '100px');
                myVivus.el.setAttribute('width', '100px');
                vivus.play(animationSpeed, function () {
                    $(myVivus.el).addClass('play_rotate_center');
                    setTimeout(function () {
                        fileIndex++;
                        vivus.reset().destroy();
                        myVivus.el.remove();
                    }, animationDuration);
                    // vivus.play(3,function(){});
                });
            }
        });
    }, animationDuration + rotateTime + delayTime);

}

/*
 *Description: Unblock UI.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 7 Fabuary 2019
 *@required jQuery,jQueryUI.
 */
function unblockUI() {
    clearInterval(progressInterval);
    $.unblockUI();
}

/*
 *Description: Get firebase current user's id token and set it to cookie and after that replace url to open home page.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 Fabuary 2019
 *@required javascript,jQuery,Firebase Authentication.
 */
function replaceHome() {
    firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
        document.cookie = 'idToken=' + idToken;
        window.location.replace('/home');
    }).catch(function (error) {
        showError('Oh no!', errorMsg.firebase.auth[error.code]);
    });
}

/*
 *Description: Signout and destroy session & cookie.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 Fabuary 2019
 *@required javascript,jQuery,Firebase Authentication.
 */
function signOut() {
    blockUI();
    firebase.auth().signOut()
        .then(function (data) {
            $.get('/signOut', function (data) {
                if (data) {
                    window.location.replace('/');
                }
            });
        })
        .catch(function (error) {
            unblockUI();
            showError('Oh no!', errorMsg.firebase.auth[error.code]);
        });
}

/*
 *Description: Signup with email and password.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 Fabuary 2019
 *@required javascript,jQuery,Firebase Authentication.
 */
function signUpWithEmailAndPassword(username, email, password) {
    blockUI();
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (result) {
            var user = firebase.auth().currentUser;
            user.updateProfile({
                    displayName: username
                })
                .then(function () {
                    signInWithEmailAndPassword(email, password);
                }).catch(function (error) {
                    unblockUI();
                    showError('Oh no!', errorMsg.firebase.auth[error.code]);
                });
        })
        .catch(function (error) {
            unblockUI();
            showError('Oh no!', errorMsg.firebase.auth[error.code]);
        });
}

/*
 *Description: Signin with email and password.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 Fabuary 2019
 *@required javascript,jQuery,Firebase Authentication.
 */
function signInWithEmailAndPassword(email, password) {
    blockUI();
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (result) {
            replaceHome();
        }).catch(function (error) {
            unblockUI();
            showError('Oh no!', errorMsg.firebase.auth[error.code]);
        });
}

/*
 *Description: Send password to user's email.
 *@version 0.5
 *@author Bulakorn Maneesang
 *@since 25 Fabuary 2019
 *@required javascript,jQuery,Firebase Authentication.
 */
function forgotPassword(email) {
    blockUI();
    firebase.auth().sendPasswordResetEmail(email)
        .then(function (result) {
            showError('Success', 'Password have been sent. Please check your e-mail!');
        }).catch(function (error) {
            unblockUI();
            showError('Oh no!', errorMsg.firebase.auth[error.code]);
        })
        .finally(function () {
            unblockUI();
        });
}

/*
 *Description: Signin with facebook popup.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 Fabuary 2019
 *@required javascript,jQuery,Firebase Authentication.
 */
function signInWithFacebook() {
    firebase.auth().signInWithPopup(faceookProvider)
        .then(function (result) {
            var token = result.credential.accessToken; // Use it to access the Facebook API
            var user = result.user;
            replaceHome();
        }).catch(function (error) {
            showError('Oh no!', errorMsg.firebase.auth[error.code]);
        });
}

/*
 *Description: Signin with google popup.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 25 Fabuary 2019
 *@required javascript,jQuery,Firebase Authentication.
 */
function signInWithGoogle() {
    firebase.auth().signInWithPopup(googleProvider)
        .then(function (result) {
            var token = result.credential.accessToken; // Use it to access the Google API
            var user = result.user;
            replaceHome();
        }).catch(function (error) {
            showError('Oh no!', errorMsg.firebase.auth[error.code]);
        });
}

function playSoundEx(type,loop = false) {
    var pop_sound = new Audio(baseUrl + '/assets/sound/pop.mp3');
    var drop_sound = new Audio(baseUrl + '/assets/sound/drop.wav');
    var error_sound = new Audio(baseUrl + '/assets/sound/incorrect.wav');
    var correct_sound = new Audio(baseUrl + '/assets/sound/correct.wav');
    const complete_sound = new Audio(baseUrl + '/assets/sound/complete.mp3');
    const achievement_sound = new Audio(baseUrl + '/assets/sound/achievement.mp3');
    const click_sound = new Audio(baseUrl + '/assets/sound/click.mp3');
    const fun_sound = new Audio(baseUrl + '/assets/sound/sound-fun.mp3');
    const step_sound = new Audio(baseUrl + '/assets/sound/step.mp3');
    const step_end_sound = new Audio(baseUrl + '/assets/sound/step-end.mp3');
    
    const oldSoundMusic =  (localStorage.getItem("soundMusic")== null ? "true" :localStorage.getItem("soundMusic"))
    const oldSoundMaster = localStorage.getItem("soundMaster");

    pop_sound.volume = 0.2;
    drop_sound.volume = 0.5;
    click_sound.volume = 0.2;
    fun_sound.volume = 0.5;
    step_sound.volume = 0.3;
    step_sound.volume = 0.3;
 
    if(oldSoundMaster == "true" || typeof oldSoundMaster == 'undefined' || typeof oldSoundMaster == 'null' || oldSoundMaster == null){
        if (type == 'drop') {
            const playPromise = drop_sound.play();
            if (playPromise !== null) {
                playPromise.catch(() => {
                    drop_sound.play();
                })
            }
        } else if (type == 'pop') {
            const playPromise = pop_sound.play();
            if (playPromise !== null) {
                playPromise.catch(() => {
                    pop_sound.play();
                });
            }
        } else if (type == 'error') {
            const playPromise = error_sound.play();
            if (playPromise !== null) {
                playPromise.catch(() => {
                    error_sound.play();
                });
            }
        } else if (type == 'correct') {
            const playPromise = correct_sound.play();
            if (playPromise !== null) {
                playPromise.catch(() => {
                    correct_sound.play();
                });
            }
        }else if (type == 'complete'){
            const playPromise = complete_sound.play();
            if (playPromise !== null) {
                playPromise.catch(() => {
                    complete_sound.play();
                });
            }
        }else if (type == 'achievement'){
            const playPromise = achievement_sound.play();
            if (playPromise !== null) {
                playPromise.catch(() => {
                    achievement_sound.play();
                });
            }
        }else if (type == 'click'){
            const playPromise = click_sound.play();
            if (playPromise !== null) {
                playPromise.catch(() => {
                    click_sound.play();
                });
            }
        }else if (type == 'step'){
            const playPromise = step_sound.play();
            if (playPromise !== null) {
                playPromise.catch(() => {
                    step_sound.play();
                });
            }
        }else if (type == 'step-end'){
            const playPromise = step_end_sound.play();
            if (playPromise !== null) {
                playPromise.catch(() => {
                    step_end_sound.play();
                });
            }
        } 
    }
    if (type == 'fun'){
       
        fun_sound.loop = loop
        playsoundMusic = fun_sound
        if(oldSoundMusic == 'true'){
            const playPromise = playsoundMusic.play();
            if (playPromise !== null) {
                playPromise.catch(() => {
                    // fun_sound.play();
                });
            }
        }
    }
    
}

/*
 *Description: Show notification.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 18 march 2019
 *@required javascript, toastr.
 */
function notice(timeOut, type, text, title, callback) {
    toastr.options = {
        "closeButton": true,
        "iconClasses": {
            "error": "toast-error",
            "info": "toast-info",
            "success": "toast-success",
            "warning": "toast-warning"
        },
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": timeOut,
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "onShown": function () {},
        "onHidden": function () {
            callback ? callback() : '';
        },
    };
    if (title) {
        toastr[type](text, title);
    } else {
        toastr[type](text);
    }
    $('button.toast-close-button').html('<div class="toast-close-custom"></div>');
}

var errorMsg;

/*
 *Description: Show alert modal.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 20 march 2019
 *@required javascript, materialize-css.
 */
function showError(title, message) {
    $('#modal-alert').modal({
        'dismissible': true,
        'onOpenStart': function () {
            $('#modal-alert>.modal-content>.alert-title').html(title);
            $('#modal-alert>.modal-content>.alert-content').html(message);
        },
        'onOpenEnd': function () {},
        'onCloseStart': function () {},
        'onCloseEnd': function () {
            $('#modal-alert>.modal-content>.alert-title').empty();
            $('#modal-alert>.modal-content>.alert-content').empty();
        },
    });
    $('#modal-alert').modal('open');
}

/*
 *Description: Close modal.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 21 march 2019
 *@required javascript, materialize-css.
 */
function closeModal(modal) {
    $(modal).modal('close');
}

/*
 *Description: Setting application langauge.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 22 march 2019
 *@required javascript.
 */
// function setLanguage(lang) {
//     document.cookie = 'lang=' + lang;
//     window.location.replace('/home');
// }
function setLanguage(setlang){
    const lang = Cookies.get('lang');
    localStorage.setItem("langSelected", true);
    if(lang != setlang ){
        blockUI();
        Cookies.set('lang', setlang);
        location.reload();
    }
}

/*
 *Description: Chabge language on modal setting
 *@version 1.0
 *@author Supachai Boonying
 *@since 20 Feb 2020
 *@required javascript
 */
function editLanguage(setlang){
    playSoundEx('click');
    $('#setting-language').val(setlang)
    
    $('#setting-lang-thai').removeClass('blur');
    $('#setting-lang-eng').removeClass('blur');

    $('#setting-lang-thai').removeClass('unblur');
    $('#setting-lang-eng').removeClass('unblur');

    $('#setting-lang-thai').addClass(( setlang == 'en' ?'blur' :'unblur' ));
    $('#setting-lang-eng').addClass(( setlang == 'en' ? 'unblur' :'blur' ));
}
/*
 *Description: Open home page with filpbook page number.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 22 march 2019
 *@required javascript.
 */
function goHomePage(page) {
    var form = document.createElement('form');
    var element = document.createElement('input');

    form.method = 'POST';
    form.action = '/home';
    form.style = 'display:none';

    element.name = 'page';
    element.id = 'page';
    element.value = page;
    form.appendChild(element);

    $(form).appendTo('body').submit();
}

/*
 *Description: Create instant of introjs.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 1 april 2019
 *@required javascript, jquery, intro.js.
 */
function introInstant(steps) {
    return new introJs().setOptions({
        nextLabel: introLabel.nextLabel,
        prevLabel: introLabel.prevLabel,
        skipLabel: introLabel.skipLabel,
        doneLabel: introLabel.doneLabel,
        showStepNumbers: false,
        showBullets: false,
        exitOnOverlayClick: false,
        keyboardNavigation: false,
        disableInteraction: true,
        overlayOpacity: 0.7,
        steps: steps
    });
}

/*
 *Description: Timer to pause and resume event [setTimeout].
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 3 april 2019
 *@required javascript, jquery.
 */
function Timer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function () {
        window.clearTimeout(timerId);
        remaining -= Date.now() - start;
    };

    this.resume = function () {
        start = Date.now();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
}

/*
 *Description: Timer to pause and resume event [setInterval].
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 3 april 2019
 *@required javascript, jquery.
 */
function RecurringTimer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function () {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
    };

    var resume = function () {
        start = new Date();
        timerId = window.setTimeout(function () {
            remaining = delay;
            resume();
            callback();
        }, remaining);
    };

    this.resume = resume;

    this.resume();
}

/*
 *Description: Show alert modal.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 10 April 2019
 *@required javascript, materialize-css.
 */
function showAchievement(photo, title, content, nextFlag = false) {
    $('#modal-achievement').modal({
        'dismissible': false,
        'onOpenStart': function () {
            nextFlag ? $('#nextPage').show() : $('#nextPage').hide();
        },
        'onOpenEnd': function () {
            let animationSpeed = 2;
            let animationDuration = 600;
            let path = baseUrl + '/assets/svg/' + photo;
            let vivus = new Vivus('achievement-photo', {
                file: path,
                onReady: function (myVivus) {
                    // `el` property is the SVG element
                    myVivus.el.setAttribute('height', '100%');
                    myVivus.el.setAttribute('width', '100%');
                    vivus.play(animationSpeed, function () {});
                    $('#menu-photo>svg').each(function (index, obj) {
                        if (index != 0) {
                            $(obj).detach();
                        }
                    });
                }
            });
            new Typed('#modal-achievement>.modal-content>.achievement-title', {
                strings: [title],
                typeSpeed: 30,
                showCursor: false
            });
            new Typed('#modal-achievement>.modal-content>.achievement-content', {
                strings: [content],
                typeSpeed: 10,
                showCursor: false
            });
        },
        'onCloseStart': function () {},
        'onCloseEnd': function () {
            $('#modal-achievement>.modal-content>.achievement-photo').empty();
            $('#modal-achievement>.modal-content>.achievement-title').empty();
            $('#modal-achievement>.modal-content>.achievement-content').empty();
        },
    });
    $('#modal-achievement').modal('open');
    setTimeout(()=>{
        playSoundEx('achievement');
    notice(4000, 'success', `
    <div id="achievement-photo" class="achievement-photo" style="width:60px;height:60px;float:left;"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1920 1080" width="100%" height="100%">
    <defs>
      <style>
        .orangeOut-1 {
          clip-path: url(#clip-FlowChart_Play_1);
        }
  
        .orangeOut-2 {
          fill: #c0a57c;
        }
  
        .orangeOut-3, .orangeOut-8 {
          fill: none;
        }
  
        .orangeOut-3 {
          stroke: #b59970;
        }
  
        .orangeOut-3, .orangeOut-5, .orangeOut-6 {
          stroke-width: 5px;
        }
  
        .orangeOut-4 {
          opacity: 0.923;
          fill: url(#radial-gradient);
        }
  
        .orangeOut-5, .orangeOut-6 {
          stroke: #000;
        }
  
        .orangeOut-5 {
          fill: url(#radial-gradient-2);
        }
  
        .orangeOut-6 {
          fill: rgba(204,255,245,0.2);
        }
  
        .orangeOut-7 {
          stroke: none;
        }
  
        .orangeOut-9 {
          fill: #fff;
        }
      </style>
      <radialGradient id="radial-gradient" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#ffd433"></stop>
        <stop offset="1" stop-color="#fcba41"></stop>
      </radialGradient>
      <radialGradient id="radial-gradient-2" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#fff" stop-opacity="0.455"></stop>
        <stop offset="1" stop-color="#fff" stop-opacity="0.502"></stop>
      </radialGradient>
      <clipPath id="clip-FlowChart_Play_1">
        <path width="1920" height="1080" d="M0 0 L1920 0 L1920 1080 L0 1080 Z" style="stroke-dasharray: 6000, 6002; stroke-dashoffset: 0;"></path>
      </clipPath>
    </defs>
    <g id="FlowChart_Play_1" data-name="FlowChart – Play – 1" class="orangeOut-1">
      <path class="orangeOut-9" width="1920" height="1080" d="M0 0 L1920 0 L1920 1080 L0 1080 Z" style="stroke-dasharray: 6000, 6002; stroke-dashoffset: 0;"></path>
      <g id="wood">
        <path id="Rectangle_69" data-name="Rectangle 69" class="orangeOut-2" width="1941" height="1090" transform="translate(-10 -6)" d="M0 0 L1941 0 L1941 1090 L0 1090 Z" style="stroke-dasharray: 6062, 6064; stroke-dashoffset: 0;"></path>
        <path id="Path_42" data-name="Path 42" class="orangeOut-3" d="M2580,6417s128.41,26.422,194.1,24.694,192.993-22.646,386.72-24.694,342.451,30.819,514.566,0,293.148,0,293.148,0,241.036,44.1,393.5,0,155.948,0,155.948,0" transform="translate(-2591.125 -6417)" style="stroke-dasharray: 1956, 1958; stroke-dashoffset: 0;"></path>
        <path id="Path_43" data-name="Path 43" class="orangeOut-3" d="M2589.49,6482.686s121.749-23.836,230.119-6.917,134.566-6.994,256.445,21.222,142.658-21.222,142.658-21.222,41.828-39.907,123.508,6.917,115.07-16.475,142.961-30.861,161.58,0,161.58,0,43.035-1.048,66.585-14.743,104.029,53.321,179.988,45.6,188.853-26.962,264.931-17.912,107.785,37.044,217.979,17.912c63.834-7.036,41.086,17.453,74.081,16.395s9.591-27.864,81.291-16.395" transform="translate(-2600.615 -6413)" style="stroke-dasharray: 2007, 2009; stroke-dashoffset: 0;"></path>
        <path id="Path_44" data-name="Path 44" class="orangeOut-3" d="M2580,6526.9s21.538-2.231,52.64,0,48.017,10.757,71.769,8.926,45.318,42.461,194.746,0c87.158-16.92,101.258,7.944,138.627,6.5,77.262-9.277,82.512-10.217,187.927,13.057,140.556-11.015,213.173,12.808,309.076,17.471,44.057-.869,75.55-25.78,177.147-42.313,125.71-9.992,165.577,16.188,311.3,0,41.524,1.711,112.355-42.579,219.943-1.213,141.43,25.146,283.671-13.214,283.671-13.214" transform="translate(-2595.849 -6417)" style="stroke-dasharray: 1970, 1972; stroke-dashoffset: 0;"></path>
        <path id="Path_45" data-name="Path 45" class="orangeOut-3" d="M-7.056,196.471S48.3,220.3,89.067,219.177s87.213-29.161,144.242-27.16,78.369,40.078,128.112,39.095c76.149,2.513,156.147-59.317,305.239-56.956s264.055,38.375,312.376,38.375,107.837-29.127,139.668-24.282,46.891,30.462,72.966,30.591,142.649-45.816,313.406-38.621c37.807-11.423,51.645-39.539,126.148-41.648s185.75,67.261,299.775,50.584" style="stroke-dasharray: 1990, 1992; stroke-dashoffset: 0;"></path>
        <path id="Path_46" data-name="Path 46" class="orangeOut-3" d="M-11.664,270.71s111.739,2.759,222.007,15.34,175.623-8.6,185.03-15.34,83.689-57.976,193.777-42.359,114.877-.226,240.945,18.006,184.53,64.969,263.326,54.924,229.681-73.09,321.326-70.237,121.2,51.69,222.7,50.126S1931,263.526,1931,263.526" style="stroke-dasharray: 1980, 1982; stroke-dashoffset: 0;"></path>
        <path id="Path_47" data-name="Path 47" class="orangeOut-3" d="M-7.056,341.562l113.508-6.28s174.216-11.258,246.89-11.258S505.536,336.09,578.991,336.09s281.07,14.708,311.822,0,99.257-12.066,99.257-12.066,167.632,14.859,205.815,7.044,33.757-10.405,71.518-10.405,298.873,34.978,341.538,26.971,260.631-20.108,322.059-8.253" style="stroke-dasharray: 1945, 1947; stroke-dashoffset: 0;"></path>
        <path id="Path_48" data-name="Path 48" class="orangeOut-3" d="M-7.056,369.141s202.308,15.135,274.073,9.08,233.3-17.095,328.667-13.381,306.782,3.293,306.782,3.293,230.779-13.442,310.214,5.4,82.776-5.654,210.832-5.654,207.149-8.75,301.393,5.654,174.248-22.843,203.4-5.654" style="stroke-dasharray: 1941, 1943; stroke-dashoffset: 0;"></path>
        <path id="Path_49" data-name="Path 49" class="orangeOut-3" d="M2580,6832.831s283.451,9.75,326.306,0,254.059-6.884,370.993,0,400.991-18.425,578.629,0,283.5-12.687,283.5-12.687,174.34-27.118,378.788,12.688" transform="translate(-2587.218 -6417)" style="stroke-dasharray: 1943, 1945; stroke-dashoffset: 0;"></path>
        <path id="Path_50" data-name="Path 50" class="orangeOut-3" d="M2572.782,6871.206s165.91-8.753,193.267,0,163.376-3.957,202.216,0,195.107.14,221.056,7.668a396.918,396.918,0,0,0,104.249,15.81c42.244.623,201.412-33.489,254.507-33.489s39.61,17.975,111.024,17.68,113.586-10.5,314.637,0,121.886-12.6,256.431-17.68,126.155,35.119,280.832,0" transform="translate(-2580 -6417)" style="stroke-dasharray: 1950, 1952; stroke-dashoffset: 0;"></path>
        <path id="Path_51" data-name="Path 51" class="orangeOut-3" d="M2568.24,6900.2s56.882,23.592,131.119,29.059,61.613-14.991,165.831-7.189,173.2,18.2,252.732,0,130.529.807,174.583,0,84.714-14.981,237.841-10.006,203.758-16.46,300.055,17.2,152.914-7.379,203.326,0,17.9,26.678,81.713,27.023,32.116-49.064,70.337-50.039S4434.7,6942.574,4511,6889.6" transform="translate(-2580 -6417)" style="stroke-dasharray: 1992, 1994; stroke-dashoffset: 0;"></path>
        <path id="Path_52" data-name="Path 52" class="orangeOut-3" d="M2568.875,6980.793S2712.986,6966.458,2787,6965.5s124.509,44.374,232.118,43.116,215.92-23.206,315.635-27.824,34.874,11.3,82.339,11.3,137.626-10.657,166.218-11.3,205.1,22.254,330.638-16.811,34.928,30.017,105.158,55.792,440.872-14.129,491.9-49.8" transform="translate(-2580 -6417)" style="stroke-dasharray: 2009, 2011; stroke-dashoffset: 0;"></path>
        <path id="Path_53" data-name="Path 53" class="orangeOut-3" d="M2564.128,7084.972s26.384,7.885,221.564-33.411,398.917,33.411,398.917,33.411,93.368,9.828,159.847,0,114.472-38.6,142.2-40.267,161.306,42.115,219.1,40.267,138.4-15.281,243.859,0,82.081,2.965,153.667,0,136.054,16.021,192.431,0,215.292,0,215.292,0" transform="translate(-2580 -6417)" style="stroke-dasharray: 1970, 1972; stroke-dashoffset: 0;"></path>
        <path id="Path_54" data-name="Path 54" class="orangeOut-3" d="M2564.151,7117.469s286.134-19.395,424.02,0,115.005-6.47,267.8-6.612,343.374,6.042,343.374,6.042h589.727s251.4,17.341,321.931-15.017" transform="translate(-2580 -6417)" style="stroke-dasharray: 1951, 1953; stroke-dashoffset: 0;"></path>
        <path id="Path_55" data-name="Path 55" class="orangeOut-3" d="M2571.594,7185.831h120.294c108.248,0,209.017-22.355,312.7,0s77.763-5.08,252.055,0,127.866-18,192.5-9.98,388.955,0,388.955,0,325.065-49.122,372.446-35.841,139.705,76.772,300.461,45.822" transform="translate(-2580 -6417)" style="stroke-dasharray: 1955, 1957; stroke-dashoffset: 0;"></path>
        <path id="Path_56" data-name="Path 56" class="orangeOut-3" d="M2561.209,7229.572s414.283-17.395,457.8-7.187,134.2,22.415,199.721,7.188,97.556-11.976,179.956-13.4,235.354,3.608,273.649-7.214,118.422,29.371,219.543,26.162,242.47-63.61,287.458-54.6,47.347,68.911,176.45,46.959S4511,7235.12,4511,7235.12" transform="translate(-2580 -6417)" style="stroke-dasharray: 1980, 1982; stroke-dashoffset: 0;"></path>
        <path id="Path_57" data-name="Path 57" class="orangeOut-3" d="M2564.1,7281.066s136.34,29.177,255.849-7.743,183.278,23.558,273.141,23.267,94.733-43.417,162.789-47.4,60.589,16.162,199.215,24.13,88.005-18.749,355.287,7.743,322.963-28.7,472.234-31.873,134.409,35.027,228.384,31.873" transform="translate(-2580 -6417)" style="stroke-dasharray: 1973, 1975; stroke-dashoffset: 0;"></path>
        <path id="Path_58" data-name="Path 58" class="orangeOut-3" d="M2559.543,7360.955s275.614,5.327,371.431-16.128,115.281,11.189,172.866,16.128,94.064-40.84,223.848-16.128,120.679-26.184,208.76-30.945,76.408,31.813,192.156,30.25,175.773-49.963,270.837-36.5,115.239,51.694,173.54,53.328,295.109,7.715,338.017-8.46" transform="translate(-2580 -6417)" style="stroke-dasharray: 1984, 1986; stroke-dashoffset: 0;"></path>
        <path id="Path_59" data-name="Path 59" class="orangeOut-3" d="M2565.507,7409.225s89.933-15.767,146.238-20.016,20.983,71.876,78.216,71.876,48.51-66.964,99.137-71.876,138.391-1.165,197.653,12.062c2.785.622,5.375,1.262,7.98,1.97,48.715,13.241,24.774,32.836,84.993,31.2,63.188-1.72,311.692-.879,365.109,0s100.2-14.569,138.49-10.666,170.5,11.852,211.179,10.666,7.019-33.874,55.518-33.167,77.523-5.625,151.631,0,75.452,21.623,144.8,22.5,24.769-28.966,150.124-6,109.665-16.5,109.665-16.5" transform="translate(-2580 -6417)" style="stroke-dasharray: 2057, 2059; stroke-dashoffset: 0;"></path>
        <path id="Path_60" data-name="Path 60" class="orangeOut-3" d="M2563.426,7474.917s24.958-7.139,88.688,0,63.934,45.406,180.769,27.629,172.284-27.629,172.284-27.629,189.64-25.408,253.648-9.749,433.679,9.749,433.679,9.749l435.958-9.749s62.462-5,116.627,0,56.015,25.747,134.079,20.673S4511,7474.917,4511,7474.917" transform="translate(-2580 -6417)" style="stroke-dasharray: 1961, 1963; stroke-dashoffset: 0;"></path>
      </g>
      <g id="Group_62" data-name="Group 62" transform="translate(-88 -70)">
        <g id="out">
          <path id="out-2" data-name="out" class="orangeOut-4" d="M9625.855,5540.94c104.859-11.451,166.356-136.042,229.736-69.281s7.5,115.1,65.785,207.184,162.681,97.967,185.386,198.452-91.018,100.936-129.129,201.581,52.768,234.606-56.257,262.4-206.017-46.046-333.341-96.718-84.823-146.468-169.464-202.687-147.044,3.11-156.979-74.737,75.694-124.73,117.236-236.654S9366,5566.82,9427.76,5519.436,9521,5552.391,9625.855,5540.94Z" transform="translate(-8637 -5267)" style="stroke-dasharray: 2817, 2819; stroke-dashoffset: 0;"></path>
        </g>
        <g id="grass">
          <g id="Ellipse_31" data-name="Ellipse 31" class="orangeOut-5" transform="translate(852 386)">
            <path class="orangeOut-7" d="M0,224.5A224.5,224.5 0,1,1 449,224.5A224.5,224.5 0,1,1 0,224.5" style="stroke-dasharray: 1411, 1413; stroke-dashoffset: 0;"></path>
            <path class="orangeOut-8" d="M2.5,224.5A222,222 0,1,1 446.5,224.5A222,222 0,1,1 2.5,224.5" style="stroke-dasharray: 1396, 1398; stroke-dashoffset: 0;"></path>
          </g>
          <g id="Ellipse_32" data-name="Ellipse 32" class="orangeOut-6" transform="translate(867 401)">
            <path class="orangeOut-7" d="M0,209.5A209.5,209.5 0,1,1 419,209.5A209.5,209.5 0,1,1 0,209.5" style="stroke-dasharray: 1317, 1319; stroke-dashoffset: 0;"></path>
            <path class="orangeOut-8" d="M2.5,209.5A207,207 0,1,1 416.5,209.5A207,207 0,1,1 2.5,209.5" style="stroke-dasharray: 1301, 1303; stroke-dashoffset: 0;"></path>
          </g>
        </g>
      </g>
    </g>
  </svg></div>
  &emsp;<B>${title}</B> `);
    },2000)
    

}

/*
 *Description: Go to next page.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 11 April 2019
 *@required javascript.
 */
function nextPage(target) {
    window.location.replace(target);
}

/*
 *Description: Show alert modal.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 10 April 2019
 *@required javascript, materialize-css.
 */
function showNavigator(content) {
    $('#modal-navigator').modal({
        'dismissible': false,
        'onOpenStart': function () {},
        'onOpenEnd': function () {
            $('.navigator-content').text(content);
        }
    });
    $('#modal-navigator').modal('open');
}
/*
 *Description: Show alert modal.
 *@version 1.0
 *@author Thanawin Poopangeon
 *@since 5 Feb 2020
 *@required javascript, materialize-css.
 */
function showSaveStatus(content) {
    $('#modal-addQuestion').modal({
        'dismissible': false,
        'onOpenStart': function () {},
        'onOpenEnd': function () {
            $('.addQuestion-content').text(content);
        }
    });
    $('#modal-addQuestion').modal('open');
}
/*
 *Description: Show alert modal.
 *@version 1.0
 *@author Thanawin Poopangeon
 *@since 5 Feb 2020
 *@required javascript, materialize-css.
 */
function showLoading() {
    $('#modal-saving').modal({
        'dismissible': false,
        'onOpenStart': function () {},
        'onOpenEnd': function () {
            $('.addQuestion-content').text();
        }
    });
    $('#modal-saving').modal('open');
}
/*
 *Description: Show avatar modal.
 *@version 1.0
 *@author Thanawin Poopangeon
 *@since 5 Feb 2020
 *@required javascript, materialize-css.
 */
function showSetName() {
    $('#modal-firstPlay').modal({
        'dismissible': false,
        // 'onOpenStart': function () {},
        // 'onOpenEnd': function () {
        //     $('.addQuestion-content').text();
        // }
    });
    $('#modal-firstPlay').modal('open');
}
/*
 *Description: Close alert modal.
 *@version 1.0
 *@author Thanawin Poopangeon
 *@since 7 Feb 2020
 *@required javascript, materialize-css.
 */
function closeLoading() {
    $('#modal-saving').modal('close');
}

/*
 *Description: Show modal welcome tutorial 
 *@version 1.0
 *@author Supachai Boonying
 *@since 15 Feb 2020
 *@required javascript
 */
function showWelcome() {
    $('#modal-wellcome').modal({
        'dismissible': true,
        'onOpenStart': function () {
            // $('#modal-wellcome>.modal-content>.wellcome-title').html(title);
            // $('#modal-wellcome>.modal-content>.wellcome-content').html(message);
        },
        'onOpenEnd': function () {},
        'onCloseStart': function () {},
        'onCloseEnd': function () {
            // $('#modal-wellcome>.modal-content>.wellcome-title').empty();
            // $('#modal-wellcome>.modal-content>.wellcome-content').empty();
        },
    });
    $('#modal-wellcome').modal('open');
}

/*
 *Description: Show modal select Language in tutorial 
 *@version 1.0
 *@author Supachai Boonying
 *@since 15 Feb 2020
 *@required javascript
 */
function showLanguage() {
    localStorage.removeItem("langSelected");
    $('#modal-language').modal({
        'dismissible': true,
        'onOpenStart': function () {
            // $('#modal-language>.modal-content>.language-title').html(title);
            // $('#modal-language>.modal-content>.language-content').html(message);
        },
        'onOpenEnd': function () {},
        'onCloseStart': function () {},
        'onCloseEnd': function () {
            // $('#modal-language>.modal-content>.language-title').empty();
            // $('#modal-language>.modal-content>.language-content').empty();
        },
    });
    $('#modal-language').modal('open');
}

/*
 *Description: Show modal setting
 *@version 1.0
 *@author Supachai Boonying
 *@since 20 Feb 2020
 *@required javascript
 */
function showSetting(flag_thai='',flag_eng='') {
    $('#modal-setting').modal({
        'dismissible': true,
        'onOpenStart': function () {
            const flagSelect=  $('.flag-select-setting')
            const lang = Cookies.get('lang');
            const th = $('<div></div>')
            const eng = $('<div></div>')
            const eleSoundMusic = $('.btn-main-music')
            const eleSoundMasterc = $('.btn-main-sound')

            th.attr('id','setting-lang-thai') 
                .html(
                    $('<span></span>').css({'margin-left':'27px'})
                        .html(flag_thai)
                ).attr('onclick',"editLanguage('th')")    
            eng.attr('id','setting-lang-eng') 
                .html(
                    $('<span></span>').css({'margin-left':'14px'})
                        .html(flag_eng)
                ).attr('onclick',"editLanguage('en')")      
            if(typeof lang === 'undefined' ){
                th.addClass('bg-nude flag-thai canClick blur');
                eng.addClass('bg-nude flag-eng canClick unblur');
            }else{
                th.addClass('bg-nude flag-thai canClick '+( lang == 'en' ?'blur' :'unblur' ));
                eng.addClass('bg-nude flag-eng canClick '+( lang == 'en' ? 'unblur' :'blur' ));
            }
            flagSelect.append(th).append(eng)
            
            if(soundMaster == "false"){
                eleSoundMasterc.html(
                    $('<div></div>').addClass('btn-close-sound').html("")
                ) 
            }

            if(soundMusic == "false"){
                eleSoundMusic.html(
                    $('<div></div>').addClass('btn-close-sound').html("")
                ) 
            }
        },
        'onOpenEnd': function () {},
        'onCloseStart': function () {},
        'onCloseEnd': function () {
            $('.flag-select-setting').empty()
            $('.btn-main-music').empty()
            $('.btn-main-sound').empty()
        },
    });
    $('#modal-setting').modal('open');
}

/*
 *Description: Change status music sound
 *@version 1.0
 *@author Supachai Boonying
 *@since 20 Feb 2020
 *@required javascript
 */
function editsoundMusic(){
    playSoundEx('click');
    const ele = $('.btn-main-music')
    const check = soundMusic
    if(check == "true"){
        ele.html(
            $('<div></div>').addClass('btn-close-sound').html("")
        )
        soundMusic = "false"
    }else{
        ele.empty()
        soundMusic = "true"
    }

}

/*
 *Description: Change status master sound
 *@version 1.0
 *@author Supachai Boonying
 *@since 20 Feb 2020
 *@required javascript
 */
function editsoundMaster(){
    playSoundEx('click');
    const ele = $('.btn-main-sound')
    const check = soundMaster
    if(check == "true"){
        ele.html(
            $('<div></div>').addClass('btn-close-sound').html("")
        )
        soundMaster = "false"
    }else{
        ele.empty()
        soundMaster = "true"
    }

}

/*
 *Description: Apply Setting
 *@version 1.0
 *@author Supachai Boonying
 *@since 20 Feb 2020
 *@required javascript
 */

function applySetting(){
    const newLang = $('#setting-language').val()
    if(soundMusic != localStorage.getItem("soundMusic") ){
        if( soundMusic == "true"){  
            playsoundMusic.play()
        }else{
            playsoundMusic.pause()
        }
        localStorage.setItem("soundMusic", soundMusic);
    }
    localStorage.setItem("soundMaster", soundMaster);
    if(newLang != ''){
        setLanguage(newLang)
    }
    closeModal('#modal-setting');
}

/*
 *Description: select new avatar
 *@version 1.0
 *@author Thanawin Poopangeon
 *@since 20 Feb 2020
 *@required javascript
 */
function showAvatarModal(){
    $('#modal-showAvatar').modal({
        'onOpenStart': function () {
            showAvatar();
        }
    });
    $('#modal-showAvatar').modal('open');
}
/*
 *Description: show all avatar
 *@version 1.0
 *@author Thanawin Poopangeon
 *@since 20 Feb 2020
 *@required javascript
 */

function showAvatar(){
    var folder = "/assets/svg/avatar/";
    var avatar = new Array(
        'andy-warhol.svg',
        'barack-obama.svg',
        'batman.svg',
        'charlie-chaplin.svg',
        'cristiano-ronaldo.svg',
        'dalai-lama.svg',
        'dave-grohl.svg',
        'donald-trump.svg',
        'girl-in-ballcap.svg',
        'indian-man.svg',
        'indian-woman.svg',
        'joseph-stalin.svg',
        'luis-suarez.svg',
        'mahatma-gandhi.svg',
        'malcolm-x.svg',
        'mick-jagger.svg',
        'muslim-man.svg',
        'muslim-woman.svg',
        'native-man.svg',
        'native-woman.svg',
        'nikola-tesla.svg',
        'robot-01.svg',
        'robot-02.svg',
        'robot-03.svg',
        'traditiona-japanese-man.svg',
        'traditional-african-man.svg',
        'traditional-african-woman.svg',
        'traditional-japanese-woman.svg',
        'trinity.svg',
        'vladimir-lenin.svg'
    );
    $("#targetAvatar").html("");
    for(let round=0;round<avatar.length;round){
        var textHTML = "<div style='display: inline-flex;'><div><img src='" + folder + avatar[round] + "' class='avatar' value='"+avatar[round]+"' onclick='changeAvatar(this)'></div>"
                        +"<div style='margin-left: 5px;'><img src='" + folder + avatar[round+1] + "' class='avatar' value='"+avatar[round+1]+"' onclick='changeAvatar(this)'></div>"
                        +"<div style='margin-left: 5px;'><img src='" + folder + avatar[round+2] + "' class='avatar' value='"+avatar[round+2]+"' onclick='changeAvatar(this)'></div>"
                        +"<div style='margin-left: 5px;'><img src='" + folder + avatar[round+3] + "' class='avatar' value='"+avatar[round+3]+"' onclick='changeAvatar(this)'></div>"
                        +"<div style='margin-left: 5px;'><img src='" + folder + avatar[round+4] + "' class='avatar' value='"+avatar[round+4]+"' onclick='changeAvatar(this)'></div>"
                        +"<div style='margin-left: 5px;'><img src='" + folder + avatar[round+5] + "' class='avatar' value='"+avatar[round+5]+"' onclick='changeAvatar(this)'></div></div><br>";
        round = round+6;
        $("#targetAvatar").append(textHTML);
        
    }
}

/*
 *Description: change avatar
 *@version 1.0
 *@author Thanawin Poopangeon
 *@since 20 Feb 2020
 *@required javascript
 */
function changeAvatar(element){
    document.getElementById("selectavatar").src = "/assets/svg/avatar/"+element.getAttribute("value");
    document.getElementById("selectavatar").value = element.getAttribute("value");
    closeModal('#modal-showAvatar');
}

/*
 *Description: save avatar
 *@version 1.0
 *@author Thanawin Poopangeon
 *@since 20 Feb 2020
 *@required javascript
 */
function saveUserInfo(){
    let refUserInfo = firestore.collection("UserInfo");
    if(typeof document.getElementById("selectavatar").value == "undefined"){
        document.getElementById("selectavatar").value = "robot-01.svg";
    }
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            refUserInfo.doc(user.uid).set({
                avatar: document.getElementById("selectavatar").value,
                nickname: document.getElementById("username").value,
                role:"user",
                score:0
            });
        }
    });
    closeModal('#modal-firstPlay');
}

