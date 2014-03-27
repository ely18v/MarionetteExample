ContactManagerApp.module("Entities", function(Entities, ContactManagerApp, Backbone, Marionette, $, _) {
	Entities.Contact = Backbone.Model.extend({
		urlRoot: "contacts",
		defaults: {
		    name: "",
		    email: "",
		    phone: ""
		},

		validate: function(attrs, options){
			var errors = {}
			if (! attrs.name) {
				errors.name = "* can't be blank";
			}
			if (! attrs.email) {
				errors.email = "* can't be blank";
			}
			if (! attrs.phone) {
				errors.phone = "* can't be blank";
			}
			if (! _.isEmpty(errors)){
				return errors;
			}
		}
	});

	Entities.configureStorage(Entities.Contact);

	Entities.Contacts = Backbone.Collection.extend({
		url: "contacts",
	  	model: Entities.Contact
	});

	Entities.configureStorage(Entities.Contacts);

	var contacts;

	var initializeContacts = function(){
		contacts = new Entities.Contacts([
			{id: 1, name: 'John Doe', email: 'john@doe.com', phone: '555-12345'},
			{id: 2, name: 'Jane Doe', email: 'jane@doe.com', phone: '555-12345'},
			{id: 3, name: 'Jillian Doe', email: 'jillian@doe.com', phone: '555-12345'},
			{id: 4, name: 'Jim Doe', email: 'jillian@doe.com', phone: '555-12345'}
		]);
		contacts.forEach(function(contact){
			contact.save();
		});
		return contacts;
	};

	var API = {

		getContactEntity: function(contactId){
			var contact = new Entities.Contact({id: contactId});
			contact.fetch();
			return contact;
		},

		getContactEntities: function(){
			var contacts = new Entities.Contacts();
			contacts.fetch();
			if (contacts.length === 0){
				return initializeContacts();
			}
			return contacts;
		},

		setContactEntity: function(contactName, contactEmail, contactPhone){
			var contact = new Entities.Contact({name: contactName, email: contactEmail, phone: contactPhone});
			var contacts = new Entities.Contacts();
			contacts.fetch();
			contacts.push(newContact);
			fetchingContacts.trigger("reset");
		},
	};

    ContactManagerApp.reqres.setHandler("contact:entity", function(id){
    	return API.getContactEntity(id);
    });

	ContactManagerApp.reqres.setHandler("contact:entities", function(){
		return API.getContactEntities();
	});
});