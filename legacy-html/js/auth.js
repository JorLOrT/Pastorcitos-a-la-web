// ===== Manejo del formulario de Login =====
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

// ===== Login =====
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Limpiar errores previos
    clearErrors();

    // Validación básica
    if (!validateEmail(email)) {
        showError('emailError', 'Por favor ingresa un correo válido');
        return;
    }

    if (password.length < 8) {
        showError('passwordError', 'La contraseña debe tener al menos 8 caracteres');
        return;
    }

    // Obtener usuarios registrados
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Buscar usuario
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Login exitoso
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Mostrar mensaje de éxito
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
        
        // Redireccionar después de 1.5 segundos
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showError('passwordError', 'Correo o contraseña incorrectos');
    }
}

// ===== Registro =====
function handleRegister(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('emailReg').value;
    const carrera = document.getElementById('carrera').value;
    const semestre = document.getElementById('semestre').value;
    const telefono = document.getElementById('telefono').value;
    const password = document.getElementById('passwordReg').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const terms = document.getElementById('terms').checked;

    // Limpiar errores previos
    clearErrors();

    // Validaciones
    let hasErrors = false;

    if (nombre.trim().length < 2) {
        showError('nombreError', 'El nombre debe tener al menos 2 caracteres');
        hasErrors = true;
    }

    if (apellido.trim().length < 2) {
        showError('apellidoError', 'El apellido debe tener al menos 2 caracteres');
        hasErrors = true;
    }

    if (!validateEmail(email)) {
        showError('emailRegError', 'Por favor ingresa un correo válido');
        hasErrors = true;
    }

    if (!carrera) {
        showError('carreraError', 'Por favor selecciona tu carrera');
        hasErrors = true;
    }

    if (!semestre) {
        showError('semestreError', 'Por favor selecciona tu semestre');
        hasErrors = true;
    }

    if (!validatePhone(telefono)) {
        showError('telefonoError', 'Por favor ingresa un teléfono válido');
        hasErrors = true;
    }

    if (password.length < 8) {
        showError('passwordRegError', 'La contraseña debe tener al menos 8 caracteres');
        hasErrors = true;
    }

    if (password !== passwordConfirm) {
        showError('passwordConfirmError', 'Las contraseñas no coinciden');
        hasErrors = true;
    }

    if (!terms) {
        alert('Debes aceptar los términos y condiciones');
        hasErrors = true;
    }

    if (hasErrors) {
        return;
    }

    // Verificar si el email ya existe
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = users.some(u => u.email === email);

    if (emailExists) {
        showError('emailRegError', 'Este correo ya está registrado');
        return;
    }

    // Crear nuevo usuario
    const newUser = {
        id: Date.now(),
        nombre,
        apellido,
        email,
        carrera,
        semestre,
        telefono,
        password,
        fechaRegistro: new Date().toISOString()
    };

    // Guardar usuario
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Login automático
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    // Mostrar mensaje de éxito
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('successMessageReg').style.display = 'block';

    // Redireccionar después de 1.5 segundos
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// ===== Funciones de validación =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[+]?[\d\s-()]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 7;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => {
        el.textContent = '';
        el.classList.remove('show');
    });
}

// ===== Mostrar/Ocultar contraseña =====
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
}
