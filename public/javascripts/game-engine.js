/*
 *Description: Listen transition event end.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 22 Fabuary 2019
 *@required javascript.
 */
function whichTransitionEvent() {
    var t,
        el = document.createElement("fakeelement");

    var transitions = {
        "transition": "transitionend",
        "OTransition": "oTransitionEnd",
        "MozTransition": "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
    }

    for (t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
}

var transitionEvent = whichTransitionEvent();
var tempSource = '';

/*
 *Description: Toggle (open & close) resource side bar.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 22 Fabuary 2019
 *@required javascript.
 */
function toggleSideBar(type = '') {
    $('.jellyButton').off('click');
    if (type.length == 0 && tempSource.length == 0) { // auto close
        var tempType = $('#source.activeSource').attr('type');
        if (tempType != undefined) {
            closeSource(jellyButtonEvent());
        } else {
            playButtonEvent();
            resetButtonEvent();
            jellyButtonEvent();
        }
        tempSource = (tempType != undefined ? $('#source.activeSource').attr('type') : '');
        return;
    } else if (type.length == 0 && tempSource.length != 0) { // auto open
        toggleSideBar(tempSource);
        return;
    } else {
        tempSource = '';
    }

    if ($('#source[type="' + type + '"]').hasClass('activeSource')) { // Close selected source 
        closeSource(function () {
            playButtonEvent();
            resetButtonEvent();
            jellyButtonEvent();
        });
    } else {
        $('#target').css({
            'left': '360px'
        });
        if ($('.panelTool').css('left') == '-360px') { // Open new source
            $('.typeButton[type="' + type + '"]').addClass("selected");
            $('.source[type="' + type + '"]').addClass('activeSource').show();
            $('.panelTool').css({
                'left': '90px'
            }).one(transitionEvent, function (event) {
                playButtonEvent();
                resetButtonEvent();
                jellyButtonEvent();
            });
        } else { // Close current source & open new source
            $('.panelTool').css({
                'left': '-360px'
            }).one(transitionEvent, function (event) {
                $('.activeSource').removeClass('activeSource').hide();
                $('.source[type="' + type + '"]').addClass('activeSource').show();
                $('.panelTool').css({
                    'left': '90px'
                }).one(transitionEvent, function (event) {
                    playButtonEvent();
                    resetButtonEvent();
                    jellyButtonEvent();
                });
            });
        }
    }

    /*
     *Description: Close resource side bar.
     *@version 1.0
     *@author Bulakorn Maneesang
     *@since 12 march 2019
     *@required javascript.
     */
    function closeSource(callback) {
        $(".typeButton.selected").removeClass("selected");
        $('.panelTool').css({
            'left': '-360px'
        }).one(transitionEvent, function (event) {
            $('.activeSource').removeClass('activeSource').hide();
            if (callback) {
                callback();
            }
        });
        $('#target').css({
            'left': '90px'
        });
    }
}

function setupDisable(idSortable, limit) {
    let length = $(idSortable + '>.ui-sortable-handle').length - limit;
    $(idSortable).sortable({
        update: function (event, ui) {
            if ($(idSortable + '>.ui-sortable-handle').length <= length) {
                $(this).each(function () {
                    $(this).addClass('ui-state-disabled');
                });
            } else {
                $(this).each(function () {
                    $(this).removeClass('ui-state-disabled');
                });
            }
        }
    });
}
//
// Cloud firestore area
// Management datas to database 
//

/*
 *Description: save flowchart to cloudfirestore by call func saveElementToFirestore 
 *             get element in #target and foreach one by one to add element to firestore
 *@version 1.0
 *@param any refDatabase reference database cloudfirestore for add data.
 *@author Prince Pongsakorn
 *@since 11 Mar 2019
 *@required Firebase Cloud Firestore.
 */
function saveFlowchartToFirestore(refDatabase, timestamp) {
    $('#target>div[type="element"]').each(function (index, obj) {
        // console.log(index,obj);
        saveElementToFirestore($(obj), index, refDatabase, timestamp);
    });
}

/*
 *Description: Update Current FlowchartId for get current flowchart from firebase
 *@version 1.0
 *@param jquery element     element data to add to database.
 *@param number seq         sequence index of element.
 *@param any    refDatabase reference database cloudfirestore for update data.
 *@author Prince Pongsakorn
 *@since 11 Mar 2019
 *@required Firebase Cloud Firestore.
 */
function saveElementToFirestore(element, seq, refDatabase, timestamp) {
    let docData = {
        event: element.attr('event'),
        seq: seq
    };
    if (element.attr('source') == 'decision') {
        let docDecision = {
            event: element.attr('event'),
            seq: seq,
            condition: element.attr('condition')
        };
        refDatabase.collection("flowchart:" + timestamp)
            .add(docDecision).then(function (docRef) {
                console.log("Document successfully written!", docRef.id);
                let decisionRef = refDatabase.collection("flowchart:" + timestamp).doc(docRef.id);
                element.find('[type="true"]').find('[type="element"]').each(function (seq, element) {
                    let docData = {
                        event: $(element).attr('event'),
                        seq: seq
                    };
                    decisionRef.collection('true')
                        .add(docData).then(function () {
                            // console.log("Document successfully written!");
                        });
                });
                element.find('[type="false"]').find('[type="element"]').each(function (seq, element) {
                    let docData = {
                        event: $(element).attr('event'),
                        seq: seq
                    };
                    decisionRef.collection('false')
                        .add(docData).then(function () {
                            // console.log("Document successfully written!");
                        });
                });
            });
    } else {
        refDatabase.collection("flowchart:" + timestamp)
            .add(docData).then(function () {
                // console.log("Document successfully written!");
            });
    }
}

/*
 *Description: Update Current FlowchartId for get current flowchart from firebase
 *@version 1.0
 *@param any    refDatabase reference database cloudfirestore for update data.
 *@author Prince Pongsakorn
 *@since 11 Mar 2019
 *@required Firebase Cloud Firestore.
 */
function updateCurrentFlowchart(refDatabase, timestamp) {
    refDatabase.update({
        "currentFlowchart": timestamp
    }).then(function () {
        // console.log("Document successfully update!!");
    }).catch(function (error) {
        // console.log(error);
        refDatabase.set({
            "currentFlowchart": timestamp
        }).then(function () {
            // console.log("Document successfully add!!");
        });
    });
}
//end

function updateFlowchart() {
    // let elementArray = $('#target').find('div');
    let elementArray = $('#target>div');
    // console.log(elementArray);
    // tempFlowchart = elementArray;
    if (elementArray.length > 1) {
        if ($(elementArray[0]).attr('type') == 'arrow') {
            $(elementArray[0]).remove();
        }
        tempFlowchart = [];
        elementArray.each(function () {
            if ($(this).attr('type') == 'element') {
                tempFlowchart.push($(this).attr('event'));
                if ($(this).next().attr('type') == 'element') {
                    $(this).after(
                        '<div type = "arrow" class = "ui-state-disabled arrow play_splat"><svg width="30" height="45"><g id="arrow" transform="translate(-480.386 -241.5)" style="stroke-width: 5px;"><line y2="39" transform="translate(493.5 241.5)" style="stroke: #000;stroke-width: 5px;"></line><path d="M5049.152,4262.028c-7.526-9.094,6,7.825,8.058,7.825s15.149-16.429,8.037-7.825" transform="translate(-4564 -3988)" style="fill: none;stroke: #000;stroke-width: 5px;"></path></g></svg></div>'
                    );
                }
            } else if ($(this).attr('type') == 'arrow') {
                if ($(this).next().length == 0) {
                    $(this).remove();
                }
                if ($(this).next().attr('type') == 'arrow') {
                    $(this).remove();
                }
            }
        });
    }
}


function getFlowchart(refDatabase) {
    blockUI();
    var flowchart = [];
    refDatabase.get().then(function (doc) {
        if (doc.exists) {
            //if doc exists
            let currentFlowchartId = doc.data().currentFlowchart;
            console.log("flowchart:" + currentFlowchartId);
            refDatabase.collection("flowchart:" + currentFlowchartId).orderBy("seq").get().then(function (
                querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    console.log(doc.id, " => ", doc.data());
                    $("div[type='element'][event='" + doc.data().event + "']").detach()
                        .appendTo("#target");
                    flowchart.push(doc.data().event);
                    // doc.data().event
                });

                unblockUI();
                updateFlowchart();
                return flowchart;
                // console.log(currentFlowchart);
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            // if doc is not exists
            unblockUI();
            return flowchart;
        }
    }).catch(function (error) {
        console.log(error);
        unblockUI();
        return flowchart;
    });
}
var achieveArray = [];
$(function () {
    refAchieve.onSnapshot(function (snapshot) {
        snapshot.docChanges.forEach(function (change) {
            if (change.type === "added") {
                achieveArray.push(change.doc.data().keyName);
                console.log("added: ", change.doc.data());
            }
            /* if (change.type === "modified") {
                console.log("modified: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("removed: ", change.doc.data());
            } */
        });
    });
});

function unlockAchievement(keyName, timestamp) {
    let docData = {
        keyName: keyName,
        timestamp: timestamp
    };

    if (achieveArray.length == 0) {
        addDoc(docData);
    } else {
        achieveArray.indexOf(keyName) == -1 ? addDoc(docData) : '';
    }

    function addDoc(docData) {
        refAchieve.add(docData).then(function (docRef) { });
    }
}

function unlockLesson(lesson, subLesson, timestamp) {
    let docData = {
        passed: true,
        timestamp: timestamp
    };
    refPassed.doc(lesson + '-' + subLesson).set(docData).then(function (docRef) {
        // let decisionRef = refDatabase.collection("flowchart:" + timestamp).doc(docRef.id);
    });
}

/*
 *Description: Timer of play game 
 *@version 1.0
 *@param any
 *@author Supachai Boonying Thanawin Poopangeon
 *@since 6 Mar 2020
 *@required Firebase Cloud Firestore.
 */
function timer(level, callback) {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/admin/rateScore",
        success: function (result) {
            let resData = result.data
            let userLevel = resData.level[parseInt(level) - 1]
            let discountRate = parseFloat(userLevel.score / userLevel.rate).toFixed(3)
            let stopTime = false
            let width = 100;
            let maxScore = parseInt(resData.maxScore)
            let topScore = maxScore
            const minScore = parseInt(resData.minScore)
            let minutesLabel = $("#minutes");
            let secondsLabel = $("#seconds");
            let totalSeconds = 0;
            let elem = $('#timeBar')

            let timer = setInterval(setTime, 1000);
            let countDown = setInterval(frame, 1000);
            let scroeBar = setInterval(score, 1000);
            let check = setInterval(checkStatus, 100);

            function setTime() {
                if (statusQuestion) {
                    clearInterval(timer);
                    callback(totalSeconds);
                } else {
                    ++totalSeconds;
                    secondsLabel.html(twoDigit(totalSeconds % 60))
                    minutesLabel.html(twoDigit(parseInt(totalSeconds / 60)))
                }
            }
            
            function frame() {

                if (width == 0 || statusQuestion) {
                    clearInterval(countDown);
                } else {
                    width = (maxScore / topScore * 100)
                    elem.css({ 'width': `${width}%` })
                    elem.css({ 'border-top-right-radius': '0px', 'border-bottom-right-radius': '0px' })
                    if (width <= 70 && width >= 41) {
                        elem.css({ 'background-color': '#F4D03F' })
                    } else if (width <= 40) {
                        elem.css({ 'background-color': '#E74C3C' })
                    }
                }
            }

            function score() {
                if (maxScore <= 0 || statusQuestion || maxScore == minScore) {
                    clearInterval(scroeBar);
                }
                $('#score').html(parseInt(maxScore - discountRate))
                maxScore -= discountRate
            }

            function checkStatus() {
                if (statusQuestion) {
                    clearInterval(check);
                    callback(
                        {
                            score: parseInt(maxScore),
                            time: totalSeconds
                        }
                    );
                }
            }
        },
        error: (e) => {
            return {
                status: "error",
                data: null,
                massage: e
            }
        }
    });

}

function twoDigit(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

