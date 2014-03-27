var ContactManagerApp = new Backbone.Marionette.Application();

ContactManagerApp.addRegions({
  mainRegion: "#content",
  dialogRegion: Marionette.Region.Dialog.extend({
    el: "#dialog-region"
  })
});

ContactManagerApp.navigate = function(route, options){
  options || (options = {});
  Backbone.history.navigate(route, options);
};

ContactManagerApp.getCurrentRoute = function(){
  return Backbone.history.fragment
};

ContactManagerApp.on("initialize:after", function(){
  if (Backbone.history){
    Backbone.history.start();

    if(this.getCurrentRoute() === ""){
      ContactManagerApp.trigger("contacts:list");
    }
  }
});
