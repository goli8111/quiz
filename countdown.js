var _question_timer = undefined;

function quiz_start_countdown(start_callback) {
    var start_countdown = _quizFullData.Config["start_countdown"];
    var timer_element = document.querySelector('#timer');
    start_countdown_timer(start_countdown, start_callback);
}

function start_countdown_timer(duration, callback) {
    var timer = duration;
    var downloadTimer = setInterval(function () {
        countdown_display(timer);

        if (timer < 0) {
            callback();
            clearInterval(downloadTimer);
        }
        --timer;
    }, 1000);
}

function countdown_display(duration) {
    var displayText;
    var timer = parseInt(duration);
    var loadingDisplay = false;
    if (0 == timer) {
        displayText = "GO";
        loadingDisplay = true;
    }
    else if (0 < timer) {
        displayText = timer;
        loadingDisplay = true;
    }
    
    if (false == loadingDisplay) {
        $.mobile.loading( "hide" );
    }
    else {
        $.mobile.loading( "show", {
                        text: "tesdf",
                        textVisible: "true",
                        theme: "b",
                        textonly: "true",
                        html: "<span class='ui-bar ui-shadow ui-overlay-d ui-corner-all'><center><font size='20'>" + displayText + "</font></center></span>"
                });
    }
}

function quiz_Finish_Timer(duration, callback) {
    var timer = duration;
    var downloadTimer = setInterval(function () {
        if (--timer < 0) {
            callback();
            clearInterval(downloadTimer);
        }
    }, 1000);
}

function set_question_time_limit(time_limit, callback) {
    var current_progress = time_limit;
    clear_question_time_limit();
    question_time_limit_text(100, parseInt(current_progress * 0.001));
    _question_timer = setInterval(function () {
        current_progress -= 100;
        var percent = parseInt(current_progress * 100 / time_limit);
        var time_number = current_progress * 0.001;
        if (parseInt(time_number) < 3) {
            time_number = parseFloat(time_number).toFixed(1);
        }
        else {
            time_number = parseInt(time_number);
        }
        
        question_time_limit_text(percent, time_number);

        if (current_progress <= 0) {
            clear_question_time_limit();
            callback();
        }
    }, 100);
}

function clear_question_time_limit() {
    if (undefined == _question_timer) {
        return;
    }
    clearInterval(_question_timer);
    _question_timer = undefined;
}