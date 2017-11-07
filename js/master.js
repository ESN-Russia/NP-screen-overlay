// SOCKETS

var socket = io();

var SetTimer = function () {
    var data = {
        t_hour: $("#t_hour").val(),
        t_min: $("#t_min").val(),
        event_name: $("#t_event").val()
    };
    socket.emit("set_timer", data);
};

var AddQuestion = function() {
    $("#q_list").append("<li contenteditable=true>Asker</li>");
};

var UpdateQuestionList = function() {
    var q_list = [];
    $("#q_list").children().toArray().forEach(function (e, i) {
        q_list = q_list.concat(e.innerHTML);
    })
    socket.emit("q_list update", q_list);
};

var UpdatePresenter = function() {
    socket.emit("set_presenter", {p_name: $("#p_name").val(), p_title: $("#p_title").val()});
}

$(document).ready(function() {
    $("input[name=mode]").on("change", function() {
        console.log("kek");
        socket.emit("update_mode", this.value);
    });
});
