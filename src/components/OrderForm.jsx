import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderForm() {
  const [selectedService, setSelectedService] = useState('تغيير بطارية');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/order-tracker');
  };

  return (
    <div 
      className="min-h-screen text-white flex flex-col items-center justify-center p-4 relative bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(3, 7, 18, 0.9), rgba(3, 7, 18, 0.85)), url('https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1920&q=80')`
      }}
      dir="rtl"
    >
      <div className="text-center mb-8 z-10">
        <h1 className="text-3xl font-bold text-teal-400 mb-2">Ezwa | إزوة</h1>
        <p className="text-gray-300 text-sm">خدمة المساعدة السريعة للطرق والأعطال</p>
      </div>

      <div className="bg-gray-900/90 backdrop-blur-md border border-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-md space-y-6 z-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs text-gray-300 text-right">اختر الخدمة المطلوبة</label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-teal-400 transition cursor-pointer text-right"
            >
              <option value="تغيير بطارية">🔋 تغيير بطارية</option>
              <option value="تعبئة وقود">⛽ تعبئة وقود</option>
              <option value="سحب سيارة (سطحة)">🚚 سحب سيارة (سطحة)</option>
              <option value="بنشر إطار (تغيير كفر)">🛞 بنشر إطار (تغيير كفر)</option>
              <option value="فتح أقفال السيارة">🔑 فتح أقفال السيارة</option>
              <option value="خدمة الكهرباء والميكانيكا">🛠️ خدمة الكهرباء والميكانيكا</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-xl transition shadow-lg mt-4"
          >
            طلب فزعة الآن
          </button>
        </form>
      </div>
    </div>
  );
}