function create_quiz_data() {
    var quiz_random_Number = [];
    var randoms = randomNumbers(_quizFullData.Data.length),
        rand = randoms(),
        quiz_random_Number = [];

    while (rand != null) {
        quiz_random_Number.push(rand);
        rand = randoms();
    }

    var count = _quizFullData.Config["quiz_count"];
    if (count > _quizFullData.Data.length) {
        count = _quizFullData.Data.length;
    }

    for (var i = 0; i < count; i++) {
        var quizIndex = quiz_random_Number[i];
        _quizData.push(_quizFullData.Data[quizIndex]);
    }
    console.log(_quizData);
}

function get_result_delay_time() {
    return parseInt(_quizFullData.Config["result_delay_time"]);
}

function get_total_play_time() {
    var total_duration = 0;
    var result_delay_time = get_result_delay_time();
    _quizData.forEach(function(node){
        total_duration += parseInt(node.time_limit) + result_delay_time;
      });
    return total_duration;
}

function randomNumbers(max) {
    function range(upTo) {
        var result = [];
        for(var i = 0; i < upTo; i++) result.push(i);
        return result;
    }
    function shuffle(o){
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }
    var myArr = shuffle(range(max));
    return function() {
        return myArr.shift();
    };
}