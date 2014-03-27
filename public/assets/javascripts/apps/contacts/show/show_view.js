ContactManagerApp.module("ContactsApp.Show", function(Show, ContactManagerApp, Backbone, Marionette, $, _){
	Show.MissingContact = Marionette.ItemView.extend({
		template: "#missing-contact-view"
	})

	Show.Contact = Marionette.ItemView.extend({
		template: "#showContactView",
		events: {
			"click a.js-edit": "editContact"
		},

		editContact: function(e){
			e.preventDefault();
			this.trigger("contact:edit", this.model);
		}
	});
});