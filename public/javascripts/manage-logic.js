var refQuestion = firestore.collection("Logic");
var keyId = 0;
var question_partcount = 2; //question amount
var target_count = 1;
var divId = 0;
var targetAnswer = "&nbsp;<input type='text' class='ans-box' value='Answer' disabled/>&nbsp;";
/*
 *Description: Save data to firebasse
 *@version 1.0
 *@author Thanawin Poopangeon
 *@since 5 Feb 2020
 *@required javascript
 */
function saveQuestion(logicQuestion, logicLevel, logicNameEN, logicNameTH, logicAnswer) {
    console.log("save...");
    let type = "operator";
    if (logicAnswer.toLowerCase() == "true" || logicAnswer.toLowerCase() == "false") {
        type = "logic";
    }
    refQuestion.get().then(function (doc) {
        doc.forEach(element => {
            if(element.id > keyId){
                keyId = parseInt(element.id);
            }
        });
        keyId++;
    }).then(function () {
        showLoading();
        refQuestion.doc(keyId.toString()).set({
            Question: logicQuestion,
            NameTH: logicNameTH,
            NameEN: logicNameEN,
            Answer: logicAnswer,
            Level: logicLevel,
            Type: type
        }).then(function () {
            closeLoading();
            showSaveStatus();
        }).catch(err => {
            closeLoading();
            showSaveStatus("Error : " + err);
        });
    });
}
/*
 *Description: select button answer
 *@version 1.0
 *@author Thanawin Poopangeon
 *@since 5 Feb 2020
 *@required javascript
 */
function selectButton(id) {
    document.getElementById("ansNum").setAttribute("class", "ans-button nonselect-button");
    document.getElementById("ansTrue").setAttribute("class", "ans-button nonselect-button");
    document.getElementById("ansFalse").setAttribute("class", "ans-button nonselect-button");
    $("#" + id).removeClass("nonselect-button");
    $("#" + id).addClass("select-button");
}

$(document).ready(function () {
    //preview question
    $('#preview').click(function () {
        let previewQuestion = document.getElementById("question_part1").value;
        if (previewQuestion == "") {
            previewQuestion = "?";
        }
        let previewAnswer = document.getElementById("answer").value;
        if (previewAnswer == "") {
            previewAnswer = "?";
        }
        for (let x = 2; x <= question_partcount; x++) {
            if (document.getElementById("question_part" + x) != null) {
                let q_part = document.getElementById("question_part" + x).value;
                if (q_part == "") {
                    q_part = "?";
                }
                previewQuestion = previewQuestion + " {target} " + q_part;
            }
        }
        var questionData = [{
            equation: previewQuestion,
            answerText: previewAnswer,
            answer: previewAnswer.toLowerCase()
        }];
        showPreview(questionData);
    });
    //add answer in question
    $('#q_increase').click(function () {
        question_partcount++;
        target_count++;
        divId++;
        var q_text = targetAnswer + "<input id='question_part" + (question_partcount) + "' type='text' class='textBox-150'/>";
        var deleteButton = "&nbsp;<button class='book-button red-button' id='btn" + divId + "' onclick='removeQuestion(this);'><i class='fa fa-times'></i></button>";
        var divElement = "<div id='div" + divId + "' style='display:inline-block'>" + q_text + deleteButton + "</div>";
        document.getElementById("question_text").innerHTML += divElement;
    });
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
        // console.log(ratingValue);
        // console.log(document.getElementById("ratingStar").value);
    });
    //answer click
    $('#ansNum').click(function () {
        document.getElementById("answer").removeAttribute("hidden");
        document.getElementById("answer").value = "";
        selectButton("ansNum");
    });
    $('#ansTrue').click(function () {
        document.getElementById("answer").setAttribute("hidden", "hidden");
        document.getElementById("answer").value = "true";
        selectButton("ansTrue");
    });
    $('#ansFalse').click(function () {
        document.getElementById("answer").setAttribute("hidden", "hidden");
        document.getElementById("answer").value = "false";
        selectButton("ansFalse");
    });
});
/*
 *Description: delete firebase
 *@version 1.0
 *@author Thanawin Poopangeon
 *@since 29 Feb 2020
 *@required javascript
 */
function deleteQuestion(str) {
    let id = document.getElementById("deleteId").value;
    refQuestion.doc(id.toString()).delete().then(function () {
        $('#modal-addQuestion').modal({
            'dismissible': false,
            'onOpenEnd': function () {
                $('.addQuestion-content').text(str);
            }
        });
        $('#modal-addQuestion').modal('open');
    });
}
/*
 *Description: Confirm Delete
 *@version 1.0
 *@author Thanawin Poopangeon
 *@since 5 Feb 2020
 *@required javascript, materialize-css.
*/
function deleteConfirm(id) {
    document.getElementById("deleteId").value = id;
    $('#modal-confirm-delete').modal({
        'dismissible': false
    });
    $('#modal-confirm-delete').modal('open');
}

/*
 *Description: Delete question part
 *@version 1.0
 *@author Thanawin Poopangeon
 *@since 5 Feb 2020
 *@required javascript, materialize-css.
*/
function removeQuestion(element) {
    let str = element.id;
    element.remove();
    $("#div" + str.substring(3, str.length)).remove();
}

/*
 *Description: next question
 *@version 1.0
 *@author Thanawin Poopangeon
 *@since 5 Feb 2020
 *@required javascript, materialize-css.
*/
function nextQuestion(type, id) {
    let i = 0;
    if (type == "logic") {
        refQuestion.where("Type", "==", "logic").get().then(function (doc) {
            doc.forEach(element => {
                i++;
                if (element.id == id) {
                    if (typeof doc.docs[i] == "undefined") {
                        window.location.href = "/home";
                    } else {
                        window.location.href = "/lesson/logic/" + doc.docs[i].id;
                    }
                }
            });
        });
    } else {
        // type = operator
        refQuestion.where("Type", "==", "operator").get().then(function (doc) {
            doc.forEach(element => {
                i++;
                if (element.id == id) {
                    if (typeof doc.docs[i] == "undefined") {
                        window.location.href = "/home";
                    } else {
                        window.location.href = "/lesson/operator/" + doc.docs[i].id;
                    }
                }
            });
        });
    }
}