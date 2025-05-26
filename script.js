// Datos de proyectos
const projects = [
    { 
        name: 'ApiFutbol', 
        category: 'app', 
        image: '/portafoliumGaboGarcia/images/ApiFutbol.png', 
        description: 'Aplicación para visualizar partidos de la liga Europea en tiempo real y locación, incluye un sistema de registro y logeo',
        githubUrl: 'https://github.com/GabrielGarciaRodri/ApiFutbol', 
        technologies: ['Vue3', 'Node.js', 'MongoDB', 'Express']
    },
    { 
        name: 'Music Player App', 
        category: 'app', 
        image: '/portafoliumGaboGarcia/images/musicapp.png', 
        description: 'Plataforma web responsiva para reproducir música, explorar álbumes y artistas. Diseño moderno con interfaz intuitiva y experiencia de usuario optimizada para todos los dispositivos.',
        githubUrl: 'https://github.com/GabrielGarciaRodri/Music-Player-App',
        technologies: ['JavaScript', 'CSS3', 'HTML5', 'Web Audio API']
    },
    { 
        name: 'SpaceX Dragon Control UI', 
        category: 'web', 
        image: '/portafoliumGaboGarcia/images/spacex.png', 
        description: 'Emulador de la interfaz de control de vuelo de SpaceX Dragon. Experiencia inmersiva con controles de simulación y información detallada del sistema de navegación espacial.',
        githubUrl: 'https://github.com/GabrielGarciaRodri/SpaceXProject', 
        technologies: [ 'WebGL', 'CSS3']
    }
];

// Crear partículas de fondo
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Crear tarjetas de proyecto
function createProjectCard(project) {
    const technologiesHtml = project.technologies ? 
        `<div class="technologies">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>` : '';
    
    
    
    const githubButton = project.githubUrl ? 
        `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-btn btn-github">
            <i class="fab fa-github"></i>
            Ver Código
        </a>` : '';
    
    return `
        <div class="project-card loading">
            <div class="project-image-container">
                <img src="${project.image}" alt="${project.name}" loading="lazy">
                <div class="project-overlay">
                    <div class="project-buttons">
                        ${githubButton}
                    </div>
                </div>
            </div>
            <div class="project-info">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                ${technologiesHtml}
            </div>
        </div>
    `;
}

// Filtrar proyectos
function filterProjects(category) {
    const projectGrid = document.getElementById('project-grid');
    const filteredProjects = category === 'all' ? projects : projects.filter(project => project.category === category);
    
    projectGrid.innerHTML = filteredProjects.map(createProjectCard).join('');
    
    // Animar tarjetas
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('loaded');
            }, index * 100);
        });
    }, 50);
}

// Navegación móvil
function setupMobileNav() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Ocultar/mostrar header en scroll
function setupHeaderScroll() {
    let lastScrollTop = 0;
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Animaciones de entrada
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.loading').forEach(el => {
        observer.observe(el);
    });
}

// Filtros de proyecto
function setupProjectFilters() {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            button.classList.add('active');
            // Filtrar proyectos
            filterProjects(button.getAttribute('data-filter'));
        });
    });
}

// Configuración de EmailJS
const EMAIL_CONFIG = {
    publicKey: 'zTWANgY6Zg-CUyqKv',  
    serviceId: 'service_lp66imp',    
    templateId: 'template_ue85y29' 
};

// Inicializar EmailJS
function initEmailJS() {
    emailjs.init(EMAIL_CONFIG.publicKey);
}

// Formulario de contacto
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Mostrar estado de carga
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        const templateParams = {
            from_name: formData.get('from_name'),
            from_email: formData.get('from_email'),
            message: formData.get('message'),
            to_name: 'Gabriel García' // Tu nombre
        };
        
        // Enviar email con EmailJS
        emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, templateParams)
            .then((response) => {
                console.log('Email enviado exitosamente:', response);
                showNotification('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
                contactForm.reset();
            })
            .catch((error) => {
                console.error('Error al enviar email:', error);
                showNotification('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.', 'error');
            })
            .finally(() => {
                // Restaurar botón
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Navegación suave personalizada (opcional, para mayor control)
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Efecto de escritura automática (opcional)
function setupTypewriterEffect() {
    const subtitle = document.querySelector('.subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Iniciar después de un pequeño delay
    setTimeout(typeWriter, 1000);
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar EmailJS
    initEmailJS();
    
    createParticles();
    filterProjects('all');
    setupMobileNav();
    setupHeaderScroll();
    setupScrollAnimations();
    setupProjectFilters();
    setupContactForm();
    setupSmoothScroll();
    
    // Opcional: descomentar para efecto de escritura
    // setupTypewriterEffect();
    
    // Mostrar primera sección inmediatamente
    document.querySelector('#home').classList.add('loaded');
});