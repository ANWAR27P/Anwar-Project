import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // استيراد أداة التنقل

const OrderForm = () => {
  const [formData, setFormData] = useState({ serviceType: '', carModel: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // تهيئة أداة التنقل

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // رفع الطلب إلى Firebase
      await addDoc(collection(db, "orders"), {
        ...formData,
        status: "pending",
        createdAt: new Date()
      });
      
      // القفزة التلقائية: الانتقال لصفحة التتبع بعد النجاح
      navigate('/tracker'); 
      
    } catch (error) {
      console.error("خطأ مفصل من Firebase:", error);
      alert('حدث خطأ أثناء الإرسال، حاول مرة أخرى');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Ezwa أهلاً بك في</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-900 p-8 rounded-2xl border border-gray-800">
        
        <div className="mb-6">
          <label className="block mb-2">ما هي الخدمة التي تحتاجها؟</label>
          <select 
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
            value={formData.serviceType}
            onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
            required
          >
            <option value="">اختر خدمة</option>
            <option value="تغيير بطارية">تغيير بطارية</option>
            <option value="تعبئة وقود">تعبئة وقود</option>
            <option value="سحب سيارة">سحب سيارة</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2">ماهي سيارتك وموديلها؟</label>
          <input 
            type="text"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
            placeholder="مثال: كامري 2024"
            value={formData.carModel}
            onChange={(e) => setFormData({...formData, carModel: e.target.value})}
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold transition"
        >
          {isLoading ? 'جاري الإرسال...' : 'إرسال الفزعة'}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;