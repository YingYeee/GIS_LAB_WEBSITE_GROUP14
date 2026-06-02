const isRoot = !window.location.pathname.includes('/pages/');
const base = isRoot ? 'pages/' : '';

document.getElementById('fh5co-footer').innerHTML = `
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <h3>Serbia Air Quality WebGIS</h3>
        <p>GIS Laboratory Project · Politecnico di Milano</p>
      </div>
      <nav class="footer-links" aria-label="Footer navigation">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="${base}workflow.html">Workflow</a></li>
          <li><a href="${base}results.html">Results</a></li>
          <li><a href="${base}webgis.html">WebMap</a></li>
        </ul>
      </nav>
      <div class="footer-attributions">
        <h3>Map Attributions</h3>
        <p>© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a></p>
        <p>Tiles © <a href="https://www.esri.com/" target="_blank">Esri</a> — Sources: Esri, Maxar, Earthstar Geographics, and the GIS User Community (World Imagery)</p>
        <p>Tiles © <a href="https://www.esri.com/" target="_blank">Esri</a> — Esri, HERE, Garmin, Intermap, USGS, NPS, and the GIS User Community (Topographic)</p>
    </div>
    </div>
  </div>
`;
