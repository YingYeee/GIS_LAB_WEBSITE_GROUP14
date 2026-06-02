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
const WS = 'gisgeoserver_14';

// ─── Layer name registry ─────────────────────────────────────────────────────
const L = {
  no2Amac:    `${WS}:Serbia_no2_2021_2023_AMAC_map`,
  pm25Amac:   `${WS}:Serbia_pm2p5_2021_2023_AMAC_map`,
  pm10Amac:   `${WS}:Serbia_pm10_2021_2023_AMAC_map`,

  no2Avg2021:   `${WS}:Serbia_avr_no2_2021`,
  no2Avg2023:   `${WS}:Serbia_average_no2_2023`,
  pm10Avg2021:  `${WS}:Serbia_average_pm10_2021`,
  pm10Avg2023:  `${WS}:Serbia_average_pm10_2023`,
  pm25Avg2021:  `${WS}:Serbia_average_pm2p5_2021`,
  pm25Avg2023:  `${WS}:Serbia_average_pm2p5_2023`,

  no2Conc2023:  `${WS}:Serbia_no2_concentration_map_2023`,
  pm10Conc2023: `${WS}:Serbia_pm10_concentration_map_2023`,
  pm25Conc2023: `${WS}:Serbia_pm2p5_concentration_map_2023`,

  lc2021:  `${WS}:landcover_2021`,
  lc2023:  `${WS}:landcover_2023`,
  lcc:     `${WS}:Serbia_LCC_2021_2023`,

  population:   `${WS}:population`,
  popQuantiles: `${WS}:population_quantiles`,

  no2Biv:   `${WS}:Serbia_no2_2023_bivariate`,
  pm25Biv:  `${WS}:Serbia_pm2p5_2023_bivariate`,
  pm10Biv:  `${WS}:Serbia_pm10_2023_bivariate`,

  boundary: `${WS}:Serbia_boundaries`,
};

// ─── Helper: create a WMS ImageLayer ─────────────────────────────────────────
function wms(title, layerName, visible = false, opacity = 1.0) {
  return new ImageLayer({
    title,
    visible,
    opacity,
    source: new ImageWMS({
      url: geoserverWmsUrl,
      params: { LAYERS: layerName, TILED: true, VERSION: '1.1.1' },
      serverType: 'geoserver',
      crossOrigin: 'anonymous',
    }),
  });
}

// ─── Base Maps ───────────────────────────────────────────────────────────────
const baseMaps = new Group({
  title: 'Base Maps',
  layers: [
    new TileLayer({
      title: 'OpenStreetMap',
      type: 'base',
      visible: true,
      source: new OSM(),
    }),
    new TileLayer({
      title: 'ESRI Topographic',
      type: 'base',
      visible: false,
      source: new XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        attributions: 'Tiles &copy; <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
      }),
    }),
    new TileLayer({
      title: 'ESRI World Imagery',
      type: 'base',
      visible: false,
      source: new XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attributions: 'Tiles &copy; <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer">ArcGIS</a>',
      }),
    }),
  ],
});

// ─── Overlay Groups ──────────────────────────────────────────────────────────
const amacGroup = new Group({
  title: 'AMAC Difference Maps 2021–2023 ★',
  layers: [
    wms('PM₁₀ AMAC Difference',   L.pm10Amac,  true),
    wms('PM₂.₅ AMAC Difference', L.pm25Amac, false),
    wms('NO₂ AMAC Difference',  L.no2Amac, false),
  ],
});

const avgGroup = new Group({
  title: 'Annual Average Air Pollution',
  layers: [
    wms('PM₁₀ Average 2021',   L.pm10Avg2021),
    wms('PM₁₀ Average 2023',   L.pm10Avg2023),
    wms('PM₂.₅ Average 2021',  L.pm25Avg2021),
    wms('PM₂.₅ Average 2023',  L.pm25Avg2023),
    wms('NO₂ Average 2021', L.no2Avg2021),
    wms('NO₂ Average 2023', L.no2Avg2023),
  ],
});

const concGroup = new Group({
  title: 'Concentration Maps 2023',
  layers: [
    wms('PM₁₀ Concentration 2023',   L.pm10Conc2023),
    wms('PM₂.₅ Concentration 2023',  L.pm25Conc2023),
    wms('NO₂ Concentration 2023', L.no2Conc2023),
  ],
});

const lcGroup = new Group({
  title: 'Land Cover',
  layers: [
    wms('Land Cover 2021',               L.lc2021),
    wms('Land Cover 2023',               L.lc2023),
    wms('Land Cover Change 2021–2023 ★', L.lcc),
  ],
});

const popDistGroup = new Group({
  title: 'Population Distribution',
  layers: [
    wms('Population Density (Raw)',           L.population),
    wms('Population Density (Quantile Classes)', L.popQuantiles),
  ],
});

const exposureGroup = new Group({
  title: 'Air Pollution Exposure ★',
  layers: [
    wms('PM₁₀ Bivariate Exposure',   L.pm10Biv),
    wms('PM₂.₅ Bivariate Exposure', L.pm25Biv),
    wms('NO₂ Bivariate Exposure',  L.no2Biv),
  ],
});

const boundaryGroup = new Group({
  title: 'Administrative Boundary',
  layers: [
    wms('Serbia Boundaries', L.boundary, true, 1.0),
  ],
});

const exclusiveGroups = [amacGroup, avgGroup, concGroup, lcGroup, popDistGroup, exposureGroup];

