// خبير البرمجة: تم كتابة الكود ليكون منظماً ومقسماً لمهام واضحة

document.addEventListener('DOMContentLoaded', () => {

    // === 1. إدارة التنقل بين التبويبات (SPA Routing) ===
    const navLinks = document.querySelectorAll('.nav-links li');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // إزالة التفعيل من كل الروابط والصفحات
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));

            // تفعيل الرابط والصفحة المطلوبة
            link.classList.add('active');
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            
            // تشغيل حركة دخول للعناصر الداخلية في الصفحة الجديدة
            gsap.from(`#${targetId} > *`, {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out"
            });
        });
    });

    // === 2. أنيميشن GSAP لقلب الكارت (3D Flip) ===
    // هذا ينفذ الوصف التنفيذي المعقد الذي طلبته تماماً
    const detailsBtns = document.querySelectorAll('.btn-details');

    detailsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // منع الحدث من التأثير على عناصر أخرى
            e.stopPropagation(); 
            
            // تحديد الكارت الداخلي المرتبط بالزر
            const cardInner = this.closest('.card-3d-inner');
            const frontElements = cardInner.querySelectorAll('.card-front > *');
            
            // إنشاء Timeline احترافي من GSAP
            const tl = gsap.timeline();

            // 1. تصغير الكارت وقلبه 180 درجة (الوجه الخلفي)
            tl.to(cardInner, {
                scale: 0.96,
                rotationY: 180,
                duration: 0.6,
                ease: "power1.inOut"
            })
            // 2. إكمال الدورة لـ 360 درجة مع Bounce خفيف وعمق Z
            .to(cardInner, {
                rotationY: 360,
                z: 50, // عمق وهمي
                duration: 0.8,
                ease: "back.out(1.5)"
            })
            // 3. العودة للحجم الطبيعي وإزالة العمق
            .to(cardInner, {
                scale: 1,
                z: 0,
                duration: 0.3,
                clearProps: "all" // إعادة تهيئة الخصائص ليعمل مرة أخرى
            }, "-=0.2")
            // 4. تفكك بسيط وعودة للعناصر الداخلية (Micro-interactions)
            .from(frontElements, {
                y: 10,
                opacity: 0.5,
                duration: 0.4,
                stagger: 0.05,
                ease: "back.out(2)"
            });
        });
    });

    // زر العودة في الوجه الخلفي (مثال إضافي)
    const actionBtns = document.querySelectorAll('.btn-action');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cardInner = this.closest('.card-3d-inner');
            gsap.to(cardInner, { rotationY: 0, duration: 0.6, ease: "power2.out" });
        });
    });


    // === 3. النوافذ المنبثقة (Modals) ===
    const studentModal = document.getElementById('studentModal');
    const btnAddStudent = document.getElementById('btnAddStudent');
    const closeBtns = document.querySelectorAll('.close-modal');

    btnAddStudent.addEventListener('click', () => {
        studentModal.classList.add('active');
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            studentModal.classList.remove('active');
        });
    });

    // إغلاق النافذة عند الضغط خارجها
    studentModal.addEventListener('click', (e) => {
        if(e.target === studentModal) {
            studentModal.classList.remove('active');
        }
    });


    // === 4. البيانات الوهمية (Mock Data) وتعبئة الجداول ===
    const mockStudents = [
        { id: '1001', name: 'أحمد محمود العراقي', course: 'دورة البرمجة', status: 'فعال' },
        { id: '1002', name: 'سارة علي حسن', course: 'اللغة الإنجليزية', status: 'فعال' },
        { id: '1003', name: 'مصطفى كريم', course: 'دورة التصميم', status: 'قيد الانتظار' },
        { id: '1004', name: 'زينب محمد', course: 'دورة البرمجة', status: 'فعال' }
    ];

    function renderStudentsTable() {
        // تعبئة جدول الطلاب في تبويبة الطلاب
        const studentsTableBody = document.getElementById('studentsTableBody');
        // تعبئة جدول آخر التسجيلات في الرئيسية
        const recentStudentsTable = document.getElementById('recentStudentsTable');
        
        let rowsHtml = '';
        
        mockStudents.forEach(student => {
            const statusClass = student.status === 'فعال' ? 'status-active' : 'status-pending';
            rowsHtml += `
                <tr>
                    <td>#${student.id}</td>
                    <td><strong>${student.name}</strong></td>
                    <td>${student.course}</td>
                    <td><span class="status-badge ${statusClass}">${student.status}</span></td>
                    <td>
                        <button class="icon-btn" title="تعديل">✏️</button>
                        <button class="icon-btn" title="عرض">👁️</button>
                    </td>
                </tr>
            `;
        });

        if(studentsTableBody) studentsTableBody.innerHTML = rowsHtml;
        if(recentStudentsTable) recentStudentsTable.innerHTML = rowsHtml;
    }

    renderStudentsTable();

    // === 5. عداد الأرقام التلقائي (Counters) ===
    const counters = document.querySelectorAll('.card-value');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        // استخدام GSAP لعمل عداد رقمي بسلاسة
        gsap.to(counter, {
            innerHTML: target,
            duration: 2,
            snap: { innerHTML: 1 },
            ease: "power1.out",
            onUpdate: function() {
                // إضافة الفواصل للأرقام الكبيرة مثل 45,000
                counter.innerHTML = Number(Math.round(counter.innerHTML)).toLocaleString('en-US');
            }
        });
    });

    // === 6. نظام البحث (فلترة بسيطة في الجدول) ===
    const globalSearch = document.getElementById('globalSearch');
    globalSearch.addEventListener('input', function(e) {
        const term = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#studentsTableBody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
        });
    });

});
