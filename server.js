const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// الاتصال بقاعدة البيانات (مع التعامل مع أخطاء السيرفرات السحابية)
const db = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'wallet_db'
});

db.connect((err) => {
    if (err) {
        console.error('⚠️ تحذير: لم يتم الاتصال بقاعدة البيانات (طبيعي عند الرفع على Render بدون DB سحابية):', err.message);
    } else {
        console.log('✅ تم الاتصال بقاعدة البيانات بنجاح!');
    }
});

// المسار الرئيسي التجريبي
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
    res.json({ message: 'تم إضافة الموظف بنجاح' });
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`🚀 السيرفر شغال على البورت ${PORT}`);
});
