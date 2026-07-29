import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // إعادة تعيين رسالة الخطأ
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('تم تسجيل الدخول بنجاح يا أنور!');
      // هنا يمكنك توجيه المستخدم للصفحة الرئيسية
    } catch (err) {
      setError('خطأ في البريد الإلكتروني أو كلمة المرور، حاول مرة أخرى.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>تسجيل الدخول - عزوة</h2>
      <input 
        type="email" 
        placeholder="البريد الإلكتروني" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="كلمة المرور" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit">دخول</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </form>
  );
};

export default LoginForm;