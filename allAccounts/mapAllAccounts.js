$(document).ready(function(){//initialize tabletop on load
  initTabletop(); 
});

var pins = [];
var tileLayer = {};

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
    center: [40.740247, -73.985768],
    zoom: 12
  });
  tileLayer = L.tileLayer('http://{s}.tiles.mapbox.com/v3/bkshift.i4iloni0/{z}/{x}/{y}.png', {
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
  });
};

function Pin(map, rec) {    
  //attrs
  this.map = map;
  this.lat = rec.lat;
  this.lng = rec.lng;

  this.data = getPinData(rec);
  this.text = getPinText(this.data);
  this.marker = getMarker(this.lat, this.lng, this.data, this.text);
  
  pins.push(this);

  //private methods
  function getPinData(rec){
    return [
      {Name: rec.name},
      {Address: rec.address},
      {'Point of Contact: ': rec.pointofcontact},
      {'Restaurant Phone': rec.restaurantphone},
      {'Personal Phone': rec.personalphone} 
    ]
  };

  function getPinText(data){
    var str = '';
    _.each(data, function (datum){
      var k = _.keys(datum)[0],
        v = _.values(datum)[0] || 'none';
      str += '<strong>' + k + ':</strong> ' + v + '</br>'; 
    });
    return str;
  };

  function getMarker (lat, lng, data, text){
    return L.marker([lat, lng], {
      title: _.values(data[0])[0],
      clickable: true
    }).addTo(self.map)
      .bindPopup(text);
  };

};