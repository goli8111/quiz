
var _score = 0;

function reset_score() {
    _score = 0;
}

function get_score() {
    return parseInt(_score);
}

function add_score(value) {
    _score += parseInt(value);
    if (_score < 0) {
        _score = 0;
    }
}

function get_goal_score() {
    return parseInt(_quizFullData.Config["goal_score"]);
}

function get_reward_category() {
    return _quizFullData.Config["reward_category"];
}

function get_reward_exp() {
    return parseInt(_quizFullData.Config["reward_exp"]);
}