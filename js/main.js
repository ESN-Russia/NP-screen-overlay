const SOCKET_HOST = require("electron").remote.getGlobal("SOCKET_HOST");

let timer_time = new Date().getTime() / 1000 + 20,
    is_timer_on = true;

console.log(window.location);
console.log(SOCKET_HOST);

const tick_timer = function() {
    if (!is_timer_on) return;

    let _secs_left = Math.round(timer_time - new Date().getTime() / 1000);
    //console.log(_secs_left);
    if (String(_secs_left % 60).length == 1) {
        document.getElementById("t_sec").innerHTML =
            "0" + String(_secs_left % 60);
    } else {
        document.getElementById("t_sec").innerHTML = _secs_left % 60;
    }

    let _mins_left = Math.round(_secs_left / 60);
    //console.log(_mins_left);
    if (String(_mins_left % 60).length == 1) {
        document.getElementById("t_min").innerHTML =
            "0" + String(_mins_left % 60);
    } else {
        document.getElementById("t_min").innerHTML = _mins_left % 60;
    }

    if (_secs_left <= 0) is_timer_on = false;
};

setInterval(tick_timer, 1000);

// SOCKETS

const socket = io(SOCKET_HOST);

socket.on("set_timer", function(msg) {
    let _time = Math.round(new Date().getTime() / 1000);
    _time_day_start = _time - _time % (60 * 60 * 24) - 3 * 3600;
    timer_time =
        _time_day_start +
        parseInt(msg.t_hour) * 60 * 60 +
        parseInt(msg.t_min) * 60;
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
        $("#top_cnt,#logo_cnt").addClass("_smalled");
        $("#timer_cnt,#top_cnt,#background_container,#logo_cnt,#bridge_cnt").removeClass(
            "_hidden"
        );
        $("#presenter_cnt").addClass("_hidden");
    } else if (msg == "_mode_presenter") {
        $("#presenter_cnt").removeClass("_hidden");
        $("#top_cnt,#logo_cnt").removeClass("_smalled");
        $("#timer_cnt,#background_container,#top_cnt,#logo_cnt,#bridge_cnt").addClass(
            "_hidden"
        );
    } else if (msg == "_mode_hide_all") {
        $("#top_cnt,#logo_cnt").removeClass("_smalled");
        $(
            "#timer_cnt,#presenter_cnt,#top_cnt,#logo_cnt,#background_container,#bridge_cnt"
        ).addClass("_hidden");
    } else {
        $("#top_cnt,#logo_cnt").removeClass("_smalled");
        $("#top_cnt,#logo_cnt,#background_container,#bridge_cnt").removeClass("_hidden");
        $("#timer_cnt,#presenter_cnt").addClass("_hidden");
    }
});
