//********* hide / show header  **********//

let prevScrollpos = window.pageYOffset;

window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById('header1').style.top = '0';
  } else {
    document.getElementById('header1').style.top = '-125px';
  }
  prevScrollpos = currentScrollPos;
};

//***** flip cards on touch ******/
singleCardContainers = document.querySelectorAll('.single-card-container');
for (let i of singleCardContainers) {
  i.addEventListener('touchstart', () => {
    for (let j of singleCardContainers) {
      j.childNodes[1].style.transform = 'none';
    }
    i.childNodes[1].style.transform = 'rotateY(180deg)';
  });
}
// document.addEventListener('touchstart', () => {
//   for (let i of singleCardContainers) {
//     i.childNodes[1].style.transform = 'none';
//   }
// });

//***** trigger map modal open and close ******/

const modal = document.querySelector('.modal');
const triggerArray = document.querySelectorAll('.modal-trigger');
const closeButton = document.querySelector('.close-button');
const mapContainer = document.querySelector('.modal-map-container');
const currentMap = document.getElementById('map');

function toggleModal() {
  modal.classList.toggle('show-modal');
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

//******** load mapquest maps *********/

function fetchMap(address) {
  L.mapquest.key = 'ck2OXUAJsF0iz999XGQ62jyXo8AXOVp7';

  L.mapquest.geocoding().geocode(address, createMap);

  function createMap(error, response) {
    var location = response.results[0].locations[0];
    var latLng = location.displayLatLng;
    var map = L.mapquest.map('map', {
      center: latLng,
      layers: L.mapquest.tileLayer('map'),
      zoom: 12,
    });

    var customPopup = L.popup({ closeButton: false })
      .setLatLng(latLng)
      .setContent('Event is located here.')
      .openOn(map);
  }
}

function destroyMap() {
  map.remove();
  let newMapDiv = document.createElement('div');
  newMapDiv.setAttribute('id', 'map');
  mapContainer.appendChild(newMapDiv);
}

triggerArray.forEach((trigger) =>
  trigger.addEventListener('click', function () {
    let address = trigger.childNodes[1].innerHTML;
    destroyMap();
    fetchMap(address);
    toggleModal();
  })
);

closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);
