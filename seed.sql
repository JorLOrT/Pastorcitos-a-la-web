-- Limpiar datos existentes (Opcional, si quieres empezar de cero quita los comentarios)
-- TRUNCATE registrations, activities, locations, users RESTART IDENTITY CASCADE;

-- 1. INSERTAR USUARIOS DE PRUEBA
-- La contraseña para todos es: 12345678 (Hash generado con bcrypt)
INSERT INTO users (nombre, apellido, email, password, carrera, semestre, is_admin) VALUES
('Juan', 'Perez', 'juan.perez@ucsp.edu.pe', '$2a$10$abcdefghijklmnopqrstuv', 'Ingeniería de Software', '8', false),
('Maria', 'Rodriguez', 'maria.rod@ucsp.edu.pe', '$2a$10$abcdefghijklmnopqrstuv', 'Psicología', '4', false),
('Admin', 'Pastoral', 'admin@pastoral.com', '$2a$10$abcdefghijklmnopqrstuv', 'Derecho', '10', true);
-- Nota: El hash de arriba es un placeholder. Si quieres loguearte con estos usuarios específicos,
-- lo ideal es registrar uno nuevo desde la web, pero estos sirven para llenar las inscripciones.


-- 2. INSERTAR 30 UBICACIONES (MAPA DE SERVICIO - AREQUIPA)
INSERT INTO locations (type, name, description, capacity, current, lat, lng, schedule, phone, email, address) VALUES
-- NIÑOS (10)
('ninos', 'Aldea Infantil SOS Arequipa', 'Hogar para niños en situación de riesgo.', 80, 65, -16.378900, -71.567000, 'Lun-Dom 8am-6pm', '054-252525', 'sos.aqp@ong.pe', 'Cerro Colorado, Sector 4'),
('ninos', 'Hogar Chávez de la Rosa', 'Beneficencia Pública de Arequipa.', 100, 92, -16.395800, -71.536500, 'Lun-Vie 9am-5pm', '054-212121', 'beneficencia@aqp.gob.pe', 'Calle San Pedro 123, Cercado'),
('ninos', 'Casa Hogar Los Pinos', 'Albergue de menores en Paucarpata.', 40, 25, -16.425000, -71.505000, 'Lun-Sab 8am-4pm', '987654321', 'pinos@hogar.pe', 'Av. Kennedy s/n, Paucarpata'),
('ninos', 'Albergue Niño Jesús', 'Cuidado integral para niños de 0 a 5 años.', 30, 28, -16.409000, -71.544000, 'Lun-Dom 24h', '054-443322', 'ninojesus@gmail.com', 'Urb. La Negrita, Cercado'),
('ninos', 'Hogar Sagrada Familia', 'Apoyo escolar y nutricional.', 50, 45, -16.365000, -71.540000, 'Lun-Vie 2pm-6pm', '999888777', 'sagrada@familia.pe', 'Cayma Baja, Av. Arequipa'),
('ninos', 'Casa Cuna Arequipa', 'Atención a hijos de madres trabajadoras.', 60, 55, -16.402000, -71.528000, 'Lun-Vie 7am-5pm', '054-203040', 'casacuna@aqp.pe', 'Miraflores, Calle Espinar'),
('ninos', 'Hogar de Cristo', 'Refugio temporal para adolescentes.', 35, 20, -16.445000, -71.520000, 'Lun-Dom 8am-8pm', '054-607080', 'cristo@hogar.org', 'Hunter, Av. Las Américas'),
('ninos', 'Villa Infantil Characato', 'Espacio recreativo y vivienda.', 45, 40, -16.478000, -71.489000, 'Lun-Dom 9am-5pm', '951753852', 'villa@characato.pe', 'Plaza Principal de Characato'),
('ninos', 'Hogar Santa Teresa', 'Cuidado de niñas en riesgo.', 40, 38, -16.392000, -71.551000, 'Visitas sabados', '054-221144', 'santateresa@convento.pe', 'Yanahuara, Cuesta del Ángel'),
('ninos', 'Centro San Juan Apostol', 'Apoyo educativo en el Cono Norte.', 120, 110, -16.350000, -71.560000, 'Lun-Vie 8am-1pm', '963852741', 'sanjuan@mision.pe', 'Ciudad Municipal, Cerro Colorado'),

