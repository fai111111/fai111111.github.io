# ไฟล์: app.py (ในโฟลเดอร์หลักของโปรเจกต์ของคุณ)

from flask import Flask, request, jsonify, g
from flask_cors import CORS
import sqlite3

app = Flask(__name__)

# --- 1. กำหนดค่า CORS ---
# ในระหว่างการพัฒนา ใช้ origins="*" เพื่ออนุญาตทุก Origin
# สำคัญ: ในสภาพแวดล้อม Production ให้เปลี่ยนเป็นโดเมน Frontend จริงของคุณเท่านั้น
CORS(app, origins="*") 

# --- 2. กำหนดชื่อไฟล์ฐานข้อมูล SQLite ---
DATABASE = 'users.db'

# --- 3. ฟังก์ชันสำหรับเชื่อมต่อฐานข้อมูล ---
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row # ทำให้สามารถเข้าถึงคอลัมน์เป็น dict ได้
    return db

# --- 4. ปิดการเชื่อมต่อฐานข้อมูลเมื่อ Request จบลง ---
@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# --- 5. API Endpoint สำหรับ Login ---
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "กรุณาใส่อีเมลและรหัสผ่าน"}), 400

    db = get_db()
    cursor = db.cursor()

    try:
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()

        if user:
            # ตรวจสอบรหัสผ่าน
            # สำคัญ: ในแอปพลิเคชันจริง ควรเปรียบเทียบ Hashed Password
            if user['password'] == password: 
                # ตรวจสอบสถานะ default_password_used
                force_password_change = bool(user['default_password_used']) # แปลง 1/0 เป็น True/False
                return jsonify({
                    "message": "เข้าสู่ระบบสำเร็จ!", 
                    "userEmail": email, 
                    "forcePasswordChange": force_password_change # ส่งสถานะนี้กลับไป
                }), 200
            else:
                return jsonify({"message": "รหัสผ่านไม่ถูกต้อง"}), 401
        else:
            return jsonify({"message": "ไม่พบอีเมลในระบบ"}), 401

    except Exception as e:
        print(f"เกิดข้อผิดพลาดในระหว่างกระบวนการเข้าสู่ระบบ: {e}")
        return jsonify({"message": "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์"}), 500

# --- 6. API Endpoint ใหม่สำหรับเปลี่ยนรหัสผ่าน ---
@app.route('/api/change-password', methods=['POST'])
def change_password():
    data = request.get_json()
    email = data.get('email')
    new_password = data.get('newPassword')

    if not email or not new_password:
        return jsonify({"message": "กรุณาใส่อีเมลและรหัสผ่านใหม่"}), 400

    db = get_db()
    cursor = db.cursor()

    try:
        # สำคัญ: ในแอปพลิเคชันจริง ควร Hashing new_password ก่อนบันทึกลง DB
        # และควรตรวจสอบสิทธิ์ของผู้ใช้ที่เรียก API นี้ด้วย (เช่น ผ่าน JWT token)
        cursor.execute("UPDATE users SET password = ?, default_password_used = ? WHERE email = ?", 
                       (new_password, 0, email)) # ตั้งค่า default_password_used เป็น 0 (false)
        db.commit() # บันทึกการเปลี่ยนแปลง

        if cursor.rowcount == 0: # ถ้าไม่มีแถวไหนถูกอัปเดต แสดงว่าไม่พบอีเมล
            return jsonify({"message": "ไม่พบอีเมลผู้ใช้"}), 404
        
        return jsonify({"message": "เปลี่ยนรหัสผ่านสำเร็จแล้ว"}), 200

    except Exception as e:
        print(f"เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน: {e}")
        return jsonify({"message": "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์"}), 500

# --- 7. รัน Flask Application ---
if __name__ == '__main__':
    app.run(debug=True, port=5001)
