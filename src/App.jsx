import React, { useState, useEffect } from 'react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('ezwa_logged_in') === 'true';
  });
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [lang, setLang] = useState('AR');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedClient, setSelectedClient] = useState(() => {
    const saved = localStorage.getItem('ezwa_selected_client');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  });

  // فرضنا الرابط الأساسي حصرياً على Render لمنع أي بقايا لـ localhost
  const [baseUrl, setBaseUrl] = useState(() => {
    const saved = localStorage.getItem('ezwa_base_url');
    if (!saved || saved.includes('localhost') || saved.includes('127.0.0.1')) {
      return 'https://anwar-bank-app.onrender.com';
    }
    return saved;
  });

  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('ezwa_wallet_employees_blue');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      { id: '272811', name: 'أنور محمد الأهدل', role: 'مدير البطاقات والمسؤول الإداري', department: 'الإدارة العامة والتحكم', cardStatus: 'مشرف النظام 👑', phone: '0500000000', email: 'anwar@ezwa.com' },
      { id: '272721', name: 'صالح ابراهيم القرني', role: 'مدير التنفيذي', department: 'الإدارة التنفيذية', cardStatus: 'تم إصدار البطاقة 📱', phone: '0503692547', email: '272721@ezwa.com' }
    ];
  });

  const [newEmployeeId, setNewEmployeeId] = useState('');
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    if (idParam) {
      const found = employees.find(e => e.id === idParam);
      if (found) {
        setSelectedClient(found);
        setCurrentPage('client');
      }
    }
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('ezwa_wallet_employees_blue', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('ezwa_logged_in', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('ezwa_base_url', baseUrl);
  }, [baseUrl]);

  useEffect(() => {
    if (selectedClient) {
      localStorage.setItem('ezwa_selected_client', JSON.stringify(selectedClient));
    } else {
      localStorage.removeItem('ezwa_selected_client');
    }
  }, [selectedClient]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      setIsLoggedIn(true);
      setLoginError('');
      setCurrentPage('home');
    } else {
      setLoginError(lang === 'AR' ? 'الرجاء إدخال اسم المستخدم وكلمة المرور بشكل صحيح' : 'Please enter valid username and password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    localStorage.setItem('ezwa_logged_in', 'false');
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmployeeId.trim() || !newEmployeeName.trim() || !newRole.trim()) return;

    const newEmp = {
      id: newEmployeeId,
      name: newEmployeeName,
      role: newRole,
      department: 'تقنية المعلومات وإدارة البطاقات',
      cardStatus: lang === 'AR' ? 'تم إصدار البطاقة 📱' : 'Card Issued 📱',
      phone: newPhone || '0500000000',
      email: `${newEmployeeId}@ezwa.com`
    };

    setEmployees([newEmp, ...employees]);
    setNewEmployeeId('');
    setNewEmployeeName('');
    setNewRole('');
    setNewPhone('');
    setNotification(lang === 'AR' ? '✅ تم إصدار البطاقة الرقمية وحفظها بنجاح!' : '✅ Digital card issued and saved successfully!');
    setTimeout(() => setNotification(''), 4000);
  };

  const urlParams = new URLSearchParams(window.location.search);
  const directId = urlParams.get('id');
  const publicClient = directId ? employees.find(e => e.id === directId) : null;

  if (publicClient && !isLoggedIn && currentPage !== 'cards' && currentPage !== 'home') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 text-white p-6 rounded-3xl shadow-2xl border border-blue-700/50 space-y-6 max-w-md w-full relative overflow-hidden">
          <div className="flex justify-between items-center border-b border-blue-800/60 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">💳</span>
              <span className="text-xs font-bold tracking-wider text-blue-200 uppercase">EZWA DIGITAL PASS</span>
            </div>
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">معتمد ✅</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-blue-300 uppercase tracking-widest block">اسم الموظف</span>
            <h3 className="text-2xl font-extrabold">{publicClient.name}</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] text-blue-300 uppercase tracking-widest block">المسمى الوظيفي</span>
              <p className="text-xs font-semibold text-slate-100">{publicClient.role}</p>
            </div>
            <div>
              <span className="text-[10px] text-blue-300 uppercase tracking-widest block">الرقم الوظيفي</span>
              <p className="text-xs font-mono font-bold text-blue-200">{publicClient.id}</p>
            </div>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-blue-800/50 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">القسم:</span>
              <span className="font-bold text-white">{publicClient.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">الجوال:</span>
              <span className="font-bold text-white">{publicClient.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">الحالة:</span>
              <span className="font-bold text-blue-400">{publicClient.cardStatus}</span>
            </div>
          </div>

          <button 
            onClick={() => window.location.href = baseUrl}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold p-3 rounded-xl text-xs transition"
          >
            الانتقال للنظام الرئيسي 🏠
          </button>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4" dir={lang === 'AR' ? 'rtl' : 'ltr'}>
        <div className="bg-slate-900 border border-slate-800 w-full max-w-md p-8 rounded-3xl shadow-2xl space-y-6 text-white">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <span className="text-xs font-bold text-blue-400">Admin Control Room 🛡️</span>
            <div className="flex gap-1">
              <button onClick={() => setLang('AR')} className={`text-xs px-2.5 py-1 rounded-lg font-bold transition ${lang === 'AR' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>AR</button>
              <button onClick={() => setLang('EN')} className={`text-xs px-2.5 py-1 rounded-lg font-bold transition ${lang === 'EN' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>EN</button>
            </div>
          </div>

          <div className="text-center space-y-2">
            <div className="bg-blue-600 text-white w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-600/40">
              👑
            </div>
            <h1 className="text-2xl font-extrabold">{lang === 'AR' ? 'بوابة مدير البطاقات' : 'Card Manager Portal'}</h1>
            <p className="text-slate-400 text-xs">{lang === 'AR' ? 'تسجيل الدخول للغرفة الإدارية ونظام المحافظ الرقمية' : 'Sign in to administrative room and digital wallet system'}</p>
          </div>

          {loginError && (
            <div className="bg-red-950/80 border border-red-800 text-red-300 p-3 rounded-xl text-xs text-center font-bold">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">{lang === 'AR' ? 'اسم المشرف (Username)' : 'Admin Username'}</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="anwar / email..."
                className="w-full bg-slate-950 border border-slate-700 p-3.5 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">{lang === 'AR' ? 'كلمة المرور / الرقم الإداري' : 'Password / Admin ID'}</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="272811"
                className="w-full bg-slate-950 border border-slate-700 p-3.5 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold p-3.5 rounded-xl text-xs transition shadow-lg shadow-blue-600/30"
            >
              {lang === 'AR' ? 'دخول الغرفة الإدارية ⚡' : 'Enter Admin Room ⚡'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50" dir={lang === 'AR' ? 'rtl' : 'ltr'}>
      <header className="bg-blue-900 text-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition ${currentPage === 'home' ? 'bg-blue-700 text-white' : 'text-blue-200 hover:bg-blue-800'}`}
            >
              {lang === 'AR' ? '🏠 الرئيسية' : '🏠 Home'}
            </button>
            <button 
              onClick={() => setCurrentPage('cards')}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition ${currentPage === 'cards' || currentPage === 'client' ? 'bg-blue-700 text-white' : 'text-blue-200 hover:bg-blue-800'}`}
            >
              {lang === 'AR' ? '💳 إدارة البطاقات' : '💳 Cards'}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-blue-950 p-1 rounded-lg border border-blue-800">
              <button onClick={() => setLang('AR')} className={`text-xs px-2.5 py-0.5 rounded font-bold transition ${lang === 'AR' ? 'bg-blue-600 text-white' : 'text-blue-300 hover:text-white'}`}>AR</button>
              <button onClick={() => setLang('EN')} className={`text-xs px-2.5 py-0.5 rounded font-bold transition ${lang === 'EN' ? 'bg-blue-600 text-white' : 'text-blue-300 hover:text-white'}`}>EN</button>
            </div>

            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white text-xs px-3.5 py-1.5 rounded-lg font-bold transition shadow-sm"
            >
              {lang === 'AR' ? 'تسجيل خروج 🚪' : 'Logout 🚪'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        
        {currentPage === 'home' && (
          <div className="space-y-6">
            <div className="text-center bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-3">
              <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-1">
                👑 {lang === 'AR' ? 'حساب مدير البطاقات والمسؤول الإداري' : 'Card Manager & Admin Account'}
              </div>
              <h2 className="text-3xl font-extrabold text-blue-950 tracking-tight">
                {lang === 'AR' ? 'مرحباً بك في نظام البطاقات الرقمية 🌟' : 'Welcome to Digital Wallet System 🌟'}
              </h2>
              <p className="text-slate-500 text-xs max-w-lg mx-auto leading-relaxed">
                {lang === 'AR' 
                  ? 'هذا النظام يتيح لك إصدار وإدارة بطاقات الموظفين الرقمية وتضمين باركود يفتح بطاقة الموظف فوراً.'
                  : 'This system allows you to issue employee cards with QR codes opening the employee pass immediately.'}
              </p>
              <div className="pt-2 flex justify-center">
                <button 
                  onClick={() => setCurrentPage('cards')}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md transition"
                >
                  {lang === 'AR' ? 'الذهاب لإدارة البطاقات والموظفين ⚡' : 'Go to Cards Management ⚡'}
                </button>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'cards' && (
          <div className="space-y-6">
            <div className="text-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-3xl font-extrabold text-blue-950 tracking-tight">
                {lang === 'AR' ? 'إدارة البطاقات الرقمية 💳' : 'Digital Cards Management 💳'}
              </h2>
              <p className="text-slate-500 text-xs mt-1">
                {lang === 'AR' ? 'حفظ وإدارة بطاقات الموظفين الذكية بالرقم الوظيفي (ID)' : 'Manage smart employee cards by ID'}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-3">
              <h3 className="font-bold text-blue-950 text-sm">
                {lang === 'AR' ? '🌐 رابط النطاق الأساسي للـ QR Code (Base URL)' : '🌐 QR Code Base URL Settings'}
              </h3>
              <p className="text-slate-500 text-xs">
                {lang === 'AR' 
                  ? 'تأكد أن الرابط أدناه هو رابط موقعك الحقيقي على Render ليعمل الباركود بشكل مثالي:' 
                  : 'Ensure the URL below is your actual Render deployed URL for working QR codes:'}
              </p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://anwar-bank-app.onrender.com"
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-mono text-slate-700 focus:outline-none focus:border-blue-600"
                />
                <button 
                  onClick={() => alert(lang === 'AR' ? '✅ تم حفظ رابط النطاق وتحديث الباركودات!' : '✅ Base URL saved and QRs updated!')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 rounded-xl text-xs transition whitespace-nowrap shadow-sm"
                >
                  {lang === 'AR' ? 'حفظ الرابط' : 'Save URL'}
                </button>
              </div>
            </div>

            {notification && (
              <div className="bg-blue-50 border border-blue-200 text-blue-900 p-3 rounded-xl text-center text-xs font-bold shadow-sm">
                {notification}
              </div>
            )}

            <form onSubmit={handleAddEmployee} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
              <h3 className="font-bold text-blue-950 text-sm">
                {lang === 'AR' ? 'إضافة موظف جديد وإصدار بطاقة محفظة' : 'Add New Employee & Issue Wallet Pass'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input 
                  type="text" 
                  value={newEmployeeId}
                  onChange={(e) => setNewEmployeeId(e.target.value)}
                  placeholder={lang === 'AR' ? 'الرقم الوظيفي (مثل 272811)...' : 'Employee ID (e.g. 272811)...'}
                  className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                />
                <input 
                  type="text" 
                  value={newEmployeeName}
                  onChange={(e) => setNewEmployeeName(e.target.value)}
                  placeholder={lang === 'AR' ? 'اسم الموظف الثلاثي...' : 'Full Employee Name...'}
                  className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                />
                <input 
                  type="text" 
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder={lang === 'AR' ? 'المسمى الوظيفي...' : 'Job Title...'}
                  className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                />
                <input 
                  type="text" 
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder={lang === 'AR' ? 'رقم الجوال (مثل 0500000000)...' : 'Phone Number...'}
                  className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-xl text-xs transition shadow-md">
                {lang === 'AR' ? 'إصدار البطاقة الرقمية مع QR ⚡' : 'Issue Digital Card with QR ⚡'}
              </button>
            </form>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-3">
              <h3 className="font-bold text-blue-950 text-sm">
                {lang === 'AR' ? `الموظفون والبطاقات النشطة (${employees.length})` : `Active Employees & Cards (${employees.length})`}
              </h3>
              <div className="space-y-2">
                {employees.map((emp) => (
                  <div key={emp.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-blue-50/50 transition">
                    <div>
                      <div className="flex items-center gap-2">
                        <p 
                          onClick={() => { setSelectedClient(emp); setCurrentPage('client'); }}
                          className="font-bold text-slate-900 text-sm cursor-pointer hover:text-blue-600 transition underline"
                        >
                          {emp.name}
                        </p>
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
                        onClick={() => { setSelectedClient(emp); setCurrentPage('client'); }}
                        className="bg-white hover:bg-slate-100 border border-slate-200 text-blue-700 text-xs font-bold px-3 py-1 rounded-xl transition"
                      >
                        {lang === 'AR' ? 'ملف العميل 👤' : 'Client Profile 👤'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'client' && selectedClient && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-blue-950">
                  {lang === 'AR' ? 'ملف العميل / الموظف 👤' : 'Client / Employee Profile 👤'}
                </h2>
                <p className="text-slate-500 text-xs mt-0.5">
                  {lang === 'AR' ? 'امسح الباركود ليتم فتح بطاقة الموظف في الجوال مباشرة' : 'Scan QR to open employee pass on mobile'}
                </p>
              </div>
              <button 
                onClick={() => setCurrentPage('cards')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition"
              >
                {lang === 'AR' ? '◀ العودة للقائمة' : '◀ Back to List'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              
              <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 text-white p-6 rounded-3xl shadow-2xl border border-blue-700/50 space-y-6 relative overflow-hidden">
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-600/20 rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="flex justify-between items-center border-b border-blue-800/60 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💳</span>
                    <span className="text-xs font-bold tracking-wider text-blue-200 uppercase">EZWA DIGITAL PASS</span>
                  </div>
                  <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    APPLE / GOOGLE
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-blue-300 uppercase tracking-widest block">EMPLOYEE NAME</span>
                  <h3 className="text-2xl font-extrabold tracking-tight">{selectedClient.name}</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <span className="text-[10px] text-blue-300 uppercase tracking-widest block">JOB TITLE</span>
                    <p className="text-xs font-semibold text-slate-100">{selectedClient.role}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-blue-300 uppercase tracking-widest block">EMPLOYEE ID</span>
                    <p className="text-xs font-mono font-bold text-blue-200">{selectedClient.id}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-blue-800/60 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] text-blue-300 uppercase tracking-widest block">WEB PASS LINK</span>
                    <span className="text-[11px] font-mono font-bold text-white bg-blue-900/80 px-2 py-0.5 rounded border border-blue-700 truncate max-w-[180px] block">
                      {baseUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}/?id={selectedClient.id}
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded-2xl shadow-md border border-slate-200 flex flex-col items-center">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(`${baseUrl.replace(/\/$/, '')}/?id=${selectedClient.id}`)}&size=150x150`}
                      alt="URL QR Code" 
                      className="w-20 h-20 rounded-lg object-contain"
                    />
                    <span className="text-[8px] font-bold text-slate-700 mt-1">SCAN WEB</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-5">
                <h3 className="font-bold text-blue-950 text-sm pb-2 border-b border-slate-100">
                  {lang === 'AR' ? 'بيانات التواصل والإدارة والباركود' : 'Contact, Management & QR Info'}
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between">
                    <span className="text-slate-400 font-bold">{lang === 'AR' ? 'رقم الجوال' : 'Phone'}</span>
                    <span className="font-medium text-slate-800">{selectedClient.phone || 'غير متوفر'}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between">
                    <span className="text-slate-400 font-bold">{lang === 'AR' ? 'البريد الإلكتروني' : 'Email'}</span>
                    <span className="font-medium text-slate-800">{selectedClient.email || `${selectedClient.id}@ezwa.com`}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between">
                    <span className="text-slate-400 font-bold">{lang === 'AR' ? 'حالة البطاقة' : 'Status'}</span>
                    <span className="font-bold text-blue-600">{selectedClient.cardStatus}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button 
                    onClick={() => alert(lang === 'AR' ? `جاري إرسال رابط تحديث المحفظة والباركود للموظف: ${selectedClient.name}` : `Sending pass link and QR to: ${selectedClient.name}`)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-xl text-xs transition shadow-md"
                  >
                    {lang === 'AR' ? 'إرسال رابط البطاقة للمحفظة 🔄' : 'Send Pass Link to Wallet 🔄'}
                  </button>
                  <button 
                    onClick={() => {
                      setEmployees(employees.filter(emp => emp.id !== selectedClient.id));
                      setCurrentPage('cards');
                    }}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold p-3 rounded-xl text-xs transition"
                  >
                    {lang === 'AR' ? 'حذف البطاقة 🗑️' : 'Delete Card 🗑️'}
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}