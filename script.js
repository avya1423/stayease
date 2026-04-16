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

  results.innerHTML=html;
}

// LOAD
window.onload=()=>display(finalData);

// SEARCH
function searchPG(){
  let val=search.value.toLowerCase();
  display(finalData.filter(p=>p.city.toLowerCase().includes(val)));
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
  chatBox.style.display=chatBox.style.display==="block"?"none":"block";
}

function sendMsg(){
  let msg=chatInput.value.toLowerCase();
  let reply="Try searching PG 😄";

  if(msg.includes("bhopal")) reply="Bhopal me best PG available 👍";

  chatOutput.innerHTML+=`<p>You: ${msg}</p>`;
  chatOutput.innerHTML+=`<p>Bot: ${reply}</p>`;
}
// CHECK LOGIN
window.onload = function(){

  let user = localStorage.getItem("user");

  if(user){
    document.getElementById("loginModal").style.display="none";
  }
};

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

  alert("Welcome " + name + " 🎉");
}

// GUEST
function continueGuest(){

  localStorage.setItem("user", "Guest");

  document.getElementById("loginModal").style.display="none";
}
