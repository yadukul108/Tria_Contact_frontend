# Tria Task Contact Page

A **Contact Management Application** built for the Tria frontend task submission. This application allows users to **add, edit, delete, and manage their contacts**, mark favorites, and quickly search through their contact list.  

Built with the **MERN stack** and **Vite** as the bundler.

## Features

### 1. Contact Page
The main page integrates all other components:  
- **Header**: Displays logo, total contacts count, search bar, grid/list view toggle, and favorite filter.  
- **Left Section**: Shows all contacts in either **grid** or **list** view.  
- **Right Section**: Form to **add or edit contacts**.

### 2. Search Bar
- Implements **debouncing** for optimized search performance.  
- Shows **selective suggestions** while typing.  
- Automatically updates contacts displayed on the main screen based on search input.  

### 3. Profile Card & Contact Row
- **Profile Card**: Displays individual contact as a card with email, phone, and note toggle.  
- **Contact Row**: Displays contacts in a list format for easy overview.  

### 4. AddContact Form
- Allows users to **add or edit contacts**.  
- **Validation Rules**:
  - First name and surname **cannot contain special characters**.  
  - Phone number must be **10 digits**.  
  - Phone number and email must be **unique**.  
  - Email is **optional**.  
- Additional feature: Users can **add a note** to any contact.

---

## Key Features
- Optimized search using **debouncing** and **limited suggestions**.  
- Contacts dynamically displayed on the main screen during search.  
- Toggle between **card and list view** for contact display.  
- **Mark any contact as favorite**.  
- Perform **add, delete, and edit** operations for all contacts.  
- **Add notes** to individual contacts.  
- Display **total contact count** in the header.  
- **Toaster notifications** for success or error messages.  
- **Confirmation modal** for delete actions.  
- **Two-step validation**: frontend validation plus backend controllers.

---

## Libraries & Tools
- **Lucide Icons**: For all UI icons.  
- **Tailwind CSS**: For responsive and modern styling.  
- **React**: Frontend library.  
- **Node.js & Express**: Backend API.  
- **MongoDB**: Database to store contacts.  
- **Vite**: Bundler and development server.

---

## Assumptions
- Profile picture input was not specified.  
  - Could be implemented in the future using **Cloudinary** or **Multer** for image upload.  

---

## Project Structure
