# Synergy Inventory Management System

A standalone, front-end Inventory Management Portal built for **Synergy — the Official Sports Society of IGDTUW**. 

This portal was designed to track, manage, and issue sports equipment to student volunteers transparently, eliminating the need for paper logs and ensuring accurate inventory levels.

## Features

- **Public Notice Board**: A live view of available sports equipment and announcements for volunteers.
- **Role-Based Access Control (RBAC)**: Secure access separated into Admin and Student/Volunteer roles.
- **Admin Dashboard**: 
  - Manage and edit inventory quantities (including tracking damaged items).
  - Issue and accept returned equipment from students.
  - Create and manage Volunteer Shifts.
  - Add and delete public notices.
  - View and export a complete log of all equipment transactions.
- **Volunteer Dashboard**:
  - View items currently issued to you.
  - Sign up for upcoming volunteer shifts.
  - View a personal history log of borrowed equipment.

## Tech Stack
- **HTML5 & CSS3** (Custom styling matching the Synergy brand guidelines)
- **Bootstrap 4** (Responsive layout and tables)
- **Vanilla JavaScript** (ES6+)
- **Browser LocalStorage** (Mock database for the prototype phase)

## How to Run Locally

Since this is a front-end prototype using `localStorage` for data persistence, no backend server or database is required!

1. Clone this repository.
2. Open the project folder in VS Code.
3. Use the **Live Server** extension to open `inventory.html`.
4. Navigate the portal using the navigation bar.

### Testing Credentials

**Admin Role:**
- **Username:** `admin`
- **Password:** `synergy@admin`

**Student/Volunteer Role:**
- **Roll Number:** *(Any 7-digit number, e.g., `1234567`)*
- **Password:** `synergy123`

---
*Developed for Indira Gandhi Delhi Technical University for Women (IGDTUW).*
