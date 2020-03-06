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
var soundMusic = (localStorage.getItem("soundMusic") == null ? "true" : localStorage.getItem("soundMusic"))
var soundMaster = (localStorage.getItem("soundMaster") == null ? "true" : localStorage.getItem("soundMaster"))
var playsoundMusic = null
var playsoundMaster = null

$(document).ready(() => {
    playSoundEx('fun', true);
    $('#changeLangThai').click(() => {
        playSoundEx('click');
        setLanguage('th')
        closeModal('#modal-language')
    })

    $('#changeLangEng').click(() => {
        playSoundEx('click');
        setLanguage('en')
        closeModal('#modal-language')
    })
    ratingstart();
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
    const user = firebase.auth().currentUser
    const uid = user.uid
    user.getIdToken(true).then(function (idToken) {
        document.cookie = 'idToken=' + idToken;
        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ uid: uid }),
            url: "/admin/roleUser",
            success: function (result) {
                const resData = result.data
                if (resData.role == "admin") {
                    window.location.replace('/admin');
                } else {
                    window.location.replace('/home');
                }
            },
            error: (e) => {
                console.error(e)
            }
        });

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
                    // newUser(user,username)
                    signInWithEmailAndPassword(email, password);
                }).catch(function (error) {
                    console.log(error)
                    unblockUI();
                    showError('Oh no!', errorMsg.firebase.auth[error.code]);
                });
        })
        .catch(function (error) {
            unblockUI();
            showError('Oh no!', errorMsg.firebase.auth[error.code]);
        });
}

function newUser(user) {
    debugger
    let refUerInfo = firestore.collection('UserInfo').doc(user.uid);
    refUerInfo.set({
        avatar: "",
        nickname: "",
        playTutorial: true,
    })
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
    console.log("signInWithGoogle")
    firebase.auth().signInWithPopup(googleProvider)
        .then(function (result) {
            var token = result.credential.accessToken; // Use it to access the Google API
            var user = result.user;
            console.log("signInWithGoogle success")
            replaceHome();
        }).catch(function (error) {
            showError('Oh no!', errorMsg.firebase.auth[error.code]);
        });
}

