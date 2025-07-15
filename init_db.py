# ไฟล์: init_db.py

import sqlite3

DATABASE = 'users.db' # ชื่อไฟล์ฐานข้อมูล SQLite

def init_db():
    conn = sqlite3.connect(DATABASE) # เชื่อมต่อฐานข้อมูล (ถ้าไม่มีจะสร้างไฟล์ใหม่)
    cursor = conn.cursor()

    # สร้างตาราง users ถ้ายังไม่มี
    # เพิ่มคอลัมน์ default_password_used (INTEGER, 1=true, 0=false)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            default_password_used INTEGER DEFAULT 1 -- เพิ่มคอลัมน์นี้: 1 คือยังใช้รหัสผ่านเริ่มต้น, 0 คือเปลี่ยนแล้ว
        )
    ''')
    conn.commit()

    # รายการอีเมลจากรูปภาพของคุณ
    allowed_emails = [
        "CHAIYATH@SCG.COM",
        "KIATTISJ@SCG.COM",
        "email3@example.com",
        "testuser1@example.com",
        "testuser2@example.com",
        "testuser3@example.com",
        "chaiyath@scg.com" # เพิ่มอีเมลที่คุณใช้ทดสอบ
        # ... เพิ่มอีเมลทั้งหมดจากรูปภาพของคุณที่นี่
    ]

    fixed_password = "1234" # รหัสผ่านเริ่มต้นตายตัว

    # ป้อนข้อมูลอีเมลลงในตาราง users
    for email in allowed_emails:
        try:
            # เมื่อเพิ่มผู้ใช้ใหม่ ให้ตั้งค่า default_password_used เป็น 1 (true)
            cursor.execute("INSERT INTO users (email, password, default_password_used) VALUES (?, ?, ?)", 
                           (email, fixed_password, 1)) 
            print(f"เพิ่มอีเมล '{email}' ลงในฐานข้อมูลแล้ว (ใช้รหัสผ่านเริ่มต้น)")
        except sqlite3.IntegrityError:
            print(f"อีเมล '{email}' มีอยู่ในฐานข้อมูลแล้ว (ข้าม)")
            # หากอีเมลมีอยู่แล้ว และคุณต้องการรีเซ็ตสถานะ default_password_used
            # สามารถเพิ่มโค้ด update ตรงนี้ได้ (แต่ระวังข้อมูลที่มีอยู่)
            # เช่น: cursor.execute("UPDATE users SET default_password_used = 1 WHERE email = ?", (email,))
    
    conn.commit()
    conn.close()
    print("ฐานข้อมูล SQLite ถูกเริ่มต้นและป้อนข้อมูลเรียบร้อยแล้ว.")

if __name__ == '__main__':
    init_db()