-- ANCIANOS (10)
('ancianos', 'Asilo Lira', 'Residencia del adulto mayor.', 90, 85, -16.412000, -71.548000, 'Mar-Dom 10am-4pm', '054-424242', 'asilolira@aqp.pe', 'Av. Dolores s/n'),
('ancianos', 'Hogar San Vicente de Paúl', 'Atención geriátrica especializada.', 50, 48, -16.399000, -71.525000, 'Lun-Dom 9am-5pm', '054-232323', 'sanvicente@paul.pe', 'Calle San Camilo, Cercado'),
('ancianos', 'Casa del Abuelo', 'Centro de día para actividades.', 40, 30, -16.390000, -71.555000, 'Lun-Vie 8am-6pm', '987123456', 'casaabuelo@yanahuara.pe', 'Urb. Magisterial, Yanahuara'),
('ancianos', 'Residencia Santa Luisa', 'Cuidados paliativos y compañía.', 30, 25, -16.435000, -71.535000, 'Lun-Dom 10am-6pm', '054-556677', 'santaluisa@residencia.pe', 'Socabaya, La Campiña'),
('ancianos', 'Hogar Buen Samaritano', 'Refugio para ancianos sin hogar.', 45, 45, -16.385000, -71.515000, 'Lun-Dom 24h', '054-889900', 'samaritano@ong.pe', 'Alto Selva Alegre, Zona A'),
('ancianos', 'Club del Adulto Mayor Cayma', 'Talleres y recreación.', 100, 60, -16.375000, -71.545000, 'Lun-Vie 9am-1pm', '054-334455', 'cam@cayma.gob.pe', 'Plaza de Cayma'),
('ancianos', 'Vidas con Esperanza', 'Atención médica y psicológica.', 35, 20, -16.420000, -71.495000, 'Lun-Sab 8am-4pm', '951357468', 'esperanza@vidas.pe', 'Israel, Paucarpata'),
('ancianos', 'Casa de Reposo El Sol', 'Ambiente campestre en Sachaca.', 25, 15, -16.428000, -71.565000, 'Lun-Dom 10am-5pm', '054-778899', 'elsol@sachaca.pe', 'Fernandini, Sachaca'),
('ancianos', 'Hogar Divina Misericordia', 'Cuidado espiritual y físico.', 50, 42, -16.405000, -71.510000, 'Lun-Dom 9am-6pm', '963258741', 'misericordia@hogar.pe', 'Mariano Melgar, Av. Lima'),
('ancianos', 'Fundación Canevaro', 'Ayuda social al adulto mayor.', 60, 50, -16.397000, -71.532000, 'Lun-Vie 8am-4pm', '054-292929', 'canevaro@fundacion.pe', 'Calle Santa Marta, Cercado'),

-- OLLAS COMUNES (10)
('ollas', 'Olla Común El Misti', 'Almuerzos solidarios.', 150, 130, -16.360000, -71.530000, 'Lun-Sab 11am-2pm', '999111222', 'elmisti@olla.pe', 'AA.HH. Independencia, ASA'),
('ollas', 'Comedor Popular Simón Bolivar', 'Alimentación para 200 familias.', 200, 190, -16.450000, -71.510000, 'Lun-Vie 12pm-2pm', '988777666', 'bolivar@comedor.pe', 'JLByR, Av. Estados Unidos'),
('ollas', 'Olla Solidaria Yura', 'Apoyo a zona industrial.', 120, 100, -16.250000, -71.600000, 'Lun-Sab 11am-2pm', '977666555', 'yura@solidaria.pe', 'Ciudad de Dios, Yura'),
('ollas', 'Manos que Ayudan', 'Desayunos para escolares.', 80, 75, -16.340000, -71.550000, 'Lun-Vie 6am-9am', '966555444', 'manos@ayudan.pe', 'Cono Norte, Sector 2'),
('ollas', 'Olla Común La Joya', 'Apoyo rural.', 100, 80, -16.600000, -71.800000, 'Lun-Dom 12pm-3pm', '955444333', 'lajoya@olla.pe', 'Plaza La Joya'),
('ollas', 'Comedor Santa Rita', 'Almuerzos a bajo costo.', 90, 85, -16.401000, -71.520000, 'Lun-Sab 11:30am-2pm', '944333222', 'santarita@aqp.pe', 'Miraflores baja'),
('ollas', 'Olla Común Esperanza', 'Ubicada en zona alta de Cayma.', 130, 110, -16.350000, -71.535000, 'Lun-Dom 12pm-2pm', '933222111', 'esperanza@cayma.pe', 'Enace, Cayma'),
('ollas', 'Pan de Vida', 'Cenas para indigentes.', 60, 40, -16.400000, -71.538000, 'Lun-Dom 6pm-8pm', '922111000', 'pandevida@noche.pe', 'Cerca al Terminal Terrestre'),
('ollas', 'Olla Común Tiabaya', 'Comida tradicional solidaria.', 70, 65, -16.455000, -71.580000, 'Lun-Sab 12pm-2pm', '911000999', 'tiabaya@olla.pe', 'Pueblo Tradicional Tiabaya'),
('ollas', 'Unidos por el Sur', 'Apoyo a migrantes.', 110, 95, -16.460000, -71.520000, 'Lun-Dom 11am-3pm', '900999888', 'unidos@sur.pe', 'Terminal Sur, Hunter');


