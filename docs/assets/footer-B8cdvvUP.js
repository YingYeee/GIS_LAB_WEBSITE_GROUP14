(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const n=!window.location.pathname.includes("/pages/"),i=n?"pages/":"";document.getElementById("fh5co-footer").innerHTML=`
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <h3>Serbia Air Quality WebGIS</h3>
        <p>GIS Laboratory Project · Politecnico di Milano</p>
      </div>
      <nav class="footer-links" aria-label="Footer navigation">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="${i}workflow.html">Workflow</a></li>
          <li><a href="${i}results.html">Results</a></li>
          <li><a href="${i}webgis.html">WebMap</a></li>
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
