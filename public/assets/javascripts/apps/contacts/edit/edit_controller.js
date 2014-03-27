ContactManagerApp.module("ContactsApp.Edit", function(Edit, ContactManagerApp, Backbone, Marionette, $, _){
	Edit.Controller = {
		editContact: function(id){
			var fetchingContact = ContactManagerApp.request("contact:entity", id);
			$.when(fetchingContact).done(function(contact)
			{
				var view;
				if(contact !== undefined){
					view = new Edit.Contact({
						model: contact,
						generateTitle: true
					});

					view.on("form:submit", function(data){
						if (contact.save(data)){
							ContactManagerApp.trigger("contact:show", contact.get("id"));
						}
						else {
							view.triggerMethod("form:data:invalid", contact.validationError);
						}
					});
				}
				else {
					view = new ContactManagerApp.ContactsApp.Show.MissingContact();
				}

				ContactManagerApp.mainRegion.show(view);
			});
		}
	};
});