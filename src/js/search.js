document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search');
  if (!searchInput) return;

  searchInput.addEventListener('input', function(e) {
    const searchText = e.target.value.toLowerCase();
    const appCards = document.querySelectorAll('.card');
    
    for (const card of appCards) {
      if (card.innerText.toLowerCase().includes(searchText)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    }
    // appCards.forEach(card => {
    //   if (card.innerText.toLowerCase().includes(searchText)) {
    //     card.style.display = 'block';
    //   } else {
    //     card.style.display = 'none';
    //   }
    // });

    const visbleApps = [...appCards].filter(card => card.style.display === 'block');

    const totalsBadge = document.querySelector('[data-total]');
    if (totalsBadge) {
      if (visbleApps.length < parseInt(totalsBadge.getAttribute('data-total'))) {
        totalsBadge.innerHTML = `${visbleApps.length} / ${totalsBadge.getAttribute('data-total')}`;
      } else {
        totalsBadge.innerHTML = totalsBadge.getAttribute('data-total');
      }
    }
  });
}); 