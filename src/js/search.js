document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search');
  if (!searchInput) return;

  // Debounce function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Search function
  function performSearch(e) {
    const searchText = e.target.value.toLowerCase();
    const allItems = document.querySelectorAll('.search-item');
    
    // not async `allItems.forEach` so we can calculate the total number of visible apps
    for (const item of allItems) {
      if (item.innerText.toLowerCase().includes(searchText)) {
        item.classList.remove('hide-me');
      } else {
        item.classList.add('hide-me');
      }
    }

    const visbleApps = [...allItems].filter(card => card.style.display === 'block');
    const totalsBadge = document.querySelector('[data-total]');
    
    if (totalsBadge) {
      if (visbleApps.length < parseInt(totalsBadge.getAttribute('data-total'))) {
        totalsBadge.innerHTML = `${visbleApps.length} / ${totalsBadge.getAttribute('data-total')}`;
      } else {
        totalsBadge.innerHTML = totalsBadge.getAttribute('data-total');
      }
    }
  }

  // Debounced search function
  const debouncedSearch = debounce(performSearch, 500);

  // Add event listener with debounced search
  searchInput.addEventListener('input', debouncedSearch);
}); 