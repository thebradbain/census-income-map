Vue.component('mapbox-map', {
  props: {
    uri: {
      type: String,
      required: true
    },
    showLegend: Boolean
  },
  template:
  `<div id="map-container">
    <div id="map" @click.prevent></div>
  </div>`,
  data: function() {
    return { map: null }
  },
  methods: {
    loadMap: function() {
      const publicKey = 'pk.eyJ1IjoidGhlYnJhZGJhaW4iLCJhIjoiY2oyenZzcmdmMDAwejMyanN1cDFsY2F5diJ9.fbQBBonBiI7f_t8m1aLXSw';
      const californiaBounds = [
        [32.200, -125.000], // SW
        [42.200, -115.000], // NE
      ];
      const mapCenter = [34.037,-118.056];

      L.mapbox.accessToken = publicKey;
      this.map = L.map('map', {
        center: mapCenter,
        zoom: 8,
        maxBounds: californiaBounds,
        minZoom: 6,
        zoomControl: false
      });


      let incomeStyle = L.mapbox.styleLayer('mapbox://styles/thebradbain/cj31ao2p200082roh7nabvqcs');
      incomeStyle.addTo(this.map);
    },
    createLegend: function() {
      let incomeLegend = L.Control.extend({
        options: {
          position: 'topright'
          //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
        },

        onAdd: function (map) {
          const container = L.DomUtil.create('div','leaflet-bar leaflet-control leaflet-control-custom legend');
          const title = L.DomUtil.create('h4',null,container);
          title.textContent = "Household Income";

          const spectrum = L.DomUtil.create('div','spectrum',container);
          const indicator = L.DomUtil.create('div','income-level',container);
          const k25 = L.DomUtil.create('span', 'k25', indicator);
          const k250 = L.DomUtil.create('span', 'k250', indicator);
          k25.textContent = "25k<";
          k250.textContent = ">250k";

          return container;
        },
      });

      this.map.addControl(new incomeLegend());
    }
  },
  mounted: function() {
    this.loadMap();
    if(this.showLegend) {
      this.createLegend();
    }
  }
});
