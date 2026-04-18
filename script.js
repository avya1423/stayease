let finalData = pgData;

// DISPLAY
function display(data){

  if(!data.length){
    document.getElementById("results").innerHTML =
      `<div class="no-results">No PG found 😔</div>`;
    return;
  }

  let html="";

  data.forEach(pg=>{
    html+=`
    <div class="card">
      <img src="${pg.image}">
      <div class="content">
        <span class="tag">Popular</span>
        <h3>${pg.name}</h3>
        <p>${pg.city}</p>
        <p class="price">${pg.price}</p>

        <button onclick="call('${pg.contact}')">📞 Call</button>
        <button onclick="route('${pg.name}')">📍 Route</button>
        <button onclick="fav('${pg.name}')">❤️ Save</button>
      </div>
    </div>`;
  });

  document.getElementById("results").innerHTML = html;
}

// ON LOAD
window.onload = function(){

  let user = localStorage.getItem("user");

  // loader hide
  let loader = document.getElementById("loader");
  if(loader) loader.style.display="none";

  if(user){
    document.getElementById("loginModal").style.display="none";
    document.getElementById("userName").innerText = "Hi, " + user;
    display(pgData);
  }

  // PROFILE SETTINGS (Guest hide)
  if(user === "Guest"){
    document.getElementById("profileSettings").style.display="none";
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

  if(!email.includes("@")){
    alert("Enter valid email ❌");
    return;
  }

  localStorage.setItem("user", name);

  document.getElementById("loginModal").style.display="none";
  document.getElementById("userName").innerText = "Hi, " + name;

  display(pgData);

  alert("Welcome " + name + " 🎉");
}

// GUEST
function continueGuest(){

  localStorage.setItem("user", "Guest");

  document.getElementById("loginModal").style.display="none";
  document.getElementById("userName").innerText = "Hi, Guest";

  display(pgData);
}

// LOGOUT
function logout(){
  localStorage.removeItem("user");
  alert("Logged out 👋");
  location.reload();
}

// UPDATE PROFILE (NEW 🔥)
function updateProfile(){

  let newName = document.getElementById("newName").value;

  if(newName){
    localStorage.setItem("user", newName);
    document.getElementById("userName").innerText = "Hi, " + newName;
    alert("Profile Updated ✅");
  }
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

// ENTER SEARCH
function searchOnEnter(e){
  if(e.key==="Enter") searchPG();
}

// FILTER
function filterCity(city){
  if(city==="") display(finalData);
  else display(finalData.filter(p=>p.city===city));
}

// CALL
function call(num){
  window.location.href="tel:"+num;
}

// ROUTE
function route(name){
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(name)}`);
}

// FAV SAVE (UPGRADE 🔥)
function fav(name){
  let favs = JSON.parse(localStorage.getItem("favPG")) || [];

  if(!favs.includes(name)){
    favs.push(name);
    localStorage.setItem("favPG", JSON.stringify(favs));
    alert("Saved ❤️");
  } else {
    alert("Already saved 👍");
  }
}

// CHAT
function toggleChat(){
  let box = document.getElementById("chatBox");
  box.style.display = box.style.display==="block"?"none":"block";
}

function sendMsg(){
  let input = document.getElementById("chatInput");
  let output = document.getElementById("chatOutput");

  let msg = input.value.trim().toLowerCase();
  if(!msg) return;

  let reply = "Try searching PG 😄";

  if(msg.includes("bhopal")) reply="Bhopal me best PG available 👍";
  else if(msg.includes("delhi")) reply="Delhi PG available 👍";
  else if(msg.includes("price")) reply="Price card me likha hota hai 💰";
  else if(msg.includes("contact")) reply="📞 Call button use karo";

  output.innerHTML += `<p><b>You:</b> ${msg}</p>`;
  output.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;

  input.value="";
}

// ENTER CHAT
function chatOnEnter(e){
  if(e.key==="Enter") sendMsg();
}

// QUICK CHAT BUTTONS
function setQuickMsg(text){
  document.getElementById("chatInput").value = text;
  sendMsg();
}

// DARK MODE
function toggleDark(){
  document.body.classList.toggle("dark");
}

// PROFILE PIC LOAD
window.addEventListener("load", function(){
  let dp = localStorage.getItem("dp");
  if(dp){
    document.getElementById("profilePic").src = dp;
  }
});

// CHANGE DP
function changeDP(event){
  let file = event.target.files[0];

  let reader = new FileReader();

  reader.onload = function(e){
    let imgData = e.target.result;

    document.getElementById("profilePic").src = imgData;
    localStorage.setItem("dp", imgData);
  };

  reader.readAsDataURL(file);
}
