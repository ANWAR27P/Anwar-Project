import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: 'عثمان الأهدل',
    email: 'anawa22@icloud.com',
    phone: '+966 500000000',
    password: '********'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSuccessMessage(t('profile_success_msg'));
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="space-y-6 w-full max-w-md mx-auto text-right">
      <div className="text-center">
        <div className="w-20 h-20 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto text-3xl font-bold shadow-inner mb-3">
          👤
        </div>
        <h2 className="text-2xl font-bold text-purple-900">{t('profile_title')}</h2>
        <p className="text-gray-500 text-xs mt-1">{t('profile_subtitle')}</p>
      </div>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl text-center text-sm font-bold">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">{t('profile_name')}</label>
          <input 
            type="text" 
            name="name"
            value={formData.name} 
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-3 border rounded-xl text-sm ${isEditing ? 'bg-white border-purple-400 focus:outline-none' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">{t('profile_email')}</label>
          <input 
            type="email" 
            name="email"
            value={formData.email} 
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-3 border rounded-xl text-sm ${isEditing ? 'bg-white border-purple-400 focus:outline-none' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">{t('profile_phone')}</label>
          <input 
            type="text" 
            name="phone"
            value={formData.phone} 
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-3 border rounded-xl text-sm ${isEditing ? 'bg-white border-purple-400 focus:outline-none' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">{t('profile_password')}</label>
          <input 
            type="password" 
            name="password"
            value={formData.password} 
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-3 border rounded-xl text-sm ${isEditing ? 'bg-white border-purple-400 focus:outline-none' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
          />
        </div>

        <div className="pt-2 flex gap-3">
          {!isEditing ? (
            <button 
              type="button" 
              onClick={() => setIsEditing(true)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold p-3 rounded-xl transition shadow-md text-sm"
            >
              {t('profile_edit_btn')} ✏️
            </button>
          ) : (
            <div className="flex gap-2 w-full">
              <button 
                type="submit" 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-xl transition shadow-md text-sm"
              >
                {t('profile_save_btn')} ✓
              </button>
              <button 
                type="button" 
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold px-4 py-3 rounded-xl transition text-sm"
              >
                {t('profile_cancel_btn')}
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}