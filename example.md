![VistaTasks Logo](public/logo.png)

# **VistaTasks** - An Assignment from Vista Systech for Front-End Intern

_Scroll Down and checkout the overview video for quick understand,thanks_ <br>
Assalamualaikum, dear reviewers, this is a task for the role of Front-End Developer Intern at Vista Systech. I just created a name for this assignment based on the company name, calling it VistaTask. As per the requirements, I have built it using React, JavaScript, useContext, and useReducer. Additionally, I have added some extra features for backup and better performance, such as LocalStorage, Firebase Authentication, and Firebase Storage, which are explained in detail below.

---

## 📑 **Table of Contents**

1. [🎥 Overview Video](#-overview-video-i-am-adding-the-video-soon)
2. [🚀 How to Run Locally](#-how-to-run-locally)
3. [✨ Core Features](#-core-features)
4. [🎯 Extra Features](#-extra-features)
   - [🎭 Advanced Animations & UI](#-advanced-animations--ui)
   - [🌙 Theme System](#-theme-system)
   - [💾 Local Storage Integration](#-local-storage-integration)
   - [🔥 Firebase & Google Authentication](#-firebase--google-authentication)
   - [⌨️ Keyboard Shortcuts & Accessibility](#keyboard-shortcuts--accessibility)
5. [📁 Project Structure](#-project-structure)
6. [🔧 Technology Stack](#-technology-stack)

---

## 🎥 **Overview Video**

In this video, you can quickly and more clearly understand what I have done and how I have done it.

[![Watch the Video](./public/docs/youtube.jpg)](https://youtu.be/fxisxMqLuiU)

_Click the image to watch the video_

---

## 🚀 **How to Run Locally**

### **Prerequisites**

- Node.js (v16 or higher)
- npm or yarn
- Firebase account <span style="color: #f59e0b; font-weight: 600;">(You can skip this step because I have kept the .env file for a quick run.)</span>

### **Quick Setup**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/vista-tasks.git
   cd vista-tasks
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Firebase** <span style="color: #f59e0b; font-weight: 600;">(You can skip this step because I have kept the .env file for a quick run.)</span>

   - Create a Firebase project
   - Add your Firebase configuration to `.env` file
   - Enable Google Authentication

4. **Start Development Server**

   ```bash
   npm run dev
   ```

5. **Open Browser**
   - Navigate to `http://localhost:5173`
   - Sign in with Google
   - Start managing your tasks!

### **Environment Variables** <span style="color: #f59e0b; font-weight: 600;">(You can also skip this step because I have kept the .env file for a quick run.)</span>

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_MESSAGING_APP_ID=your_app_id
```

---

## ✨ **Core Features**

### **Task Management**

- ✅ **Create Tasks**: Add new tasks with title, description, and due date
- ✅ **Edit Tasks**: Modify existing tasks anytime
- ✅ **Delete Tasks**: Remove completed or unnecessary tasks
- ✅ **Mark Complete**: Toggle task completion status
- ✅ **Task Categories**: Organize tasks by status (All, Active, Completed)
- ⌨️ **Keyboard Shortcuts**:
  - **Enter**: Submit forms, confirm actions
  - **Escape**: Cancel modals, clear search
  - **Shift+Enter**: New line in description (textarea)

### **Data & Sync**

- 🔄 **Real-time Synchronization**: Tasks sync automatically across devices
- ☁️ **Firebase Integration**: Secure cloud storage for your tasks
- 💾 **Local Storage**: Offline-first approach with local data caching
- 🔐 **Google Authentication**: Secure login with Google accounts
- 📱 **Automatic Backup**: Local tasks automatically backed up to Firebase

### **User Interface**

- 🎨 **Responsive Design**: Works perfectly on all screen sizes
- 📱 **Mobile-First**: Optimized for mobile and tablet devices
- 🎭 **Smooth Animations**: Beautiful transitions and micro-interactions

---

## 🎯 **Extra Features**

1. [**Advanced Animations & UI**](#-advanced-animations--ui)
2. [**Local Storage Integration**](#-local-storage-integration)
3. [**Firebase & Google Authentication**](#-firebase--google-authentication)
4. [**Keyboard Shortcuts & Accessibility**](#keyboard-shortcuts--accessibility)

### **🎭 Advanced Animations & UI**

**Great animation with framer motion**: Smooth, professional animations throughout the app for enhanced user experience

### **🌙 Theme System**

**Dark Mode and Light Mode Implementation**: Complete dark/light theme switching with context-based state management
![Step 1](./public//docs/dark.jpg)  
![Step 1](./public//docs/light.jpg)

### **💾 Local Storage Integration**

**Local Storage for Todo List and Theme Persistence**:

- Todo data persistence using localStorage
- Theme preference saved locally
- Offline-first approach for better user experience

### **🔥 Firebase & Google Authentication**

**Firebase with Google Authentication Implementation**: When you login with Google, local storage data gets stored in Firebase for backup purposes:

- Google authentication integration
- Automatic backup of localStorage data to Firebase
- Real-time data synchronization across devices
- Secure cloud storage for user data.
  ![Step 1](./public//docs/google.jpg)

### **⌨️ Keyboard Shortcuts & Accessibility**

**Enhanced User Experience with Keyboard Navigation**:

- **Enter Key**: Submit forms, confirm actions, and add tasks
- **Escape Key**: Cancel modals, hide dropdowns, and clear search
- **Shift+Enter**: Create new lines in task descriptions
- **Global Keyboard Support**: Works across all modals and forms

---

## 📁 **Project Structure**

This section provides a comprehensive overview of how VistaTasks is organized, showing the file structure and component architecture that demonstrates clean code organization and separation of concerns.

---

### **🏗️ Project Architecture**

```
vista-tasks/
├── public/                 # Static assets
│   ├── icons/             # SVG icons and assets
│   ├── logo.png           # App logo
│   └── vite.svg           # Vite logo
├── src/
│   ├── components/        # React components
│   │   ├── todo/          # Todo-specific components
│   │   │   ├── Todo.jsx
│   │   │   └── sections/  # Todo component sections
│   │   │       ├── TaskCard.jsx
│   │   │   ├── TasksSection.jsx
│   │   │   ├── SearchAndFilterSection.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   └── TasksSectionHeader.jsx
│   │   └── ui/            # Reusable UI components
│   │       ├── Header.jsx
│   │       ├── EditAddModal.jsx
│   │       ├── DeleteConfirmModal.jsx
│   │       └── NoTasksFound.jsx
│   ├── contexts/          # React contexts
│   │   └── index.js       # Theme context
│   ├── db/                # Local storage utilities
│   │   └── localStorage.db.js
│   ├── models/            # Data models
│   │   └── todoModel.js
│   ├── pages/             # Page components
│   │   └── home/
│   │       └── index.jsx
│   ├── reducers/          # State management
│   │   └── todoReducer.js
│   ├── services/          # Firebase services
│   │   ├── firebase.config.js
│   │   └── firebase.js
│   └── utils/             # Utility functions
│       ├── alertMessage.js
│       ├── formatDate.js
│       ├── textTruncate.js
│       └── keyboardShortcuts.js
├── .env                    # Environment variables
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
└── README.md              # This file
```

---

## 🔧 **Technology Stack**

### **Frontend Technologies**

- **React 19**: Modern React with hooks and usecontext and useReducer
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React

### **Backend & Services**

- **Firebase**: Authentication and database
- **Firestore**: NoSQL cloud database
- **Google Auth**: Secure authentication service

### **Development Tools**

- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Git**: Version control
- **npm**: Package management

---

**VistaTasks** - Transform your task management experience with modern technology and beautiful design. Start organizing your life today! 🚀✨

---

_Built with ❤️ using React, Firebase, and modern web technologies_
