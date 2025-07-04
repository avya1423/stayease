
function filterPGs() {
  const input = document.getElementById('cityFilter').value.toLowerCase();
  const cards = document.querySelectorAll('.pg-card');
  cards.forEach(card => {
    const city = card.getAttribute('data-city').toLowerCase();
    card.style.display = city.includes(input) ? 'block' : 'none';
  });
}
