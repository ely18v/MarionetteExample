ContactManagerApp.module("ContactsApp.List", function(List, ContactManagerApp, Backbone, Marionette, $, _){
	List.Layout = Marionette.Layout.extend({
		template: "#contact-list-layout",

		regions: {
			panelRegion: "#panel-region",
			contactsRegion: "#contacts-region"
		}
	});

	List.Panel = Marionette.ItemView.extend({
		template: "#contact-list-panel",

		triggers: {
			"click button.addContact" : "contact:new"
		},

		events: {
			"submit #filter-form": "filterContacts"
		},

		filterContacts: function(e){
			e.preventDefault();
			var criterion = this.$("#search").val();
			this.trigger("contacts:filter", criterion);
		}
	});


	List.Contact = Marionette.ItemView.extend({
		template: "#contact-template",
	  	tagName: 'li',
	  	className: 'contact',
	  
	  	initialize: function(){
	      	this.listenTo(this.model, "change", this.render);
	  	},


	  	flash: function(cssClass){
	  		var $view = this.$el;
	  		$view.hide().toggleClass(cssClass).fadeIn(800, function(){
	  			setTimeout(function(){
	  				$view.toggleClass(cssClass);
	  			}, 500);
	  		});
	  	},

	  	events: {
	      	"click a.delete": "deleteContact",
	      	"click a.edit": "editContact"
	  	},

	  	deleteContact: function(){
	      	//this.model.destroy();
	      	//this.remove();
	      	//this.model.collection.remove(this.model);
	      	this.trigger("contact:delete", this.model);
	  	},

	  	remove: function(){
	  		var self = this;
	  		this.$el.fadeOut(function(){
	  			Marionette.ItemView.prototype.remove.call(self);
	  		});
	  	},

	  	editContact: function(e){
	  		e.preventDefault();
	  		e.stopPropagation();
	 	  	this.trigger("contact:edit", this.model);
	 	}
	});

	List.Contacts = Marionette.CompositeView.extend({
	  tagName: "ul",
	  id: "contacts",
	  className: "contacts",
	  template: "#contacts-template",
	  itemView: List.Contact,

	  events: {
	        "click button.addContact": "addContact"
	  },

	  initialize: function(){
	    this.listenTo(this.collection, "reset", function(){
	    	this.appendHtml = function(collectionView, itemView, index){
	    		collectionView.$el.append(itemView.el);
	    	}
	    });
	  },

	  onCompositeCollectionRendered: function(){
	  	this.appendHtml = function(collectionView, itemView, index){
	  		collectionView.$el.prepend(itemView.el);
	  	}
	  }
	});

});