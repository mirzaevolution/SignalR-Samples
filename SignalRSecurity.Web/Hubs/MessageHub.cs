using Microsoft.AspNet.SignalR;
using SignalRSecurity.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRSecurity.Web.Hubs
{
    public class MessageHub:Hub
    {
        private static List<ChatModel> _list = new List<ChatModel>();
        public List<ChatModel> GetList()
        {
            return _list;
        }
        [Authorize]
        public void AddNewItem(ChatModel model)
        {
          
            model.Name = Context.User?.Identity.Name;
            _list.Add(model);
            Clients.All.ReceiveMessage(model);
        }
    }
}