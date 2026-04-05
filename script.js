let pgData = JSON.parse(localStorage.getItem("pgData")) || [];

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

  let reply = "Try searching PG in Bhopal 😊";

  if (input.toLowerCase().includes("bhopal")) {
    reply = "Showing PGs in Bhopal 👇";
    document.getElementById("search").value = "Bhopal";
    searchPG();
  }

  if (input.toLowerCase().includes("pune")) {
    reply = "Showing PGs in Pune 👇";
    document.getElementById("search").value = "Pune";
    searchPG();
  }

  chat.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;

  document.getElementById("chatInput").value = "";
}
