// خبير البرمجة: تم إعداد السكربت الشامل لإدارة الـ 19 تبويبة بكل تفاصيلها وحركاتها.

document.addEventListener('DOMContentLoaded', () => {

    // === 1. إدارة التنقل بين التبويبات (SPA Routing) + GSAP ===
    const navLinks = document.querySelectorAll('.nav-links li');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

            link.classList.add('active');
            const targetId = link.getAttribute('data-target');
            const targetPage = document.getElementById(targetId);
            
            if(targetPage) {
                targetPage.classList.add('active');
                gsap.from(targetPage.children, {
                    y: 20, opacity: 0, duration: 0.4, stagger: 0.1, ease: "power2.out"
                });
            }
        });
    });

    // === 2. إنشاء الهياكل الديناميكية للتبويبات القديمة (لتخفيف كود HTML) ===
    const dynamicPages = [
        { id: 'courses', title: 'الدورات', btnText: 'إضافة دورة', cols: ['الدورة','التخصص','البداية','النهاية','المقاعد','الإجراءات'] },
        { id: 'subjects', title: 'المواد', btnText: 'إضافة مادة', cols: ['المادة','الرمز','المدة','الرسوم','المدرس','الإجراءات'] },
        { id: 'employees', title: 'الموظفين', btnText: 'إضافة موظف', cols: ['الاسم','الوظيفة','الراتب','التعيين','الإجراءات'] },
        { id: 'salaries', title: 'الرواتب', btnText: 'إضافة راتب', cols: ['الموظف','الشهر','الأساسي','الصافي','تاريخ الصرف','الإجراءات'] },
        { id: 'installments', title: 'الأقساط والتسديد', btnText: 'إنشاء أقساط', cols: ['الطالب','المبلغ الكلي','القسط','الاستحقاق','الإجراءات'] },
        { id: 'incomes', title: 'الواردات', btnText: 'إضافة وارد', cols: ['المصدر','النوع','المبلغ','التاريخ','المستلم','الإجراءات'] },
        { id: 'expenses', title: 'المصروفات', btnText: 'إضافة مصروف', cols: ['النوع','المبلغ','الجهة','التاريخ','الإجراءات'] },
        { id: 'pettycash', title: 'النثريات', btnText: 'إضافة نثرية', cols: ['السبب','المبلغ','التاريخ','الملاحظات','الإجراءات'] },
        { id: 'reports', title: 'التقارير', btnText: 'توليد تقرير', cols: ['نوع التقرير','التاريخ','النتيجة','الإجراءات'] },
        { id: 'statistics', title: 'الإحصائيات', btnText: 'تحديث البيانات', cols: ['الإحصائية','القيمة','النسبة','الإجراءات'] },
        { id: 'notifications', title: 'الإشعارات', btnText: 'إضافة إشعار', cols: ['العنوان','النوع','التاريخ','الحالة','الإجراءات'] },
        { id: 'settings', title: 'الإعدادات', btnText: 'حفظ الإعدادات', cols: ['الإعداد','القيمة','الحالة','الإجراءات'] }
    ];

    const container = document.getElementById('dynamicPagesContainer');
    dynamicPages.forEach(page => {
        let thHTML = page.cols.map(c => `<th>${c}</th>`).join('');
        container.innerHTML += `
            <section id="${page.id}" class="page">
                <div class="page-header">
                    <h2 class="page-title">${page.title}</h2>
                    <button class="btn-primary" onclick="openGenericModal('${page.btnText}')">➕ ${page.btnText}</button>
                </div>
                <div class="table-container">
                    <table class="modern-table">
                        <thead><tr>${thHTML}</tr></thead>
                        <tbody id="${page.id}TableBody"></tbody>
                    </table>
                </div>
            </section>
        `;
    });

    // === 3. توليد كروت الإحصائيات 3D في الرئيسية ===
    const dashboardStats = document.getElementById('dashboardStats');
    if(dashboardStats) {
        dashboardStats.innerHTML = `
            <div class="card-3d-wrapper gradient-border-wrapper">
                <div class="card-3d-inner"><div class="card-front"><div class="card-icon">👨‍🎓</div><h3>عدد الطلاب</h3><div class="card-value">1250</div><button class="btn-details">تفاصيل</button></div><div class="card-back"><h3>نمو مستمر</h3><p>+15% هذا الشهر</p><button class="btn-action">رجوع</button></div></div>
            </div>
            <div class="card-3d-wrapper gradient-border-wrapper">
                <div class="card-3d-inner"><div class="card-front"><div class="card-icon">💰</div><h3>الوارد الشهري</h3><div class="card-value">45,000</div><button class="btn-details">تفاصيل</button></div><div class="card-back"><h3>تفاصيل</h3><p>تم تحصيل 80% من الأقساط</p><button class="btn-action">رجوع</button></div></div>
            </div>
        `;

        // تفعيل حركة 3D GSAP لزر التفاصيل
        document.querySelectorAll('.btn-details').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const cardInner = this.closest('.card-3d-inner');
                const tl = gsap.timeline();
                tl.to(cardInner, { scale: 0.96, rotationY: 180, duration: 0.6 })
                  .to(cardInner, { rotationY: 360, z: 50, duration: 0.8, ease: "back.out(1.5)" })
                  .to(cardInner, { scale: 1, z: 0, duration: 0.3, clearProps: "all" }, "-=0.2");
            });
        });
    }

    // === 4. البيانات الوهمية (Mock Data) لجميع الجداول ===
    const mockData = {
        students: [{ c1: 'أحمد محمود', c2: 'دورة ويب', c3: 'برمجة', c4: '<span class="status-badge status-active">فعال</span>' }],
        registration: [{ c1: 'سارة علي', c2: 'مرحلة أولى', c3: '2023-10-15', c4: '<span class="status-badge status-pending">انتظار</span>' }],
        attendance: [{ c1: 'أحمد محمود', c2: 'طالب', c3: 'دورة ويب', c4: '08:30 AM', c5: '<span class="status-badge status-active">حاضر</span>' }],
        exams: [{ c1: 'مصطفى كريم', c2: 'برمجة', c3: 'الشهر الأول', c4: '95', c5: 'امتياز' }],
        schedule: [{ c1: 'الأحد', c2: '10:00 - 12:00', c3: 'رياضيات', c4: 'أ. علي', c5: 'القاعة A' }],
        library: [{ c1: 'ملزمة الفيزياء', c2: 'فيزياء', c3: 'PDF', c4: '2MB', c5: '2023-11-01' }],
        messages: [{ c1: 'ولي أمر (سارة)', c2: 'استفسار', c3: 'موعد الامتحان', c4: 'اليوم', c5: '<span class="status-badge status-pending">غير مقروء</span>' }]
    };

    function populateTable(tbodyId, dataArray) {
        const tbody = document.getElementById(tbodyId);
        if(!tbody || !dataArray) return;
        
        let html = '';
        dataArray.forEach(row => {
            html += '<tr>';
            Object.values(row).forEach(val => html += `<td>${val}</td>`);
            html += `<td>
                        <button class="icon-btn" onclick="openGenericModal('عرض التفاصيل')" title="عرض">👁️</button>
                        <button class="icon-btn" onclick="openGenericModal('تعديل البيانات')" title="تعديل">✏️</button>
                        <button class="icon-btn" title="حذف">🗑️</button>
                     </td></tr>`;
        });
        tbody.innerHTML = html;
    }

    // تعبئة الجداول
    populateTable('studentsTableBody', mockData.students);
    populateTable('registrationTableBody', mockData.registration);
    populateTable('attendanceTableBody', mockData.attendance);
    populateTable('examsTableBody', mockData.exams);
    populateTable('scheduleTableBody', mockData.schedule);
    populateTable('libraryTableBody', mockData.library);
    populateTable('messagesTableBody', mockData.messages);

});

