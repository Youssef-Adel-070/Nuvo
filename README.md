# 🛍️ Nuvo — E-Commerce Web Application

Nuvo is a modern and responsive e-commerce web application built with **Next.js and React**. It provides a complete shopping experience, including product browsing, authentication, cart and wishlist management, checkout, orders, and user profile management.

The project focuses on building a clean, responsive, and user-friendly shopping interface while integrating with a real e-commerce API.

---

## ✨ Features

- 🔐 **Authentication**
  - User registration and login
  - Protected user features
  - NextAuth.js integration

- 🛍️ **Product Browsing**
  - Browse available products
  - Product details
  - Categories and brands
  - Search and filtering

- 🛒 **Shopping Cart**
  - Add and remove products
  - Update product quantities
  - View cart details

- ❤️ **Wishlist**
  - Add products to wishlist
  - Remove products from wishlist

- 💳 **Checkout & Orders**
  - Cash on Delivery
  - Visa payment
  - Order creation and management

- 👤 **User Profile**
  - Manage profile information
  - Manage saved addresses
  - Change password

- 📱 **Responsive Design**
  - Optimized for desktop, tablet, and mobile screens

- ⚡ **User Experience**
  - Loading states
  - Error handling
  - Toast notifications
  - Smooth animations and transitions

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **shadcn/ui**

### State & Forms

- **React Context API**
- **React Hook Form**
- **Zod**

### Authentication

- **NextAuth.js**

### UI & Experience

- **Framer Motion**
- **Embla Carousel**
- **Lucide React**
- **React Hot Toast**

### API

- **Route Misr E-Commerce API**

---

## 📂 Project Structure

```text
src/
├── action/
├── app/
│   └── (pages)/
├── Components/
├── context/
├── Helpers/
│── services/
├── Interfaces/
├── assets/
└── lib/
```

The project is organized into reusable components, application pages, context/state management, API services, actions, interfaces, helpers, and assets.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Youssef-Adel-070/Nuvo.git
```

### 2. Navigate to the project

```bash
cd Nuvo
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create environment variables

Create a `.env.local` file in the root directory:

```env
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_AUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTURL_API="https://ecommerce.routemisr.com/api/v1"
```

> Never commit your `.env.local` file or expose your `NEXTAUTH_SECRET`.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `NEXTAUTH_URL` | Application URL used by NextAuth |
| `NEXT_PUBLIC_AUTH_URL` | Public application URL |
| `NEXTAUTH_SECRET` | Secret used by NextAuth |
| `NEXTURL_API` | Base URL for the e-commerce API |

For local development, the application uses:

```env
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_AUTH_URL="http://localhost:3000"
NEXTURL_API="https://ecommerce.routemisr.com/api/v1"
```

---

## 🔌 API

Nuvo uses the **Route Misr E-Commerce API** to handle product and e-commerce related data.

The API provides functionality for areas such as:

- Products
- Categories
- Brands
- Authentication
- Cart
- Wishlist
- Orders
- User addresses

The API base URL is configured through the `NEXTURL_API` environment variable.

---

## 📜 Available Scripts

```bash
npm run dev
```

Runs the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm start
```

Runs the production server.

```bash
npm run lint
```

Runs ESLint to check the project code.

---

## 🎯 Project Goals

This project was built to practice and demonstrate modern frontend development concepts, including:

- Building reusable React components
- Working with Next.js App Router
- API integration
- Authentication
- State management
- Form handling and validation
- Responsive UI development
- Managing asynchronous data
- Creating a complete e-commerce workflow

---

## 📄 License

This project is created for learning and portfolio purposes.