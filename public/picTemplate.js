(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['pic'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "      <article class=\"pic\">\r\n        <img src=\""
    + alias4(((helper = (helper = helpers.linkInput || (depth0 != null ? depth0.linkInput : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"linkInput","hash":{},"data":data}) : helper)))
    + "\" class=\"pic-thumbnail\" />\r\n        <div class=\"openedPic hidden\">\r\n          <h3>class=\"picTitle\" "
    + alias4(((helper = (helper = helpers.titleInput || (depth0 != null ? depth0.titleInput : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleInput","hash":{},"data":data}) : helper)))
    + " </h3>\r\n          <button type=\"button\" class=\"pic-close-button\">&times;</button>\r\n          <button type=\"button\" class=\"add-tag-button\"><p>Add Tag</p></button>\r\n	  <img src=\""
    + alias4(((helper = (helper = helpers.linkInput || (depth0 != null ? depth0.linkInput : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"linkInput","hash":{},"data":data}) : helper)))
    + "\" class=\"pic-image\" />\r\n          <a href=\"\"></a>\r\n          <li class=\"tags\"></li>\r\n        </div>\r\n      </article>\r\n";
},"useData":true});
})();