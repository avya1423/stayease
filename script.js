let finalData = pgData;

// DISPLAY
function display(data){
  let html="";

  data.forEach(pg=>{
    html+=`
    <div class="card">
      <img src="${pg.image}">
      <div class="content">
        <h3>${pg.name}</h3>
        <p>${pg.city}</p>
        <p class="price">${pg.price}</p>

        <button onclick="call('${pg.contact}')">📞 Call</button>
        <button onclick="route('${pg.name}')">📍 Route</button>
        <button onclick="fav('${pg.name}')">❤️</button>
      </div>
    </div>`;
  });

  document.getElementById("results").innerHTML = html;
}

// ON LOAD (FINAL FIXED)
window.onload = function(){

  let user = localStorage.getItem("user");

  if(user){
    document.getElementById("loginModal").style.display="none";
    document.getElementById("userName").innerText = "Hi, " + user;

    // 🔥 LOGIN KE BAAD PG SHOW
    display(pgData);
  }
};

// PROFILE TOGGLE
function toggleProfile(){
  let menu = document.getElementById("profileMenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// LOGIN
function loginUser(){

  let name = document.getElementById("username").value;
  let email = document.getElementById("email").value;

  if(!name || !email){
    alert("Fill details ❌");
    return;
  }

  localStorage.setItem("user", name);

  document.getElementById("loginModal").style.display="none";
  document.getElementById("userName").innerText = "Hi, " + name;

  // 🔥 LOGIN KE BAAD PG SHOW
  display(pgData);

  alert("Welcome " + name + " 🎉");
}

// GUEST LOGIN
function continueGuest(){

  localStorage.setItem("user", "Guest");

  document.getElementById("loginModal").style.display="none";
  document.getElementById("userName").innerText = "Hi, Guest";

  // 🔥 GUEST KE BAAD BHI PG SHOW
  display(pgData);
}

// LOGOUT (FINAL FIXED)
function logout(){

  localStorage.removeItem("user");

  alert("Logged out 👋");

  location.reload();
}

// SEARCH
function searchPG(){
  let val = document.getElementById("search").value.toLowerCase();

  let filtered = finalData.filter(p =>
    p.city.toLowerCase().includes(val) ||
    p.name.toLowerCase().includes(val)
  );

  display(filtered);
}

// FILTER
function filterCity(city){
  if(city==="") display(finalData);
  else display(finalData.filter(p=>p.city===city));
}

// BUTTONS
function call(num){
  window.location.href="tel:"+num;
}

function route(name){
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${name}`);
}

function fav(name){
  alert(name+" saved ❤️");
}

// CHATBOT
function toggleChat(){
  let box = document.getElementById("chatBox");
  box.style.display = box.style.display==="block"?"none":"block";
}

function sendMsg(){
  let msg = document.getElementById("chatInput").value.toLowerCase();
  let reply = "Try searching PG 😄";

  if(msg.includes("bhopal")) reply="Bhopal me best PG available 👍";

  document.getElementById("chatOutput").innerHTML += `<p>You: ${msg}</p>`;
  document.getElementById("chatOutput").innerHTML += `<p>Bot: ${reply}</p>`;
}
