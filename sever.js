import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <style>
                :root { --bank-gold: #D4AF37; --bank-dark: #0f172a; --bank-blue: #1e40af; }
                body { background: var(--bank-dark); color: white; font-family: 'Segoe UI', sans-serif; margin: 0; padding: 0; }

                /* الهيدر */
                .header { padding: 25px; display: flex; justify-content: space-between; align-items: center; }
                .profile-pic { width: 45px; height: 45px; border-radius: 50%; border: 2px solid var(--bank-gold); }

                /* البطاقة البنكية */
                .card-gold {
                    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                    margin: 0 20px; padding: 25px; border-radius: 25px;
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                    position: relative; overflow: hidden;
                }
                .card-gold::after {
                    content: ""; position: absolute; top: -50%; right: -20%;
                    width: 200px; height: 200px; background: rgba(212, 175, 55, 0.05);
                    border-radius: 50%;
                }

                /* الرصيد */
                .balance-section { padding: 30px 20px; text-align: center; }
                .balance-amount { font-size: 2.8rem; font-weight: 800; color: white; margin: 5px 0; }
                
                /* أزرار الإجراءات السريعة */
                .actions { display: flex; justify-content: space-around; padding: 10px 20px; }
                .action-item { text-align: center; font-size: 0.8rem; }
                .action-icon { 
                    width: 55px; height: 55px; background: rgba(255,255,255,0.05); 
                    border-radius: 18px; display: flex; align-items: center; 
                    justify-content: center; font-size: 1.5rem; margin-bottom: 8px;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                /* قائمة العمليات */
                .transactions {
                    background: white; color: black; border-top-left-radius: 35px;
                    border-top-right-radius: 35px; padding: 30px 25px; margin-top: 30px;
                    min-height: 50vh;
                }
                .trans-item {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 15px 0; border-bottom: 1px dotted #ddd;
                }
                .trans-icon { width: 45px; height: 45px; background: #f0f4f8; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
            </style>
        </head>
        <body>
            
            <div class="header">
                <div>
                    <div style="color: #94a3b8; font-size: 0.9rem;">مرحباً بك،</div>
                    <div style="font-weight: bold; font-size: 1.2rem;">أنور الأهدل 👑</div>
                </div>
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Anwar" class="profile-pic">
            </div>

            <div class="balance-section">
                <div style="color: #94a3b8; font-size: 0.9rem;">إجمالي الرصيد</div>
                <div class="balance-amount">54,250.00 <span style="font-size: 1rem;">SAR</span></div>
            </div>

            <div class="card-gold">
                <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
                    <span style="color: var(--bank-gold); font-weight: bold; letter-spacing: 2px;">ANWAR PLATINUM</span>
                    <span>VISA</span>
                </div>
                <div style="font-size: 1.2rem; letter-spacing: 3px; margin-bottom: 20px;">**** **** **** 2026</div>
                <div style="display: flex; gap: 20px; font-size: 0.8rem; color: #94a3b8;">
                    <div>VALID THRU<br><span style="color: white;">12/29</span></div>
                    <div>CVV<br><span style="color: white;">***</span></div>
                </div>
            </div>

            <div class="actions" style="margin-top: 30px;">
                <div class="action-item"><div class="action-icon">💸</div>تحويل</div>
                <div class="action-item"><div class="action-icon">📊</div>تقارير</div>
                <div class="action-item"><div class="action-icon">💳</div>بطاقاتي</div>
                <div class="action-item"><div class="action-icon">➕</div>شحن</div>
            </div>

            <div class="transactions">
                <h3 style="margin-bottom: 20px;">العمليات الأخيرة</h3>
                
                <div class="trans-item">
                    <div style="display: flex; gap: 15px;">
                        <div class="trans-icon">☕</div>
                        <div>
                            <div style="font-weight: bold;">Urban Cup Coffee</div>
                            <div style="font-size: 0.7rem; color: #64748b;">١٣ مايو، ١٢:٤١ م</div>
                        </div>
                    </div>
                    <div style="font-weight: bold; color: #e11d48;">-35.00 ر.س</div>
                </div>

                <div class="trans-item">
                    <div style="display: flex; gap: 15px;">
                        <div class="trans-icon" style="color: #059669;">💰</div>
                        <div>
                            <div style="font-weight: bold;">إيداع راتب</div>
                            <div style="font-size: 0.7rem; color: #64748b;">١٠ مايو، ٠٩:٠٠ ص</div>
                        </div>
                    </div>
                    <div style="font-weight: bold; color: #059669;">+15,000.00 ر.س</div>
                </div>
            </div>

        </body>
        </html>
    `);
});

app.listen(3000, '0.0.0.0', () => console.log('Bank App Ready: http://172.20.10.2:3000'));