ContactManagerApp.module("ContactsApp", function(ContactsApp, ContactManagerApp,
 Backbone, Marionette, $, _){
   ContactsApp.Router = Marionette.AppRouter.extend({
     appRoutes: {
       "contacts": "listContacts",
       "contacts/:id": "showContact", 
       "contacts/:id/edit": "editContact",
       "contacts/new": "addContact"
     }
   });
       
var API = {

  	listContacts: function(){
    		ContactsApp.List.Controller.listContacts()
  	},

  	showContact: function(){
  		ContactsApp.Show.Controller.showContact(id);
  	},
   
    editContact: function(id){
         	ContactsApp.Edit.Controller.editContact(id);
    },

    addContact: function(){
          ContactsApp.New.Controller.addContact(); 
    }
};

   ContactManagerApp.on("contacts:list", function(){
   	ContactManagerApp.navigate("contacts");
   	API.listContacts();
   });

   ContactManagerApp.on("contacts:show", function(id){
   	ContactManagerApp.navigate("contacts/" + id);
   	API.showContact(id);
   });
 
   ContactManagerApp.on("contact:edit", function(id){
     ContactManager.navigate("contacts/" + id + "/edit");
     API.editContact(id);
   });

  ContactManagerApp.on("contact:new", function(){
     ContactManager.navigate("contacts/new");
     API.addContact();
   });
 
   ContactManagerApp.addInitializer(function(){
     new ContactsApp.Router({
       controller: API
     });
   });
 });


