import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function TaskDashboard() {
  const { t } = useTranslation();
  
  // قائمة المهام (كل مهمة تحتوي على حالة، وعدد أيام التأجيل، وخطوات صغيرة إذا كانت صعبة)
  const [tasks, setTasks] = useState([
    { id: 1, text: 'إنهاء مشروع التخرج وتوثيق الكود', procrastinatedDays: 5, steps: ['فتح مجلد المشروع', 'كتابة سطرين برمجيين'], focused: false },
    { id: 2, text: 'مراجعة الحسابات البنكية', procrastinatedDays: 1, steps: [], focused: false }
  ]);

  const [newTaskText, setNewTaskText] = useState('');
  const [focusedTaskId, setFocusedTaskId] = useState(null);
  const [aiMessage, setAiMessage] = useState('');

  // إضافة مهمة جديدة
  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      procrastinatedDays: 0,
      steps: [],
      focused: false
    };
    setTasks([newTask, ...tasks]);
    setNewTaskText('');
  };

  // الذكاء التداخلي: تقسيم المهمة الصعبة إلى خطوات تافهة
  const breakdownTask = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          steps: [
            'الخطوة 1: افتح الجهاز وتنفس بعمق (دقيقة وحدة)',
            'الخطوة 2: جهز أول ملف أو أداة بدون تفكير',
            'الخطوة 3: اكتب أول سطر أو نفذ أول خطوة صغيرة'
          ]
        };
      }
      return task;
    }));
    setAiMessage('🤖 الذكاء التداخلي: قسّمت لك المهمة لخطوات أصغر من التخيل.. ابدأ بالأولى فوراً!');
    setTimeout(() => setAiMessage(''), 5000);
  };

  // تفعيل وضع التركيز الأحادي (إخفاء باقي المشتتات)
  const toggleFocusMode = (id) => {
    if (focusedTaskId === id) {
      setFocusedTaskId(null);
    } else {
      setFocusedTaskId(id);
    }
  };

  // حذف المهمة عند إنجازها
  const completeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (focusedTaskId === id) setFocusedTaskId(null);
  };

  return (
    <div className="space-y-6 w-full max-w-xl mx-auto text-right" dir="rtl">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-purple-900 tracking-tight">إنجاز | مدير المهام الصارم 🎯</h2>
        <p className="text-gray-500 text-xs mt-1">لا تسويف بعد اليوم.. ركز على مهمة وحدة واقهر التسويق</p>
      </div>

      {aiMessage && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-2xl text-center text-xs font-bold shadow-sm animate-pulse">
          {aiMessage}
        </div>
      )}

      {/* صندوق إدخال المهمة الكبيرة */}
      <form onSubmit={addTask} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-2">
        <input 
          type="text" 
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="إيش المهمة الثقيلة اللي جالس تؤجلها؟..."
          className="flex-1 bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:border-purple-600"
        />
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-5 rounded-xl text-sm transition shadow-md">
          أضف للمهام ⚡
        </button>
      </form>

      {/* قائمة المهام أو وضع التركيز الأحادي */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 text-gray-400 text-sm">
            🎉 كفو يا عثمان! ما فيه أي مهام متراكمة حالياً. ارتاح أو أضف مهمة جديدة.
          </div>
        ) : (
          tasks.filter(task => focusedTaskId === null || task.id === focusedTaskId).map((task) => (
            <div 
              key={task.id} 
              className={`p-5 rounded-3xl transition border ${focusedTaskId === task.id ? 'bg-purple-50 border-purple-400 shadow-xl ring-2 ring-purple-200' : 'bg-white border-gray-100 shadow-sm'}`}
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  {task.procrastinatedDays > 2 && (
                    <span className="inline-block bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">
                      ⚠️ مؤجلة من {task.procrastinatedDays} أيام!
                    </span>
                  )}
                  <h3 className="font-bold text-gray-900 text-base">{task.text}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleFocusMode(task.id)}
                    className={`text-xs font-bold px-3 py-2 rounded-xl transition ${focusedTaskId === task.id ? 'bg-purple-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {focusedTaskId === task.id ? 'إلغاء التركيز 🔓' : 'وضع التركيز 👁️‍🗨️'}
                  </button>
                  <button 
                    onClick={() => completeTask(task.id)}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition"
                  >
                    تم إنجازها ✓
                  </button>
                </div>
              </div>

              {/* أزرار الذكاء التداخلي إذا المهمة صعبة */}
              {task.steps.length === 0 ? (
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                  صعبة أو ثقيلة عليك؟ 
                  <button 
                    onClick={() => breakdownTask(task.id)}
                    className="text-purple-600 hover:text-purple-800 text-xs font-bold bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition"
                  >
                    🤖 قسّمها لي لخطوات تافهة
                  </button>
                </div>
              ) : (
                <div className="mt-4 pt-3 border-t border-purple-100 space-y-2">
                  <p className="text-xs font-bold text-purple-800">الخطوات الصغيرة المقترحة:</p>
                  {task.steps.map((step, idx) => (
                    <div key={idx} className="bg-white/80 p-2 rounded-xl text-xs text-gray-700 border border-purple-100 flex items-center gap-2">
                      <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}