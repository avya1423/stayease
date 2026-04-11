let finalData = pgData;

window.onload = () => displayPG(finalData);

function displayPG(data) {
  let results = document.getElementById("results");
  results.innerHTML = "";

  data.forEach(pg => {
    results.innerHTML += `
      <div class="card">
        <img src="${pg.image}">
        <h3>${pg.name}</h3>
        <p>📍 ${pg.city}</p>
        <p>💰 ${pg.price}</p>
        <p>📞 ${pg.contact}</p>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${pg.name}" target="_blank">
          📍 Navigate
        </a>
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
  alert("Opening nearby PGs 📍");
  window.open("https://www.google.com/maps/search/pg+near+me");
}

function toggleChat() {
  let chat = document.getElementById("chatbox");
  chat.style.display = chat.style.display === "none" ? "block" : "none";
}

function sendMessage() {
  let input = document.getElementById("chatInput").value;
  let chat = document.getElementById("chatMessages");

  chat.innerHTML += `<p>You: ${input}</p>`;

  if(input.toLowerCase().includes("bhopal")){
    document.getElementById("search").value="Bhopal";
    searchPG();
    chat.innerHTML += `<p>Bot: Showing PG in Bhopal 👇</p>`;
  }
}
