function update_quest_ui_text(active_quiz_index, quiz_data) {
    set_question_text(quiz_data.question);
    set_quiz_count_index_text(parseInt(active_quiz_index) + 1);
    set_sub_question_text(1, quiz_data.sub_question_1);
    set_sub_question_text(2, quiz_data.sub_question_2);
    set_question_select_text(1, quiz_data.case_1);
    set_question_select_text(2, quiz_data.case_2);
    set_question_select_text(3, quiz_data.case_3);
    set_question_select_text(4, quiz_data.case_4);
    set_question_select_text(5, quiz_data.case_5);
    set_question_select_text(6, quiz_data.case_6);
    set_right_answer_score_text(quiz_data.right_answer_score);
    set_wrong_answer_score_text(quiz_data.wrong_answer_score);
    set_goal_score_text(get_goal_score());
}

function set_quiz_count_index_text(text) {
    $("#quiz_count_index").text(text);
}

function set_right_answer_score_text(text) {
    $("#right_answer_score").text(text);
}

function set_wrong_answer_score_text(text) {
    $("#wrong_answer_score").text(text);
}

function set_goal_score_text(text) {
    $("#goal_score").text(text);
}

function set_question_text(text) {
    var quest_element = document.getElementById("question");
    quest_element.innerHTML = text;
}
function set_sub_question_text(index, text) {
    var quest_element = document.getElementById("sub_question_" + index);
    if (undefined == text || text.length == 0) {
        quest_element.style.display = "none";
    }
    else {
        quest_element.style.display = "block";
        quest_element.innerHTML = text;
    }
}

function question_time_limit_text(percent, text) {
    $("#progress-bar-timer")
        .css("width", percent + "%")
        .attr("aria-valuenow", percent);
    $("#progress-bar-timer-text").text(text);
}

function set_question_select_text(index, text) {
    if (undefined == text || text.length == 0) {
        $("#radio-choice-label-" + index).hide();
        $("#radio-choice-" + index).hide();
        $("#radio-choice-text-" + index).hide();
        $("#checkbox-choice-label-" + index).hide();
        $("#checkbox-choice-" + index).hide();
        $("#checkbox-choice-text-" + index).hide();
    }
    else {
        $("#radio-choice-label-" + index).show();
        $("#radio-choice-" + index).show();
        $("#radio-choice-text-" + index).show();
        $("#checkbox-choice-label-" + index).show();
        $("#checkbox-choice-" + index).show();
        $("#checkbox-choice-text-" + index).show();
        $("#radio-choice-text-" + index).text(text);
        $("#checkbox-choice-text-" + index).text(text);
    }
}

function showResultDialog(current_score, goal_score, reward_category, reward_exp) {
    $("#result-form-total-score").text(current_score);
    $("#result-form-goal-score").text(goal_score);


    var reward_text;
    reward_text = reward_category + "  " + reward_exp;

    $("#result-form-reward").html(reward_text);
    
    showForm("result-form");
    hideForm("question-form");
}

function showMessageBox(text) {
    $( "#message_box" ).popup( "open", {y:100});
    $( "#message_box_text" ).html(text); 
}

function showForm(elementId) {
    var form_element = document.getElementById(elementId);
    if (undefined == form_element) {
        return;
    }
    form_element.style.display = "block";
}

function hideForm(elementId) {
    var form_element = document.getElementById(elementId);
    if (undefined == form_element) {
        return;
    }
    form_element.style.display = "none";
}

function showQuizFormType(form_type) {
    var radio_form_element = "quiz_type_radio_form";
    var checkbox_form_element = "quiz_type_checkbox_form";
    var text_form_element = "quiz_type_text_form";

    if (form_type == 'radio') {
        showForm(radio_form_element);
        hideForm(checkbox_form_element);
        hideForm(text_form_element);
    }
    else if (form_type == 'checkbox') {
        hideForm(radio_form_element);
        showForm(checkbox_form_element);
        hideForm(text_form_element);
    }
    else if (form_type == 'text') {
        hideForm(radio_form_element);
        hideForm(checkbox_form_element);
        showForm(text_form_element);
    }
}

function update_result_dialog() {
    // var resultText = '';

    // for (var i in _quizData) {
    //     resultText += i + ' : ';
    //     if (_quizData[i].right_answer == _quizData[i].user_answer) {
    //         resultText += 'O';
    //     }
    //     else {
    //         resultText += 'X';
    //     }
    //     resultText += '<br/>';
    // }
    showResultDialog(get_score(), get_goal_score(), get_reward_category(), get_reward_exp());
}

function question_fade_in() {
    //$("#question-form").fadeIn();
    //$("#question-form").fadeIn("slow");
    //$("#question-form").fadeIn(100);
}

function question_fade_out() {
    //$("#question-form").fadeOut();
    //$("#question-form").fadeOut("slow");
    //$("#question-form").fadeOut(1000);
}