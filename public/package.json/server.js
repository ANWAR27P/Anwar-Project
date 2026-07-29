const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// الاتصال بقاعدة بيانات MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'wallet_db'
});

db.connect((err) => {
  if (err) {
    console.error('❌ خطأ في الاتصال بقاعدة البيانات:', err);
    return;
  }
  console.log('✅ متصل بقاعدة بيانات MySQL بنجاح!');
  
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS employees (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      role VARCHAR(100) NOT NULL,
      department VARCHAR(100) NOT NULL,
      card_status VARCHAR(50) DEFAULT 'نشطة'
    )
  `;
  db.query(createTableQuery);
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
  const card_status = 'تم إصدار البطاقة 📱';
  
  const query = 'INSERT INTO employees (id, name, role, department, card_status) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [id, name, role, department || 'تقنية المعلومات', card_status], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: '✅ تم إضافة الموظف بنجاح!', employee: { id, name, role, department, card_status } });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 السيرفر شغال على البورت ${PORT}`);
});