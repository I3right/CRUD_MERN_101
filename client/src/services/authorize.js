// เก็บ token, username ลงใน session storage
export const authenticate = (response, next) => {
  // กำลังใช้งาน brower อยู่?
  if (window !== undefined) {
    // สร้าง session storage (obj) เก็บข้อมูลชื่อ token เก็บข้อมูลจาก res.data.token <= json
    sessionStorage.setItem("token", JSON.stringify(response.data.token));
    sessionStorage.setItem("user", JSON.stringify(response.data.username));
  }
  
  // รอรับ action ถัดไปที่จะถูกป้อนมา
  next();
};

// ดึงข้อมูล token
export const getToken = () => {
  // กำลังใช้งาน brower อยู่?
  if (window !== undefined) {
    if (sessionStorage.getItem("token")) {
      return JSON.parse(sessionStorage.getItem("token")); // .parse แปลงจาก OBJ => JSON
    } else {
      return false;
    }
  }
};

// ดึงข้อมูล user
export const getUser = () => {
  // กำลังใช้งาน brower อยู่?
  if (window !== undefined) {
    if (sessionStorage.getItem("user")) {
      return JSON.parse(sessionStorage.getItem("user")); // .parse แปลงจาก OBJ => JSON
    } else {
      return false;
    }
  }
};

// Logout
export const logout = (next) => {
  // กำลังใช้งาน brower อยู่?
  if (window !== undefined) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

  // รอรับ action ถัดไปที่จะถูกป้อนมา
  next()
};
