# Next.js Full-Stack Application

A modern, full-stack web application built with **Next.js 16**, **Prisma ORM**, and **Supabase PostgreSQL**, featuring user authentication, contact forms, and email notifications.

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Architecture & Data Flow](#architecture--data-flow)
- [Key Features](#key-features)
- [Database Schema](#database-schema)
- [How It Works: Server Actions](#how-it-works-server-actions)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)

---

## 🎯 Project Overview

This is a web application for a business that provides:
- **Public-facing website** showcasing services, location, and contact information
- **User authentication** system (sign-up, sign-in with credentials and OAuth providers)
- **Contact form** with email notifications and database tracking

This is a production-ready application demonstrating modern full-stack development practices with Next.js 16 (App Router), TypeScript, Prisma, and NextAuth.

---

## 🛠 Technology Stack

### **Frontend**
- **Next.js 16.1.1** - React framework with App Router (server and client components)
- **React 19.2.3** - UI library with latest features
- **TypeScript** - Type-safe code
- **Tailwind CSS 3.3.3** - Utility-first CSS framework
- **DaisyUI 3.2.1** - Pre-built Tailwind components
- **Font Awesome 6.4.0** - Icon library
- **React Google Maps API 2.18.1** - Interactive map component

### **Backend**
- **Next.js Server Actions** - Secure server-side function execution from the client
- **NextAuth.js 5.0.0-beta.25** - Complete authentication solution with JWT sessions
- **Node.js** - Runtime environment
- **Nodemailer 6.9.3** - Email sending service (Gmail SMTP)

### **Database & ORM**
- **Supabase PostgreSQL** - Managed PostgreSQL database (cloud-hosted)
- **Prisma 7.2.0** - Modern ORM with type-safe database access
- **Prisma Adapter (@prisma/adapter-pg)** - PostgreSQL adapter for Prisma 6.0+
- **pg 8.16.3** - PostgreSQL client for Node.js

### **Security & Utilities**
- **Bcrypt 5.1.1** - Password hashing
- **@auth/prisma-adapter** - Prisma integration for NextAuth
- **Dotenv** - Environment variable management
- **Vercel Analytics** - Website analytics

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS & Autoprefixer** - CSS processing

---

## 📁 Project Structure

```
nextjs-blog/
├── app/                           # Next.js App Router
│   ├── (routes)/                  # Route groups
│   │   ├── about/                 # About page
│   │   ├── dca-vix/              # DCA strategy page
│   │   ├── sign-in/              # Sign-in page (credentials + OAuth)
│   │   ├── sign-up/              # User registration page
│   │   └── v2/                   # Version 2 section
│   ├── api/
│   │   └── auth/[...nextauth]/   # NextAuth API route
│   ├── page.tsx                  # Root page (/)
│   ├── layout.tsx                # Root layout
│   └── home-page.tsx             # Home page component
│
├── components/                    # Reusable React components
│   ├── form/                      # Form components
│   │   ├── ContactUsForm.tsx     # Contact form with client-side state
│   │   ├── SignInForm.tsx        # Credentials sign-in form
│   │   ├── SignUpForm.tsx        # User registration form
│   │   └── SubmitButton.tsx      # Reusable submit button
│   ├── Navbar.tsx                # Navigation with auth state
│   ├── SignOutButton.tsx         # Sign-out functionality
│   ├── ToastMessage.tsx          # Notification toast
│   ├── CouponAlert.tsx           # Promotional alert
│   └── Map2.tsx                  # Google Maps component
│
├── server-actions/                # Next.js Server Actions
│   ├── contactUs/
│   │   └── actions.ts            # Email + DB insert for contact form
│   ├── signIn/
│   │   └── actions.ts            # Credentials sign-in handler
│   └── signUp/
│       └── actions.ts            # User registration with DB insert
│
├── db/
│   └── prisma.ts                 # Prisma client singleton (PostgreSQL adapter)
│
├── lib/
│   ├── types/
│   │   ├── definitions.ts        # TypeScript type definitions
│   │   └── next-auth.d.ts        # NextAuth type augmentation
│   └── utils/
│       ├── emailTemplate.tsx     # HTML email template generation
│       └── getUserAgent.tsx      # Browser/device detection
│
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Database migration history
│
├── styles/
│   ├── globals.css               # Global styles
│   └── home-page.module.css      # Component-scoped styles
│
├── public/
│   └── assets/img/              # Images and static assets
│
├── auth.ts                       # NextAuth configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── prisma.config.ts              # Prisma 6.0+ configuration
├── package.json                  # Dependencies
└── .env                          # Environment variables

```

---

## 🏗 Architecture & Data Flow

### **Frontend-Backend Communication Flow**

#### **Contact Form Submission**
```
ContactUsForm (Client Component)
        ↓
User fills form and submits
        ↓
handleSubmit → Server Action: sendEmail()
        ↓
Server-side processing:
  1. Send email to business (admin)
  2. Send auto-reply email to customer
  3. Create/Update user in DB (dummy user for inactivity prevention)
        ↓
Response returned to client
        ↓
Toast notification shown to user
```

#### **Sign-Up Flow**
```
SignUpForm (Client Component)
        ↓
User enters email + password
        ↓
handleSignUp → Server Action: addUserToDatabase()
        ↓
Server-side processing:
  1. Validate inputs
  2. Check if email already exists
  3. Hash password with bcrypt
  4. Insert user into database via Prisma
        ↓
Response: { status, message, error }
        ↓
On success: Redirect to sign-in page
On error: Show error toast
```

#### **Sign-In Flow**
```
SignInForm (Client Component)
        ↓
User enters credentials
        ↓
handleSignIn → Server Action: signInByCredentials()
        ↓
NextAuth Authentication:
  1. Validate credentials against database
  2. Compare hashed password with bcrypt
  3. Generate JWT token
  4. Store session
        ↓
Redirect to dashboard or protected page
        ↓
Navbar shows signed-in state with SignOut button
```

### **Component Hierarchy**

```
Layout (Server Component)
├── Navbar (Server Component)
│   ├── Conditional SignOut / Sign-In button
│   └── Checks session state
└── Page-specific content
    ├── HomePage (Client Component)
    │   └── ContactUsForm (Client Component)
    │       └── Server Action: sendEmail()
    ├── SignInForm (Client Component)
    │   └── Server Action: signInByCredentials()
    └── SignUpForm (Client Component)
        └── Server Action: addUserToDatabase()
```

---

## ✨ Key Features

### **1. User Authentication**
- **Credentials-based sign-up/sign-in** with bcrypt password hashing
- **OAuth providers** (Google integrated, GitHub configured)
- **JWT sessions** with NextAuth.js
- **Protected pages** with session checks
- **Sign-out functionality**

### **2. Contact Form**
- **Client-side validation** with React state
- **Server-side email sending** via Gmail SMTP
- **HTML email templates** for professional communication
- **Automatic database insert** on form submission
- **User agent tracking** (browser, device, OS info)
- **Toast notifications** for user feedback

### **3. Database Activity Prevention**
- **Automatic user insert/update** on every contact form submission
- **Dummy user creation** to prevent Supabase inactivity pausing
- Ensures database stays "active" for free-tier plans

### **4. Server Actions**
- **Secure server-side execution** of sensitive operations
- **Form data handling** directly on server
- **No API endpoints needed** for form submissions
- **Type-safe** with TypeScript

### **5. Responsive Design**
- **Mobile-first approach** with Tailwind CSS
- **Grid and flexbox layouts**
- **Responsive images** with Next.js Image optimization
- **DaisyUI components** for consistent UI

---

## 🗄 Database Schema

### **User Model**
```prisma
model User {
  id             Int      @id @default(autoincrement())
  email          String   @unique                    # Unique email
  userName       String   @unique                    # Username (derived from email)
  password       String                              # Hashed password
  originPassword String?                             # Original plain password (for reference)
  createdAt      DateTime @default(now())           # Account creation timestamp
  updatedAt      DateTime @updatedAt                # Last update timestamp
}
```

**Purpose**: Stores user accounts for authentication and prevents DB inactivity through Contact Form submissions.

---

## 🚀 How It Works: Server Actions

### **What are Server Actions?**
Server Actions are asynchronous functions that run on the server. They allow you to:
- Execute sensitive logic (password hashing, database queries) securely
- Avoid exposing API endpoints
- Handle form submissions directly
- Use server resources (database, email) safely

### **Example: Contact Form Server Action**

**Frontend (ContactUsForm.tsx):**
```tsx
const handleSubmit = async (formData: FormData) => {
  // Client component calls server action
  const { message } = await sendEmail(formData, userAgent);
  if (message === "OK") {
    setFormData(initialFormData);
    handleShowToast();
  }
};

return <form action={handleSubmit}>...</form>;
```

**Backend (server-actions/contactUs/actions.ts):**
```typescript
"use server"; // Declares this is a server-side function

export const sendEmail = async (formData: FormData, userAgent: string) => {
  // All this runs on the server (never exposed to client)
  
  // 1. Send email via Gmail SMTP
  await transporter.sendMail({ ... });
  
  // 2. Send auto-reply email
  await transporter.sendMail({ ... });
  
  // 3. Database operation via Prisma
  await prisma.user.upsert({ ... });
  
  return { message: "OK" };
};
```

**Security Benefits:**
- Email credentials never exposed to browser
- Database operations happen server-side
- Form data validated on server
- No API endpoints to expose

### **Example: Sign-Up Server Action**

**Frontend (SignUpForm.tsx):**
```tsx
const handleSignUp = async (formData: FormData) => {
  const { status, message, error } = await addUserToDatabase(formData);
  if (status === 201) router.push("/sign-in");
  else setErrorMessage(error);
};
```

**Backend (server-actions/signUp/actions.ts):**
```typescript
"use server";

export const addUserToDatabase = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  
  // Hash password on server (never exposed)
  const hashedPassword = await hash(password, 10);
  
  // Insert into database
  const newUser = await prisma.user.create({
    data: {
      email,
      userName: email.split("@")[0],
      password: hashedPassword,
    },
  });
  
  return { user: newUser, message: "User created successfully.", status: 201 };
};
```

**Key Points:**
1. `"use server"` directive marks the file as server-side
2. Functions are called from client components
3. Data is serialized (FormData) and sent to server
4. Response is returned to client
5. No exposed API routes needed

---

## 📦 Installation & Setup

### **Prerequisites**
- Node.js 18+ (LTS recommended)
- npm or yarn
- Git
- Supabase account (or PostgreSQL database)

### **Step 1: Clone the Repository**
```bash
git clone <repository-url>
cd nextjs-blog
```

### **Step 2: Install Dependencies**
```bash
npm install
```

### **Step 3: Set Up Database (Supabase)**
1. Create a Supabase account and project
2. Get your PostgreSQL connection string from **Settings > Database > Connection string**
3. Copy the connection pool URL

### **Step 4: Generate Prisma Client**
```bash
npx prisma generate
```

### **Step 5: Run Database Migrations**
```bash
npx prisma migrate reset --force
# Or if migrations already exist:
npx prisma migrate dev --name initial
```

### **Step 6: View Database (Optional)**
```bash
# Use Supabase dashboard directly, or temporarily downgrade Prisma for Studio
npx prisma studio
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```bash
# Database (Supabase)
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres?pgbouncer=true"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-here"
AUTH_SECRET="your-auth-secret-key"

# OAuth Providers (Optional)
AUTH_GOOGLE_ID="your-google-oauth-id"
AUTH_GOOGLE_SECRET="your-google-oauth-secret"
AUTH_GITHUB_ID="your-github-oauth-id"
AUTH_GITHUB_SECRET="your-github-oauth-secret"

# Email Configuration (Gmail)
EMAIL_PWD="your-gmail-app-password"

# Google Maps (Optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
```

**Notes:**
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `EMAIL_PWD`: Use Gmail App Password (not your regular password)
- `NEXT_PUBLIC_*` variables are exposed to the browser

---

## ▶️ Running the Project

### **Development Server**
```bash
npm run dev
# Server runs at http://localhost:3000
```

### **Production Build**
```bash
npm run build
npm run start
```

### **Code Quality**
```bash
npm run lint      # ESLint checks
npm run format    # Prettier formatting
```

### **Database Management**
```bash
npx prisma migrate dev          # Create new migration
npx prisma migrate reset --force # Reset database
npx prisma db push             # Push schema to DB (Prisma 6.0+)
npx prisma studio              # Open GUI (may require Prisma 5.x)
```

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (Browser)                           │
│  ┌────────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│  │  Page/Layout   │  │  Components  │  │  Client Components   │ │
│  │  (Server)      │  │  (Shared)    │  │  (Interactive)       │ │
│  └────────────────┘  └──────────────┘  └──────────────────────┘ │
│         │                    │                      │             │
│         └────────────────────┼──────────────────────┘             │
│                              │                                     │
│                              ▼                                     │
│                    ┌──────────────────┐                           │
│                    │  User Interaction│                           │
│                    │  Form Submission │                           │
│                    └──────────────────┘                           │
│                              │                                     │
└──────────────────────────────┼─────────────────────────────────────┘
                               │
                    Server Action Call
                    (FormData serialized)
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND (Node.js Server)                       │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │         Server Actions (Secure Execution)                │   │
│  │  • sendEmail()      - Email processing                    │   │
│  │  • addUserToDatabase() - User registration                │   │
│  │  • signInByCredentials() - Authentication                │   │
│  └──────────────────────────────────────────────────────────┘   │
│         │                    │                      │             │
│         ▼                    ▼                      ▼             │
│    ┌─────────┐        ┌─────────────┐      ┌──────────────┐    │
│    │  Email  │        │   Prisma    │      │  NextAuth    │    │
│    │Nodemailer│        │    ORM      │      │  (JWT/Creds) │    │
│    └─────────┘        └─────────────┘      └──────────────┘    │
│         │                    │                      │             │
│         └────────────────────┼──────────────────────┘             │
│                              │                                     │
│                              ▼                                     │
│                   ┌──────────────────────┐                        │
│                   │   PostgreSQL (DB)    │                        │
│                   │ (Supabase)           │                        │
│                   │ ┌──────────────────┐ │                        │
│                   │ │  User Table      │ │                        │
│                   │ │ - Email          │ │                        │
│                   │ │ - Password(hash) │ │                        │
│                   │ │ - CreatedAt      │ │                        │
│                   │ └──────────────────┘ │                        │
│                   └──────────────────────┘                        │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                               │
                    Response Serialized
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (Browser)                           │
│                      Handle Response                              │
│            • Update State                                        │
│            • Show Toast/Redirect                                 │
│            • Re-render UI                                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Make changes and test locally**
   ```bash
   npm run dev
   # Test the feature at http://localhost:3000
   ```

3. **Format and lint code**
   ```bash
   npm run format
   npm run lint
   ```

4. **If database changes needed, create migration**
   ```bash
   npx prisma migrate dev --name describe_change
   ```

5. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: describe your changes"
   git push origin feature/feature-name
   ```

---

## 📝 Notes

- **Database Inactivity**: The contact form automatically creates/updates dummy users to prevent Supabase from pausing the project due to inactivity (7+ days with no activity).
- **Email Service**: Configured with Gmail SMTP. Use App Passwords, not your regular password.
- **Authentication**: NextAuth.js handles both credentials and OAuth flows.
- **Prisma 6.0+**: Uses PostgreSQL adapter (`@prisma/adapter-pg`) instead of `datasource.url`.
- **Server Actions**: All sensitive operations use Server Actions for security.

---

## 🤝 Contributing

When contributing:
- Follow the project structure
- Use TypeScript for type safety
- Write Server Actions for backend logic
- Add proper error handling
- Format code with Prettier
- Test features locally before pushing

---

## 📄 License

This project is private/proprietary to Eastern Spa LLC.

---

**Last Updated**: December 26, 2025
