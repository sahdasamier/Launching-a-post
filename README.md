# 📚 StoryWave - Social Storytelling Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-18.0.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Redux-Toolkit-purple?style=for-the-badge&logo=redux" alt="Redux" />
  <img src="https://img.shields.io/badge/Node.js-≥20.0.0-green?style=for-the-badge&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" />
</div>

<div align="center">
  <h3>🌊 Share your stories, inspire the world, and connect with a community of passionate storytellers</h3>
  
  <p>
    <a href="https://share-your-plogs.vercel.app/" target="_blank">
      <img src="https://img.shields.io/badge/🚀 Live Demo-Visit Site-success?style=for-the-badge" alt="Live Demo" />
    </a>
  </p>
</div>

## 🌟 Live Demo

**[📱 Try StoryWave Live](https://share-your-plogs.vercel.app/)**

<div align="center">
  <img src="https://share-your-plogs.vercel.app/share-posts.png" alt="StoryWave Platform Screenshot" width="800" />
  <p><em>Experience the full-featured social storytelling platform</em></p>
</div>

---

## 🚀 Overview

**StoryWave** is a modern social networking platform designed specifically for storytellers and content creators. Built with React and Redux, it provides a seamless experience for sharing personal stories, discovering new voices, and building meaningful connections within a vibrant community.

### ✨ Key Features

- **📝 Rich Story Creation** - Write and publish stories with multimedia support
- **👥 Social Networking** - Follow users, build your audience, and discover new voices
- **💬 Interactive Engagement** - Like, comment, and share stories with the community
- **🔍 Content Discovery** - Advanced search and user discovery features
- **👤 Enhanced Profiles** - Comprehensive user profiles with social statistics
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **🌙 Theme Support** - Light and dark mode for comfortable reading
- **🔐 Secure Authentication** - User registration and login system

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks and functional components
- **Redux Toolkit** - Predictable state management
- **React Router v7** - Client-side routing and navigation
- **CSS3** - Custom styling with responsive design

### Development Tools
- **Create React App** - Build toolchain and development server
- **ESLint** - Code linting and quality assurance
- **Node.js ≥20** - Runtime environment
- **npm ≥10** - Package management

---

## 🏗️ Architecture

```
src/
├── components/          # Reusable UI components
│   ├── Dashboard.js     # Main story feed
│   ├── CreatePost.js    # Story creation form
│   ├── Discover.js      # User discovery page
│   ├── Profile.js       # User profile management
│   ├── Login.js         # Authentication
│   ├── Signup.js        # User registration
│   ├── Layout.js        # Main layout wrapper
│   ├── NavBar.js        # Navigation component
│   ├── Sidebar.js       # Side navigation
│   └── ...
├── redux/               # State management
│   ├── TodoSlice.js     # Stories state
│   ├── UserSlice.js     # User and social features
│   └── store.js         # Redux store configuration
├── App.js              # Main application component
├── App.css             # Global styles
└── index.js            # Application entry point
```

---

## 🚀 Quick Start

### 🌟 Try the Live Demo

**Experience StoryWave in action:** [https://share-your-plogs.vercel.app/](https://share-your-plogs.vercel.app/)

*No installation required! Create an account and start exploring the platform immediately.*

### Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 20.0.0 or higher)
- **npm** (version 10.0.0 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Launching-a-post
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📖 Usage Guide

### Getting Started

**Option 1: Try the Live Demo**
- Visit [https://share-your-plogs.vercel.app/](https://share-your-plogs.vercel.app/)
- No setup required - start exploring immediately!

**Option 2: Local Development**

1. **Create an Account**
   - Visit the landing page and click "Join StoryWave"
   - Fill in your details to create a new account
   - You'll be automatically logged in and redirected to the dashboard

2. **Explore Stories**
   - Browse the main feed to discover stories from the community
   - Use the search bar to find specific content or authors
   - Like and comment on stories that resonate with you

3. **Create Your First Story**
   - Click the "Create" button in the navbar
   - Add a compelling title and write your story
   - Optionally attach an image to enhance your story
   - Publish and share with the community

4. **Build Your Network**
   - Visit the "Discover" page to find interesting users
   - Follow authors whose content you enjoy
   - Build your own audience by creating engaging content

### Navigation

- **🏠 Home** - Main story feed and discovery
- **🔍 Discover** - Find and follow new users
- **✏️ Create** - Write and publish new stories
- **👤 Profile** - Manage your account and view your stories

---

## 🎨 Features Deep Dive

### Story Creation
- Rich text editor for writing compelling narratives
- Image upload and preview functionality
- Real-time preview of how your story will appear
- Draft saving and publishing controls

### Social Features
- **Follow System** - Build connections with other storytellers
- **Engagement** - Like, comment, and share stories
- **User Profiles** - Comprehensive profiles with bio and statistics
- **Activity Feed** - Stay updated with content from followed users

### Discovery & Search
- **Content Search** - Find stories by title, content, or author
- **User Discovery** - Browse and search for new users to follow
- **Filtering** - Sort and filter content based on various criteria

---

## 🔧 Development

### Available Scripts

#### `npm start`
Runs the app in development mode with hot reloading.

#### `npm test`
Launches the test runner in interactive watch mode.

#### `npm run build`
Builds the app for production with optimizations.

#### `npm run eject`
Ejects from Create React App (⚠️ **irreversible operation**).

### Environment Variables

Create a `.env` file in the root directory:

```env
DISABLE_ESLINT_PLUGIN=true  # Disable ESLint for faster development
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation when necessary

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- State management powered by [Redux Toolkit](https://redux-toolkit.js.org/)
- Routing handled by [React Router](https://reactrouter.com/)
- Icons and design inspiration from various open-source projects

---

## 📞 Support

If you encounter any issues or have questions:

- 🐛 **Bug Reports** - Open an issue on GitHub
- 💡 **Feature Requests** - Suggest new features via issues
- 📧 **General Questions** - Contact the development team

---

<div align="center">
  <p><strong>Made with ❤️ for storytellers around the world</strong></p>
  <p>Happy storytelling! 📚✨</p>
</div>