-- 3. INSERTAR 20 ACTIVIDADES (2025-2026)
INSERT INTO activities (category, title, description, activity_date, time_range, location, capacity) VALUES
('espiritual', 'Misa de Inicio de Semestre', 'Eucaristía de bienvenida en la Capilla de la UCSP.', '2025-08-15 10:00:00', '10:00 AM - 11:30 AM', 'Capilla UCSP', '200'),
('servicio', 'Voluntariado en Asilo Lira', 'Acompañamiento y recreación con los abuelitos.', '2025-08-20 09:00:00', '9:00 AM - 1:00 PM', 'Asilo Lira', '20 personas'),
('formacion', 'Taller de Liderazgo Ignaciano', 'Charla sobre valores y liderazgo juvenil.', '2025-09-05 16:00:00', '4:00 PM - 6:00 PM', 'Auditorio San Juan Pablo II', '50 personas'),
('recreativa', 'Caminata al Valle de Chilina', 'Mañana deportiva y de integración.', '2025-09-12 07:00:00', '7:00 AM - 1:00 PM', 'Punto de encuentro: Plaza de Cayma', 'Ilimitado'),
('espiritual', 'Retiro de Silencio', 'Jornada de reflexión en la casa de retiro de Chilina.', '2025-09-25 08:00:00', '8:00 AM - 6:00 PM', 'Casa de Retiro Chilina', '30 cupos'),
('servicio', 'Colecta de Víveres', 'Recolección para las ollas comunes del Cono Norte.', '2025-10-01 09:00:00', '9:00 AM - 5:00 PM', 'Campus UCSP', 'Voluntarios ilimitados'),
('formacion', 'Cine Foro: La Misión', 'Proyección y debate sobre la película.', '2025-10-10 17:00:00', '5:00 PM - 8:00 PM', 'Aula Magna', '40 personas'),
('recreativa', 'Noche de Talentos', 'Música, teatro y arte de la comunidad pastoral.', '2025-10-20 18:00:00', '6:00 PM - 9:00 PM', 'Teatro Municipal (Auspiado)', '100 personas'),
('espiritual', 'Adoración al Santísimo', 'Noche de alabanza y oración.', '2025-10-30 19:00:00', '7:00 PM - 9:00 PM', 'Templo de San Lázaro', 'Abierto'),
('servicio', 'Campaña de Limpieza: Río Chili', 'Cuidado de nuestra casa común.', '2025-11-05 08:00:00', '8:00 AM - 12:00 PM', 'Puente Grau', '50 voluntarios'),
('formacion', 'Charla: Doctrina Social', 'La importancia del compromiso social.', '2025-11-15 16:00:00', '4:00 PM - 6:00 PM', 'Sala de Conferencias B', '30 personas'),
('recreativa', 'Pichanga Pastoral', 'Torneo relámpago de fulbito y voley.', '2025-11-22 09:00:00', '9:00 AM - 1:00 PM', 'Canchas Sintéticas', 'Equipos de 6'),
('espiritual', 'Misa de Adviento', 'Preparación para la Navidad.', '2025-12-01 18:00:00', '6:00 PM - 7:30 PM', 'Capilla UCSP', '200'),
('servicio', 'Chocolatada Navideña', 'Llevando alegría a los niños de Yura.', '2025-12-15 08:00:00', '8:00 AM - 2:00 PM', 'Salida campus UCSP', '40 voluntarios'),
('recreativa', 'Cena de Fin de Año', 'Compartir fraterno de cierre de ciclo.', '2025-12-20 19:00:00', '7:00 PM - 11:00 PM', 'Local Pastoral', 'Comunidad Pastoral'),
('espiritual', 'Misa de Año Nuevo', 'Acción de gracias por el año nuevo.', '2026-01-05 10:00:00', '10:00 AM - 11:30 AM', 'Catedral de Arequipa', 'Abierto'),
('formacion', 'Planificación 2026', 'Reunión de líderes para organizar el año.', '2026-01-10 09:00:00', '9:00 AM - 1:00 PM', 'Oficina Pastoral', 'Líderes'),
('servicio', 'Apoyo Escolar de Verano', 'Reforzamiento para niños en vacaciones.', '2026-01-15 09:00:00', '9:00 AM - 12:00 PM', 'Colegio San Benito', '15 tutores'),
('recreativa', 'Paseo a la Playa', 'Salida de integración a Mollendo.', '2026-01-25 06:00:00', '6:00 AM - 6:00 PM', 'Punto de encuentro: U', 'Bus contratado'),
('espiritual', 'Jornada Mundial de la Juventud (Local)', 'Encuentro con jóvenes de otras pastorales.', '2026-02-01 08:00:00', '8:00 AM - 5:00 PM', 'Coliseo Arequipa', 'Todas las pastorales');


-- 4. INSERTAR INSCRIPCIONES (Relacionar usuarios con actividades)
-- Asumimos IDs del 1 al 3 para usuarios y 1 al 20 para actividades por el orden de inserción.
-- Usuario 1 (Juan)
INSERT INTO registrations (user_id, activity_id) VALUES
(1, 1), -- Misa inicio
(1, 2), -- Voluntariado asilo
(1, 12); -- Pichanga

-- Usuario 2 (Maria)
INSERT INTO registrations (user_id, activity_id) VALUES
(2, 2), -- Voluntariado asilo
(2, 5), -- Retiro
(2, 14); -- Chocolatada

-- Usuario 3 (Admin)
INSERT INTO registrations (user_id, activity_id) VALUES
(3, 7), -- Cine foro
(3, 17); -- Planificación