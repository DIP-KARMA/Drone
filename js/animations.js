/**
 * Droner Website Animations
 * This file handles all 3D animations and effects for icons across the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all icons with 3D effects
    initializeIconEffects();
    
    // Add parallax effect to icons on mouse move
    addParallaxEffect();
});

/**
 * Initialize all icons with 3D floating effects
 */
function initializeIconEffects() {
    // Select all icons that should have 3D effects
    const allIcons = document.querySelectorAll('.service-icon, .career-icon, .contact-icon, .nav-brand-icon, .fa-drone, .feature-icon, [class*="fa-"]');
    
    // Add random delay to each icon for more natural movement
    allIcons.forEach(icon => {
        // Skip icons that already have animations applied
        if (icon.dataset.animationApplied) return;
        
        // Mark as processed
        icon.dataset.animationApplied = true;
        
        // Add floating animation class
        icon.classList.add('floating-3d-icon');
        
        // Set random animation parameters for variety
        const randomDelay = Math.random() * 3; // Random delay between 0-3s
        const randomDuration = 2 + Math.random() * 2; // Random duration between 2-4s
        const randomDepth = 0.05 + Math.random() * 0.15; // Random depth effect between 0.05-0.2
        
        // Apply custom animation properties
        icon.style.animationDelay = `${randomDelay}s`;
        icon.style.animationDuration = `${randomDuration}s`;
        icon.dataset.depth = randomDepth;
        
        // Add subtle rotation variation
        const randomRotation = Math.random() * 10 - 5; // Random rotation between -5 and 5 degrees
        icon.dataset.rotation = randomRotation;
        icon.style.transform = `rotate(${randomRotation}deg)`;
    });
}

/**
 * Add parallax effect to icons based on mouse movement
 */
function addParallaxEffect() {
    // Only add the event listener once
    if (window.parallaxInitialized) return;
    window.parallaxInitialized = true;
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        const allIcons = document.querySelectorAll('.floating-3d-icon');
        
        allIcons.forEach(icon => {
            const depth = parseFloat(icon.dataset.depth || 0.1);
            const moveX = mouseX * 20 * depth;
            const moveY = mouseY * 20 * depth;
            const rotation = parseFloat(icon.dataset.rotation || 0);
            
            // Apply transform with both translation and rotation
            icon.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotation}deg)`;
            
            // Add subtle shadow effect based on mouse position
            const shadowX = mouseX * 5;
            const shadowY = mouseY * 5;
            const shadowBlur = 10 + Math.abs(mouseX * mouseY) * 10;
            const shadowColor = 'rgba(0, 204, 255, 0.6)';
            
            icon.style.textShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}`;
        });
    });
}
