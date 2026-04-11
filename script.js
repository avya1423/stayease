// 🔥 LOAD DATA REAL TIME
db.collection("pgs").onSnapshot(snapshot => {

  let html = "";

  snapshot.forEach(doc => {
    let pg = doc.data();

    html += `
    <div class="card">
      <h3>${pg.name}</h3>
      <p>📍 ${pg.city}</p>
      <p>💰 ${pg.price}</p>

      <div class="btns">
        <button onclick="save('${pg.name}')">❤️ Save</button>
        <button onclick="book('${pg.name}')">📅 Book</button>

        <a href="tel:${pg.contact}">
          <button>📞 Call</button>
        </a>

        <a href="https://www.google.com/maps/dir/?api=1&destination=${pg.name}" target="_blank">
          <button>📍 Route</button>
        </a>
      </div>
    </div>
    `;
  });

  document.getElementById("results").innerHTML = html;
});

// 🔍 SEARCH
function searchPG(){
  let val = document.getElementById("search").value.toLowerCase();

  db.collection("pgs").get().then(snapshot => {
    let html = "";

    snapshot.forEach(doc => {
      let pg = doc.data();

      if(pg.city.toLowerCase().includes(val)){
        html += `<div class="card">
          <h3>${pg.name}</h3>
          <p>${pg.city}</p>
          <p>${pg.price}</p>
        </div>`;
      }
    });

    document.getElementById("results").innerHTML = html;
  });
}

// ❤️ SAVE
function save(name){
  alert(name + " saved ❤️");
}

// 📅 BOOK
function book(name){
  alert("Booked " + name + " ✅");
}

// 🔐 LOGOUT
function logout(){
  firebase.auth().signOut();
}
