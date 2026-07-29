import React, { useState } from 'react';
import OrderForm from './OrderForm';

const ServiceSelection = () => {
    // هذه الحالة تتحكم بالخدمة التي اختارها المستخدم
    const [selectedService, setSelectedService] = useState(null);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            {/* إذا كان selectedService قيمته null، نظهر الأزرار */}
            {!selectedService ? (
                <div>
                    <h2>أهلاً بك في عزوة</h2>
                    <p>اختر الخدمة التي تحتاجها:</p>
                    <button onClick={() => setSelectedService('سطحة')}>سطحة</button>
                    <button onClick={() => setSelectedService('بطارية')}>بطارية</button>
                    <button onClick={() => setSelectedService('مقاضي')}>مقاضي</button>
                </div>
            ) : (
                // إذا تم اختيار خدمة، نظهر نموذج الطلب (OrderForm)
                <OrderForm 
                    serviceType={selectedService} 
                    onClose={() => setSelectedService(null)} 
                />
            )}
        </div>
    );
};

export default ServiceSelection;