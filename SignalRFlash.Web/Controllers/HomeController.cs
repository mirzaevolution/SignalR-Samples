using Microsoft.AspNet.SignalR;
using SignalRFlash.Web.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SignalRFlash.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult HubDemo()
        {
            return View();
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        [HttpPost]
        public JsonResult CallDemoHubJson(string message)
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<DemoHub>();
            try
            {
                context.Clients.All.ReceiveMessage(message);
                return Json(new { success = true, error=string.Empty });

            }
            catch (Exception ex)
            {
                return Json(new { success = true, error=ex.Message });
            }
        }
    }
}