/// <reference path="../jquery.signalr-2.4.0.min.js" />
$(document).ready(function () {
    let demoHub = $.connection.demoHub;
    $.connection.hub.connectionSlow(function () {
        console.log("#Slow connection detected");
    });
    $.connection.hub.stateChanged(function (state) {
        //console.log(state);
        switch (state.newState) {
            case 0: {
                console.log("#State: 0 - Connecting");
                break;
            }
            case 1: {
                console.log("#State: 1 - Connected");
                break;
            }
            case 2: {
                console.log("#State: 2 - Reconnecting");
                break;
            }
            case 3: {
                console.log("#State: 3 - Reconnected");
                break;
            }
            case 4: {
                console.log("#State: 4 - Disconnected");
                break;
            }
        }
    });
    $.connection.hub.error(function (error) {
        console.log("#SignalR error: " + error);
    });
    demoHub.client.handlerMyMethod = function (message) {
        $("#ResponseMyMethod").text(message);
    };
    demoHub.client.handlerMyMethodWithParameters = function (message) {
        $("#ResponseMyMethodWithParameters").text(message);
    };
    demoHub.client.handlerMyMethodParameterComplex = function (message) {
        $("#ResponseMyMethodParameterComplex").text(message);
    };
    demoHub.client.handlerCallMeOnly = function (message) {
        $("#ResponseCallMeOnly").text(message);
    }
    demoHub.client.handlerCallOthers = function (message) {
        $("#ResponseCallOthers").text(message);
    }
    demoHub.client.ReceiveMessage = function (message) {
        $("#ResponsJsonMessage").text(message);
    }
    $("#ButtonMyMethod").click(function () {
        demoHub.server.myMethod();
    });
    $("#ButtonMyMethodWithParameters").click(function () {
        var message = "Random number: " + (Math.random() * 1000).toFixed().toString();
        demoHub.server.myMethodWithParameters(message);
    });
    $("#ButtonMyMethodParameterComplex").click(function () {
        var name = "Mirza Ghulam Rasyid";
        var message = "Random number: " + (Math.random() * 1000).toFixed().toString();

        demoHub.server.myMethodParameterComplex({
            name: name,
            message: message
        });

    });
    $("#ButtonMethodParamWithReturn").click(function () {
        var req = demoHub.server.methodParamWithReturn("This is my param @" + new Date().toLocaleTimeString());
        req.done(function (response) {
            $("#ResponseMethodParamWithReturn").text(response);
        });
    });
    $("#ButtonMyMethodParamComplexWithReturn").click(function () {
        var name = "Mirza Ghulam Rasyid";
        var message = "Random number: " + (Math.random() * 1000).toFixed().toString();

        var req = demoHub.server.methodParamComplexWithReturn({
            name: name,
            message: message
        });
        req.done(function (response) {
            $("#ResponseMethodParamComplexWithReturn").text(response);
        });
    });
    $("#ButtonTestException").click(function () {
        demoHub.server.testException().done(function () {
            $("#ResponseTestException").text("TestException invoked successfully");
        }).fail(function (err) {
            $("#ResponseTestException").text("TestException failed to invoke!");
            console.log(err);
        })
    });
    $("#ButtonCallMeOnly").click(function () {

        demoHub.server.callMeOnly().done(function () {
            console.log("Method callMeOnly() was invoked successfully!");
        }).fail(function () {
            console.log("Method callMeOnly() failed to invoke!");
        });
    });
    $("#ButtonCallOthers").click(function () {

        demoHub.server.callOthers().done(function () {
            console.log("Method callOthers() was invoked successfully!");
        }).fail(function () {
            console.log("Method callOthers() failed to invoke!");
        });
    });

    $("#FormJson").submit(function (ev) {
        ev.preventDefault();
        var message = $("#TextMessage").val();
        var url = "/Home/CallDemoHubJson";
        $.ajax({
            url: url,
            method: 'POST',
            data: {
                message: message
            },
            success: function (e) {
                if (e.success) {
                    console.log("Method was invoked successfully");
                } else {
                    console.log("An error occured. Message: " + e.message);
                }
            },
            error: function (e) {
                console.log("An error occured while posting data");
            }
        })
    })

    $.connection.hub.start().done(function () {
        console.log("#SignalR: Successfully connected to the server!");
    }).fail(function () {
        console.log("#SignalR: Failed to connect to the server!");
    });
});