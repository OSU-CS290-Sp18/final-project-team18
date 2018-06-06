

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
   
function handleAcceptClick(){
   var titleInput = document.querySelector('#pic-title-input').value.trim();
   var linkInput = document.querySelector('#pic-link-input').value.trim();

   if(!titleInput || !linkInput){
      alert("Please complete all areas.");
   }else{

      var picTemplate = Handlebars.template.pic;
      var picHTML = picTemplate({
	 linkInput: linkInput,
	 titleInput: titleInput
      });
      var picContainer = document.querySelctor('.picz-container');
      picContainer.insertAdjacentHTML('beforeend',picHTML);
      hideCreatePicModal();

   }




}






window.addEventListener('DOMContentLoaded', function() {

 
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

  });

  var createPicButton = document.getElementById('create-picz-button');
  createPicButton.addEventListener('click', showCreatePicModal);
  
  var exitModalButtons = document.getElementsByClassName('modal-close-button');
  for(var i = 0; i < exitModalButtons.length; i++){
	exitModalButtons[i].addEventListener('click', hideCreatePicModal);
     }
  var modalAcceptButton = document.querySelector('.modal-accept-button');
  modalAcceptButton.addEventListener('click', handleAcceptClick);



});
















