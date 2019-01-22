using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SignalRFlash.Web.Hubs
{
    public class MyParam
    {
        public string Name { get; set; }
        public string Message { get; set; }
    }
    public class DemoHub:Hub
    {

        public void MyMethod()
        {
            Clients.All.handlerMyMethod($"My Method was invoked @{DateTime.Now}. Client ID: {Context.ConnectionId}");
        }
        public void MyMethodWithParameters(string param)
        {
            Clients.All.handlerMyMethodWithParameters($"{nameof(MyMethodWithParameters)} was invoked @{DateTime.Now}\nwith param: {param}.\n Client ID: {Context.ConnectionId}");
        } 
        public void MyMethodParameterComplex(MyParam param)
        {
            
            Clients.All.handlerMyMethodParameterComplex($"{nameof(MyMethodParameterComplex)} was invoked @{DateTime.Now}.\nName: {param?.Name}\nMessage: {param?.Message}.\n Client ID: {Context.ConnectionId}");
        }

        public string MethodParamWithReturn(string param)
        {
            return param?.ToUpper() + $".\n Client ID: {Context.ConnectionId}";
        }
        public string MethodParamComplexWithReturn(MyParam param)
        {
            return $"`Name`:`{param.Name}`;\n`Message`:`{param.Message}`; \nClient ID: {Context.ConnectionId}";
        }
        public void TestException()
        {
            throw new Exception("Error!!");
        }
        public void CallMeOnly()
        {
            Clients.Caller.handlerCallMeOnly($"{nameof(CallMeOnly)} was invoked @{DateTime.Now}");
        }
        public void CallOthers()
        {
            Clients.Others.handlerCallOthers($"{nameof(CallOthers)} was invoked @{DateTime.Now} by Client: {Context.ConnectionId}");
        }
        public void TestState()
        {

        }


        public override Task OnConnected()
        {
            Trace.WriteLine($"New Connected Client: {Context.ConnectionId}");
            return base.OnConnected();
        }
        public override Task OnDisconnected(bool stopCalled)
        {
            Trace.WriteLine($"Disconnected Client: {Context.ConnectionId}");
            return base.OnDisconnected(stopCalled);
        }
        public override Task OnReconnected()
        {
            Trace.WriteLine($"Client: {Context.ConnectionId} is reconnected");
            return base.OnReconnected();
        }
    }
}