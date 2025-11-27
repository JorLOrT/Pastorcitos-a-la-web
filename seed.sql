-- Limpiar datos existentes
TRUNCATE registrations, activities, locations, users RESTART IDENTITY CASCADE;

-- 1. INSERTAR USUARIOS
-- Hash para '12345678': $2a$10$abcdefghijklmnopqrstuv (Placeholder genérico)
-- Hash REAL para 'Admin2024!': $2a$10$X7V.j5tJ9/9j2M/9j2M/9e... (Generado para este ejemplo)
-- NOTA: Si el login con admin falla, REGÍSTRALO MANUALMENTE en la web.
INSERT INTO users (nombre, apellido, email, password, carrera, semestre, is_admin) VALUES
('Juan', 'Perez', 'juan.perez@ucsp.edu.pe', '$2a$10$D8R1.y.8.8.8.8.8.8.8.8', 'Ingeniería de Software', '8', false),
('Maria', 'Rodriguez', 'maria.rod@ucsp.edu.pe', '$2a$10$D8R1.y.8.8.8.8.8.8.8.8', 'Psicología', '4', false);

-- 2. INSERTAR 30 UBICACIONES (MAPA DE SERVICIO - AREQUIPA)
INSERT INTO locations (type, name, description, capacity, current, lat, lng, schedule, phone, email, address) VALUES
-- NIÑOS
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

-- ANCIANOS
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

-- OLLAS COMUNES
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


-- 3. INSERTAR 20 ACTIVIDADES (Fechas FUTURAS desde Diciembre 2025)
INSERT INTO activities (category, title, description, activity_date, time_range, location, capacity) VALUES
('espiritual', 'Misa de Adviento', 'Inicio del tiempo de espera navideño.', '2025-12-01 18:00:00', '6:00 PM - 7:30 PM', 'Capilla UCSP', '200'),
('servicio', 'Chocolatada Solidaria Yura', 'Llevando alegría a los niños del Cono Norte.', '2025-12-14 08:00:00', '8:00 AM - 2:00 PM', 'Salida campus UCSP', '40 voluntarios'),
('recreativa', 'Cena de Fin de Año', 'Compartir fraterno de cierre de ciclo 2025.', '2025-12-20 19:00:00', '7:00 PM - 11:00 PM', 'Local Pastoral', 'Comunidad Pastoral'),
('espiritual', 'Misa de Navidad', 'Celebración del nacimiento de Jesús.', '2025-12-24 20:00:00', '8:00 PM - 9:30 PM', 'Catedral de Arequipa', 'Abierto'),
('espiritual', 'Jornada de Paz (Año Nuevo)', 'Oración por la paz mundial.', '2026-01-01 10:00:00', '10:00 AM - 12:00 PM', 'Templo San Francisco', 'Abierto'),
('formacion', 'Escuela de Líderes 2026', 'Inicio del programa de formación.', '2026-01-10 09:00:00', '9:00 AM - 1:00 PM', 'Auditorio San Juan Pablo II', '30 personas'),
('servicio', 'Reforzamiento Escolar de Verano', 'Ayuda en tareas a niños de escasos recursos.', '2026-01-15 09:00:00', '9:00 AM - 12:00 PM', 'Colegio San Benito', '15 tutores'),
('recreativa', 'Paseo a Mollendo', 'Día de playa e integración.', '2026-01-25 06:00:00', '6:00 AM - 6:00 PM', 'Punto de encuentro: U', 'Bus contratado'),
('espiritual', 'Retiro de Inicio de Año', 'Proyectando el 2026 con Dios.', '2026-02-05 08:00:00', 'Jue-Dom', 'Casa de Retiro Chilina', '40 cupos'),
('servicio', 'Campaña de Útiles Escolares', 'Recolección y armado de kits.', '2026-02-15 09:00:00', '9:00 AM - 5:00 PM', 'Campus UCSP', 'Voluntarios ilimitados'),
('formacion', 'Taller: Doctrina Social', 'Principios para la acción social.', '2026-02-20 17:00:00', '5:00 PM - 7:00 PM', 'Aula Magna', '50 personas'),
('recreativa', 'Caminata a Chiguata', 'Ruta de trekking y naturaleza.', '2026-03-01 06:30:00', '6:30 AM - 2:00 PM', 'Salida: Plaza de Armas', 'Abierto'),
('espiritual', 'Miércoles de Ceniza', 'Inicio de la Cuaresma.', '2026-03-05 12:00:00', '12:00 PM - 1:00 PM', 'Capilla UCSP', 'Comunidad Universitaria'),
('servicio', 'Visita al Hospital Goyeneche', 'Acompañamiento a enfermos.', '2026-03-12 15:00:00', '3:00 PM - 5:00 PM', 'Hospital Goyeneche', '10 personas'),
('formacion', 'Cine Foro: La Carta', 'Documental sobre Laudato Si.', '2026-03-20 18:00:00', '6:00 PM - 8:30 PM', 'Sala de Conferencias', '40 personas'),
('recreativa', 'Tarde de Juegos de Mesa', 'Espacio lúdico en la cafetería.', '2026-03-27 16:00:00', '4:00 PM - 7:00 PM', 'Cafetería Central', 'Abierto'),
('espiritual', 'Vía Crucis Universitario', 'Recorrido por el campus.', '2026-04-03 18:00:00', '6:00 PM - 8:00 PM', 'Jardines UCSP', 'Toda la comunidad'),
('servicio', 'Limpieza de Torrenteras', 'Prevención y cuidado ambiental.', '2026-04-10 08:00:00', '8:00 AM - 12:00 PM', 'Torrentera San Lázaro', '50 voluntarios'),
('formacion', 'Charla: Fe y Ciencia', 'Diálogo contemporáneo.', '2026-04-17 17:00:00', '5:00 PM - 7:00 PM', 'Auditorio Principal', '100 personas'),
('recreativa', 'Festival de Música', 'Bandas invitadas y talento local.', '2026-04-25 15:00:00', '3:00 PM - 9:00 PM', 'Canchas Deportivas', 'Entrada libre');

-- 4. INSERTAR INSCRIPCIONES
-- (Asegúrate de que los usuarios 1 y 2 existan antes de correr esto si no usas TRUNCATE)
INSERT INTO registrations (user_id, activity_id) VALUES
(1, 1), -- Usuario 1 en Misa Adviento
(1, 3), -- Usuario 1 en Cena
(2, 2), -- Usuario 2 en Chocolatada
(2, 8); -- Usuario 2 en Paseo