function makeExclusiveAcrossGroups() {
  exclusiveGroups.forEach(group => {
    group.getLayers().getArray().forEach(layer => {
      layer.on('change:visible', () => {
        if (layer.getVisible()) {

          group.getLayers().getArray().forEach(other => {
            if (other !== layer) other.setVisible(false);
          });

          exclusiveGroups.forEach(otherGroup => {
            if (otherGroup !== group) {
              otherGroup.getLayers().getArray().forEach(other => {
                other.setVisible(false);
              });
            }
          });
        }
      });
    });
  });
}

makeExclusiveAcrossGroups();

const allOverlayGroups = [
  boundaryGroup, avgGroup, concGroup, amacGroup, lcGroup, popDistGroup, exposureGroup,
];

// ─── Map ──────────────────────────────────────────────────────────────────────
const serbiaCenter = fromLonLat([20.9, 44.1]);

const container = document.getElementById('popup');
const content   = document.getElementById('popup-content');
const closer    = document.getElementById('popup-closer');

const popup = new Overlay({
  element: container,
  autoPan: { animation: { duration: 250 } },
});

const map = new Map({
  target: 'map',
  layers: [
    baseMaps,
    exposureGroup,
    popDistGroup,
    lcGroup,
    amacGroup,
    concGroup,
    avgGroup,
    boundaryGroup,
  ],
  overlays: [popup],
  view: new View({
    center: serbiaCenter,
    zoom: 7,
    projection: 'EPSG:3857',
  }),
});

// ─── Controls ────────────────────────────────────────────────────────────────
map.addControl(new ScaleLine({ units: 'metric' }));
map.addControl(new FullScreen());
map.addControl(new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: 'EPSG:4326',
  className: 'custom-control',
  placeholder: '0.0000, 0.0000',
}));
map.addControl(new OverviewMap({
  collapsed: true,
  layers: [new TileLayer({ source: new OSM() })],
}));

const layerSwitcher = new LayerSwitcher({
  activationMode: 'click',
  startActive: true,
  groupSelectStyle: 'children',
});
map.addControl(layerSwitcher);

// ─── Zoom to Serbia button ────────────────────────────────────────────────────
const zoomBtn = document.createElement('button');
zoomBtn.className = 'zoom-serbia';
zoomBtn.textContent = 'Zoom to Serbia';
zoomBtn.type = 'button';
zoomBtn.addEventListener('click', () => {
  map.getView().animate({ center: serbiaCenter, zoom: 7, duration: 600 });
});
document.getElementById('map').appendChild(zoomBtn);

// ─── Popup: GetFeatureInfo on click ──────────────────────────────────────────
closer.onclick = () => {
  popup.setPosition(undefined);
  closer.blur();
  return false;
};

map.on('singleclick', async (evt) => {
  let activeSource = null;
  [amacGroup, avgGroup, concGroup, lcGroup, popDistGroup, exposureGroup, boundaryGroup].forEach(group => {
    group.getLayers().getArray().forEach(layer => {
      if (layer.getVisible() && !activeSource) {
        activeSource = layer.getSource();
      }
    });
  });

  if (!activeSource) {
    content.innerHTML = `<strong>Tip:</strong> Enable an overlay layer to query features.`;
    popup.setPosition(evt.coordinate);
    return;
  }

  const viewRes = map.getView().getResolution();
  const url = activeSource.getFeatureInfoUrl(evt.coordinate, viewRes, 'EPSG:3857', {
    INFO_FORMAT: 'text/html',
    FEATURE_COUNT: 1,
  });

  if (url) {
    try {
      const res  = await fetch(url);
      const html = await res.text();
      const hasData = html.includes('<td') || html.includes('<body>');
      content.innerHTML = hasData
        ? html
        : '<em>No data at this location.</em>';
    } catch {
      content.innerHTML = '<em>Could not fetch feature info.</em>';
    }
    popup.setPosition(evt.coordinate);
  }
});

// ─── Dynamic legend panel ─────────────────────────────────────────────────────
const legendToggle = document.getElementById('legend-toggle');
const legendPanel  = document.getElementById('legend-panel');

if (legendToggle && legendPanel) {
  legendToggle.addEventListener('click', () => {
    legendPanel.classList.toggle('is-collapsed');
    legendToggle.textContent = legendPanel.classList.contains('is-collapsed')
      ? 'Show legend'
      : 'Hide legend';
  });
}

function refreshLegend() {
  const legendContent = document.getElementById('legend-content');
  if (!legendContent) return;

  const visibleLayers = [];
  allOverlayGroups.forEach(group => {
    group.getLayers().getArray().forEach(layer => {
      if (layer.getVisible()) visibleLayers.push(layer);
    });
  });

  if (visibleLayers.length === 0) {
    legendContent.innerHTML = '<p style="color:#888;font-size:.8rem">No overlay layers active.</p>';
    return;
  }

  legendContent.innerHTML = visibleLayers.map(layer => {
    const layerName = layer.getSource().getParams().LAYERS;
    const legendUrl =
      `${geoserverWmsUrl}?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic` +
      `&FORMAT=image/png&LAYER=${encodeURIComponent(layerName)}&TRANSPARENT=true`;
    return `
      <div style="margin-bottom:1rem">
        <div style="font-size:1.6rem;font-weight:600;text-transform:uppercase;
                    letter-spacing:.05em;color:#c0392b;margin-bottom:.25rem">
          ${layer.get('title')}
        </div>
        <img src="${legendUrl}" style="max-width:100%;border:1px solid #eee;border-radius:3px"
             onerror="this.style.display='none'">
      </div>`;
  }).join('');
}

allOverlayGroups.forEach(group => {
  group.getLayers().getArray().forEach(layer => {
    layer.on('change:visible', refreshLegend);
  });
});

refreshLegend();