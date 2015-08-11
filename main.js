var map = L.map('map', {
      //zoomControl: false
      minZoom: 0, maxZoom: 18
    }),
    color = 'rgba(74,187,131, 1)',
    tileUrl = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
  	attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains = 'abcd',

    defaultStyle = {
      point: {
        color: color,
        fillColor: color,
        radius: 9,
        opacity: 0.95
      },
      line: {
        color: color,
        weight: 3,
        opacity: 0.95,
        fillOpacity: 0.05
      }
    },

    fadedStyle = {
      point: {
        color: color,
        fillColor: color,
        radius: 7,
        opacity: 0.25
      },
      line: {
        color: color,
        weight: 2,
        opacity: 0.25,
        fillOpacity: 0
      }
    },

    tileLayer = L.tileLayer(tileUrl, {
      subdomains: subdomains,
      attribution: attribution,
      opacity: 1
    }).addTo(map),
    geometryTypeOrder = [
      "Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon", "GeometryCollection"
    ];

map.zoomControl.setPosition('topright');
map.setView([52.2808, 5.4918], 2);




function parseHash(hash) {
    var p = new Promise(function(resolve,reject){
        params = {};
        path = [];
        decodeURIComponent(hash).split('/').forEach(function(part){
            if (part.indexOf('?') == -1) {
                console.log(part);
                path.push(part);
            }
            else {
                part.split('?').forEach(function(part){
                  part.split("&").forEach(function(param) {
                    if (param.indexOf("=") > -1) {
                      var kv = param.split("=");
                      params[kv[0]] = kv.slice(1).join("=");
                    } else {
                        path.push(part);   
                    }
                  });
                })
            }

        })
        resolve({path:path,params:params});
    })
    return p;
}

//not needed for now
function setHash(hash) {
  disableHashChange = true;
  location.hash = hash;
  setTimeout(function(){
    disableHashChange = false;
  }, 1000);
}


//this is kind of a runner to do everything
go = function(hash){
    parseHash(hash) 
    .then(function(parsed){
        console.log(parsed);
        //create API request here
        
    })
    
    
}


window.onhashchange = function() {
//  if (!disableHashChange) {
    go(location.hash.substring(1));
    
//  }
};

if (location.hash) {
  go(location.hash.substring(1));
}