// === 5. نظام إدارة النوافذ المنبثقة (Modals) الشامل والديناميكي ===
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.add('active');
        gsap.fromTo(modal.querySelector('.modal-content'), 
            { scale: 0.8, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        gsap.to(modal.querySelector('.modal-content'), {
            scale: 0.8, opacity: 0, duration: 0.2, 
            onComplete: () => { modal.classList.remove('active'); }
        });
    }
};

// مولد النماذج الديناميكي لحقول الـ 5 تبويبات الجديدة وبقية النظام
window.openGenericModal = function(actionType) {
    document.getElementById('genericModalTitle').innerText = actionType;
    let fieldsHTML = '';

    // توليد حقول مخصصة بناءً على اسم الزر/الإجراء لتلبية متطلباتك
    if(actionType.includes('حضور الطلاب')) {
        fieldsHTML = `
            <div class="input-group"><label>اسم الطالب</label><input type="text" class="glass-input"></div>
            <div class="input-group"><label>الدورة/المادة</label><select class="glass-input"><option>دورة ويب</option></select></div>
            <div class="input-group"><label>حالة الحضور</label><select class="glass-input"><option>حاضر</option><option>غائب</option><option>متأخر</option></select></div>
        `;
    } else if(actionType.includes('امتحان') || actionType.includes('درجات')) {
        fieldsHTML = `
            <div class="input-group"><label>اسم الامتحان / الطالب</label><input type="text" class="glass-input"></div>
            <div class="input-group"><label>المادة</label><input type="text" class="glass-input"></div>
            <div class="input-group"><label>الدرجة الكلية / الممنوحة</label><input type="number" class="glass-input"></div>
        `;
    } else if(actionType.includes('جدول') || actionType.includes('قاعات')) {
        fieldsHTML = `
            <div class="input-group"><label>اليوم</label><select class="glass-input"><option>الأحد</option><option>الاثنين</option></select></div>
            <div class="input-group"><label>وقت البداية</label><input type="time" class="glass-input"></div>
            <div class="input-group"><label>القاعة</label><select class="glass-input"><option>القاعة A</option></select></div>
        `;
    } else if(actionType.includes('رفع ملف')) {
        fieldsHTML = `
            <div class="input-group"><label>اسم الملف</label><input type="text" class="glass-input"></div>
            <div class="input-group"><label>المادة</label><input type="text" class="glass-input"></div>
            <div class="input-group"><label>اختيار الملف</label><input type="file" class="glass-input"></div>
        `;
    } else if(actionType.includes('رسالة')) {
        fieldsHTML = `
            <div class="input-group"><label>المرسل إليه / الفئة</label><select class="glass-input"><option>الطلاب</option><option>أولياء الأمور</option></select></div>
            <div class="input-group"><label>العنوان</label><input type="text" class="glass-input"></div>
            <div class="input-group"><label>محتوى الرسالة</label><textarea class="glass-input" rows="4"></textarea></div>
        `;
    } else {
        // حقول عامة افتراضية
        fieldsHTML = `
            <div class="input-group"><label>البيان / الاسم</label><input type="text" class="glass-input"></div>
            <div class="input-group"><label>التاريخ</label><input type="date" class="glass-input"></div>
            <div class="input-group"><label>ملاحظات</label><textarea class="glass-input"></textarea></div>
        `;
    }

    document.getElementById('genericModalBody').innerHTML = `
        <form class="modern-form">
            ${fieldsHTML}
            <div class="form-actions">
                <button type="button" class="btn-primary" onclick="closeModal('genericModal')">حفظ البيانات</button>
            </div>
        </form>
    `;
    
    openModal('genericModal');
};
