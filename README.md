เว็บไซต์ CRUD เพิ่ม ลบ แก้ไข ข้อมูลส่วนบุคคล

## เริ่มต้นใช้งาน

คำสั่งสำหรับรันเว็บไซต์:

```bash
# คำสั่งติดตั้งท package ต่างๆ
npm install

# คำสั่งติดตั้ง database และ pgadmin4 
docker compose up -d

# เข้าถึง dir src
cd src

# คำสั่งสร้าง Table ใน database
npx prisma migrate dev --name "initial create table"

# นำ Backup.sql ไป Import เข้าไปใน pgadmin เพื่อเพิ่ม master data

# คำสั่ง build project
npm run build

# คำสั่งรันเว็บไซต์
npm run start
```
สามารถเข้าดู pgadmin ผ่าน url: [http://localhost:5050](http://localhost:5050) 
username: admin@admin.com 
password: root

url สำหรับ api: [http://localhost:3001](http://localhost:3000)