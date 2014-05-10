$(document).ready(function(){//initialize tabletop on load
	initTabletop(); 
});

function initTabletop() {//...create instance of tabletop to slurp data from order form spreadsheet
    tabletop = Tabletop.init({
    	key: '0AkfgEUsp5QrAdFJyOW9RMjk5M2FNMXI4bmJBMzMwWFE', 
    	callback: buildMap, 
    	simpleSheet: false 
    });
};

function buildMap(tt) {
	map = initMap();
  whatistabletop = tt;
  accounts = getActiveAccounts(tt.info.elements);
  mapAccounts(map, accounts);
};

function initMap() {
	var map = L.map('map-canvas', {
		center: [40.674799, -73.954362],
		zoom: 13
	});
	L.tileLayer('http://{s}.tile.cloudmade.com/a709cb849b29495cb18f11b31675dfd1/997/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
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
  });
};

function Pin(map, rec) {	  
  
  //attrs
  this.map = map;
  this.lat = rec.lat;
  this.lng = rec.lng;

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
      .bindPopup(name)
      .openPopup();
  };

  function getZone(map, lat, lng){
    return L.circle([lat, lng], 1609.34, {
      color: '#B00000 ',
      weight: 3,
      opacity: .3,
      fillColor: '#B00000 ',
      fillOpacity: 0.2
    }).addTo(map);
  };

};

function addToPinsArray(pin){
  pins = pins || [];
  pins.push(pin);
};

