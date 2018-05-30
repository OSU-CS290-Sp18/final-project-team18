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
  createPicButton.addEventListener('click', function(event) {
    document.querySelector('.backdrop').classList.remove('hidden');
    document.querySelector('#create-pic-modal').classList.remove('hidden');
  });

  var exitModalButton = document.querySelector('.modal-close-button');
  exitModalButton.addEventListener('click', function(event) {
    document.querySelector('.backdrop').classList.add('hidden');
    document.querySelector('#create-pic-modal').classList.add('hidden');
  });
});
