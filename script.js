let user = localStorage.getItem("user") || "";

function showLogin() {
  document.getElementById("loginBox").style.display = "block";
}

function login() {
  let u = document.getElementById("user").value;
  localStorage.setItem("user", u);
  alert("Welcome " + u);
  location.reload();
}

let finalData = pgData;

window.onload = () => displayPG(finalData);

function displayPG(data) {
  let results = document.getElementById("results");
  results.innerHTML = "";

  data.forEach((pg, index) => {

    let reviews = JSON.parse(localStorage.getItem("reviews"+index)) || [];

    let reviewHTML = reviews.map(r => `<div class="review">⭐ ${r}</div>`).join("");

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

          <!-- REVIEWS -->
          <div class="review-box">
            ${reviewHTML}
            <input id="rev${index}" placeholder="Write review">
            <button onclick="addReview(${index})">Add</button>
          </div>
        </div>
      </div>
    `;
  });
}

function addReview(i) {
  if(!user) {
    alert("Login first 🔐");
    return;
  }

  let input = document.getElementById("rev"+i).value;

  let reviews = JSON.parse(localStorage.getItem("reviews"+i)) || [];
  reviews.push(input);

  localStorage.setItem("reviews"+i, JSON.stringify(reviews));

  location.reload();
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
