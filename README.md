# OpenU Auto Login Chrome Extension

## 🚀 Overview
The **OpenU Auto Login** Chrome Extension automates student ID entry for Open University of Israel's login pages. It retrieves and saves the student's ID from the personal data page and autofills it during login.

## 📌 Features
- Auto-fills Student ID on login pages.
- Fetches and stores Student ID from the OpenU personal data page.
- One-click ID update via the popup.

## 🔧 Installation
1. **Download the repository**
   ```sh
   git clone https://github.com/yourusername/OpenU-Auto-Login.git
   cd OpenU-Auto-Login
   ```
2. **Load the extension in Chrome**
   - Open `chrome://extensions/`.
   - Enable **Developer Mode** (top right corner).
   - Click **Load Unpacked** and select the project folder.

## 📜 Usage
1. Open the extension popup.
2. Click **Fetch/Update ID** to retrieve your Student ID.
3. The extension will automatically fill the Student ID field on login pages.

## 🛠 Technologies Used
- JavaScript (Chrome Extensions API)
- Chrome Storage API
- DOM Manipulation
