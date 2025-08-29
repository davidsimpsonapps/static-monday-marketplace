const TIMEOUT = 250;

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
    // Support both event and direct string input
    let searchText;
    if (typeof e === 'string') {
      searchText = e.toLowerCase();
      searchInput.value = e;
    } else {
      searchText = e.target.value.toLowerCase();
    }
    const allItems = document.querySelectorAll('.search-item');
    
    // not async `allItems.forEach` so we can calculate the total number of visible apps
    for (const item of allItems) {
      if (item.innerText.toLowerCase().includes(searchText)) {
        item.classList.remove('hide-me');
      } else {
        item.classList.add('hide-me');
      }
    }

    const totalsBadge = document.querySelector('[data-total]');
    
    if (totalsBadge) {
      const visbleApps = [...allItems].filter(card => card.classList.contains('hide-me') === false);

      if (visbleApps.length < parseInt(totalsBadge.getAttribute('data-total'))) {
        totalsBadge.innerText = `${visbleApps.length} / ${totalsBadge.getAttribute('data-total')}`;
      } else {
        totalsBadge.innerText = totalsBadge.getAttribute('data-total');
      }
    }

    // Update URL with ?q=searchTerm if not empty, else remove param
    if (searchText && searchText.length > 0) {
      const url = new URL(window.location);
      url.searchParams.set('q', searchInput.value);
      window.history.pushState({}, '', url);
    } else {
      const url = new URL(window.location);
      url.searchParams.delete('q');
      window.history.pushState({}, '', url.pathname);
    }
  }

  // Debounced search function
  const debouncedSearch = debounce(performSearch, TIMEOUT);

  // Add event listener with debounced search
  searchInput.addEventListener('input', debouncedSearch);

  // On page load, check for ?q=searchTerm and perform search if present
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  if (q) {
    searchInput.value = q;
    performSearch(q);
  }

  // Listen for browser navigation (back/forward) and update search accordingly
  window.addEventListener('popstate', function() {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      searchInput.value = q;
      performSearch(q);
    } else {
      searchInput.value = '';
      performSearch('');
    }
  });
}); 