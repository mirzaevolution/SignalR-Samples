using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(SignalRFlash.Web.Startup))]

namespace SignalRFlash.Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HubConfiguration hubConfig = new HubConfiguration();
            hubConfig.EnableDetailedErrors = true;
            app.MapSignalR();
        }
    }
}
