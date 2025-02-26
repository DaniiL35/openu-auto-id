# OpenU Auto Login Chrome Extension

## 🚀 Overview
The **OpenU Auto Login** Chrome Extension automates Student ID entry for the Open University of Israel login pages. It retrieves and saves the student's ID from the personal data page and auto-fills it during login, saving you time and reducing manual entry errors.

> **Disclaimer:** This extension is **not affiliated, associated, authorized, endorsed by, or in any way officially connected to** the Open University of Israel. It is an **independent project** created for personal convenience.

## 📌 Features
- **Automatic ID Retrieval**: Fetches and saves your Student ID by briefly opening a hidden personal data tab.
- **Auto-Fill**: Automatically fills your Student ID on the relevant login pages.
- **Manual Control**: Provides buttons in the extension popup to fetch/update your ID or reset it as needed.
- **Real-Time UI Updates**: The popup displays your current ID status and refreshes automatically after each update.

## 🔧 Installation
1. **Clone or Download the Repository**  
   ```bash
   git clone https://github.com/yourusername/OpenU-Auto-Login.git
   cd OpenU-Auto-Login
   ```
2. **Load the Extension in Chrome**  
   - Navigate to `chrome://extensions/`.
   - Enable **Developer Mode** (top right corner).
   - Click **Load Unpacked** and select the project folder.

## 📜 Usage
1. **Open the Extension Popup**: Once the extension is installed, click its icon in the toolbar.
2. **Fetch/Update ID**:  
   - Click **Fetch/Update ID** to automatically fetch student ID.
   - Your Student ID is extracted and stored securely in Chrome’s sync storage.
3. **Check Status**:  
   - The popup displays "ID saved ✅" if your ID is already stored, or "No ID saved ❌" otherwise.
4. **Reset ID**:  
   - If you ever want to remove your stored ID, click **Reset ID** in the popup.
5. **Auto-Fill**:  
   - When you visit the login page, the Student ID field should already be filled in for you.


## 🛠 Technologies Used
- **JavaScript** – Core logic for data extraction and DOM manipulation.
- **Chrome Extensions API** – Storage, background service worker, message passing, etc.
- **HTML & CSS** – Popup interface and styling.

