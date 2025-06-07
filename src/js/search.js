document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search');
  if (!searchInput) return;

  searchInput.addEventListener('input', function(e) {
    const searchText = e.target.value.toLowerCase();
    const appCards = document.querySelectorAll('.card');
    
    appCards.forEach(card => {
      if (card.innerText.toLowerCase().includes(searchText)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}); 