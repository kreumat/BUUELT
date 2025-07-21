/**
 * BUUELTS - Sponsor Popup
 * 
 * Creates a popup that displays an image and redirects to about.html when the image is clicked.
 * Includes a close button to dismiss the popup without redirection.
 * The popup only appears if 10 minutes have passed since it was last shown.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the index page
    if (!window.location.pathname.endsWith('index.html') && 
        !window.location.pathname.endsWith('/') && 
        !window.location.pathname.endsWith('/BUUELTS/')) {
        return;
    }
    
    // Check if popup should be shown
    const shouldShowPopup = checkPopupTiming();
    
    if (shouldShowPopup) {
        createPopup();
    }
});

/**
 * Checks if the popup should be shown based on the last time it was displayed
 * @returns {boolean} True if the popup should be shown, false otherwise
 */
function checkPopupTiming() {
    const lastShown = localStorage.getItem('sponsorPopupLastShown');
    const currentTime = new Date().getTime();
    
    // If never shown before, or if 10 minutes (600000 milliseconds) have passed
    if (!lastShown || (currentTime - parseInt(lastShown)) > 600000) {
        return true;
    }
    
    return false;
}

/**
 * Creates and displays the popup with the sponsor image and close button
 */
function createPopup() {
    // Create popup elements
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'popup-overlay';
    
    const popupContainer = document.createElement('div');
    popupContainer.className = 'popup-container';
    
    // Create image wrapper for better styling control
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'popup-image-wrapper';
    
    const popupImage = document.createElement('img');
    popupImage.src = 'images/sponsorphoto.png';
    popupImage.alt = 'Sponsor Information';
    popupImage.className = 'popup-image';
    
    // Create new close button below the image
    const closeButton = document.createElement('button');
    closeButton.className = 'popup-button-close';
    closeButton.textContent = 'Close';
    closeButton.setAttribute('aria-label', 'Close popup');
    
    // Create button container for centering
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'popup-button-container';
    buttonContainer.appendChild(closeButton);
    
    // Append elements
    imageWrapper.appendChild(popupImage);
    popupContainer.appendChild(imageWrapper);
    popupContainer.appendChild(buttonContainer);
    popupOverlay.appendChild(popupContainer);
    document.body.appendChild(popupOverlay);
    
    // Add click event to image only for redirection
    popupImage.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent event from bubbling up
        window.location.href = 'about.html';
    });
    
    // Add click event to close button
    closeButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent event from bubbling up
        closePopup();
    });
    
    // Add click event to overlay for dismissing
    popupOverlay.addEventListener('click', function(event) {
        // Only close if clicking the overlay itself, not its children
        if (event.target === popupOverlay) {
            closePopup();
        }
    });
    
    // Record the time when popup was shown
    localStorage.setItem('sponsorPopupLastShown', new Date().getTime().toString());
}

/**
 * Closes the popup
 */
function closePopup() {
    const popupOverlay = document.querySelector('.popup-overlay');
    if (popupOverlay) {
        // Add fade-out animation
        popupOverlay.classList.add('fade-out');
        
        // Remove after animation completes
        setTimeout(function() {
            popupOverlay.remove();
        }, 300);
    }
}