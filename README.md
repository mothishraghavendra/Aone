# School ERP - Unified Student Management System


Educational institutions today struggle with fragmented data management where admissions, fee collection, hostel allocation, and examination records exist in isolated systems. This creates inefficient processes where students must visit multiple counters for different services, staff members repeatedly enter the same information across various platforms, and administrators lack real-time visibility into institutional operations. The disconnected nature of these systems not only wastes valuable time and resources but also increases the likelihood of data inconsistencies and errors, ultimately impacting the overall student experience and administrative efficiency.

Rather than investing in expensive proprietary ERP systems that strain institutional budgets, this project leverages familiar cloud-based tools and services to create a unified student management ecosystem. The solution integrates widely-available platforms like Google Workspace, Microsoft 365, or similar cloud services with custom web applications built using accessible technologies such as PHP, MySQL, and JavaScript. By connecting these existing tools through intelligent automation and API integrations, institutions can achieve comprehensive data unification while maintaining cost-effectiveness and ensuring staff can easily adapt to the new system using skills they already possess.

The system architecture centres around a web-based dashboard built with PHP and MySQL that serves as the central hub for all student data. Interactive forms created using HTML5 and JavaScript capture admission information, while automated workflows handle fee processing and receipt generation through integrated payment gateways. Real-time hostel occupancy tracking utilizes responsive web interfaces, and examination management modules connect seamlessly with the central database. Role-based access control ensures appropriate data security, while cloud storage services handle automated backups. The entire system emphasizes mobile responsiveness and intuitive user interfaces to accommodate both technical and non-technical staff members.

This integrated approach transforms institutional operations by eliminating redundant data entry, reducing student wait times, and providing administrators with live dashboards displaying key performance metrics. Students benefit from streamlined processes where their information follows them through every institutional touchpoint, from admission to graduation. Staff efficiency improves dramatically as automated workflows handle routine tasks, while robust reporting capabilities enable data-driven decision making. Most importantly, the solution remains financially accessible to public colleges while delivering enterprise-level functionality, proving that thoughtful integration of existing tools can rival expensive commercial alternatives.

---

## Getting Started

### Prerequisites
- Node.js and npm installed
- MySQL server running

### Setup Steps
1. **Clone the repository**
2. **Create environment files**
   - Copy `example.env` to `.env` in both the frontend (`school-erp/.env`) and backend (`school-erp/backend/.env`) folders.
   - Fill in your own values for database, Cloudinary, and other credentials.
3. **Install dependencies**
   - Run `npm install` in both the frontend and backend directories, or use the provided `requirements.txt` for reference.
4. **Initialize the database**
   - Run `node backend/database/init.js` to set up all tables and schema.
5. **Create default users**
   - Run `node backend/database/init-default-users.js` to create admin, principal, and warden accounts.
6. **Start the backend server**
   - Run `node backend/app.js` or use `npm start` if available.
7. **Start the frontend React app**
   - Run `npm start` in the frontend directory.

### Notes
- Make sure `.env` files are not committed to version control (see `.gitignore`).
- All sensitive credentials should be stored in `.env` files only.
- For Cloudinary and other integrations, use the provided environment variable names as shown in `example.env`.

---

## Project Structure
- `backend/` - Node.js/Express API, database scripts, and configuration
- `src/` - React frontend code
- `public/` - Static assets
- `requirements.txt` - List of npm dependencies for reference
- `example.env` - Sample environment variable file

---

## Example Code Blocks for Setup

### Clone Repository
```bash
git clone https://github.com/mothishraghavendra/Aone.git
cd school-erp
```

### Install Dependencies
```bash
npm install
cd backend && npm install
```

### Environment Configuration
```bash
# Copy environment template
cp example.env .env
cp backend/example.env backend/.env

# Edit .env and backend/.env with your configuration
```

### Database Setup
```bash
node backend/database/init.js
```

### Create Default Users
```bash
node backend/database/init-default-users.js
```

### Start Application
```bash
node backend/app.js
npm start
```

---

## License
MIT
