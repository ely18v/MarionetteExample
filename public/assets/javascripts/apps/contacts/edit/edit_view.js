ContactManagerApp.module("ContactsApp.Edit", function(Edit, ContactManagerApp, Backbone, Marionette, $, _){
	Edit.Contact = ContactManagerApp.ContactsApp.Common.Views.Form.extend({

		initialize: function(){
			this.title = "Edit " + this.model.get("name");
		},

		onRender: function(){
			if(this.options.generateTitle){
				var $title = $("<h1>", { text: this.title });
				this.$el.prepend($title);
			}

			this.$(".saveContact").text("Update contact");
		}
	});
});