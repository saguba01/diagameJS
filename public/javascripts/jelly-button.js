$(document).ready(function () {
    playButtonEvent();
    jellyButtonEvent();
    resetButtonEvent();
    playMinigameButtonEvent();
});

function jellyButtonEvent() {
    $(".jellyButton.typeButton").click(function () {
        playSoundEx('click');
        let btn = $(this);
        btn.addClass("play_jelly");
        setTimeout(function () {
            btn.removeClass("play_jelly");
        }, 800);
    });

    $(".jellyButton.typeButton").click(function () {
        $(".typeButton.selected").removeClass("selected");
        $(this).addClass("selected");
        console.log($(this).attr('type'));
        toggleSideBar($(this).attr('type'));
    });
}

function playButtonEvent() {
    $("#playButton").click(function () {
        playSoundEx('click');
        let btn = $(this);
        btn.addClass("play_jelly");
        setTimeout(function () {
            btn.removeClass("play_jelly");
        }, 800);
    });
    $('#playButton').click(function () {
        if ($('#target').children().length == 0) {
            notice(2000, 'warning', errorMsg.game.notarget);
            return;
        }
        toggleSideBar();
        $('.jellyButton').off('click');
        $('#target').sortable('disable');
        if($('[type="decisionElements"]').children().length != 0){
            $('[type="decisionElements"]>[type="true"]').sortable('disable');
            $('[type="decisionElements"]>[type="false"]').sortable('disable');
        }
        gameEngine(function () {
            setTimeout(function () {
                toggleSideBar();
                $('#target').sortable('enable');
                if($('[type="decisionElements"]').children().length != 0){
                    $('[type="decisionElements"]>[type="true"]').sortable('enable');
                    $('[type="decisionElements"]>[type="false"]').sortable('enable');
                }
            }, 650);
        });
    });
}

function resetButtonEvent() {
    $("#resetButton").click(function () {
        playSoundEx('click');
        $("#display").empty()
        let btn = $(this);
        btn.addClass("play_jelly");
        setTimeout(function () {
            btn.removeClass("play_jelly");
        }, 800);
    });
    $('#resetButton').click(function () {
        $('#target>[type="element"]').each(function(){
            let uiSource = $(this).attr('source');
            $(this).detach().appendTo('#source[type="' + uiSource + '"]');
            updateFlowchart();
        });
    });
}


function playMinigameButtonEvent(){
    $('#playMinigame').click(function () {
        let btn = $(this);
        btn.addClass("play_jelly");
        setTimeout(function () {
            btn.removeClass("play_jelly");
        }, 800);
        gameEngine(function (item) {
            
        });
    });
}