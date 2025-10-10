// ===== Filtros de actividades =====
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const activityCards = document.querySelectorAll('.activity-full-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Filtrar actividades
            activityCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // Aplicar animaciones de entrada
    activityCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ===== Inscripción a actividades =====
function inscribirse(actividadNombre) {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        alert('Debes iniciar sesión para inscribirte a una actividad');
        window.location.href = 'login.html';
        return;
    }

    const user = JSON.parse(currentUser);
    
    // Obtener inscripciones existentes
    const inscripciones = JSON.parse(localStorage.getItem('inscripciones')) || [];
    
    // Verificar si ya está inscrito
    const yaInscrito = inscripciones.some(
        i => i.userId === user.id && i.actividad === actividadNombre
    );

    if (yaInscrito) {
        alert('Ya estás inscrito en esta actividad');
        return;
    }

    // Crear nueva inscripción
    const nuevaInscripcion = {
        id: Date.now(),
        userId: user.id,
        userName: `${user.nombre} ${user.apellido}`,
        userEmail: user.email,
        actividad: actividadNombre,
        fecha: new Date().toISOString()
    };

    // Guardar inscripción
    inscripciones.push(nuevaInscripcion);
    localStorage.setItem('inscripciones', JSON.stringify(inscripciones));

    // Mostrar confirmación
    alert(`¡Inscripción exitosa!\n\nTe has inscrito en: ${actividadNombre}\n\nRecibirás un correo de confirmación a: ${user.email}`);
}

// ===== Ver mis inscripciones =====
function verMisInscripciones() {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        alert('Debes iniciar sesión para ver tus inscripciones');
        window.location.href = 'login.html';
        return;
    }

    const user = JSON.parse(currentUser);
    const inscripciones = JSON.parse(localStorage.getItem('inscripciones')) || [];
    
    const misInscripciones = inscripciones.filter(i => i.userId === user.id);
    
    if (misInscripciones.length === 0) {
        alert('No tienes inscripciones activas');
        return;
    }

    let mensaje = 'Tus inscripciones:\n\n';
    misInscripciones.forEach((insc, index) => {
        const fecha = new Date(insc.fecha).toLocaleDateString('es-ES');
        mensaje += `${index + 1}. ${insc.actividad}\n   Fecha de inscripción: ${fecha}\n\n`;
    });

    alert(mensaje);
}
