document.addEventListener('DOMContentLoaded', () => {
    // Proyectos de ejemplo
    const projects = [
        { name: 'Cinema App', category: 'app', image: '/images/cinemaapp.png', 
            description: 'Proyecto de aplicación enfocado en un app que permite gestionar la visualización de detalles de películas, selección de asientos y funciones, compra de boletos y generación de tickets digitales. Incluye características como reseñas de usuarios, recomendaciones personalizadas y opciones de pago diversas. API para una experiencia de usuario fluida y eficiente.' },
        { name: 'Music Player App', category: 'app', image: '/images/musicapp.png', 
            description: 'Proyecto web centrado en una plataforma para reproducir música, visualizar álbumes y explorar artistas. La página cuenta con un diseño responsivo y una interfaz amigable, ofreciendo una experiencia de usuario atractiva y accesible en cualquier dispositivo.' },
        { name: 'SpaceX Dragon Flight Control UI', category: 'web', image: '/images/spacex.png', 
            description: 'Proyecto emulador de la página web de SpaceX Dragon Flight Control UI. Ofrece información detallada y diseños de los controles para simular el vuelo de la nave espacial Dragon, proporcionando una experiencia inmersiva y educativa.' }
    ];

    const projectGrid = document.querySelector('.project-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Función para crear tarjetas de proyecto
    function createProjectCard(project) {
        const card = document.createElement('div');
        card.classList.add('project-card');
        card.innerHTML = `
            <img src="${project.image}" alt="${project.name}">
            <div class="project-info">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
            </div>
        `;
        return card;
    }
    document.addEventListener('mousemove', function(event) {
        const header = document.getElementById('main-header');
        if (event.clientY < 50) { // Si el mouse está a menos de 50px del borde superior
            header.style.top = '0';
        } else {
            header.style.top = '-100px'; // Oculta el header
        }
    });
    // Función para filtrar proyectos
    function filterProjects(category) {
        projectGrid.innerHTML = '';
        const filteredProjects = category === 'all' ? projects : projects.filter(project => project.category === category);
        filteredProjects.forEach(project => {
            projectGrid.appendChild(createProjectCard(project));
        });
    }

    // Evento para los botones de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProjects(button.getAttribute('data-filter'));
        });
    });

    // Inicializar con todos los proyectos
    filterProjects('all');

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar el formulario
        alert('Mensaje enviado con éxito!');
        contactForm.reset();
    });
});