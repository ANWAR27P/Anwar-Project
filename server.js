const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// الاتصال بقاعدة البيانات
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'wallet_db'
});

db.connect((err) => {
    if (err) {
        console.error('❌ خطأ في الاتصال بقاعدة البيانات:', err);
        return;
    }
    console.log('✅ تم الاتصال بقاعدة البيانات بنجاح!');
});

// المسار التجريبي
app.get('/', (req, res) => {
    res.send('Ezwa Backend Server is up and running successfully! 🚀');
});

// مسار جلب الموظفين
app.get('/api/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// مسار إضافة موظف
app.post('/api/employees', (req, res) => {
    const { id, name, role, department } = req.body;
    res.json({ message: 'تم إضافة الموظف بنجاح' });
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`🚀 السيرفر شغال على البورت ${PORT}`);
});
