let finalData = [...pgData];
let selectedRating = 0;
let currentPG = null;

// ===== DISPLAY CARDS =====
function display(data) {
  const container = document.getElementById("results");

  if (!data.length) {
    container.innerHTML = `<div class="no-results">😔 No PG found matching your search.<br><small>Try different filters!</small></div>`;
    return;
  }

  let html = "";
  data.forEach((pg, i) => {
    const reviews = getReviews(pg.name);
    const avgRating = getAvgRating(pg.name);
    const stars = renderStars(avgRating);
    const genderBadge = pg.gender === "Boys"
      ? `<span class="badge badge-boys">👦 Boys</span>`
      : pg.gender === "Girls"
        ? `<span class="badge badge-girls">👧 Girls</span>`
        : `<span class="badge badge-both">👥 Both</span>`;

    const price = parseInt((pg.price || "0").replace(/[^0-9]/g, ""));

    html += `
    <div class="card" style="animation-delay:${i * 0.05}s" onclick="openDetail('${pg.name}')">
      <div class="card-img-wrap">
        <img src="${pg.image}" alt="${pg.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'">
        <div class="card-badges">
          ${genderBadge}
          ${i < 3 ? `<span class="badge badge-popular">⭐ Popular</span>` : ""}
        </div>
      </div>
      <div class="card-content">
        <h3>${pg.name}</h3>
        <p class="card-city">📍 ${pg.city}</p>
        <p class="card-price">₹${price.toLocaleString()} <span>/ month</span></p>
        <div class="stars">
          ${stars}
          <small>(${reviews.length} reviews)</small>
        </div>
        <div class="card-actions">
          <button class="btn-call" onclick="event.stopPropagation(); call('${pg.contact}')">📞 Call</button>
          <button class="btn-map" onclick="event.stopPropagation(); openMap('${pg.name}', '${pg.city}')">📍 Map</button>
          <button class="btn-save" onclick="event.stopPropagation(); fav('${pg.name}')">❤️ Save</button>
        </div>
      </div>
    </div>`;
  });

  container.innerHTML = html;
  document.getElementById("totalCount").innerText = pgData.length;
}

// ===== DETAIL MODAL =====
function openDetail(pgName) {
  const pg = pgData.find(p => p.name === pgName);
  if (!pg) return;
  currentPG = pg;

  const reviews = getReviews(pg.name);
  const avgRating = getAvgRating(pg.name);
  const price = parseInt((pg.price || "0").replace(/[^0-9]/g, ""));

  let reviewsHTML = reviews.length
    ? reviews.map(r => `
      <div class="review-item">
        <div class="rev-name">${r.user}</div>
        <div class="rev-stars">${"⭐".repeat(r.rating)}</div>
        <div class="rev-text">${r.text}</div>
      </div>`).join("")
    : `<p style="color:var(--muted); font-size:13px;">No reviews yet. Be the first!</p>`;

  document.getElementById("detailContent").innerHTML = `
    <img src="${pg.image}" alt="${pg.name}" onerror="this.src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500'">
    <h2>${pg.name}</h2>
    <div class="stars" style="margin-bottom:12px;">
      ${renderStars(avgRating)}
      <small>(${reviews.length} reviews) — ${avgRating > 0 ? avgRating.toFixed(1) + " / 5" : "No rating yet"}</small>
    </div>
    <div class="detail-info">
      <p>📍 <strong>City:</strong> ${pg.city}</p>
      <p>💰 <strong>Rent:</strong> ₹${price.toLocaleString()} / month</p>
      <p>👥 <strong>For:</strong> ${pg.gender || "All"}</p>
      <p>📞 <strong>Contact:</strong> ${pg.contact}</p>
      ${pg.address ? `<p>🏠 <strong>Address:</strong> ${pg.address}</p>` : ""}
    </div>
    <div class="detail-actions">
      <button class="btn-call" onclick="call('${pg.contact}')">📞 Call Now</button>
      <button class="btn-map" onclick="openMap('${pg.name}', '${pg.city}')">📍 Get Directions</button>
    </div>

    <div class="review-section">
      <h4>⭐ Reviews & Ratings</h4>
      <div class="star-select" id="starSelect">
        <span onclick="setRating(1)">⭐</span>
        <span onclick="setRating(2)">⭐</span>
        <span onclick="setRating(3)">⭐</span>
        <span onclick="setRating(4)">⭐</span>
        <span onclick="setRating(5)">⭐</span>
      </div>
      <div class="review-input">
        <input id="reviewText" placeholder="Write your review...">
        <button onclick="submitReview()">Post</button>
      </div>
      <div class="reviews-list">${reviewsHTML}</div>
    </div>
  `;

  selectedRating = 0;
  document.getElementById("detailModal").style.display = "flex";
}

function closeDetail() {
  document.getElementById("detailModal").style.display = "none";
  currentPG = null;
}

// ===== STAR RATING =====
function setRating(n) {
  selectedRating = n;
  const stars = document.querySelectorAll("#starSelect span");
  stars.forEach((s, i) => {
    s.classList.toggle("active", i < n);
  });
}

function renderStars(avg) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    html += `<span style="color:${i <= Math.round(avg) ? "#f59e0b" : "#d1d5db"}; font-size:14px;">★</span>`;
  }
  return html;
}

// ===== REVIEWS =====
function getReviews(pgName) {
  return JSON.parse(localStorage.getItem("reviews_" + pgName)) || [];
}

