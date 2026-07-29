import React, { useState } from 'react';

export default function WalletDashboard() {
  const [employees, setEmployees] = useState([
    { id: 'EMP-1001', name: 'أحمد الغامدي', role: 'مهندس برمجيات', department: 'تقنية المعلومات', cardStatus: 'نشطة' },
    { id: 'EMP-1002', name: 'سارة خالد', role: 'مدير تنفيذي', department: 'الإدارة', cardStatus: 'نشطة' }
  ]);

  const [newEmployeeId, setNewEmployeeId] = useState('');
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [notification, setNotification] = useState('');

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmployeeId.trim() || !newEmployeeName.trim() || !newRole.trim()) return;

    const newEmp = {
      id: newEmployeeId,
      name: newEmployeeName,
      role: newRole,
      department: 'التقنية',
      cardStatus: 'تم إصدار البطاقة 📱'
    };

    setEmployees([newEmp, ...employees]);
    setNewEmployeeId('');
    setNewEmployeeName('');
    setNewRole('');
    setNotification('✅ تم إصدار البطاقة الرقمية برقم المعرّف وإرسالها بنجاح!');
    setTimeout(() => setNotification(''), 4000);
  };

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto text-right" dir="rtl">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-purple-900 tracking-tight">إدارة البطاقات الرقمية (Apple / Google Wallet) 💳</h2>
        <p className="text-gray-500 text-xs mt-1">إصدار ومتابعة بطاقات الموظفين الذكية بالرقم الوظيفي (ID)</p>
      </div>

      {notification && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-2xl text-center text-xs font-bold shadow-sm">
          {notification}
        </div>
      )}

      {/* نموذج إضافة موظف مع الـ ID */}
      <form onSubmit={handleAddEmployee} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-4">
        <h3 className="font-bold text-gray-800 text-sm">إضافة موظف جديد وإصدار بطاقة محفظة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input 
            type="text" 
            value={newEmployeeId}
            onChange={(e) => setNewEmployeeId(e.target.value)}
            placeholder="الرقم الوظيفي (ID مثل EMP-103)..."
            className="bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:border-purple-600"
          />
          <input 
            type="text" 
            value={newEmployeeName}
            onChange={(e) => setNewEmployeeName(e.target.value)}
            placeholder="اسم الموظف الثلاثي..."
            className="bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:border-purple-600"
          />
          <input 
            type="text" 
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            placeholder="المسمى الوظيفي..."
            className="bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:border-purple-600"
          />
        </div>
        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold p-3 rounded-xl text-sm transition shadow-md">
          إصدار البطاقة الرقمية برقم المعرّف (Wallet Pass) ⚡
        </button>
      </form>

      {/* قائمة الموظفين مع عرض الـ ID */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-3">
        <h3 className="font-bold text-gray-800 text-sm">الموظفون والبطاقات النشطة ({employees.length})</h3>
        <div className="space-y-2">
          {employees.map((emp) => (
            <div key={emp.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-gray-900 text-sm">{emp.name}</p>
                  <span className="bg-purple-50 text-purple-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border border-purple-200">
                    {emp.id}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{emp.role} • {emp.department}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-xl">
                  {emp.cardStatus}
                </span>
                <button 
                  onClick={() => alert(`جاري إرسال رابط تحديث المحفظة للموظف: ${emp.name} (ID: ${emp.id})`)}
                  className="bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-bold px-3 py-1 rounded-xl transition"
                >
                  تحديث 🔄
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}