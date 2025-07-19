/**
 * FutureNav - Main JavaScript
 * script.js - Interactive functionality for the futuristic navigation experience
 * March 24, 2025
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const navbar = document.getElementById('navbar');
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section');
  const bgElements = document.querySelectorAll('.fixed > div');

  // Debug - vérifier si les éléments existent
  console.log('Mobile menu button:', mobileMenuButton);
  console.log('Mobile menu:', mobileMenu);

  // Mobile Menu Toggle - VERSION CORRIGÉE
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      console.log('Menu button clicked!'); // Debug
      
      const line1 = document.getElementById('line1');
      const line2 = document.getElementById('line2'); 
      const line3 = document.getElementById('line3');
      
      // Toggle active class
      mobileMenuButton.classList.toggle('active');
      
      // Animation des lignes du hamburger
      if (mobileMenuButton.classList.contains('active')) {
        if (line1) line1.style.transform = 'rotate(45deg) translate(2px, 2px)';
        if (line2) line2.style.opacity = '0';
        if (line3) line3.style.transform = 'rotate(-45deg) translate(2px, -2px)';
      } else {
        if (line1) line1.style.transform = 'rotate(0) translate(0, 0)';
        if (line2) line2.style.opacity = '1';
        if (line3) line3.style.transform = 'rotate(0) translate(0, 0)';
      }
      
      // Toggle du menu mobile - SOLUTION FORCÉE
      if (mobileMenu.classList.contains('open')) {
        // Fermer le menu
        mobileMenu.classList.remove('open');
        mobileMenu.style.height = '0px';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.visibility = 'hidden';
        console.log('Menu fermé');
      } else {
        // Ouvrir le menu
        mobileMenu.classList.add('open');
        mobileMenu.style.height = 'auto';
        mobileMenu.style.opacity = '1';
        mobileMenu.style.visibility = 'visible';
        mobileMenu.style.display = 'block';
        
        // Calculer la hauteur réelle
        const realHeight = mobileMenu.scrollHeight;
        mobileMenu.style.height = '0px';
        setTimeout(() => {
          mobileMenu.style.height = realHeight + 'px';
        }, 10);
        
        console.log('Menu ouvert, hauteur:', realHeight);
      }
    });
  }

  // Close mobile menu when a link is clicked - VERSION CORRIGÉE
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      console.log('Mobile nav link clicked!'); // Debug
      
      const line1 = document.getElementById('line1');
      const line2 = document.getElementById('line2');
      const line3 = document.getElementById('line3');
      
      // Reset hamburger
      mobileMenuButton.classList.remove('active');
      if (line1) line1.style.transform = 'rotate(0) translate(0, 0)';
      if (line2) line2.style.opacity = '1'; 
      if (line3) line3.style.transform = 'rotate(0) translate(0, 0)';
      
      // Fermer le menu
      mobileMenu.classList.remove('open');
      mobileMenu.style.height = '0px';
      mobileMenu.style.opacity = '0';
      mobileMenu.style.visibility = 'hidden';
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    highlightCurrentSection();
  });

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Adjust for navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Highlight the section briefly
        targetSection.classList.add('section-highlight');
        setTimeout(() => {
          targetSection.classList.remove('section-highlight');
        }, 1000);
      }
    });
  });

  // Highlight active section in navbar
  function highlightCurrentSection() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
    
    mobileNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Scroll animations for sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    section.classList.add('section-hidden');
    observer.observe(section);
  });

  // Initialize active section on page load
  highlightCurrentSection();
  
  // Make header text visible with animation
  setTimeout(() => {
    const headerText = document.querySelector('.text-6xl');
    if (headerText) {
      headerText.style.opacity = 1;
      headerText.style.transform = 'translateY(0)';
    }
  }, 300);
});

 
        document.getElementById('contact-form').addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            const originalContent = submitBtn.innerHTML;
            
            // Afficher notification de chargement
            showNotification('Envoi en cours...', 'loading');
            
            // Désactiver le bouton pendant l'envoi
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <div class="flex items-center justify-center gap-2">
                    <div class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span class="bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">Envoi...</span>
                </div>
            `;
            
            // Récupérer les données du formulaire
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            try {
                // Validation côté client
                if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                    throw new Error('Tous les champs sont requis');
                }
                
                // Envoyer vers l'API Vercel
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    showNotification('✅ Message envoyé avec succès !', 'success');
                    document.getElementById('contact-form').reset();
                } else {
                    throw new Error(result.error || 'Erreur lors de l\'envoi');
                }
            } catch (error) {
                console.error('Erreur:', error);
                showNotification(`❌ ${error.message}`, 'error');
            } finally {
                // Réactiver le bouton
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
            }
        });

        function showNotification(message, type) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.className = `notification ${type}`;
            notification.classList.add('show');
            
            const duration = type === 'success' ? 5000 : (type === 'error' ? 7000 : 3000);
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, duration);
        }
    