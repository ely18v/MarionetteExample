ContactManagerApp.module("ContactsApp.Common.Views", function(Views, ContactManagerApp, Backbone, Marionette, $, _){
	Views.Form = Marionette.ItemView.extend({
		template: "#editContactView",

		events: {
			"click button.saveContact" : "saveContact"
		},

		saveContact: function(e){
			e.preventDefault();
			var data = Backbone.Syphon.serialize(this);
			this.trigger("form:submit", data);
		},

		onFormDataInvalid: function(errors){
			var $view = this.$el;

			var clearFormErrors = function(){
				var $form = $view.find("form");
				$form.find(".help-inline.error").each(function(){
					$(this).remove();
				});
				$form.find(".control-group.error").each(function(){
					$(this).removeClass("error");
				});
			}

			var markErrors = function(value, key){
				var $controlGroup = $view.find("#contact-" + key).parent();
				var $errorEl = $("<span>", {class: "help-inline error", text: value});
				$controlGroup.append($errorEl).addClass("error");
			}

			clearFormErrors();
			_.each(errors, markErrors);
		}
	});
});