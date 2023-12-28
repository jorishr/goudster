/* 
### Reference documentation 
https://developers.google.com/maps/documentation/javascript/load-maps-js-api 

### API KEY
Note that the public API key is not loaded dynamically. It is added to during the build process with a Gulp task. This code will run in a browser environment without .env file. During development or for maintenance tasks, add the key manually. When done set the string to the value as is.

Similar thing for the mapId. In development use DEMO-MAP-ID. The gulp task will replace it with the correct one.
*/

import { Loader } from "@googlemaps/js-api-loader";

export default function initMap() {
  const maps_API_KEY = "GOOGLE_MAPS_API";
  const mapElement = document.getElementById("map");
  if (mapElement) {
    const mapOptions = {
      center: { lat: 50.948139, lng: 5.11457 },
      zoom: 10,
      mapId: "DEMO_MAP_ID",
    };

    const loader = new Loader({
      apiKey: maps_API_KEY,
      version: "weekly",
      libraries: ["marker"],
    });

    let map;

    loader
      .load()
      .then(async () => {
        const { Map, InfoWindow } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary(
          "marker"
        );
        map = new Map(mapElement, mapOptions);

        const infoWindow = new InfoWindow();
        function buildMarkerIcon() {
          const markerIcon = document.createElement("img");
          markerIcon.src = "/images/favicon.ico";
          return markerIcon;
        }

        for (const place of places) {
          const AdvancedMarkerElement =
            new google.maps.marker.AdvancedMarkerElement({
              map,
              content: buildMarkerIcon(),
              position: place.position,
              title: place.title,
            });

          AdvancedMarkerElement.addListener("click", ({ domEvent, latLng }) => {
            const { target } = domEvent;

            infoWindow.close();
            infoWindow.setContent(AdvancedMarkerElement.title);
            infoWindow.open(AdvancedMarkerElement.map, AdvancedMarkerElement);
          });
        }
      })
      .catch((e) => console.error("Error when loading Google Maps", e));
  }
}

const places = [
  {
    title: "Golf, Lummen",
    position: { lat: 50.993705, lng: 5.226711 },
  },
  {
    title: "'t Vloot, Linkhout",
    position: { lat: 50.963271, lng: 5.146496 },
  },
  {
    title: "Café De Markt, Halen",
    position: { lat: 50.948305, lng: 5.113703 },
  },
  {
    title: "Vandepoel Drinkcenter, Halen",
    position: { lat: 50.948095, lng: 5.108037 },
  },
  {
    title: "Thomas Drink, Zoutleeuw",
    position: { lat: 50.830499, lng: 5.113714 },
  },
  {
    title: "Sportcafé De Koekoek, Halen",
    position: { lat: 50.946865, lng: 5.11589 },
  },
  {
    title: "Buurthuis-De Toekomst, Zellik",
    position: { lat: 50.953, lng: 5.084273 },
  },
  {
    title: "Brasserie 3punt, Halen",
    position: { lat: 50.94941, lng: 5.114359 },
  },
  {
    title: "Den AperO, Diest",
    position: { lat: 50.984152, lng: 5.05078 },
  },
  {
    title: "De Rotemse Molen, Halen",
    position: { lat: 50.928832, lng: 5.092178 },
  },
  {
    title: "Huis van Hem, Halen",
    position: { lat: 50.940806, lng: 5.105423 },
  },
  {
    title: "Immigrand, Diest",
    position: { lat: 50.979488, lng: 5.054977 },
  },
  {
    title: "Proxy Delhaize, Halen",
    position: { lat: 50.949516, lng: 5.114395 },
  },
  {
    title: "Spar, Halen",
    position: { lat: 50.948102, lng: 5.108236 },
  },
  {
    title: "Drankenhandel Claes, Lummen",
    position: { lat: 50.988164, lng: 5.195896 },
  },
  {
    title: "Café Groenhof, Schaffen",
    position: { lat: 50.990513, lng: 5.081114 },
  },
  {
    title: "De Sigaret, Diest",
    position: { lat: 50.983599, lng: 5.054736 },
  },
  {
    title: "De Groene Munt, Diest",
    position: { lat: 50.984894, lng: 5.053982 },
  },
  {
    title: "Place Douze, Halen",
    position: { lat: 50.947809, lng: 5.114072 },
  },
  {
    title: "Museum de Reinvoart, Halen",
    position: { lat: 50.932681, lng: 5.063551 },
  },
  {
    title: "Stamineeke, Webbekom",
    position: { lat: 50.972876, lng: 5.071093 },
  },
  {
    title: "Brasserie Huys Frederic, Herk-de-Stad",
    position: { lat: 50.95721, lng: 5.176336 },
  },
  {
    title: "Omnidrinks Bungeneers, Nieuwerkerken",
    position: { lat: 50.889616, lng: 5.191029 },
  },
  {
    title: "Mucca Rosa, Herk-de-Stad",
    position: { lat: 50.948292, lng: 5.123005 },
  },
  {
    title: "Traiteur Nico, Halen",
    position: { lat: 50.947701, lng: 5.1094 },
  },
  {
    title: "Lavendelhoeve, Stokrooi",
    position: { lat: 50.9635, lng: 5.277173 },
  },
  {
    title: "Schmedz, Diest",
    position: { lat: 50.984274, lng: 5.050664 },
  },
  {
    title: "t Puur Genot, Diest",
    position: { lat: 50.984668, lng: 5.049057 },
  },
  {
    title: "Oud Diest, Diest",
    position: { lat: 50.984176, lng: 5.050766 },
  },
  {
    title: "Herberg De Pastorie, Zelem",
    position: { lat: 50.97845, lng: 5.099864 },
  },
  {
    title: "Drankenhandel KEFO-JANNES, Diest",
    position: { lat: 50.980845, lng: 5.060089 },
  },
  {
    title: "De XIIe Oogst, Halen",
    position: { lat: 50.94836, lng: 5.115024 },
  },
];
