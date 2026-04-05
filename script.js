function searchPG() {
  let input = document.getElementById("search").value.toLowerCase();
  let resultsDiv = document.getElementById("results");

  resultsDiv.innerHTML = "";

  let filtered = pgData.filter(pg => 
    pg.city.toLowerCase().includes(input)
  );

  if (filtered.length === 0) {
    resultsDiv.innerHTML = "<p>No PG Found 😢</p>";
    return;
  }

  filtered.forEach(pg => {
    resultsDiv.innerHTML += `
      <div class="card">
        <h3>${pg.name}</h3>
        <p>City: ${pg.city}</p>
        <p>Price: ${pg.price}</p>
        <p>Contact: ${pg.contact}</p>
      </div>
    `;
  });
}
