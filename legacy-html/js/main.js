// ===== Navegación móvil =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navMenu.classList.remove('active');
        }
    });

    // Animación suave al hacer scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Verificar si el usuario está logueado
    checkLoginStatus();
});

// ===== Verificar estado de login =====
function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    const loginBtn = document.querySelector('.btn-login');
    
    if (currentUser && loginBtn) {
        const user = JSON.parse(currentUser);
        loginBtn.textContent = user.nombre;
        loginBtn.href = '#';
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showUserMenu();
        });
    }
}

// ===== Menú de usuario =====
function showUserMenu() {
    const confirm = window.confirm('¿Deseas cerrar sesión?');
    if (confirm) {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}

// ===== Animaciones al hacer scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animaciones a elementos
document.querySelectorAll('.about-card, .activity-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
