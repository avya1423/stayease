function openLogin(){
  document.getElementById("loginBox").style.display="block";
}

// LOGIN
function login(){
  firebase.auth().signInWithEmailAndPassword(
    email.value,password.value
  ).then(()=>{
    alert("Login success");
    loginBox.style.display="none";
  }).catch(e=>alert(e.message));
}

// SIGNUP
function signup(){
  firebase.auth().createUserWithEmailAndPassword(
    email.value,password.value
  ).then(()=>alert("Account created"))
  .catch(e=>alert(e.message));
}

// LOAD DATA
db.collection("pgs").onSnapshot(snapshot=>{
  let html="";

  snapshot.forEach(doc=>{
    let pg=doc.data();

    html+=`
    <div class="card">
      <h3>${pg.name}</h3>
      <p>${pg.city}</p>
      <p>${pg.price}</p>

      <a href="tel:${pg.contact}">
        <button>Call</button>
      </a>
    </div>`;
  });

  document.getElementById("results").innerHTML=html;
});

// SEARCH
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

    results.innerHTML=html;
  });
}
