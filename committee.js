document.addEventListener('DOMContentLoaded', function() {
    // ตัวอย่าง: เพิ่ม event listener สำหรับลิงก์นำทาง (ถ้าคุณต้องการการจัดการเส้นทางฝั่งไคลเอ็นต์)
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

    // ตัวอย่าง: เพิ่ม event listener สำหรับการ์ดบุคคล (ถ้าต้องการให้คลิกแล้วแสดงข้อมูลเพิ่มเติม)
    const personCards = document.querySelectorAll('.person-card, .org-person-card');
    personCards.forEach(card => {
        card.addEventListener('click', function() {
            const name = this.querySelector('.person-name').textContent;
            const title = this.querySelector('.person-title').textContent;
            console.log(`คลิกที่: ${name}, ตำแหน่ง: ${title}`);
            alert(`ข้อมูล: ${name} - ${title}`);
        });
    });
});
