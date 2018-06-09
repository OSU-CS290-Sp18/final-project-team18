(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['pic'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"pic\">\n  <img src=\""
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "\" class=\"pic-thumbnail\" />\n  <div class=\"openedPic hidden\">\n    <h3>class=\"picTitle\" "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + " </h3>\n    <button type=\"button\" class=\"pic-close-button\">&times;</button>\n    <button type=\"button\" class=\"add-tag-button\"><p>Add Tag</p></button>\n	  <img src=\""
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "\" class=\"pic-image\" />\n    <a href=\"\"></a>\n    <ul class=\"tags\">"
    + alias4(((helper = (helper = helpers.tags || (depth0 != null ? depth0.tags : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tags","hash":{},"data":data}) : helper)))
    + "</ul>\n  </div>\n</article>\n";
},"useData":true});
})();