function openLogin(){
  loginBox.style.display="block";
}

function login(){
  auth.signInWithEmailAndPassword(email.value,password.value)
  .then(()=>alert("Login success"))
  .catch(e=>alert(e.message));
}

function signup(){
  auth.createUserWithEmailAndPassword(email.value,password.value)
  .then(()=>alert("Account created"))
  .catch(e=>alert(e.message));
}

// 🔥 LOAD DATA
let allData=[];

db.collection("pgs").onSnapshot(snapshot=>{
  allData=[];

  snapshot.forEach(doc=>{
    allData.push(doc.data());
  });

  display(allData);
});

function display(data){
  let html="";

  data.forEach(pg=>{
    html+=`
    <div class="card">
      <img src="${pg.image}">
      <div class="card-content">
        <h3>${pg.name}</h3>
        <p>📍 ${pg.city}</p>
        <p>💰 ${pg.price}</p>

        <a href="tel:${pg.contact}">
          <button>📞 Call</button>
        </a>

        <a href="https://www.google.com/maps/dir/?api=1&destination=${pg.name}" target="_blank">
          <button>📍 Route</button>
        </a>
      </div>
    </div>`;
  });

  results.innerHTML=html;
}

// 🔍 SEARCH
function searchPG(){
  let val=search.value.toLowerCase();

  let filtered=allData.filter(pg =>
    pg.city.toLowerCase().includes(val)
  );

  display(filtered);
}
