import React, { useState, useEffect } from 'react';

export default function WalletDashboard() {
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('ezwa_wallet_employees_blue');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      { id: '272811', name: 'أنور محمد الأهدل', role: 'مهندس برمجيات', department: 'تقنية المعلومات', cardStatus: 'تم إصدار البطاقة 📱' },
      { id: 'EMP-1001', name: 'أحمد الغامدي', role: 'مهندس برمجيات', department: 'تقنية المعلومات', cardStatus: 'نشطة 📱' }
    ];
  });

  const [newEmployeeId, setNewEmployeeId] = useState('');
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    localStorage.setItem('ezwa_wallet_employees_blue', JSON.stringify(employees));
  }, [employees]);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmployeeId.trim() || !newEmployeeName.trim() || !newRole.trim()) return;

    const newEmp = {
      id: newEmployeeId,
      name: newEmployeeName,
      role: newRole,
      department: 'تقنية المعلومات',
      cardStatus: 'تم إصدار البطاقة 📱'
    };

    setEmployees([newEmp, ...employees]);
    setNewEmployeeId('');
    setNewEmployeeName('');
    setNewRole('');
    setNotification('✅ تم إصدار البطاقة الرقمية وحفظها بنجاح!');
    setTimeout(() => setNotification(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-right" dir="rtl">
      {/* شريط التنقل العلوي بلون أزرق فخم ومتناسق */}
      <header className="bg-blue-900 text-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="bg-blue-800 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition">
              ◀ Back to Home
            </button>
            <span className="text-blue-200 text-xs border-r border-blue-700 pr-3">
              Digital Wallet Management
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-800 text-blue-100 text-xs px-2.5 py-0.5 rounded font-bold">AR</span>
            <span className="bg-blue-950 text-white text-xs px-2.5 py-0.5 rounded font-bold">EN</span>
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="text-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-3xl font-extrabold text-blue-950 tracking-tight">إدارة البطاقات الرقمية 💳</h2>
          <p className="text-slate-500 text-xs mt-1">حفظ وإدارة بطاقات الموظفين الذكية بالرقم الوظيفي (ID)</p>
        </div>

        {notification && (
          <div className="bg-blue-50 border border-blue-200 text-blue-900 p-3 rounded-xl text-center text-xs font-bold shadow-sm">
            {notification}
          </div>
        )}

        {/* نموذج إضافة موظف */}
        <form onSubmit={handleAddEmployee} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <h3 className="font-bold text-blue-950 text-sm">إضافة موظف جديد وإصدار بطاقة محفظة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input 
              type="text" 
              value={newEmployeeId}
              onChange={(e) => setNewEmployeeId(e.target.value)}
              placeholder="الرقم الوظيفي (مثل 272811)..."
              className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
            <input 
              type="text" 
              value={newEmployeeName}
              onChange={(e) => setNewEmployeeName(e.target.value)}
              placeholder="اسم الموظف الثلاثي..."
              className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
            <input 
              type="text" 
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              placeholder="المسمى الوظيفي..."
              className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-xl text-xs transition shadow-md">
            إصدار البطاقة الرقمية (Wallet Pass) ⚡
          </button>
        </form>

        {/* قائمة الموظفين */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-3">
          <h3 className="font-bold text-blue-950 text-sm">الموظفون والبطاقات النشطة ({employees.length})</h3>
          <div className="space-y-2">
            {employees.map((emp) => (
              <div key={emp.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-blue-50/50 transition">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-slate-900 text-sm">{emp.name}</p>
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border border-blue-200">
                      {emp.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{emp.role} • {emp.department}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-sm">
                    {emp.cardStatus}
                  </span>
                  <button 
                    onClick={() => alert(`جاري إرسال رابط تحديث المحفظة للموظف: ${emp.name} (ID: ${emp.id})`)}
                    className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-1 rounded-xl transition"
                  >
                    تحديث 🔄
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}