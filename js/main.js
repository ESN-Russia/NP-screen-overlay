const SOCKET_HOST = require("electron").remote.getGlobal("SOCKET_HOST");

let timer_time = moment(),
    is_timer_on = true;

console.log(window.location);
console.log(SOCKET_HOST);

const tick_timer = function() {
    if (!is_timer_on) return;

    const _secs_left = -moment().diff(timer_time, 'seconds');

    if (_secs_left <= 0) {
        document.getElementById("t_timer").innerHTML = "right now";
        is_timer_on = false;
    } else {
        document.getElementById("t_timer").innerHTML = moment().to(timer_time);
    }
};

setInterval(tick_timer, 500);

// SOCKETS

const socket = io(SOCKET_HOST);

socket.on("set_timer", function(msg) {
    console.log(msg);
    timer_time = moment(msg.t_hour + ":" + msg.t_min + ":" + msg.t_sec, "HH:mm:ss");
    $("#t_event_name").text(msg.event_name);
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
