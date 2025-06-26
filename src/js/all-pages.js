const emboldenNavLinks = () => {
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
        } else if  (matchType === 'csv') {

            const csv = link.getAttribute('data-csv');
            const matches = csv.split(',')
            isMatch = matches.includes(currentPath)

        }
        
        if (isMatch) {
            link.classList.add('font-bold');
        }
    });
}

const toggleListStyle = () => {
    // <button class="list-format" aria-controls=".item-list" data-add-class="table" data-remove-class="cards">table</button>
    const buttons = document.querySelectorAll('button.list-format');
    buttons && buttons.forEach(button => {
        button.addEventListener('click', () => {
            const target = document.querySelector(
                button.getAttribute('aria-controls')
            );
            if (target){
                target.classList.add(button.getAttribute('data-add-class'));
                target.classList.remove(button.getAttribute('data-remove-class'));

                buttons.forEach(button => button.classList.remove('selected'));
                button.classList.add('selected');
            }
        });
    });
}

/**
 * Sort the items in an .item-list
 */
const cardSorting = () => {

    const sortingButtons = document.querySelectorAll('.sorting button');

    const sortCards = (appCards, { sortBy, direction, dataType}) => {
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
    }

    sortingButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            const sortBy = button.getAttribute('data-sort-by'); // a CSV of sorting
            const direction = button.getAttribute('data-direction');
            const dataType = button.getAttribute('data-type');
            const appCards = Array.from(document.querySelectorAll('.item:not(.list-header)'));

            const selectors = sortBy.split(',');

            for (selector of selectors){
                sortCards(appCards, { sortBy: selector, direction, dataType});
            }

            sortingButtons.forEach(button => button.classList.remove('selected'));
            button.classList.add('selected');

            const container = appCards[0].parentNode;
            appCards.forEach(card => container.appendChild(card));
        });
    });



    const sortByRatingButton = document.querySelector('#sortByRating');
    sortByRatingButton && ['/categories/', '/vendors/'].forEach((i) => {
        if (location.pathname.startsWith(i)) {
            sortByRatingButton.click();
        }
    })
}



const scrollToTop = () => {
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
}


// document.addEventListener("DOMContentLoaded", () => {
//     const scrollToTopBtn = document.getElementById("scroll-to-top");
  
//     // Show/hide button based on scroll position
//     window.addEventListener("scroll", () => {
//       if (window.scrollY > 200) {
//         scrollToTopBtn.classList.remove("opacity-0", "invisible");
//         scrollToTopBtn.classList.add("opacity-100", "visible");
//       } else {
//         scrollToTopBtn.classList.remove("opacity-100", "visible");
//         scrollToTopBtn.classList.add("opacity-0", "invisible");
//       }
//     });
  
//     // Smooth scroll to top
//     scrollToTopBtn.addEventListener("click", () => {
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     });
//   });


const tooltips = () => {
    if (!tippy) {
        console.log('tippy not found');
        return;
    }
    // Find all elements with data-toggle="tooltip"
    const tooltipElements = document.querySelectorAll('[data-toggle="tooltip"]');

    // Initialize Tippy for each element
    tooltipElements.forEach(element => {
        // console.log('tippy: ', element.getAttribute('title'))
        tippy(element, {
            content: element.getAttribute('title'), // Get content from title attribute
            placement: element.getAttribute('data-placement') || 'bottom', // Default to bottom
            arrow: true, // Show arrow
            animation: 'fade', // Smooth fade animation
            // theme: 'light', // Match Tailwind style
            onShow(instance) {
                // console.log('tooltip shown');
                // Remove title attribute to prevent native tooltip
                instance.reference.removeAttribute('title');
            }
        });
    });
}



 const init = () => {

    toggleListStyle();
    cardSorting();
    emboldenNavLinks();
    scrollToTop();
    tooltips();

    const headerNode = document.querySelector('.header-wrapper');

    if (headerNode) {
        headerNode.setAttribute('data-hostname', location.hostname);
    }

}
document.addEventListener('DOMContentLoaded', init);