function playSoundEx(type, loop = false) {
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

    const oldSoundMusic = (localStorage.getItem("soundMusic") == null ? "true" : localStorage.getItem("soundMusic"))
    const oldSoundMaster = localStorage.getItem("soundMaster");

    pop_sound.volume = 0.2;
    drop_sound.volume = 0.5;
    click_sound.volume = 0.2;
    fun_sound.volume = 0.5;
    step_sound.volume = 0.3;
    step_sound.volume = 0.3;

    if (oldSoundMaster == "true" || typeof oldSoundMaster == 'undefined' || typeof oldSoundMaster == 'null' || oldSoundMaster == null) {
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
        } else if (type == 'complete') {
            const playPromise = complete_sound.play();
            if (playPromise !== null) {
                playPromise.catch(() => {
                    complete_sound.play();
                });
            }
        } else if (type == 'achievement') {
            const playPromise = achievement_sound.play();
            if (playPromise !== null) {
                playPromise.catch(() => {
                    achievement_sound.play();
                });
            }
        } else if (type == 'click') {
            const playPromise = click_sound.play();
            if (playPromise !== null) {
                playPromise.catch(() => {
                    click_sound.play();
                });
            }
        } else if (type == 'step') {
            const playPromise = step_sound.play();
            if (playPromise !== null) {
                playPromise.catch(() => {
                    step_sound.play();
                });
            }
        } else if (type == 'step-end') {
            const playPromise = step_end_sound.play();
            if (playPromise !== null) {
                playPromise.catch(() => {
                    step_end_sound.play();
                });
            }
        }
    }
    if (type == 'fun') {

        fun_sound.loop = loop
        playsoundMusic = fun_sound
        if (oldSoundMusic == 'true') {
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
        "onShown": function () { },
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
        'onOpenEnd': function () { },
        'onCloseStart': function () { },
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
function setLanguage(setlang) {
    const lang = Cookies.get('lang');
    localStorage.setItem("langSelected", true);
    if (lang != setlang) {
        blockUI();
        Cookies.set('lang', setlang);
        location.reload();
    }
}

/*
 *Description: Change language on modal setting
 *@version 1.0
 *@author Supachai Boonying
 *@since 20 Feb 2020
 *@required javascript
 */
function editLanguage(setlang) {
    playSoundEx('click');
    $('#setting-language').val(setlang)

    $('#setting-lang-thai').removeClass('blur');
    $('#setting-lang-eng').removeClass('blur');

    $('#setting-lang-thai').removeClass('unblur');
    $('#setting-lang-eng').removeClass('unblur');

    $('#setting-lang-thai').addClass((setlang == 'en' ? 'blur' : 'unblur'));
    $('#setting-lang-eng').addClass((setlang == 'en' ? 'unblur' : 'blur'));
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
                    vivus.play(animationSpeed, function () { });
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
        'onCloseStart': function () { },
        'onCloseEnd': function () {
            $('#modal-achievement>.modal-content>.achievement-photo').empty();
            $('#modal-achievement>.modal-content>.achievement-title').empty();
            $('#modal-achievement>.modal-content>.achievement-content').empty();
        },
    });
    $('#modal-achievement').modal('open');
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
        'onOpenStart': function () { },
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
        'onOpenStart': function () { },
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
        'onOpenStart': function () { },
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
        },
        'onOpenEnd': function () { },
        'onCloseStart': function () { },
        'onCloseEnd': function () {
            startTutorial()
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
function showSetting(flag_thai = '', flag_eng = '') {
    $('#modal-setting').modal({
        'dismissible': true,
        'onOpenStart': function () {
            const flagSelect = $('.flag-select-setting')
            const lang = Cookies.get('lang');
            const th = $('<div></div>')
            const eng = $('<div></div>')
            const eleSoundMusic = $('.btn-main-music')
            const eleSoundMaster = $('.btn-main-sound')

            soundMaster = localStorage.getItem("soundMaster")
            soundMusic = localStorage.getItem("soundMusic")

            th.attr('id', 'setting-lang-thai')
                .html(
                    $('<span></span>').css({ 'margin-left': '27px' })
                        .html(flag_thai)
                ).attr('onclick', "editLanguage('th')")
            eng.attr('id', 'setting-lang-eng')
                .html(
                    $('<span></span>').css({ 'margin-left': '14px' })
                        .html(flag_eng)
                ).attr('onclick', "editLanguage('en')")
            if (typeof lang === 'undefined') {
                th.addClass('bg-nude flag-thai canClick blur');
                eng.addClass('bg-nude flag-eng canClick unblur');
            } else {
                th.addClass('bg-nude flag-thai canClick ' + (lang == 'en' ? 'blur' : 'unblur'));
                eng.addClass('bg-nude flag-eng canClick ' + (lang == 'en' ? 'unblur' : 'blur'));
            }
            flagSelect.append(th).append(eng)

            if (soundMaster == "false") {
                eleSoundMaster.html(
                    $('<div></div>').addClass('btn-close-sound').html("")
                )
            }else{
                eleSoundMaster.empty()
            }

            if (soundMusic == "false") {
                eleSoundMusic.html(
                    $('<div></div>').addClass('btn-close-sound').html("")
                )
            }else{
                eleSoundMusic.empty()
            }
        },
        'onOpenEnd': function () { },
        'onCloseStart': function () { },
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
function editsoundMusic() {
    playSoundEx('click');
    const ele = $('.btn-main-music')
    const check = soundMusic
    if (check == "true") {
        ele.html(
            $('<div></div>').addClass('btn-close-sound').html("")
        )
        soundMusic = "false"
    } else {
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
function editsoundMaster() {
    playSoundEx('click');
    const ele = $('.btn-main-sound')
    const check = soundMaster
    if (check == "true") {
        ele.html(
            $('<div></div>').addClass('btn-close-sound').html("")
        )
        soundMaster = "false"
    } else {
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

function applySetting() {
    const newLang = $('#setting-language').val()
    if (soundMusic != localStorage.getItem("soundMusic")) {
        if (soundMusic == "true") {
            playsoundMusic.play()
        } else {
            playsoundMusic.pause()
        }
        localStorage.setItem("soundMusic", soundMusic);
    }
    localStorage.setItem("soundMaster", soundMaster);
    if (newLang != '') {
        setLanguage(newLang)
    }
    closeModal('#modal-setting');
}

/*
 *Description: Show modal Feedback
 *@version 1.0
 *@author Jirapat Lapudomsakda
 *@since 26 Feb 2020
 *@required javascript
 */

function showFeedback() {
    $('#modal-feedback').modal({
        'dismissible': true,
    });
    var stars = $('#stars li').parent().children('li.star');
    for (i = 0; i < stars.length; i++) {
        $(stars[i]).removeClass('selected');
    }
    $("#ratingStar").val(0);
    $("#comment-feedback").val('');
    $('#modal-feedback').modal('open');
}

/*
*Description: Save feedback to Firebase
*@version 1.0
*@author Jirapat Lapudomsakda
*@since 26 Feb 2020
*@required javascript
*/

function saveFeedback(name) {
    console.log('savefeedback...');
    var stars = $("#ratingStar").val();
    var comment = $("#comment-feedback").val();
    if (comment == "") {
        comment = "empty";
    }
    if (stars != 0) {
        showLoading();
        let refFeedback = firestore.collection('Feedback');
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth();
        var HH = today.getHours();
        var MM = today.getMinutes();
        var SS = today.getSeconds();
        var yyyy = today.getFullYear();
        refFeedback.add({
            Comment: comment,
            Level: stars,
            Name: name,
            Version: 1,
            date: twoDigit(dd) + "/" + twoDigit(mm) + "/" + yyyy + "T" + twoDigit(HH) + ":" + twoDigit(MM) + ":" + twoDigit(SS)
        }).then(ref => {
            showError('บันทึกเรียบร้อยแล้ว');
            $("#ratingStar").val('');
            $("#comment-feedback").val('');
            closeModal('#modal-feedback');
            closeLoading();
            location.reload();
        });
    } else {
        showError('', 'กรุณาเลือกดาวเพื่อให้คะแนน Feedback');
    }
    //console.log(comment);
    //console.log(stars);
}


/*
 *Description: Rating star
 *@version 1.0
 *@author Thanawin
 *@since 26 Feb 2020
 *@required javascript
 */

function ratingstart() {
    //Visualizing things on Hover
    $('#stars li').on('mouseover', function () {
        var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
        // highlight all the stars that's not after the current hovered star
        $(this).parent().children('li.star').each(function (e) {
            if (e < onStar) {
                $(this).addClass('hover');
            }
            else {
                $(this).removeClass('hover');
            }
        });
    }).on('mouseout', function () {
        $(this).parent().children('li.star').each(function (e) {
            $(this).removeClass('hover');
        });
    });
    //Action to perform on click
    $('#stars li').on('click', function () {
        var onStar = parseInt($(this).data('value'), 10); // The star currently selected
        var stars = $(this).parent().children('li.star');

        for (i = 0; i < stars.length; i++) {
            $(stars[i]).removeClass('selected');
        }

        for (i = 0; i < onStar; i++) {
            $(stars[i]).addClass('selected');
        }

        // JUST RESPONSE (Not needed)
        var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
        //set input level
        document.getElementById("ratingStar").value = ratingValue;
        console.log(ratingValue);
        //console.log(document.getElementById("ratingStar").value);
    });
}

/*
 *Description: select new avatar
 *@version 1.0
 *@author Thanawin Poopangeon
 *@since 20 Feb 2020
 *@required javascript
 */

function showAvatarModal() {
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

function showAvatar() {
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
    for (let round = 0; round < avatar.length; round) {
        var textHTML = "<div style='display: inline-flex;'><div><img src='" + folder + avatar[round] + "' class='avatar' value='" + avatar[round] + "' onclick='changeAvatar(this)'></div>"
            + "<div style='margin-left: 5px;'><img src='" + folder + avatar[round + 1] + "' class='avatar' value='" + avatar[round + 1] + "' onclick='changeAvatar(this)'></div>"
            + "<div style='margin-left: 5px;'><img src='" + folder + avatar[round + 2] + "' class='avatar' value='" + avatar[round + 2] + "' onclick='changeAvatar(this)'></div>"
            + "<div style='margin-left: 5px;'><img src='" + folder + avatar[round + 3] + "' class='avatar' value='" + avatar[round + 3] + "' onclick='changeAvatar(this)'></div>"
            + "<div style='margin-left: 5px;'><img src='" + folder + avatar[round + 4] + "' class='avatar' value='" + avatar[round + 4] + "' onclick='changeAvatar(this)'></div>"
            + "<div style='margin-left: 5px;'><img src='" + folder + avatar[round + 5] + "' class='avatar' value='" + avatar[round + 5] + "' onclick='changeAvatar(this)'></div></div><br>";
        round = round + 6;
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
function changeAvatar(element) {
    document.getElementById("selectavatar").src = "/assets/svg/avatar/" + element.getAttribute("value");
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
function saveUserInfo() {
    let refUserInfo = firestore.collection("UserInfo");
    if (typeof document.getElementById("selectavatar").value == "undefined") {
        document.getElementById("selectavatar").value = "robot-01.svg";
    }
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            refUserInfo.doc(user.uid).get().then(function (doc) {
                refUserInfo.doc(user.uid).set({
                    avatar: document.getElementById("selectavatar").value,
                    nickname: document.getElementById("username").value,
                    role: doc.data().role,
                    playTutorial: doc.data().playTutorial,
                    score: 0
                });
            })
        }
    });
    closeModal('#modal-firstPlay');
}

/*
 *Description: Show modal select Language in tutorial 
 *@version 1.0
 *@author Supachai Boonying
 *@since 15 Feb 2020
 *@required javascript
 */
function showConfirmSignout() {
    $('#modal-confirm-signout').modal({
        'dismissible': true,
    });
    $('#modal-confirm-signout').modal('open');
}

function showLeaderboard() {
    $('#modal-leaderboard').modal({
        'dismissible': true,
    });
    $('#modal-leaderboard').modal('open');
    ScoreBoard();
}

function showPasstutorial(photo, title, content, nextFlag = false) {
    $('#modal-pass-tutorial').modal({
        'dismissible': false,
        'onOpenStart': function () {
            nextFlag ? $('#nextPage').show() : $('#nextPage').hide();
        },
        'onOpenEnd': function () {
            let animationSpeed = 2;
            let animationDuration = 600;
            let path = baseUrl + '/assets/svg/' + photo;
            let vivus = new Vivus('tutorial-photo', {
                file: path,
                onReady: function (myVivus) {
                    // `el` property is the SVG element
                    myVivus.el.setAttribute('height', '100%');
                    myVivus.el.setAttribute('width', '100%');
                    vivus.play(animationSpeed, function () { });
                    $('#tutorial-photo>svg').each(function (index, obj) {
                        if (index != 0) {
                            $(obj).detach();
                        }
                    });
                }
            });
            new Typed('#modal-pass-tutorial>.modal-content>.tutorial-title', {
                strings: [title],
                typeSpeed: 30,
                showCursor: false
            });
            new Typed('#modal-pass-tutorial>.modal-content>.tutorial-content', {
                strings: [content],
                typeSpeed: 10,
                showCursor: false
            });
        },
        'onCloseStart': function () { },
        'onCloseEnd': function () {
            $('#modal-pass-tutorial>.modal-content>.tutorial-photo').empty();
            $('#modal-pass-tutorial>.modal-content>.tutorial-title').empty();
            $('#modal-pass-tutorial>.modal-content>.tutorial-content').empty();
        },
    });
    $('#modal-pass-tutorial').modal('open');
}

/*
  *Description: 
  *@version 1.0
  *@author Supachai Boonying
  *@since 06 Mar 2020
  *@required javascript.
  */
function passTutorial() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/tutorial/passTutorail",
        success: function (result) {
            unblockUI();
            location.href = "/home"
        },
        error: (e) => {
            unblockUI();
            console.error(e)
        }
      });
    }

function ScoreBoard(){
    //showLoading();
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/api/getAllScore",
        success: function(response){
            var html = '';
            var checkname = [];
            var score = [];
            var round = 0;
            var index = 0;
            response.forEach(element => {
                    if(round == 0){
                    checkname.push({
                        nickname:element.nickname,
                        score:0
                    });
                    round++;
                    }else{
                        if(checkname[index].nickname != element.nickname){
                            checkname.push({
                                nickname:element.nickname,
                                score:0
                            });
                            index++;
                        }
                    }
            });
            var index = 0;
            console.log(checkname);
            console.log(response);
            checkname.forEach(element =>{
                response.forEach(value => {
                    if(element.nickname == value.nickname){
                        element.score += parseInt(value.score);
                    }
                })
            })
            checkname.sort(compareValues('score','desc'))
            var rank = 1;
            checkname.forEach(element =>{
                html += '<tr>'
                html += '<td>'+rank+'</td>'
                html += '<td>'+element.nickname+'</td>'
                html += '<td>'+element.score+'</td>'
                html += '</tr>'
                rank++;
            })
            $('#data-leaderboard').html(html);
        },
        error: function (e){
            console.log(e);
        },complete : function (){
           // closeLoading();
        }
    });
}

function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

function ChangeMonth (month,lang){
    var allmonthEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var allmonthTh = ['ม.ค.','ก.พ.','มี.ค.','เม.ย','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
    var newMonth = '';
    if(lang == 'en'){
        for(var i = 0;i<12;i++){
            if(i<10){
                if(month == ('0'+(i+1))){
                    newMonth = allmonthEn[i];
                }
            }else{
                if(month == i+1){
                    newMonth = allmonthEn[i];
                }
            }
        }
    }else if(lang == 'th'){
        for(var i = 0;i<12;i++){
            if(i<10){
                if(month == ('0'+(i+1))){
                    newMonth = allmonthTh[i];
                }
            }else{
                if(month == i+1){
                    newMonth = allmonthTh[i];
                }
            }
        }
    }
    return newMonth;
}
/*
  *Description: preview question
  *@version 1.0
  *@author Thanawin Poopangeon
  *@since 06 Mar 2020
  *@required javascript.
  */
function previewQuestion(question) {
    var html = '';
    var index = 0;
    question.forEach(function (qs) {
        var seq = 1;
        var array = qs.equation.split('{target}');
        html += '<div class="question' + (index == 0 ? ' active' : '') + '" question="' + (index + 1) + '">';
        array.forEach(function (value) {
            html += '<div class="questionText" type="operand" style="margin-right: 20px;' + (seq > 1 ? 'margin-left: 60px;' : '') + '" event="' + value + '">' + value + '</div>';
            array.length != seq ? html += '<div class="boxAnswer" type = "operator" style="margin-left: -10px;margin-top: 25px;"></div>' : '';
            seq++;
        });
        html += '<div class="questionText" type="result" event="' + qs.answer + '"> = ' + qs.answer + '</div>'
        html += '</div>';
        index++;
    });
    return html;
}
/*
  *Description: preview question
  *@version 1.0
  *@author Thanawin Poopangeon
  *@since 06 Mar 2020
  *@required javascript.
  */
function showPreview(question) {
    $('#modal-preview').modal({
        'dismissible': false,
        'onOpenStart': function () { },
        'onOpenEnd': function () {
            $('.modal-preview-content').html(previewQuestion(question));
        }
    });
    $('#modal-preview').modal('open');
}

function showTutorialLogic(content) {
    $('#modal-tutorial-logic').modal({
        'dismissible': false,
        'onOpenStart': function () { },
        'onOpenEnd': function () {
            $('.tutorial-logic-content').text(content);
        }
    });
    $('#modal-tutorial-logic').modal('open');
}

/*
 *Description: Show alert modal.
 *@version 1.0
 *@author Thanawin Poopangeon
 *@since 10 March 2020
 *@required javascript, materialize-css.
 */
function showScoreReult(content) {
    $('#modal-result-score').modal({
        'dismissible': false,
        'onOpenEnd': function () {
            $('.result-score-content').text(content);
        }
    });
    $('#modal-result-score').modal('open');
}