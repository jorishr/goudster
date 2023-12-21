//load the map with API Key
const maps_api_key = process.env.GOOGLE_MAPS_API_KEY;
const url = `https://maps.googleapis.com/maps/api/js?key=${maps_api_key}&language=nl&region=BE&callback=initMap`;

//initiate the custom map
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 50.948139, lng: 5.11457 },
    zoom: 10,
  });

  function addMarker(props) {
    let marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      icon: props.icon,
    });
    //console.log(props.icon)
    //console.log(marker)
    if (props.icon) {
      marker.setIcon(props.icon);
    }
    if (props.name) {
      var infoWindow = new google.maps.InfoWindow({
        content: `<h1>${props.name}</h1`,
      });
    }
    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });
  }

  const places = [
    {
      name: "Golf, Lummen",
      coords: new google.maps.LatLng(50.993705, 5.226711),
      icon: "/images/favicon.ico",
    },
    {
      name: "'t Vloot, Linkhout",
      coords: new google.maps.LatLng(50.963271, 5.146496),
      icon: "/images/favicon.ico",
    },
    {
      name: "Café De Markt, Halen",
      coords: new google.maps.LatLng(50.948305, 5.113703),
      icon: "/images/favicon.ico",
    },
    {
      name: "Vandepoel Drinkcenter, Halen",
      coords: new google.maps.LatLng(50.948095, 5.108037),
      icon: "/images/favicon.ico",
    },
    {
      name: "Thomas Drink, Zoutleeuw",
      coords: new google.maps.LatLng(50.830499, 5.113714),
      icon: "/images/favicon.ico",
    },
    {
      name: "Sportcafé De Koekoek, Halen",
      coords: new google.maps.LatLng(50.946865, 5.11589),
      icon: "/images/favicon.ico",
    },
    {
      name: "Buurthuis-De Toekomst, Zellik",
      coords: new google.maps.LatLng(50.953, 5.084273),
      icon: "/images/favicon.ico",
    },
    {
      name: "Brasserie 3punt, Halen",
      coords: new google.maps.LatLng(50.94941, 5.114359),
      icon: "/images/favicon.ico",
    },
    {
      name: "Den AperO, Diest",
      coords: new google.maps.LatLng(50.984152, 5.05078),
      icon: "/images/favicon.ico",
    },
    {
      name: "De Rotemse Molen, Halen",
      coords: new google.maps.LatLng(50.928832, 5.092178),
      icon: "/images/favicon.ico",
    },
    {
      name: "Huis van Hem, Halen",
      coords: new google.maps.LatLng(50.940806, 5.105423),
      icon: "/images/favicon.ico",
    },
    {
      name: "Immigrand, Diest",
      coords: new google.maps.LatLng(50.979488, 5.054977),
      icon: "/images/favicon.ico",
    },
    {
      name: "Proxy Delhaize, Halen",
      coords: new google.maps.LatLng(50.949516, 5.114395),
      icon: "/images/favicon.ico",
    },
    {
      name: "Spar, Halen",
      coords: new google.maps.LatLng(50.948102, 5.108236),
      icon: "/images/favicon.ico",
    },
    {
      name: "Drankenhandel Claes, Lummen",
      coords: new google.maps.LatLng(50.988164, 5.195896),
      icon: "/images/favicon.ico",
    },
    {
      name: "Café Groenhof, Schaffen",
      coords: new google.maps.LatLng(50.990513, 5.081114),
      icon: "/images/favicon.ico",
    },
    {
      name: "De Sigaret, Diest",
      coords: new google.maps.LatLng(50.983599, 5.054736),
      icon: "/images/favicon.ico",
    },
    {
      name: "De Groene Munt, Diest",
      coords: new google.maps.LatLng(50.984894, 5.053982),
      icon: "/images/favicon.ico",
    },
    {
      name: "Place Douze, Halen",
      coords: new google.maps.LatLng(50.947809, 5.114072),
      icon: "/images/favicon.ico",
    },
    {
      name: "Museum de Reinvoart, Halen",
      coords: new google.maps.LatLng(50.932681, 5.063551),
      icon: "/images/favicon.ico",
    },
    {
      name: "Stamineeke, Webbekom",
      coords: new google.maps.LatLng(50.972876, 5.071093),
      icon: "/images/favicon.ico",
    },
    {
      name: "Brasserie Huys Frederic, Herk-de-Stad",
      coords: new google.maps.LatLng(50.95721, 5.176336),
      icon: "/images/favicon.ico",
    },
    {
      name: "Omnidrinks Bungeneers, Nieuwerkerken",
      coords: new google.maps.LatLng(50.889616, 5.191029),
      icon: "/images/favicon.ico",
    },
    {
      name: "Mucca Rosa, Herk-de-Stad",
      coords: new google.maps.LatLng(50.948292, 5.123005),
      icon: "/images/favicon.ico",
    },
    {
      name: "Traiteur Nico, Halen",
      coords: new google.maps.LatLng(50.947701, 5.1094),
      icon: "/images/favicon.ico",
    },
    {
      name: "Lavendelhoeve, Stokrooi",
      coords: new google.maps.LatLng(50.9635, 5.277173),
      icon: "/images/favicon.ico",
    },
    {
      name: "Schmedz, Diest",
      coords: new google.maps.LatLng(50.984274, 5.050664),
      icon: "/images/favicon.ico",
    },
    {
      name: "t Puur Genot, Diest",
      coords: new google.maps.LatLng(50.984668, 5.049057),
      icon: "/images/favicon.ico",
    },
    {
      name: "Oud Diest, Diest",
      coords: new google.maps.LatLng(50.984176, 5.050766),
      icon: "/images/favicon.ico",
    },
    {
      name: "Herberg De Pastorie, Zelem",
      coords: new google.maps.LatLng(50.97845, 5.099864),
      icon: "/images/favicon.ico",
    },
    {
      name: "Drankenhandel KEFO-JANNES, Diest",
      coords: new google.maps.LatLng(50.980845, 5.060089),
      icon: "/images/favicon.ico",
    },
    {
      name: "De XIIe Oogst, Halen",
      coords: new google.maps.LatLng(50.94836, 5.115024),
      icon: "/images/favicon.ico",
    },
  ];

  places.forEach((place) => {
    addMarker(place);
  });
}
