// const SOCKET_HOST = require("electron").remote.getGlobal("SOCKET_HOST");
const SOCKET_HOST = "ws://andresokol.herokuapp.com/wss"

let isTimerOn = true,
    serverState = {};

console.log(window.location);
console.log(SOCKET_HOST);

const tickTimer = function () {
    if (!isTimerOn) return;

    const currentSec = Math.floor(Date.now() / 1000);
    const timerSec = Number.parseInt(serverState.timerTs / 1000);

    const timeDeltaSec = timerSec - currentSec;
    // console.log("ye cur", currentSec);
    // console.log("ye time", timerSec);

    if (timeDeltaSec <= 0) {
        document.getElementById("t_timer").innerHTML = "right now";
        isTimerOn = false;
    } else {


        document.getElementById("t_timer").innerHTML =
            `in ${Math.floor(timeDeltaSec / 60)}:${timeDeltaSec % 60}`;
    }
};

setInterval(tickTimer, 500);

// SOCKETS

const updateTimer = () => {
    $("#t_event_name").text(serverState.timerTitle);
    isTimerOn = true;
};

const updatePresenter = () => {
    $("#p_name").text(serverState.presenterName);
    $("#p_title").text(serverState.presenterTitle);
};

const updateMode = () => {
    if (serverState.activeMode === "timer") {
        $("#top_cnt,#logo_cnt").addClass("_smalled");
        $("#timer_cnt,#top_cnt,#background_container,#logo_cnt,#bridge_cnt").removeClass(
            "_hidden"
        );
        $("#presenter_cnt").addClass("_hidden");
    } else if (serverState.activeMode === "presenter") {
        $("#presenter_cnt").removeClass("_hidden");
        $("#top_cnt,#logo_cnt").removeClass("_smalled");
        $("#timer_cnt,#background_container,#top_cnt,#logo_cnt,#bridge_cnt").addClass(
            "_hidden"
        );
    } else if (serverState.activeMode === "transparent") {
        $("#top_cnt,#logo_cnt").removeClass("_smalled");
        $(
            "#timer_cnt,#presenter_cnt,#top_cnt,#logo_cnt,#background_container,#bridge_cnt"
        ).addClass("_hidden");
    } else {
        $("#top_cnt,#logo_cnt").removeClass("_smalled");
        $("#top_cnt,#logo_cnt,#background_container,#bridge_cnt").removeClass("_hidden");
        $("#timer_cnt,#presenter_cnt").addClass("_hidden");
    }
};

const socket = new WebSocket(SOCKET_HOST);
socket.onmessage = (event) => {
    serverState = JSON.parse(event.data);
    console.log("New state:", serverState);

    updateMode();
    updatePresenter();
    updateTimer();
};
