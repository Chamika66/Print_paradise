const images = [
    "Images/5123181.jpg",
    "Images/5130798.jpg",
    "Images/Digital-Printing.png",
];

let currentImageIndex = 0;

function changeBackground() {
    const heroSection = document.getElementById("hero");
    currentImageIndex = (currentImageIndex + 1) % images.length; // Loop through images
    heroSection.style.backgroundImage = `url(${images[currentImageIndex]})`;
}

// Change the background every 5 seconds
setInterval(changeBackground, 5000);
