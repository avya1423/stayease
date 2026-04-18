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

// ON LOAD (FINAL)
window.onload = function(){

  let user = localStorage.getItem("user");

  // Loader hide
  let loader = document.getElementById("loader");
  if(loader) loader.style.display = "none";

  if(user){
    document.getElementById("loginModal").style.display="none";
    document.getElementById("userName").innerText = "Hi, " + user;

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

  display(pgData);

  alert("Welcome " + name + " 🎉");
}

// GUEST LOGIN
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

// CALL
function call(num){
  window.location.href="tel:"+num;
}

// ROUTE
function route(name){
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${name}`);
}

// FAV SAVE
function fav(name){
  let favs = JSON.parse(localStorage.getItem("favPG")) || [];

  if(!favs.includes(name)){
    favs.push(name);
    localStorage.setItem("favPG", JSON.stringify(favs));
    alert("Saved ❤️");
  }
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
(cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/script.js b/script.js
index 64fd3018eba0ef5173319dd80629b43bdb83860f..4456de41a02b1f8ff8188dc6e21a04639246a228 100644
--- a/script.js
+++ b/script.js
@@ -1,135 +1,198 @@
 let finalData = pgData;
 
 // DISPLAY
 function display(data){
+  if(!data.length){
+    document.getElementById("results").innerHTML = `<div class="no-results">No PG found. Try another city or keyword.</div>`;
+    return;
+  }
+
   let html="";
 
   data.forEach(pg=>{
     html+=`
     <div class="card">
       <img src="${pg.image}">
       <div class="content">
+        <span class="tag">Popular Choice</span>
         <h3>${pg.name}</h3>
         <p>${pg.city}</p>
         <p class="price">${pg.price}</p>
 
-        <button onclick="call('${pg.contact}')">📞 Call</button>
-        <button onclick="route('${pg.name}')">📍 Route</button>
-        <button onclick="fav('${pg.name}')">❤️</button>
+        <button class="btn-animated" onclick="call('${pg.contact}')">📞 Call</button>
+        <button class="btn-animated" onclick="route('${pg.name}')">📍 Route</button>
+        <button class="btn-animated" onclick="fav('${pg.name}')">❤️ Save</button>
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
 
+  if(!email.includes("@")){
+    alert("Enter valid email ❌");
+    return;
+  }
+
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
 
+function searchOnEnter(event){
+  if(event.key === "Enter") searchPG();
+}
+
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
-  window.open(`https://www.google.com/maps/dir/?api=1&destination=${name}`);
+  window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(name)}`);
 }
 
 function fav(name){
   alert(name+" saved ❤️");
 }
 
 // CHATBOT
 function toggleChat(){
   let box = document.getElementById("chatBox");
   box.style.display = box.style.display==="block"?"none":"block";
 }
 
+function scrollToResults(){
+  document.getElementById("results").scrollIntoView({ behavior:"smooth" });
+}
+
 function sendMsg(){
-  let msg = document.getElementById("chatInput").value.toLowerCase();
-  let reply = "Try searching PG 😄";
+  const input = document.getElementById("chatInput");
+  const output = document.getElementById("chatOutput");
+  const raw = input.value.trim();
+  const msg = raw.toLowerCase();
+  if(!raw) return;
+
+  let reply = "Try searching by city (Bhopal, Delhi, Mumbai, Pune) 😄";
+
+  if(msg.includes("bhopal")) reply="Bhopal has multiple options. Use search and click Call for instant contact 👍";
+  else if(msg.includes("delhi")) reply="Delhi listings are available. Filter city to quickly compare PGs.";
+  else if(msg.includes("mumbai")) reply="Mumbai PGs are shown in the main list. You can check route and call directly.";
+  else if(msg.includes("pune")) reply="Pune options are available with contact details and route button.";
+  else if(msg.includes("price") || msg.includes("cost")) reply="Price is shown on every card. Open results and compare quickly.";
+  else if(msg.includes("contact") || msg.includes("call")) reply="Tap 📞 Call on any PG card to connect directly.";
+  else if(msg.includes("route") || msg.includes("location")) reply="Tap 📍 Route to open Google Maps direction.";
+
+  output.innerHTML += `<div class="chat-line user"><strong>You:</strong> ${escapeHTML(raw)}</div>`;
+  output.innerHTML += `<div class="chat-line bot"><strong>Bot:</strong> ${escapeHTML(reply)}</div>`;
+  output.scrollTop = output.scrollHeight;
+  input.value = "";
+}
 
-  if(msg.includes("bhopal")) reply="Bhopal me best PG available 👍";
+function chatOnEnter(event){
+  if(event.key === "Enter") sendMsg();
+}
 
-  document.getElementById("chatOutput").innerHTML += `<p>You: ${msg}</p>`;
-  document.getElementById("chatOutput").innerHTML += `<p>Bot: ${reply}</p>`;
+function setQuickMsg(text){
+  const input = document.getElementById("chatInput");
+  input.value = text;
+  sendMsg();
 }
+
+function escapeHTML(text){
+  const div = document.createElement("div");
+  div.innerText = text;
+  return div.innerHTML;
+}
+
+window.addEventListener("click", function(event){
+  const profile = document.querySelector(".profile-container");
+  const profileMenu = document.getElementById("profileMenu");
+  const chatWrap = document.querySelector(".chatbot");
+  const chatBox = document.getElementById("chatBox");
+
+  if(profile && !profile.contains(event.target)){
+    profileMenu.style.display = "none";
+  }
+
+  if(chatWrap && !chatWrap.contains(event.target)){
+    chatBox.style.display = "none";
+  }
+});
 
EOF
)
