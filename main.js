var _active_quiz_data = undefined;
var _active_quiz_index = 0;
var _quizData = [];
var _playTimeLimit;

/*
 문제 변경마다 슬라이드 기능 넣기
*/
window.onload = function () {
    hideForm("result-form");
    hideForm("question-form");
    create_quiz_data();
    quiz_start_countdown(start_quiz);
}

function start_quiz() {
    hideForm("result-form");
    showForm("question-form");

    _active_quiz_index = 0;
    var duration = get_total_play_time();
    quiz_Finish_Timer(duration, complete_quiz);

    update_scene();
}

function next_quiz() {
    _active_quiz_index++;
    update_scene();
}

function complete_quiz() {
    _active_quiz_index = _quizData.length;
    update_scene();
}

function update_scene() {
    var quiz_data = _quizData[_active_quiz_index];
    if (undefined == quiz_data) {
        update_result_dialog();
        return;
    }
    _active_quiz_data = quiz_data;
    showQuizFormType(_active_quiz_data.form_type);
    update_quest_ui_text(_active_quiz_index, _active_quiz_data);
    set_question_time_limit(_active_quiz_data.time_limit*1000, send_question_time_over);
    question_fade_in();
}
function send_question_time_over() {
    check_result_value(_active_quiz_data);
}

function send_result() {
    var form_type = _active_quiz_data.form_type;
    if (form_type == 'radio') {
        send_radio_result();
    }
    else if (form_type == 'checkbox') {
        send_checkbox_result();
    }
    else if (form_type == 'text') {
        send_text_result();
    }
}

function send_radio_result() {
    var checkResult = $('input[name=radio-choice]:checked').get(0);

    if(checkResult != undefined) {
        _active_quiz_data.user_answer = checkResult.value;
        check_result_value(_active_quiz_data);
    } 
    else { 
        showMessageBox("정답을 선택해 주세요"); 
    }
}

function send_checkbox_result() {
    var checkInput = document.getElementsByName('checkbox-choice');
    var checkRrsult = '';
    for (var i = 0; i < checkInput.length; i++) {
        if (checkInput[i].checked) {
            if (checkRrsult.length > 0) {
                checkRrsult += ',';
            }
            checkRrsult += checkInput[i].value;
        }
    }
    if(checkRrsult != undefined && checkRrsult.length > 0) {
        _active_quiz_data.user_answer = checkRrsult;
        check_result_value(_active_quiz_data);
    } 
    else { 
        showMessageBox("정답을 선택해 주세요"); 
    }
}

function send_text_result() {
    var text_element =document.getElementById('text-choice');
    if(text_element != undefined && text_element.value.length > 0) {
        _active_quiz_data.user_answer = text_element.value;
        check_result_value(_active_quiz_data);
    } 
    else { 
        showMessageBox("정답을 입력해 주세요"); 
    }
}

function check_result_value(quiz_data) {
    clear_question_time_limit();
    question_fade_out();

    right_value = quiz_data.right_answer;
    input_value = quiz_data.user_answer;

    var result_text;
    var slide_type;
    if (right_value == input_value) {
        result_text = "<font size=10>O</font>" + "<br/><font size=2>" + quiz_data.right_answer_score + "점</font>";
        slide_type = 'slideup';
        add_score(quiz_data.right_answer_score);
    }
    else {
        result_text = "<font size=10>X</font>" + "<br/><font size=2>" + quiz_data.wrong_answer_score + "점</font>";
        slide_type = 'slidedown';
        add_score(quiz_data.wrong_answer_score);
    }

    $( "#current_score" ).text(get_score());

    $( "#result-popup-text" ).html("<center>" + result_text + "</center>");
    $( "#result-popup" ).popup( "open", {transition: slide_type, y:100} );

    var close_fadeout_time = 1000;
    var next_quiz_delay_time = get_result_delay_time() * 1000;
    setTimeout( () => {$( "#result-popup" ).popup( "close" )}, next_quiz_delay_time);        
    setTimeout(next_quiz, next_quiz_delay_time + close_fadeout_time);
}

function iframe_finish() {
    window.parent.postMessage("onBack", "*");
}
