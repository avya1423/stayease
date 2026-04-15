// 🔥 LOAD BASE DATA
let finalData = JSON.parse(localStorage.getItem("pgData")) || pgData;

// DISPLAY
function display(data){
  let html = "";

  data.forEach(pg=>{
    html += `
    <div class="card">
      <img src="${pg.image}">
      <div class="content">
        <h3>${pg.name}</h3>
        <p>${pg.city}</p>
        <p class="price">${pg.price}</p>

        <button onclick="call('${pg.contact}')">📞 Call</button>
        <button onclick="route('${pg.name}')">📍 Route</button>
      </div>
    </div>`;
  });

  document.getElementById("results").innerHTML = html;
}

// LOAD PAGE
window.onload = ()=>{
  display(finalData);
}

// SEARCH
function searchPG(){
  let val = search.value.toLowerCase();
  let filtered = finalData.filter(pg =>
    pg.city.toLowerCase().includes(val)
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
