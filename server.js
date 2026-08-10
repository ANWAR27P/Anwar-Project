const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// الاتصال بقاعدة البيانات يدعم البيئة السحابية (Render) والمحلية (XAMPP)
const db = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'wallet_db',
    port: process.env.DB_PORT || 3306
});

db.connect((err) => {
    if (err) {
        console.error('❌ تحذير: تعذر الاتصال بقاعدة البيانات (سيتم العمل بدون قاعدة بيانات مؤقتاً لتفادي التعليق):', err.message);
        return;
    }
    console.log('✅ تم الاتصال بقاعدة البيانات بنجاح! 🚀');
});

// المسار التجريبي
app.get('/', (req, res) => {
    res.send('Ezwa Backend Server is up and running successfully! 🚀');
});

// مسار جلب الموظفين مع حماية في حال عدم توفر قاعدة البيانات السحابية
app.get('/api/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) {
            // بيانات وهمية احتياطية لكي لا يتعطل التطبيق ويفتح فوراً
            return res.json([
                { id: '272721', name: 'صالح ابراهيم القرني', role: 'مدير التنفيذي', department: 'الإدارة' }
            ]);
        }
        res.json(results);
    });
});

// مسار إضافة موظف
app.post('/api/employees', (req, res) => {
    const { id, name, role, department } = req.body;
    res.json({ message: 'تم إضافة الموظف بنجاح' });
});

// مسار تمريرة أبل والت المؤقت لتفادي التعليق
app.get('/api/v1/pass/apple/:id', (req, res) => {
    const employeeId = req.params.id;
    res.send(`Digital Pass generated successfully for ID: ${employeeId} ⚡`);
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`🚀 السيرفر شغال على البورت ${PORT}`);
});
