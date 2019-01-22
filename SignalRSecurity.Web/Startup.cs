using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SignalRSecurity.Web.Startup))]
namespace SignalRSecurity.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR(new Microsoft.AspNet.SignalR.HubConfiguration
            {
                EnableDetailedErrors = false
            });
        }
    }
}
