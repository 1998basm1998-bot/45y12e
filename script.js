// خبير البرمجة: تم إعداد السكربت لتوليد التبويبات والمودالات بديناميكية وحرفية عالية

document.addEventListener('DOMContentLoaded', () => {

    // === 1. إدارة التنقل بين التبويبات (SPA Routing) + GSAP Animations ===
    const navLinks = document.querySelectorAll('.nav-links li');
    const pagesContainer = document.querySelector('.pages-container');

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

    // === 2. إنشاء الهياكل الديناميكية للتبويبات المتبقية ===
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
                    <button class="btn-primary" onclick="openGenericModal('${page.title}')">➕ ${page.btnText}</button>
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

    // === 3. البيانات الوهمية (Mock Data) وتعبئة الجداول ===
    const mockData = {
        students: [
            { name: 'أحمد محمود', course: 'برمجة', subject: 'JS', status: 'فعال' },
            { name: 'سارة علي', course: 'لغات', subject: 'English', status: 'متأخر' }
        ],
        registration: [
            { name: 'زينب محمد', stage: 'الابتدائية', date: '2023-10-01', status: 'انتظار' }
        ],
        courses: [
            { c1: 'دورة ويب', c2: 'IT', c3: '2023-11', c4: '2024-02', c5: '25', c6: '' }
        ],
        employees: [
            { c1: 'مصطفى كريم', c2: 'محاسب', c3: '600$', c4: '2022-01', c5: '' }
        ]
        // يمكن إضافة بيانات لبقية الجداول بنفس النمط
    };

    function generateRows(dataArray, isStandard) {
        return dataArray.map(item => {
            let tr = '<tr>';
            if(isStandard) {
                tr += `<td>${item.name}</td><td>${item.course || item.stage}</td><td>${item.subject || item.date}</td>
                       <td><span class="status-badge ${item.status === 'فعال' ? 'status-active' : 'status-pending'}">${item.status}</span></td>`;
            } else {
                Object.values(item).forEach(val => tr += `<td>${val}</td>`);
            }
            tr += `<td>
                    <button class="icon-btn" onclick="openGenericModal('تعديل')" title="تعديل">✏️</button>
                    <button class="icon-btn" onclick="openModal('deleteModal')" title="حذف">🗑️</button>
                   </td></tr>`;
            return tr;
        }).join('');
    }

    document.getElementById('studentsTableBody').innerHTML = generateRows(mockData.students, true);
    document.getElementById('registrationTableBody').innerHTML = generateRows(mockData.registration, true);
    document.getElementById('coursesTableBody').innerHTML = generateRows(mockData.courses, false);
    document.getElementById('employeesTableBody').innerHTML = generateRows(mockData.employees, false);

});

// === 4. نظام إدارة النوافذ المنبثقة (Modals) الشامل ===
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.add('active');
        // أنيميشن GSAP لظهور النافذة
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
            onComplete: () => {
                modal.classList.remove('active');
                gsap.set(modal.querySelector('.modal-content'), { clearProps: "all" });
            }
        });
    }
};

// مولد النماذج الديناميكي (لتقليل حجم HTML وتغطية جميع متطلبات التبويبات)
window.openGenericModal = function(actionType) {
    document.getElementById('genericModalTitle').innerText = actionType;
    let fieldsHTML = '';

    // توليد حقول بناءً على نوع الإجراء المطلوب
    if(actionType.includes('دورة')) {
        fieldsHTML = `
            <div class="input-group"><label>اسم الدورة</label><input type="text" class="glass-input"></div>
            <div class="input-group"><label>التخصص</label><input type="text" class="glass-input"></div>
            <div class="input-group"><label>تاريخ البداية</label><input type="date" class="glass-input"></div>
            <div class="input-group"><label>تاريخ النهاية</label><input type="date" class="glass-input"></div>
            <div class="input-group"><label>الرسوم</label><input type="number" class="glass-input"></div>
            <div class="input-group"><label>المدرس</label><select class="glass-input"><option>أستاذ أحمد</option></select></div>
        `;
    } else if (actionType.includes('موظف') || actionType.includes('مادة')) {
         fieldsHTML = `
            <div class="input-group"><label>الاسم / العنوان</label><input type="text" class="glass-input"></div>
            <div class="input-group"><label>الوصف / الوظيفة</label><input type="text" class="glass-input"></div>
            <div class="input-group"><label>الراتب / الرسوم</label><input type="number" class="glass-input"></div>
        `;
    } else {
        // حقول افتراضية عامة لأي تبويبة أخرى (المصروفات، الإيرادات، الخ)
        fieldsHTML = `
            <div class="input-group"><label>البيان / الاسم</label><input type="text" class="glass-input"></div>
            <div class="input-group"><label>المبلغ / القيمة</label><input type="number" class="glass-input"></div>
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
