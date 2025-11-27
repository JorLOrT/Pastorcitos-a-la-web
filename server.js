import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(cors());
app.use(express.json());
// Servir archivos estáticos del build de React
app.use(express.static(path.join(__dirname, 'dist')));

// Configuración de Base de Datos
const isProduction = process.env.NODE_ENV === 'production';
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error("❌ ERROR: No se encontró DATABASE_URL");
    if (!isProduction) process.exit(1);
}

const pool = new pg.Pool({
  connectionString: connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

// --- RUTAS DE AUTENTICACIÓN ---

app.post('/api/auth/register', async (req, res) => {
  try {
    const { nombre, apellido, email, password, carrera, semestre } = req.body;
    
    const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Admin harcodeado para pruebas iniciales o lógica específica
    const isAdmin = email === 'admin@pastoral.com';

    const newUser = await pool.query(
      'INSERT INTO users (nombre, apellido, email, password, carrera, semestre, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, nombre, apellido, email, is_admin, carrera, semestre',
      [nombre, apellido, email, hashedPassword, carrera, semestre, isAdmin]
    );

    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: newUser.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    const { password: _, ...userData } = user.rows[0];
    res.json({ token, user: userData });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// --- RUTAS DE ACTIVIDADES ---

app.get('/api/activities', async (req, res) => {
  try {
    const allActivities = await pool.query('SELECT * FROM activities ORDER BY activity_date ASC');
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    
    const formatted = allActivities.rows.map(a => {
        const date = new Date(a.activity_date);
        return {
            ...a,
            day: date.getDate().toString().padStart(2, '0'),
            month: months[date.getMonth()],
            year: date.getFullYear().toString()
        };
    });
    res.json(formatted);
  } catch (err) {
    console.error(err.message);
    res.status(500).json([]);
  }
});

app.post('/api/activities', async (req, res) => {
  try {
    const { category, title, description, day, month, year, time, location, capacity } = req.body;
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    const monthIndex = months.indexOf(month);
    const dateObj = new Date(parseInt(year), monthIndex, parseInt(day));

    const newActivity = await pool.query(
      'INSERT INTO activities (category, title, description, activity_date, time_range, location, capacity) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [category, title, description, dateObj, time, location, capacity]
    );
    res.json(newActivity.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error al crear actividad');
  }
});

app.delete('/api/activities/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM activities WHERE id = $1', [id]);
        res.json("Actividad eliminada");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error al eliminar');
    }
});

// --- RUTAS DE MAPA (UBICACIONES) ---

app.get('/api/locations', async (req, res) => {
  try {
    const locations = await pool.query('SELECT * FROM locations');
    const formatted = locations.rows.map(l => ({
        id: l.id,
        type: l.type,
        name: l.name,
        description: l.description,
        capacity: l.capacity,
        current: l.current,
        lat: parseFloat(l.lat),
        lng: parseFloat(l.lng),
        schedule: l.schedule,
        contact: {
            phone: l.phone,
            email: l.email,
            address: l.address
        }
    }));
    res.json(formatted);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error servidor');
  }
});

app.post('/api/locations', async (req, res) => {
    try {
        const { type, name, description, capacity, current, lat, lng, schedule, contact } = req.body;
        const newLoc = await pool.query(
            'INSERT INTO locations (type, name, description, capacity, current, lat, lng, schedule, phone, email, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
            [type, name, description, capacity, current, lat, lng, schedule, contact.phone, contact.email, contact.address]
        );
        res.json(newLoc.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error al crear ubicación');
    }
});

app.delete('/api/locations/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM locations WHERE id = $1', [id]);
        res.json("Ubicación eliminada");
    } catch (err) {
        console.error(err.message);
    }
});

// --- RUTAS DE INSCRIPCIONES ---

app.post('/api/register-activity', async (req, res) => {
    try {
        const { userId, activityId } = req.body;
        const newReg = await pool.query(
            'INSERT INTO registrations (user_id, activity_id) VALUES ($1, $2) RETURNING *',
            [userId, activityId]
        );
        res.json(newReg.rows[0]);
    } catch (err) {
        res.status(400).json({ error: 'Ya estás inscrito o hubo un error' });
    }
});

app.get('/api/my-registrations/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const regs = await pool.query(
            `SELECT r.id as registration_id, a.* 
             FROM registrations r 
             JOIN activities a ON r.activity_id = a.id 
             WHERE r.user_id = $1`,
            [userId]
        );
        const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
        
        const formatted = regs.rows.map(a => {
            const date = new Date(a.activity_date);
            return {
                ...a,
                day: date.getDate().toString().padStart(2, '0'),
                month: months[date.getMonth()],
                year: date.getFullYear().toString(),
                actividad: a.title, // Compatibilidad con frontend antiguo
                fecha: a.registration_date // Fecha de inscripción
            };
        });

        res.json(formatted);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error');
    }
});

app.delete('/api/registrations/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM registrations WHERE id = $1', [id]);
        res.json("Inscripción cancelada");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error');
    }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});