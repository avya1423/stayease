let pgData = JSON.parse(localStorage.getItem("pgData")) || [
  {
    name: "Sharma PG",
    city: "Bhopal",
    price: "₹5000",
    contact: "9876543210",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
  },
  {
    name: "Shri Ram Boys Hostel & Guest House",
    city: "Bhopal",
    price: "₹5000 (Approx)",
    contact: "8123869239",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
  }
];

// 🔍 SEARCH
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

// 💬 CHAT TOGGLE
function toggleChat() {
  let chat = document.getElementById("chatbox");
  chat.style.display = chat.style.display === "none" ? "block" : "none";
}

// 🤖 CHATBOT
function sendMessage() {
  let input = document.getElementById("chatInput").value;
  let chat = document.getElementById("chatMessages");

  chat.innerHTML += `<p><b>You:</b> ${input}</p>`;

  let reply = "Try PG in Bhopal 😊";

  if (input.toLowerCase().includes("bhopal")) {
    document.getElementById("search").value = "Bhopal";
    searchPG();
    reply = "Showing PGs in Bhopal 👇";
  }

  chat.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;

  document.getElementById("chatInput").value = "";
}
