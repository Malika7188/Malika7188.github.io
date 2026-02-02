// Intersection Observer for scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  },
  { threshold: 0.1 }
);

// Observe all elements with slide-in class
document.querySelectorAll('.slide-in').forEach((element) => {
  observer.observe(element);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// Create floating particles effect
function createParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  document.body.appendChild(particlesContainer);

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = Math.random() * 5 + 'px';
    particle.style.height = particle.style.width;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.setProperty('--tx', Math.random() * 200 - 100 + 'px');
    particle.style.setProperty('--ty', Math.random() * 200 - 100 + 'px');
    particle.style.animationDelay = Math.random() * 3 + 's';
    particlesContainer.appendChild(particle);
  }
}

// Initialize particles
createParticles();

// Ensure the typing takes place entirely within the container
document.addEventListener('DOMContentLoaded', function () {
  const textElement = document.getElementById('animated-text');
  const text = textElement.innerHTML;

  function typeText(element, text, speed, callback) {
    let index = 0;
    element.innerHTML = ''; // Clear the content for typing effect
    const interval = setInterval(() => {
      element.innerHTML += text[index];
      index++;
      if (index === text.length) {
        clearInterval(interval);
        if (callback) callback(); // Call the callback once typing is complete
      }
    }, speed);
  }

  function animateText() {
    typeText(textElement, text, 150, function () {
      setTimeout(animateText, 1000); // Restart typing after a short delay
    });
  }

  animateText(); // Start the animation on page load
});

// Skill scrolling section with hover pause functionality
document.addEventListener('DOMContentLoaded', function () {
  const skillList = document.querySelector('.skill-list');

  // Function to pause animation
  skillList.addEventListener('mouseenter', function () {
    skillList.style.animationPlayState = 'paused';
  });

  // Function to resume animation
  skillList.addEventListener('mouseleave', function () {
    skillList.style.animationPlayState = 'running';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const typedElement = document.querySelector(".typed");
  const cursorElement = document.querySelector(".typed-cursor");
  const items = typedElement.getAttribute("data-typed-items").split(",").map(item => item.trim()).filter(item => item);
  
  // Create a span for the underline
  const underline = document.createElement("span");
  underline.classList.add("underline");
  typedElement.appendChild(underline);

  let itemIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const delayBetweenItems = 1500;

  function type() {
    const currentItem = items[itemIndex];
    if (!isDeleting && charIndex < currentItem.length) {
      typedElement.textContent += currentItem.charAt(charIndex);
      charIndex++;
      underline.style.width = (charIndex / currentItem.length) * 100 + "%";  // Adjust the width of the underline
      setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
