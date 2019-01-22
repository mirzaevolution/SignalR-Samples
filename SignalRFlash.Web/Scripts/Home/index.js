/// <reference path="../jquery.signalr-2.4.0.min.js" />




$(document).ready(function () {
    let chatHub = $.connection.chatHub;
    chatHub.client.writeMessage = function (fromUser, message) {
        var template = "<div class='panel panel-default'>" +
            "   <div class='panel-heading'><h3 class='panel-title'>" + fromUser + " says:</h3></div>" +
            "   <div class='panel-body'>" + message + "</div>" +
            "</div>";
        $("#messageList").prepend(template);
    };
    $("#sendMessage").click(function () {
        let fromUser = $("#name").val();
        let message = $("#message").val();
        if (fromUser.trim() === '') {
            alert("Name cannot be empty");
        } else {
            chatHub.server.broadcastMessage(fromUser, message);
        }
    });
    $.connection.hub.logging = true; //for logging purpose

    //optional options. By default signalR will choose the best transport
    var options = {
        transport: ['webSockets', 'longPolling']
    };

    $.connection.hub.start(options);
})