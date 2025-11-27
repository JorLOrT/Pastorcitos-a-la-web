-- Borrar tablas si existen (para empezar limpio)
DROP TABLE IF EXISTS registrations;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS users;

-- 1. Tabla de Usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    carrera VARCHAR(100),
    semestre VARCHAR(20),
    is_admin BOOLEAN DEFAULT FALSE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Ubicaciones (Mapa)
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL, -- 'ninos', 'ancianos', 'ollas'
    name VARCHAR(150) NOT NULL,
    description TEXT,
    capacity INTEGER,
    current INTEGER,
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    schedule VARCHAR(150),
    phone VARCHAR(50),
    email VARCHAR(150),
    address VARCHAR(200)
);

-- 3. Tabla de Actividades
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50), -- 'espiritual', 'servicio', 'formacion', 'recreativa'
    title VARCHAR(150) NOT NULL,
    description TEXT,
    activity_date TIMESTAMP,
    time_range VARCHAR(100),
    location VARCHAR(150),
    capacity VARCHAR(100)
);

-- 4. Tabla de Inscripciones (Relación Usuario-Actividad)
CREATE TABLE registrations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    activity_id INTEGER REFERENCES activities(id) ON DELETE CASCADE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, activity_id) -- Evita doble inscripción
);

-- (Opcional) Insertar un Admin por defecto
-- Nota: La contraseña 'Admin2024!' debe estar hasheada. 
-- Para pruebas locales puedes insertar esto, pero el login fallará si no usas bcrypt en el backend.
-- Se recomienda crear el usuario desde el registro del Frontend para que se encripte bien.