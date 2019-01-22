/// <reference path="../jquery.signalr-2.4.0.min.js" />
$(document).ready(function () {
    let hub = $.connection.messageHub;
    $.connection.hub.error(function (err) {
        console.log("#SignalR Error: " + err);
    });
    hub.client.receiveMessage = function (data) {
        if (data) {
            var name = data.Name;
            var msg = data.Message;
            var panel = "<div class='panel panel-primary' style='padding:8px'>" +
                "<p>From: " + name + "</p>" +
                "<p>Message: " + msg + "</p></div>";
            $("#ChatBox").append(panel);
        }
    }
    $.connection.hub.start().done(function () {
        console.log("#Successfully created the connection");
        hub.server.getList().done(function (list) {
            $("#ChatBox").empty();
            $.each(list, (index, value) => {
                var name = value.Name;
                var msg = value.Message;
                var panel = "<div class='panel panel-primary' style='padding:8px'>" +
                    "<p>From: " + name + "</p>" +
                    "<p>Message: " + msg + "</p></div>";
                $("#ChatBox").append(panel);
            });
        }).fail(function () {
            console.log("#Error: an error occured while getting list from server");
        });
    }).fail(function () {
        console.log("#Failed to create the connection");
    });
   
    $("#FormMessage").submit(function (ev) {
        ev.preventDefault();
        var message = $("#TextMessage").val();
        hub.server.addNewItem({ message: message }).done(function () {
            $("#TextMessage").val("");
        }).fail(function (err) {
            console.log("#Error: " + err.message);
        });
    });
    
});