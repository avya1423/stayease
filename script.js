let pgDataLocal = JSON.parse(localStorage.getItem("pgData")) || [];
let finalData = [...pgData, ...pgDataLocal];

window.onload = function() {
  displayPG(finalData);
};

function displayPG(data) {
  let resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  data.forEach(pg => {
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

function searchPG() {
  let input = document.getElementById("search").value.toLowerCase();

  let filtered = finalData.filter(pg =>
    pg.city.toLowerCase().includes(input)
  );

  displayPG(filtered);
}

function toggleChat() {
  let chat = document.getElementById("chatbox");
  chat.style.display = chat.style.display === "none" ? "block" : "none";
}

function sendMessage() {
  let input = document.getElementById("chatInput").value;
  let chat = document.getElementById("chatMessages");

  chat.innerHTML += `<p><b>You:</b> ${input}</p>`;

  if (input.toLowerCase().includes("bhopal")) {
    document.getElementById("search").value = "Bhopal";
    searchPG();
    chat.innerHTML += `<p><b>Bot:</b> Showing PGs in Bhopal 👇</p>`;
  } else {
    chat.innerHTML += `<p><b>Bot:</b> Try searching Bhopal 😊</p>`;
  }

  document.getElementById("chatInput").value = "";
}
