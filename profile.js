document.addEventListener('DOMContentLoaded', function() {
    // Event listener สำหรับปุ่ม "การตั้งค่า"
    const settingsButton = document.getElementById('settingsButton');
    if (settingsButton) {
        settingsButton.addEventListener('click', function() {
            alert('คุณคลิกปุ่ม "การตั้งค่า" (ในแอปจริงจะนำไปหน้าตั้งค่าผู้ใช้)');
            console.log('Settings button clicked.');
            // ในแอปจริง: อาจจะนำทางไปที่หน้าตั้งค่าผู้ใช้
            // window.location.href = 'settings.html';
        });
    }

    // Event listener สำหรับปุ่ม "ออกจากระบบ"
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            const confirmLogout = confirm('คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?'); // ใช้ confirm() ชั่วคราว
            if (confirmLogout) {
                alert('ออกจากระบบแล้ว (ในแอปจริงจะล้าง session และนำไปหน้า Login)');
                console.log('User logged out.');
                // ในแอปจริง: ล้างข้อมูล session/token และนำทางไปหน้า Login
                window.location.href = 'index.html'; // หรือ 'login.html'
            }
        });
    }

    // Event listener สำหรับลิงก์ "หลักฐาน" ในประวัติกิจกรรม
    const proofLinks = document.querySelectorAll('.activity-status .status-link');
    proofLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // ป้องกันการเปลี่ยนหน้า
            const activityName = this.closest('.activity-history-item').querySelector('.activity-history-name').textContent;
            alert(`คุณคลิก "หลักฐาน" สำหรับกิจกรรม: ${activityName} (ในแอปจริงจะแสดงหลักฐานหรือหน้าอัปโหลด)`);
            console.log('Proof link clicked for activity:', activityName);
            // ในแอปจริง: อาจจะเปิด modal แสดงรูปภาพหลักฐาน หรือนำไปหน้าอัปโหลดหลักฐาน
        });
    });

    // Event listener สำหรับลิงก์นำทาง (หากต้องการการจัดการเส้นทางฝั่งไคลเอ็นต์)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // ป้องกันพฤติกรรมเริ่มต้นของลิงก์เฉพาะถ้าเป็นลิงก์ปัจจุบันที่ active หรือไม่ใช่การโหลดหน้าเต็ม
            if (this.getAttribute('href') === '#') {
                event.preventDefault();
                console.log(`กำลังนำทางไปที่: ${this.textContent.trim()}`);
                alert(`คุณคลิกที่ ${this.textContent.trim()}`);
            } else if (this.classList.contains('active')) {
                event.preventDefault(); // ป้องกันการโหลดซ้ำหากอยู่บนหน้า active แล้ว
            }
            
            // ลบ class 'active' ออกจากลิงก์ทั้งหมด
            navLinks.forEach(l => l.classList.remove('active'));
            // เพิ่ม class 'active' ให้กับลิงก์ที่ถูกคลิก
            this.classList.add('active');

            // ถ้าเป็นลิงก์จริง ให้เบราว์เซอร์ทำงานตามปกติหากไม่ใช่ '#'
            if (this.getAttribute('href') !== '#') {
                window.location.href = this.getAttribute('href');
            }
        });
    });
});
