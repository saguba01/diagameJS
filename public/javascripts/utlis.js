//Center the element
$.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + "px");
    this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
    return this;
};

var baseUrl = window.location.protocol + '//' + window.location.host;
var progressInterval;

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

function playSoundEx(type) {
    var pop_sound = new Audio(baseUrl + '/assets/sound/pop.mp3');
    var drop_sound = new Audio(baseUrl + '/assets/sound/drop.wav');
    var error_sound = new Audio(baseUrl + '/assets/sound/incorrect.wav');
    var correct_sound = new Audio(baseUrl + '/assets/sound/correct.wav');

    pop_sound.volume = 0.2;
    drop_sound.volume = 0.5;

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
function setLanguage(lang) {
    document.cookie = 'lang=' + lang;
    window.location.replace('/home');
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
 *Description: Show alert modal.
 *@version 1.0
 *@author Thanawin Poopangeon
 *@since 7 Feb 2020
 *@required javascript, materialize-css.
 */
function closeLoading() {
    $('#modal-saving').modal('close');
}