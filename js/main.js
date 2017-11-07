var timer_time = (new Date).getTime() / 1000 + 20,
    is_timer_on = true;

console.log(window.location);

var tick_timer = function () {
    if (!is_timer_on) return;

    var _secs_left = Math.round(timer_time - ((new Date).getTime() / 1000));
    //console.log(_secs_left);
    if (String(_secs_left % 60).length == 1) {
        document.getElementById("t_sec").innerHTML = "0" + String(_secs_left % 60);
    } else {
        document.getElementById("t_sec").innerHTML = _secs_left % 60;
    }

    var _mins_left = Math.round(_secs_left / 60);
    //console.log(_mins_left);
    if (String(_mins_left % 60).length == 1) {
        document.getElementById("t_min").innerHTML = "0" + String(_mins_left % 60);
    } else {
        document.getElementById("t_min").innerHTML = _mins_left % 60;
    }

    if (_secs_left <= 0) is_timer_on = false;
};

setInterval(tick_timer, 1000);


// SOCKETS

var socket = io("http://localhost:5000/");

socket.on("set_timer", function(msg) {
    var _time = Math.round((new Date).getTime() / 1000);
    _time_day_start = _time - _time % (60 * 60 * 24) - 3 * 3600;
    timer_time = _time_day_start + parseInt(msg.t_hour) * 60 * 60 + parseInt(msg.t_min) * 60;
    $("#t_event_name").text(msg.event_name);
    tick_timer();
    is_timer_on = true;
});

socket.on("set_presenter", function(msg) {
    console.log(msg);
    $("#p_name").text(msg.p_name);
    $("#p_title").text(msg.p_title);
});

socket.on("update_mode", function(msg) {
    if (msg == "_mode_timer") {
        $(".logo_cnt").animate({
            "height": "37vh",
            "padding-top": "0"
        }, 500, function() {});
    }
    else if (msg == "_mode_presenter") {
        $(".logo_cnt").animate({
            "height": "27vh",
            "padding-top": "0"
        }, 500, function() {});

    }
    else {
        $(".logo_cnt").animate({
            "height": "40vh",
            "padding-top": "30vh"
        }, 500, function() {});
    }

    $("._mode").addClass("_hidden");
    $("." + msg).removeClass("_hidden");
});
