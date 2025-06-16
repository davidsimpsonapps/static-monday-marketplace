const init = () => {
    // Get the current URL path
    const currentPath = window.location.pathname;

    // Find all navigation links
    const navLinks = document.querySelectorAll('nav a');

    // Check each link and add font-bold if it matches the current path
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        const matchType = link.getAttribute('data-match');
        
        let isMatch = false;
        
        if (matchType === 'exact') {
            // For exact matches, the paths must be identical
            isMatch = currentPath === linkPath;
        } else if (matchType === 'include') {
            // For include matches, the current path must start with the link path
            isMatch = currentPath.startsWith(linkPath);
        }
        
        if (isMatch) {
            link.classList.add('font-bold');
        }
    });


    const sortingButtons = document.querySelectorAll('.sorting button');

    sortingButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sortBy = button.getAttribute('data-sort-by');
            const direction = button.getAttribute('data-direction');
            const dataType = button.getAttribute('data-type');
            const appCards = Array.from(document.querySelectorAll('.card'));

            appCards.sort((a, b) => {
                let aValue = a.getAttribute(sortBy);
                let bValue = b.getAttribute(sortBy);

                // TODO cast to number, date or string if dataType is set
                if (dataType === 'number') {
                    aValue = Number(aValue);
                    bValue = Number(bValue);
                } else if (dataType === 'date') {
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                }
                if (dataType === 'string') {
                    if (direction === 'ASC') {
                        return aValue.localeCompare(bValue); 
                    } else {
                        return bValue.localeCompare(aValue);
                    }
                } else {
                    // compare dates, or numbers
                    if (direction === 'ASC') {
                        return aValue - bValue;
                    } else {
                        return bValue - aValue;
                    }
                }
            });
            
            const container = appCards[0].parentNode;
            appCards.forEach(card => container.appendChild(card));
        });
    });

    const headerNode = document.querySelector('.header-wrapper');

    if (headerNode) {
        headerNode.setAttribute('data-hostname', location.hostname);
    }

}


document.addEventListener("DOMContentLoaded", () => {
    const scrollToTopBtn = document.getElementById("scroll-to-top");
  
    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        scrollToTopBtn.classList.remove("opacity-0", "invisible");
        scrollToTopBtn.classList.add("opacity-100", "visible");
      } else {
        scrollToTopBtn.classList.remove("opacity-100", "visible");
        scrollToTopBtn.classList.add("opacity-0", "invisible");
      }
    });
  
    // Smooth scroll to top
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });


document.addEventListener('DOMContentLoaded', init);