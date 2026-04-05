function searchPG() {
  let input = document.getElementById("search").value.toLowerCase();
  let resultsDiv = document.getElementById("results");

  resultsDiv.innerHTML = "";

  let filtered = pgData.filter(pg => 
    pg.city.toLowerCase().includes(input)
  );

  if (filtered.length === 0) {
    resultsDiv.innerHTML = "<h3 style='text-align:center;'>No PG Found 😢</h3>";
    return;
  }

  filtered.forEach(pg => {
    resultsDiv.innerHTML += `
      <div class="card">
        <img src="${pg.image}" />
        <h3>${pg.name}</h3>
        <p>📍 ${pg.city}</p>
        <p>💰 ${pg.price}</p>
        <p>📞 ${pg.contact}</p>
        <a href="https://www.google.com/maps/search/${pg.name}" target="_blank">
          📍 View Location
        </a>
      </div>
    `;
  });
}

function chat() {
  alert("Try searching: PG in Bhopal under ₹5000 😊");
}
