import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';

import { Map, View, Overlay } from 'ol';
import { Tile as TileLayer, Image as ImageLayer, Group } from 'ol/layer';
import { OSM, XYZ, ImageWMS } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { ScaleLine, FullScreen, MousePosition, OverviewMap } from 'ol/control';
import { createStringXY } from 'ol/coordinate';
import LayerSwitcher from 'ol-layerswitcher';

const geoserverWmsUrl = 'https://www.gis-geoserver.polimi.it/geoserver/wms';

// Replace YOUR_WORKSPACE with your real GeoServer workspace.
// Replace each layer name with the exact GeoServer layer name.
const layerNames = {
  serbiaBoundary: 'YOUR_WORKSPACE:Serbia_boundary',
  no2Amac: 'YOUR_WORKSPACE:Serbia_no2_2021_2023_AMAC_map',
  pm25Amac: 'YOUR_WORKSPACE:Serbia_pm2p5_2021_2023_AMAC_map',
  pm10Amac: 'YOUR_WORKSPACE:Serbia_pm10_2021_2023_AMAC_map',
  landCoverChange: 'YOUR_WORKSPACE:Serbia_LCC_2021_2023',
  no2Bivariate: 'YOUR_WORKSPACE:Serbia_no2_2023_bivariate',
  pm25Bivariate: 'YOUR_WORKSPACE:Serbia_pm2p5_2023_bivariate',
  pm10Bivariate: 'YOUR_WORKSPACE:Serbia_pm10_2023_bivariate'
};

function createWmsLayer(title, layerName, visible = false, opacity = 0.75) {
  return new ImageLayer({
    title,
    visible,
    opacity,
    source: new ImageWMS({
      url: geoserverWmsUrl,
      params: {
        LAYERS: layerName,
        TILED: true,
        VERSION: '1.1.1'
      },
      serverType: 'geoserver',
      crossOrigin: 'anonymous'
    })
  });
}

const osm = new TileLayer({
  title: 'OpenStreetMap',
  type: 'base',
  visible: true,
  source: new OSM()
});

const esriTopo = new TileLayer({
  title: 'ESRI Topographic',
  type: 'base',
  visible: false,
  source: new XYZ({
    attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
  })
});

const esriImagery = new TileLayer({
  title: 'ESRI World Imagery',
  type: 'base',
  visible: false,
  source: new XYZ({
    attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer">ArcGIS</a>',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  })
});

const boundary = createWmsLayer('Serbia Boundary', layerNames.serbiaBoundary, true, 0.9);

const no2Amac = createWmsLayer('NO₂ AMAC 2021–2023', layerNames.no2Amac, false, 0.75);
const pm25Amac = createWmsLayer('PM2.5 AMAC 2021–2023', layerNames.pm25Amac, false, 0.75);
const pm10Amac = createWmsLayer('PM10 AMAC 2021–2023', layerNames.pm10Amac, true, 0.75);

const landCoverChange = createWmsLayer('Land Cover Change 2021–2023', layerNames.landCoverChange, false, 0.75);

const no2Bivariate = createWmsLayer('NO₂ Bivariate Exposure 2023', layerNames.no2Bivariate, false, 0.75);
const pm25Bivariate = createWmsLayer('PM2.5 Bivariate Exposure 2023', layerNames.pm25Bivariate, false, 0.75);
const pm10Bivariate = createWmsLayer('PM10 Bivariate Exposure 2023', layerNames.pm10Bivariate, false, 0.75);

const baseMaps = new Group({
  title: 'Base Maps',
  layers: [osm, esriTopo, esriImagery]
});

const administrativeLayers = new Group({
  title: 'Administrative Layers',
  layers: [boundary]
});

const airQualityLayers = new Group({
  title: 'Air Quality - AMAC 2021–2023',
  layers: [no2Amac, pm25Amac, pm10Amac]
});

const landCoverLayers = new Group({
  title: 'Land Cover',
  layers: [landCoverChange]
});

const exposureLayers = new Group({
  title: 'Population Exposure',
  layers: [no2Bivariate, pm25Bivariate, pm10Bivariate]
});

const serbiaCenter = fromLonLat([20.9, 44.1]);

const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

const popup = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250
    }
  }
});

const map = new Map({
  target: 'map',
  layers: [baseMaps, administrativeLayers, airQualityLayers, landCoverLayers, exposureLayers],
  overlays: [popup],
  view: new View({
    center: serbiaCenter,
    zoom: 7,
    projection: 'EPSG:3857'
  })
});

map.addControl(new ScaleLine());
map.addControl(new FullScreen());
map.addControl(
  new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:4326',
    className: 'custom-control',
    placeholder: '0.0000, 0.0000'
  })
);

map.addControl(
  new OverviewMap({
    collapsed: true,
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ]
  })
);

const layerSwitcher = new LayerSwitcher({
  activationMode: 'click',
  startActive: false,
  groupSelectStyle: 'children'
});
map.addControl(layerSwitcher);

const zoomButton = document.createElement('button');
zoomButton.className = 'zoom-serbia';
zoomButton.textContent = 'Zoom to Serbia';
zoomButton.type = 'button';
zoomButton.addEventListener('click', () => {
  map.getView().animate({
    center: serbiaCenter,
    zoom: 7,
    duration: 600
  });
});
document.getElementById('map').appendChild(zoomButton);

closer.onclick = function () {
  popup.setPosition(undefined);
  closer.blur();
  return false;
};

map.on('singleclick', function (evt) {
  const coordinate = evt.coordinate;
  content.innerHTML = `
    <strong>Map location selected</strong><br>
    Coordinate: ${evt.coordinate.map(v => v.toFixed(2)).join(', ')}<br>
    To show administrative attributes here, connect a WFS/GeoJSON layer or implement a GetFeatureInfo request.
  `;
  popup.setPosition(coordinate);
});

const legendPanel = document.getElementById('legend-panel');
const legendToggle = document.getElementById('legend-toggle');

legendToggle.addEventListener('click', () => {
  legendPanel.classList.toggle('is-collapsed');
  legendToggle.textContent = legendPanel.classList.contains('is-collapsed') ? 'Show legend' : 'Hide legend';
});
