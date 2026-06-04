# Serbia Air Quality WebGIS

WebGIS project for the GIS 2026 course at Politecnico di Milano. The website presents a spatial analysis of air quality, land cover change and population exposure in Serbia between 2021 and 2023.

The project combines CAMS European Air Quality Reanalysis data, ESRI 10 m Annual Land Cover data, WorldPop population data and Serbia boundary layers. Results are published as a static website with an interactive OpenLayers map connected to GeoServer WMS layers.

## Project Contents

- `index.html` - project overview, key outputs and team information.
- `pages/workflow.html` - methodology, datasets and processing steps.
- `pages/results.html` - maps, charts, statistical summaries and interpretations.
- `pages/webgis.html` - interactive WebMap for exploring the published GIS layers.
- `assets/js/map.js` - OpenLayers map configuration, WMS layer registry, controls, legends and GetFeatureInfo popup.
- `assets/css/style.css` - base template styling for the website layout, typography and shared page components.
- `assets/css/custom-styles.css` - project-specific visual styling.
- `images/` - figures, map previews and result graphics used by the website.
- `docs/` - production build output for GitHub Pages.

## Analysis Scope

The analysis focuses on three air pollutants:

- NO2
- PM2.5
- PM10

Main outputs include:

- Annual average pollutant maps for 2021 and 2023.
- AMAC maps, calculated as `2023 annual mean - 2021 annual mean`.
- 2023 pollutant concentration maps.
- Land cover transition map for 2021-2023.
- Population distribution and population quantile layers.
- Bivariate exposure maps combining pollutant severity and population class.
- Zonal statistics and result charts for pollutant interpretation.

## WebMap Features

The WebMap uses OpenLayers and GeoServer WMS layers from the Politecnico di Milano GeoServer workspace `gisgeoserver_14`.

Available map groups:

- Base maps: OpenStreetMap, ESRI Topographic and ESRI World Imagery.
- Administrative boundary: Serbia boundaries.
- Annual average air pollution: NO2, PM2.5 and PM10 for 2021 and 2023.
- AMAC difference maps: NO2, PM2.5 and PM10 change from 2021 to 2023.
- Concentration maps: 2023 pollutant concentration layers.
- Land cover: 2021 land cover, 2023 land cover and 2021-2023 land cover change.
- Population distribution: raw population and quantile classes.
- Air pollution exposure: bivariate exposure layers for NO2, PM2.5 and PM10.

Interactive functions:

- Layer switcher with grouped thematic layers.
- Dynamic WMS legend panel.
- Click popup using WMS GetFeatureInfo.
- Mouse coordinates in EPSG:4326.
- Scale line, fullscreen control, overview map and zoom-to-Serbia button.
- URL parameters for opening selected layers directly, for example `pages/webgis.html?layer=amac&pollutant=no2`.

## Technology Stack

- HTML, CSS and JavaScript.
- Vite for local development and static production builds.
- OpenLayers for WebGIS map rendering.
- `ol-layerswitcher` for map layer control.
- Bootstrap and template styles for page layout.
- GeoServer WMS for published raster/vector map layers.

## Installation

Requirements:

- Node.js 16 or higher.
- npm.

Clone the repository:

```sh
git clone https://github.com/YingYeee/GIS_LAB_WEBSITE_GROUP14.git
cd GIS_LAB_WEBSITE_GROUP14
```

Install dependencies:

```sh
npm install
```

Start the local development server:

```sh
npm run start
```

Open the website at:

```text
http://localhost:5173/
```

## Build

Create a local build:

```sh
npm run build-local
```

Preview the local build:

```sh
npm run preview
```

Create the production build for GitHub Pages:

```sh
npm run build-production
```

The production build is written to `docs/`, using `/GIS_LAB_WEBSITE_GROUP14/` as the base path.

## Team

This project was developed by M.Sc. Geoinformatics Engineering students at Politecnico di Milano:

- Ying Ye - NO2 pollutant analysis and Results page.
- Seran Park - PM2.5 pollutant analysis and WebMap development.
- Wenqi Yang - PM10 pollutant analysis and Workflow page.

## Credits

This project is academic and non-profit.

Website template:

- Twenty by HTML5 UP
- html5up.net | @ajlkn
- Free for personal and commercial use under the CCA 3.0 license: https://html5up.net/license

Adaptation to Vite and OpenLayers based on course materials by ictar:

- https://github.com/ictar

Basemap attributions:

- OpenStreetMap: https://www.openstreetmap.org/copyright
- ESRI World Topo Map Tiles: https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer
- ESRI World Imagery Tiles: https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer

## License

The repository license is defined in `LICENSE.txt`.
