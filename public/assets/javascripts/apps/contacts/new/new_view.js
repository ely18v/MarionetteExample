ContactManagerApp.module("ContactsApp.New", function(New, ContactManagerApp, Backbone, Marionette, $, _){
	New.Contact = ContactManagerApp.ContactsApp.Common.Views.Form.extend({

		title: "New Contact",

		onRender: function(){
			this.$(".saveContact").text("Create contact");
		}
	});
});