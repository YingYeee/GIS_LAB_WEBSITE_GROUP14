const isRoot = !window.location.pathname.includes('/pages/');
const base = isRoot ? 'pages/' : '';

document.getElementById('fh5co-footer').innerHTML = `
  <div class="container">
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 32px; padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.1);">
      <div>
        <h3 style="color:#52d3aa; margin: 0 0 6px 0; font-weight:550;">Serbia Air Quality WebGIS</h3>
        <p style="color:rgba(255,255,255,0.5); font-size:15px; margin:0; font-weight:400;">GIS Laboratory Project · Politecnico di Milano</p>
      </div>
      <div style="display:flex; justify-content:flex-end;">
        <div>
          <h3 style="margin: 0 0 10px 0;">Quick Links</h3>
          <ul style="padding:0; margin:0; list-style:none;">
            <li><a href="${base}workflow.html">Workflow</a></li>
            <li><a href="${base}results.html">Results</a></li>
            <li><a href="${base}webgis.html">WebMap</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div style="padding-top: 20px;">
      <p style="color:rgba(255,255,255,0.45); font-size:16px; font-weight:500; margin: 0 0 8px 0;">Map Attributions</p>
      <div style="display:flex; flex-direction:column; gap:6px;">
        <span style="color:rgba(255,255,255,0.4); font-size:12px;">© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a></span>
        <span style="color:rgba(255,255,255,0.4); font-size:12px;">Tiles © <a href="https://www.esri.com/" target="_blank">Esri</a> — Sources: Esri, Maxar, Earthstar Geographics, and the GIS User Community (World Imagery)</span>
        <span style="color:rgba(255,255,255,0.4); font-size:12px;">Tiles © <a href="https://www.esri.com/" target="_blank">Esri</a> — Esri, HERE, Garmin, Intermap, USGS, NPS, and the GIS User Community (Topographic)</span>
      </div>
    </div>
  </div>
`;