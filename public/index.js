//keeps track of all pics
var pics = [];

function parsePics(picElement){

   var pic = {};
   var URLInputElem = picElement.querySelector('.pic-image');
   pic.link = URLInputElem.textContent.trim();
   var titleInputElem = picElement.querySelector('.picTitle');
   console.log("==titleElem: ", titleInputElem);
   pic.title = titleInputElem.textContent.trim();
   return pic;

}

function findPic(title, link){
   
   for(var i = 0; i < picCollection.length; i++){
      if(picCollection[i].title === title && picCollection[i].link === link)
	 return picCollection[i];
   }

}

function showCreatePicModal(){
   var modal = document.querySelector('#create-pic-modal');
   var backdrop = document.querySelector('.backdrop');
   modal.classList.remove('hidden');
   backdrop.classList.remove('hidden');
}

function clearInput(){
   var titleInput = document.querySelector('#pic-title-input');
   var linkInput = document.querySelector('#pic-link-input');
   titleInput.value = '';
   linkInput.value = '';
}

function hideCreatePicModal(){
   var modal = document.querySelector('#create-pic-modal');
   var backdrop = document.querySelector('.backdrop');
   modal.classList.add('hidden');
   backdrop.classList.add('hidden');
   clearInput();
}

function hidePic(picElem){
   var picContainer = document.querySelector('pic-container');
   var backdrop = document.querySelector('.backdrop');
   
   picElem.classList.add('hidden');
   backdrop.classList.add('hidden');
}

function getSubID(){
   var path = window.location.pathname;
   var pathParts = path.split('/');
   if(pathParts[1] === "subs"){
      return pathParts[2];
   }else return null;
}

function onSubPage(){
   var path = window.location.pathname;
   var pathParts = path.split('/');
   if(pathParts[1] === "subs") return true;
   return false;
}

function insertPic(title, link){
   var picTemplate = Handlebars.templates.pic;
   var picHTML = picTemplate({
      linkInput: link,
       titleInput: title
   });
   var picContainer = document.querySelector('.picz-container');
   picContainer.insertAdjacentHTML('beforeend',picHTML);
}

function picMatchesSearch(pic, searchInput){

   if(!searchInput){
      return true;
   }

   searchInput = searchInput.trim().toLowerCase();
   return pic.title.toLowerCase().indexOf(searchInput) >= 0;

}

function clearSearch(){
   document.querySelector('#navbar-search-input').value = '';
   searchUpdate();
}

function searchUpdate(){

   var searchInput = document.getElementById('navbar-search-input').value;
   var picContainer = document.querySelector('.picz-container');

   if(picContainer){
      while(picContainer.lastChild){
	 picContainer.removeChild(picContainer.lastChild);
      }
   }

   pics.forEach(function(pic) {
      if(picMatchesSearch(pic, searchInput)){
	 insertPic(pic.title,pic.link);
      }
   });


}
   
function handleAcceptClick(){
   console.log("clicked");
   var titleInput = document.querySelector('#pic-title-input').value.trim();
   var linkInput = document.querySelector('#pic-link-input').value.trim();

   if(!titleInput || !linkInput){
      alert("Please complete all areas.");
   }else{

      var request = new XMLHttpRequest();
      var subID = getSubID();
      var url = "/subs/" + subID + "/addPic";
      request.open("POST",url);

      var requestBody = JSON.stringify({
	 link: linkInput,
	 title: titleInput
      });

      pics.push({
	 link: linkInput,
	 title: titleInput
      });
	console.log("==pics: ", pics);

      request.addEventListener('load',function(event){
	 if(event.target.status === 200){
	    var picTemplate = Handlebars.templates.pic;
	    var picHTML = picTemplate({
	       linkInput: linkInput,
	       titleInput: titleInput
	    });
	    var picContainer = document.querySelector('.picz-container');
	    picContainer.insertAdjacentHTML('beforeend',picHTML);
	 }else{
	    alert("Error storing photo: " + event.target.response);
	 }
      });
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(requestBody);
      hideCreatePicModal();
   }
}

function showCreateSubModal(){
   var modal = document.querySelector('#create-sub-modal');
   var backdrop = document.querySelector('.backdrop');
   modal.classList.remove('hidden');
   backdrop.classList.remove('hidden');
}

function clearSubInput(){
   var nameInput = document.querySelector('#sub-name-input');
   nameInput.value = '';
}

function hideCreateSubModal(){
   var modal = document.querySelector('#create-sub-modal');
   var backdrop = document.querySelector('.backdrop');
   modal.classList.add('hidden');
   backdrop.classList.add('hidden');
   clearSubInput();
}

function handleSubAccept() {
  var name = document.querySelector('#sub-name-input').value.trim();

  if (!name) alert("Please enter a name");
  else {
    var request = new XMLHttpRequest();
    var url = "/addSub";
    request.open("POST", url);

    var requestBody = JSON.stringify({
      subName: name
    });

    request.setRequestHeader('Content-Type', 'application/json');
    request.send(requestBody);
    hideCreateSubModal();
  }
}



window.addEventListener('DOMContentLoaded', function() {
 
  
  

  if(onSubPage()){

     var picCollection = document.getElementsByClassName('pic');
     for(var i = 0; i < picCollection.length; i++){
	pics.push(parsePics(picCollection[i]));
     }


    var piczContainer = document.querySelector('.picz-container');
    piczContainer.addEventListener('click', function(event) {
      if (event.target.classList.contains('pic-thumbnail')) {
        event.target.parentNode.querySelector('.openedPic').classList.remove('hidden');
        document.querySelector('.backdrop').classList.remove('hidden');
      }
      else if (event.target.classList.contains('pic-close-button')) {
        event.target.parentNode.classList.add('hidden');
        document.querySelector('.backdrop').classList.add('hidden');
      }
      else if (event.target.classList.contains('pic-delete-button')) {
        console.log("== attempting a delete (index.js)");
        var pic = event.target.parentNode.parentNode;
        console.log(pic);
        var index = Array.from(pic.parentNode.children).indexOf(pic);
        var request = new XMLHttpRequest();
        var subID = getSubID();
        var url = url = "/subs/" + subID + "/deletePic";
        request.open("DELETE", url);
      
        var requestBody = JSON.stringify({
          pos: index
        });
  
        console.log(requestBody);
  
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(requestBody);
	hidePic(pic);
	parsePics(pic);
	var i = pics.indexOf(pic);
	pics.splice(i,1);
	console.log("==pics: ", pics);
      }
    });
  
    var createPicButton = document.getElementById('create-picz-button');
    createPicButton.addEventListener('click', showCreatePicModal);
    
    var modalAcceptButton = document.querySelector('.modal-accept-button');
    modalAcceptButton.addEventListener('click', handleAcceptClick);
    
    var exitModalButtons = document.getElementsByClassName('modal-close-button');
    for(var i = 0; i < exitModalButtons.length; i++){
  	  exitModalButtons[i].addEventListener('click', hideCreatePicModal);
    }

    var searchButton = document.getElementById('navbar-search-button');
    searchButton.addEventListener('click',searchUpdate);
  }
  else {
    var exitModalButtons = document.getElementsByClassName('modal-close-button');
    for(var i = 0; i < exitModalButtons.length; i++){
  	  exitModalButtons[i].addEventListener('click', hideCreateSubModal);
    }

    var subAcceptButton = document.querySelector('.sub-accept-button');
    subAcceptButton.addEventListener('click', handleSubAccept);

    var createSubButton = document.getElementById('create-sub-button');
    createSubButton.addEventListener('click', showCreateSubModal);
  }

});
















