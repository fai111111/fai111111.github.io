// ไฟล์: change_password_script.js
document.addEventListener('DOMContentLoaded', function() {
    const changePasswordForm = document.getElementById('changePasswordForm');

    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const newPasswordInput = document.getElementById('newPassword');
            const confirmPasswordInput = document.getElementById('confirmPassword');

            const newPassword = newPasswordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            // ดึงอีเมลผู้ใช้ที่ล็อกอินอยู่จาก localStorage
            const userEmail = localStorage.getItem('loggedInUserEmail');

            if (!userEmail) {
                alert('ไม่พบข้อมูลผู้ใช้ กรุณาล็อกอินใหม่');
                window.location.href = 'index.html'; // กลับไปหน้า Login
                return;
            }

            if (newPassword === '') {
                alert('กรุณาป้อนรหัสผ่านใหม่');
                newPasswordInput.focus();
                return;
            }

            if (confirmPassword === '') {
                alert('กรุณายืนยันรหัสผ่านใหม่');
                confirmPasswordInput.focus();
                return;
            }

            if (newPassword !== confirmPassword) {
                alert('รหัสผ่านใหม่และการยืนยันไม่ตรงกัน กรุณาลองอีกครั้ง');
                newPasswordInput.value = '';
                confirmPasswordInput.value = '';
                newPasswordInput.focus();
                return;
            }

            console.log('กำลังพยายามเปลี่ยนรหัสผ่าน...');

            try {
                // ส่งรหัสผ่านใหม่และอีเมลไปยัง Backend
                const response = await fetch('http://127.0.0.1:5001/api/change-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: userEmail, newPassword: newPassword }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert('เปลี่ยนรหัสผ่านสำเร็จแล้ว!');
                    console.log('Password change successful:', data);
                    localStorage.removeItem('loggedInUserEmail'); // ล้างอีเมลออกจาก localStorage
                    window.location.href = 'password_success.html'; // ไปหน้าสำเร็จ
                } else {
                    alert('เปลี่ยนรหัสผ่านไม่สำเร็จ: ' + (data.message || 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ'));
                    console.error('Password change failed:', data);
                }
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์:', error);
                alert('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง');
            }
        });
    }
});
