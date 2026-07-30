import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// الاتصال بقاعدة البيانات
const db = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'wallet_db'
});

db.connect((err) => {
    if (err) {
        console.error('⚠️ تحذير الاتصال بقاعدة البيانات:', err.message);
    } else {
        console.log('✅ تم الاتصال بقاعدة البيانات بنجاح!');
    }
});

// المسار الرئيسي
app.get('/', (req, res) => {
    res.send('Ezwa Backend Server is up and running successfully! 🚀');
});

app.get('/api/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/employees', (req, res) => {
    res.json({ message: 'تم إضافة الموظف بنجاح' });
});

app.listen(PORT, () => {
    console.log(`🚀 السيرفر شغال على البورت ${PORT}`);
});
