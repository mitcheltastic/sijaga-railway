# SiJaga - User and History Management API

This is the API for "SiJaga" that manages user authentication, card ID operations, and history tracking functionalities. This project is built with **Node.js**, **Express.js**, and **Prisma** for database interactions.

---

## Base URL
- **Production URL**: [https://sijaga-be.vercel.app](https://sijaga-be.vercel.app)

---

## 🚀 Features

- **User Management**: Register, login, logout, and profile updates.
- **Card ID Management**: Add and retrieve card IDs.
- **User ESS**: Extended functionalities like password change and user updates.
- **History Tracking**: Maintain user activity, retrieve latest entries, and track history status.
- **Availability Status**: Manage and retrieve real-time availability status.

---

## 📚 API Endpoints

### **User Endpoints**
| Method | Endpoint              | Description                |
|--------|-----------------------|----------------------------|
| POST   | `/user/register`      | Register a new user        |
| POST   | `/user/login`         | User login                 |
| POST   | `/user/logout`        | User logout                |

---

### **Card ID Endpoints**
| Method | Endpoint              | Description                |
|--------|-----------------------|----------------------------|
| POST   | `/card-id/create`     | Create a new card ID       |
| GET    | `/card-id/latest`     | Retrieve the latest card ID|

---

### **User ESS (Extended Self-Service)**
| Method | Endpoint                 | Description                     |
|--------|--------------------------|---------------------------------|
| GET    | `/user-ess/whoami`       | Get the current user profile    |
| POST   | `/user-ess/change-password` | Change the user's password   |
| DELETE | `/user-ess/delete`       | Delete the user's account       |
| PUT    | `/user-ess/update`       | Update user information         |

---

### **History Endpoints**
| Method | Endpoint                    | Description                       |
|--------|-----------------------------|-----------------------------------|
| GET    | `/history/users`            | Retrieve all users with history   |
| POST   | `/history/add`              | Add a new history entry           |
| GET    | `/history/all`              | Retrieve all history entries      |
| GET    | `/history/latest`           | Retrieve the latest history entry |
| GET    | `/history/top3/names`       | Retrieve the top 3 names          |
| GET    | `/history/top3/timestamps`  | Retrieve the top 3 timestamps     |
| POST   | `/history/box-status`       | Update or manage box status       |
| GET    | `/history/latest-box-status`| Retrieve the latest box status    |

---

### **Availability Endpoints**
| Method | Endpoint                    | Description                             |
|--------|-----------------------------|-----------------------------------------|
| POST   | `/availability/post`        | Add a new availability status          |
| GET    | `/availability/get-latest`  | Retrieve the latest availability status|

---

## 🛠️ Technologies Used

- **Node.js** - Server-side runtime
- **Express.js** - Backend framework
- **Prisma** - ORM for database management
- **JWT** - Authentication and token management
- **Bcrypt** - Password hashing
- **Nodemailer** - Email notifications

---

## ⚙️ Setup Instructions

Follow these steps to run the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/sijaga.git
   cd sijaga
