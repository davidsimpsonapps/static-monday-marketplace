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
