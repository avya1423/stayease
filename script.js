function openLogin(){
  document.getElementById("loginBox").style.display="block";
}

function login(){
  firebase.auth().signInWithEmailAndPassword(email.value,password.value)
  .then(()=>{
    alert("Login success");
    document.getElementById("loginBox").style.display="none";
  })
  .catch(e=>alert(e.message));
}

function signup(){
  firebase.auth().createUserWithEmailAndPassword(email.value,password.value)
  .then(()=>alert("Account created"))
  .catch(e=>alert(e.message));
}

function logout(){
  firebase.auth().signOut();
}

// 🔥 LIVE DATA
db.collection("pgs").onSnapshot(snapshot=>{
  let html="";

  snapshot.forEach(doc=>{
    let pg=doc.data();

    html+=`
    <div class="card">
      <h3>${pg.name}</h3>
      <p>${pg.city}</p>
      <p>${pg.price}</p>

      <button onclick="save('${pg.name}')">❤️</button>
      <button onclick="book('${pg.name}')">📅</button>

      <a href="tel:${pg.contact}">
        <button>📞</button>
      </a>
    </div>`;
  });

  document.getElementById("results").innerHTML=html;
});

function searchPG(){
  let val=search.value.toLowerCase();

  db.collection("pgs").get().then(snapshot=>{
    let html="";

    snapshot.forEach(doc=>{
      let pg=doc.data();

      if(pg.city.toLowerCase().includes(val)){
        html+=`<div class="card">
        <h3>${pg.name}</h3>
        <p>${pg.city}</p>
        </div>`;
      }
    });

    document.getElementById("results").innerHTML=html;
  });
}

function save(n){
  if(!firebase.auth().currentUser){
    alert("Login required");
    return;
  }
  alert("Saved "+n);
}

function book(n){
  if(!firebase.auth().currentUser){
    alert("Login required");
    return;
  }
  alert("Booked "+n);
}
