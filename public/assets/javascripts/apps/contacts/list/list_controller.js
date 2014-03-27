ContactManagerApp.module("ContactsApp.List", function(List, ContactManagerApp, Backbone, Marionette, $, _){
	List.Controller = {
	listContacts: function(){
		var fetchingContacts = ContactManagerApp.request("contact:entities");

		var contactsListLayout = new List.Layout();
		var contactsListPanel = new List.Panel();

		$.when(fetchingContacts).done(function(contacts){
			var filteredContacts = ContactManagerApp.Entities.FilteredCollection({
				collection: contacts,

				filterFunction: function(filterCriterion){
					var criterion = filterCriterion.toLowerCase();
					return function(contact){
						if (contact.get("name").toLowerCase().indexOf(criterion) !== -1
							||
							contact.get("email").toLowerCase().indexOf(criterion) !== -1
							||
							contact.get("phone").indexOf(criterion) !== -1
							){
							return contact;
						}
					}
				}
			});

			var contactsListView = new List.Contacts({
				collection: filteredContacts
			});

			contactsListPanel.on("contacts:filter", function(criterion){
				filteredContacts.filter(criterion);
			});

			contactsListLayout.on("show", function(){
				contactsListLayout.panelRegion.show(contactsListPanel);
				contactsListLayout.contactsRegion.show(contactsListView);
			});

			contactsListPanel.on("contact:new", function(){
				var newContact = new ContactManagerApp.Entities.Contact();
				var view = new ContactManagerApp.ContactsApp.New.Contact({
					model: newContact
				});

				view.on("form:submit", function(data){
					if(contacts.length > 0){
              			var highestId = contacts.max(function(c){ return c.id; }).get("id");
              			data.id = highestId + 1;
            		}
            		else{
              			data.id = 1;
            		}
					if(newContact.save(data)){
						contacts.add(newContact);
						view.trigger("dialog:close");

						var newContactView = contactsListView.children.findByModel(newContact);
						if (newContactView){
							newContactView.flash("success");
						}
					}
					else {
						view.triggerMethod("form:data:invalid", newContact.validationError);
					}
				});
				ContactManagerApp.dialogRegion.show(view);
			});

			contactsListView.on("itemview:contact:show", function(childView, model){
				ContactManagerApp.trigger("contact:show", model.get("id"));
			});

			contactsListView.on("itemview:contact:delete", function(childView, model){
				//contacts.remove(model);
				model.destroy();
			});

			contactsListView.on("itemview:contact:edit", function(childView, model){
				var view = new ContactManagerApp.ContactsApp.Edit.Contact({
					model: model
				});

				view.on("form:submit", function(data){
					if (model.save(data)){
						childView.render();
						view.trigger("dialog:close");
						childView.flash("success");
					}
					else {
						view.triggerMethod("form:data:invalid", model.validationError);
					}
				});

				ContactManagerApp.dialogRegion.show(view);
			});

		ContactManagerApp.mainRegion.show(contactsListLayout);
		});    
	}
   }
});

