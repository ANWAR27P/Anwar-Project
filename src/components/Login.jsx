import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); // لمنع إعادة تحميل الصفحة
    console.log("Email:", email, "Password:", password);
    
    // يمكنك هنا إضافة كود الربط مع السيرفر أو الانتقال للصفحة الرئيسية
    alert("تم النقر على زر الدخول بنجاح! 🚀");
    window.location.href = '/';
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 text-center w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-purple-900">تسجيل الدخول</h2>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="البريد الإلكتروني" 
        className="w-full p-3 border rounded-xl focus:outline-none focus:border-purple-600" 
        required 
      />
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="كلمة المرور" 
        className="w-full p-3 border rounded-xl focus:outline-none focus:border-purple-600" 
        required 
      />
      <button 
        type="submit" 
        className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-xl font-bold transition shadow-lg cursor-pointer"
      >
        دخول
      </button>
    </form>
  );
}