let finalData = pgData;

window.onload = () => displayPG(finalData);

function displayPG(data) {
  let results = document.getElementById("results");
  results.innerHTML = "";

  data.forEach(pg => {
    results.innerHTML += `
      <div class="card">
        <img src="${pg.image}">
        
        <div class="content">
          <h3>${pg.name} <span class="badge">Verified</span></h3>
          <p>📍 ${pg.city}</p>
          <p>💰 ${pg.price}</p>

          <div class="buttons">
            <a href="tel:${pg.contact}">
              <button class="call">📞 Call</button>
            </a>

            <a href="https://www.google.com/maps/dir/?api=1&destination=${pg.name}" target="_blank">
              <button class="map">📍 Route</button>
            </a>
          </div>
        </div>
      </div>
    `;
  });
}

function searchPG() {
  let input = document.getElementById("search").value.toLowerCase();

  let filtered = finalData.filter(pg =>
    pg.city.toLowerCase().includes(input)
  );

  displayPG(filtered);
}

function nearMe() {
  window.open("https://www.google.com/maps/search/pg+near+me");
}