function getAvgRating(pgName) {
  const reviews = getReviews(pgName);
  if (!reviews.length) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

function submitReview() {
  if (!currentPG) return;
  const text = document.getElementById("reviewText").value.trim();
  const user = localStorage.getItem("user") || "Guest";

  if (!text) { alert("Please write a review ❌"); return; }
  if (!selectedRating) { alert("Please select a star rating ❌"); return; }

  const reviews = getReviews(currentPG.name);
  reviews.unshift({ user, text, rating: selectedRating, date: new Date().toLocaleDateString() });
  localStorage.setItem("reviews_" + currentPG.name, JSON.stringify(reviews));

  alert("Review posted ✅ Thank you!");
  openDetail(currentPG.name);
}

// ===== GOOGLE MAPS =====
function openMap(name, city) {
  const query = encodeURIComponent(name + " PG " + city + " India");
  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
}

// ===== ON LOAD =====
window.onload = function () {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) { loader.style.opacity = "0"; setTimeout(() => loader.style.display = "none", 500); }
  }, 1200);

  const user = localStorage.getItem("user");
  if (user) {
    document.getElementById("loginModal").style.display = "none";
    document.getElementById("userName").innerText = "Hi, " + user;
    if (user === "Guest") document.getElementById("profileSettings").style.display = "none";
    display(pgData);
  }

  document.getElementById("totalCount").innerText = pgData.length;
  const dp = localStorage.getItem("dp");
  if (dp) document.getElementById("profilePic").src = dp;
};

// ===== PROFILE =====
function toggleProfile() {
  const menu = document.getElementById("profileMenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// ===== LOGIN =====
function loginUser() {
  const name = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  if (!name || !email) { alert("Please fill all fields ❌"); return; }
  if (!email.includes("@")) { alert("Enter a valid email ❌"); return; }
  localStorage.setItem("user", name);
  document.getElementById("loginModal").style.display = "none";
  document.getElementById("userName").innerText = "Hi, " + name;
  display(pgData);
}

function continueGuest() {
  localStorage.setItem("user", "Guest");
  document.getElementById("loginModal").style.display = "none";
  document.getElementById("userName").innerText = "Hi, Guest";
  document.getElementById("profileSettings").style.display = "none";
  display(pgData);
}

function logout() {
  localStorage.removeItem("user");
  location.reload();
}

function updateProfile() {
  const newName = document.getElementById("newName").value.trim();
  if (newName) {
    localStorage.setItem("user", newName);
    document.getElementById("userName").innerText = "Hi, " + newName;
    alert("Profile updated ✅");
  }
}

function changeDP(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById("profilePic").src = e.target.result;
    localStorage.setItem("dp", e.target.result);
  };
  reader.readAsDataURL(file);
}

// ===== SEARCH =====
function searchPG() {
  const val = document.getElementById("search").value.toLowerCase().trim();
  finalData = pgData.filter(p =>
    p.city.toLowerCase().includes(val) ||
    p.name.toLowerCase().includes(val)
  );
  display(finalData);
}

function searchOnEnter(e) {
  if (e.key === "Enter") searchPG();
}

// ===== FILTERS =====
function filterCity(city) {
  finalData = city ? pgData.filter(p => p.city === city) : [...pgData];
  display(finalData);
}

function filterGender(g) {
  finalData = g ? pgData.filter(p => p.gender === g) : [...pgData];
  display(finalData);
}

function filterPrice(maxPrice) {
  if (!maxPrice) { finalData = [...pgData]; display(finalData); return; }
  const max = parseInt(maxPrice);
  finalData = pgData.filter(p => {
    const price = parseInt((p.price || "0").replace(/[^0-9]/g, ""));
    return price <= max;
  });
  display(finalData);
}

// ===== CALL =====
function call(num) {
  window.location.href = "tel:" + num;
}

// ===== SAVE / FAVOURITE =====
function fav(name) {
  let favs = JSON.parse(localStorage.getItem("favPG")) || [];
  if (!favs.includes(name)) {
    favs.push(name);
    localStorage.setItem("favPG", JSON.stringify(favs));
    alert("Saved to favourites ❤️");
  } else {
    alert("Already saved 👍");
  }
}

// ===== ADD PG MODAL =====
function openAddPG() {
  document.getElementById("pgModal").style.display = "flex";
}

function closeAddPG() {
  document.getElementById("pgModal").style.display = "none";
}

function addPG() {
  const name = document.getElementById("pgName").value.trim();
  const city = document.getElementById("pgCity").value.trim();
  const contact = document.getElementById("pgContact").value.trim();
  const price = document.getElementById("pgPrice").value.trim();
  const gender = document.getElementById("pgGender").value;
  const address = document.getElementById("pgAddress").value.trim();

  if (!name || !city || !contact) { alert("Please fill required fields ❌"); return; }

  const newPG = {
    name, city, contact,
    price: price ? "₹" + parseInt(price).toLocaleString() : "₹5000",
    gender,
    address,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"
  };

  pgData.push(newPG);
  finalData = [...pgData];
  document.getElementById("totalCount").innerText = pgData.length;
  alert("PG Listed Successfully ✅");
  closeAddPG();
  display(pgData);

  // Clear inputs
  ["pgName","pgCity","pgContact","pgEmail","pgPrice","pgAddress"].forEach(id => {
    document.getElementById(id).value = "";
  });
}

// ===== DARK MODE =====
function toggleDark() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

// Apply saved dark mode
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

// Close modals on overlay click
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("modal-overlay")) {
    document.getElementById("detailModal").style.display = "none";
    document.getElementById("pgModal").style.display = "none";
  }
  if (!e.target.closest(".profile-container")) {
    const menu = document.getElementById("profileMenu");
    if (menu) menu.style.display = "none";
  }
});
