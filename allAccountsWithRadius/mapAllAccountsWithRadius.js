$(document).ready(function(){//initialize tabletop on load
	initTabletop(); 
});

var pins = [];

function initTabletop() {//...create instance of tabletop to slurp data from order form spreadsheet
    var tabletop = Tabletop.init({
    	key: '0AkfgEUsp5QrAdFJyOW9RMjk5M2FNMXI4bmJBMzMwWFE', 
    	callback: buildMap, 
    	simpleSheet: false 
    });
};

function buildMap(tt) {
	var map = initMap(),
    accounts = getActiveAccounts(tt.info.elements);
  mapAccounts(map, accounts);
};

function initMap() {
	var map = L.map('map-canvas', {
		center: [40.740247, -73.985768],
		zoom: 12
	});
  tileLayer = L.tileLayer('http://{s}.tiles.mapbox.com/v3/bkshift.i4ik23ha/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
  }).addTo(map);
  return map;
};

function getActiveAccounts(accs){
  return _.where(accs, {active: 'TRUE'});
};

function mapAccounts(map, accounts){
  _.each(accounts, function(acc){
    var pin = new Pin(map, acc);
    pins.push(pin);
  });
};

function Pin(map, rec) {	  
  
  var self = this;

  //attrs
  this.map = map;
  this.lat = rec.lat;
  this.lng = rec.lng;
  this.name = rec.name;

  this.marker = getMarker(this.lat, this.lng, rec.name);
  this.zone = getZone(this.map, this.lat, this.lng);
  
  // addToPinsArray(this); //for testing

  //private methods
  function getPinData(rec){
    return [
      {Name: rec.name}
    ]
  };

  function getMarker (lat, lng, name){
    return L.marker([lat, lng], {
      title: name,
      clickable: true
    }).addTo(self.map)
      .bindPopup(name);
      // .openPopup();
  };

  function getZone(map, lat, lng){
    return L.circle([lat, lng], 1609.34, {
      color: '#B00000 ',
      weight: 2,
      opacity: 1,
      fillColor: '#B00000 ',
      fillOpacity: .4
    }).addTo(map);
  };

};

function addToPinsArray(pin){
  pins = pins || [];
  pins.push(pin);
};

