ContactManagerApp.module("ContactsApp.Show", function(Show, ContactManagerApp, Backbone, Marionette, $, _){
	Show.Controller = {
		showContact: function(id){
			var fetchingContact = ContactManagerApp.request("contact:entity", id);
			$.when(fetchingContact).done(function(contact){
				var contactView;
				if(contact !== undefined){
					contactView = new Show.Contact({
						model: contact
					});

					contactView.on("contact:edit", function(contact){
						ContactManagerApp.trigger("contact:edit", contact.get("id"));
					});
				}
				else {
					contactView = new Show.MissingContact();
				}

				ContactManagerApp.mainRegion.show(contactView);
			});
		}

	}
});	
	

