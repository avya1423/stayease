// 👤 USER LOGIN
let user = localStorage.getItem("user") || "";

// 🔐 SHOW LOGIN BOX
function showLogin() {
  document.getElementById("loginBox").style.display = "block";
}

// LOGIN
function login() {
  let u = document.getElementById("user").value;
  localStorage.setItem("user", u);
  alert("Welcome " + u + " 👋");
  location.reload();
}

// ❤️ ADD TO FAVOURITE
function addFav(name) {
  let fav = JSON.parse(localStorage.getItem("fav")) || [];
  fav.push(name);
  localStorage.setItem("fav", JSON.stringify(fav));
  alert("Added to Favourite ❤️");
}

// 📅 BOOK PG
function bookPG(name) {
  let booking = JSON.parse(localStorage.getItem("booking")) || [];
  booking.push(name);
  localStorage.setItem("booking", JSON.stringify(booking));
  alert("Booking Done ✅");
}

// 📊 MAIN DATA
let finalData = pgData;

// 🔄 AUTO LOAD
window.onload = () => displayPG(finalData);

// 🏠 DISPLAY PG
function displayPG(data) {
  let results = document.getElementById("results");
  results.innerHTML = "";

  data.forEach((pg, index) => {

    let reviews = JSON.parse(localStorage.getItem("reviews" + index)) || [];

    let reviewHTML = reviews.map(r => `<div class="review">⭐ ${r}</div>`).join("");

    results.innerHTML += `
      <div class="card">
        <img src="${pg.image}">
        
        <div class="content">
          <h3>${pg.name} <span class="badge">Verified</span></h3>
          <p>📍 ${pg.city}</p>
          <p>💰 ${pg.price}</p>

          <!-- 🔥 BUTTONS -->
          <div class="buttons">
            <button class="call" onclick="addFav('${pg.name}')">❤️ Save</button>
            <button class="map" onclick="bookPG('${pg.name}')">📅 Book</button>

            <a href="tel:${pg.contact}">
              <button class="call">📞 Call</button>
            </a>

            <a href="https://www.google.com/maps/dir/?api=1&destination=${pg.name}" target="_blank">
              <button class="map">📍 Route</button>
            </a>
          </div>

          <!-- ⭐ REVIEWS -->
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

// ⭐ ADD REVIEW
function addReview(i) {
  if (!user) {
    alert("Login first 🔐");
    return;
  }

  let input = document.getElementById("rev" + i).value;

  let reviews = JSON.parse(localStorage.getItem("reviews" + i)) || [];
  reviews.push(input);

  localStorage.setItem("reviews" + i, JSON.stringify(reviews));

  location.reload();
}

// 🔍 SEARCH
function searchPG() {
  let input = document.getElementById("search").value.toLowerCase();

  let filtered = finalData.filter(pg =>
    pg.city.toLowerCase().includes(input)
  );

  displayPG(filtered);
}

// 📍 NEAR ME
function nearMe() {
  window.open("https://www.google.com/maps/search/pg+near+me");
}
