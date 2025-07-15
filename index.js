// ไฟล์: script.js (สำหรับหน้า Login หลัก)
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');

            const email = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (email === '' || password === '') {
                alert('กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน');
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:5001/api/login', { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email, password: password }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert('เข้าสู่ระบบสำเร็จ!');
                    console.log('เข้าสู่ระบบสำเร็จ:', data);
                    
                    // *** เก็บอีเมลผู้ใช้ไว้ใน localStorage เพื่อใช้ในหน้าเปลี่ยนรหัสผ่าน ***
                    localStorage.setItem('loggedInUserEmail', email);

                    // ตรวจสอบ forcePasswordChange จาก Backend
                    if (data.forcePasswordChange) {
                        alert('กรุณาเปลี่ยนรหัสผ่านของคุณก่อนใช้งานต่อ');
                        window.location.href = 'change_password.html'; // บังคับไปหน้าเปลี่ยนรหัสผ่าน
                    } else {
                        window.location.href = 'home.html'; // ไปหน้า Home ปกติ
                    }
                    
                } else {
                    alert('เข้าสู่ระบบไม่สำเร็จ: ' + (data.message || 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ'));
                    console.error('เข้าสู่ระบบล้มเหลว:', data);
                }
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์:', error);
                alert('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง');
            }
        });
    }
});
