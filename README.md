# PlanC

A comprehensive Micro SaaS for clinics with service scheduling, reminders, and subscription plans. Built with Next.js 15, React 19, and modern web technologies.

## Live Demo

Try PlanC live at: [https://planc-saas.vercel.app/](https://planc-saas.vercel.app/)

<img src="/public/readme-img01.png" alt="PlanC Dashboard" />

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Stripe Configuration](#stripe-configuration)
- [Authentication Setup](#authentication-setup)
- [Development](#development)
- [Production](#production)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Common Issues & Solutions](#common-issues--solutions)
- [License](#license)

## Overview

PlanC is a modern micro-SaaS solution designed specifically for clinics and healthcare providers. It streamlines appointment scheduling, automates patient reminders, and manages subscription plans with integrated payment processing through Stripe.

**Key Benefits:**
- Efficient appointment management
- Automated patient notifications
- Flexible subscription plans
- Secure authentication with multiple providers
- Cloud-based file storage with Cloudinary

## Features

- **🗓️ Appointment Scheduling:** Complete booking system with time slot management
- **🔔 Smart Reminders:** Automated notifications for upcoming appointments
- **💳 Subscription Management:** Flexible plans with Stripe integration
- **🔐 Multi-Provider Authentication:** Support for Google, GitHub, and email login
- **👥 Patient Management:** Comprehensive patient profiles and history
- **📊 Dashboard Analytics:** Real-time insights and clinic performance metrics
- **☁️ Cloud Storage:** Integrated file management with Cloudinary
- **📱 Responsive Design:** Mobile-first approach for all devices
- **🎨 Modern UI:** Clean interface built with Radix UI components

<img src="/public/readme-img02.png" alt="PlanC Scheduling Interface" />

*Advanced scheduling interface with calendar view and appointment management*

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form management with validation
- **Zod** - Schema validation
- **Lucide React** - Modern icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Type-safe database client
- **PostgreSQL** - Reliable relational database
- **NextAuth.js** - Authentication solution

### Integrations
- **Stripe** - Payment processing and subscriptions
- **Cloudinary** - Image and file management
- **TanStack Query** - Server state management

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

<img src="/public/readme-img03.png" alt="PlanC Patient Management" />

*Comprehensive patient management system with detailed profiles*

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn package manager
- PostgreSQL database (Recommended: Neon Postgres)
- Stripe account for payment processing
- Cloudinary account for file storage

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/planc.git
   cd planc
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables** (see below)

4. **Set up the database:**
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env` file in the root directory:

```env
# Authentication
AUTH_SECRET="your-generated-auth-secret"

# Database
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# GitHub OAuth
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"

# Google OAuth
AUTH_GOOGLE_ID="your-google-client-id.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# Application URLs
NEXT_PUBLIC_URL="http://localhost:3000"

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_test_your-stripe-public-key"
STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"
STRIPE_SECRET_WEBHOOK_KEY="whsec_your-webhook-secret"

# Stripe Plans
STRIPE_PLAN_BASIC="price_your-basic-plan-id"
STRIPE_PLAN_PRO="price_your-pro-plan-id"

# Stripe URLs
STRIPE_SUCCESS_URL="http://localhost:3000/dashboard/plans"
STRIPE_CANCEL_URL="http://localhost:3000/dashboard/plans"

# Cloudinary
CLOUDINARY_NAME="your-cloudinary-name"
CLOUDINARY_KEY="your-cloudinary-key"
CLOUDINARY_SECRET="your-cloudinary-secret"
```

#### Generating Auth Secret

Generate a secure authentication secret:

```bash
openssl rand -base64 32
```

## Database Setup

PlanC uses PostgreSQL with Prisma ORM. We recommend using Neon for a free PostgreSQL database:

1. **Sign up at [Neon](https://neon.tech)**
2. **Create a new project**
3. **Copy the connection string to your `.env` file**
4. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```

### Prisma Commands

```bash
# Generate Prisma client
npx prisma generate

# Deploy migrations
npx prisma migrate deploy

# Open Prisma Studio
npx prisma studio

# Reset database (development only)
npx prisma migrate reset
```

## Stripe Configuration

### Setting up Stripe

1. **Create a Stripe account** at [stripe.com](https://stripe.com)
2. **Get your API keys** from the Stripe Dashboard
3. **Create subscription products:**
   - Basic Plan
   - Pro Plan
4. **Set up webhooks** for subscription events
5. **Configure webhook endpoint:** `https://yourdomain.com/api/webhook`

### Stripe CLI for Development

Install the Stripe CLI and listen for webhooks:

```bash
# Install Stripe CLI
npm install -g stripe-cli

# Login to Stripe
stripe login

# Listen for webhooks
npm run stripe:listen
```

<img src="/public/readme-img04.png" alt="PlanC Subscription Plans" />

*Flexible subscription plans with integrated Stripe payment processing*

## Authentication Setup

PlanC supports multiple authentication providers:

### GitHub OAuth

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Add credentials to your `.env` file

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Add credentials to your `.env` file

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Format code
npm run format

# Generate Prisma client
npm run postinstall

# Listen for Stripe webhooks
npm run stripe:listen
```

### Development Workflow

1. **Start the development server:** `npm run dev`
2. **Make changes** to your code
3. **Test locally** at `http://localhost:3000`
4. **Run linting:** `npm run lint`
5. **Format code:** `npm run format`

## Production

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Deployment Checklist

- [ ] Set production environment variables
- [ ] Configure production database
- [ ] Set up Stripe webhooks for production
- [ ] Configure Cloudinary for production
- [ ] Set up domain and SSL certificate
- [ ] Test authentication providers
- [ ] Verify payment processing

## Project Structure

```
planc/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (main)/            # Main application routes
│   │   │   ├── _actions/      # Server actions
│   │   │   ├── _components/   # Page components
│   │   │   ├── _data-access/  # Data access layer
│   │   │   └── clinica/       # Clinic management
│   │   ├── (panel)/           # Admin panel routes
│   │   ├── api/               # API routes
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   └── ui/               # UI components
│   ├── generated/            # Generated files
│   ├── lib/                  # Utility libraries
│   ├── providers/            # Context providers
│   ├── utils/                # Utility functions
│   └── types/                # Type definitions
├── prisma/                   # Database schema
├── public/                   # Static assets
├── .env                      # Environment variables
├── package.json             # Dependencies
└── README.md               # This file
```

## API Routes

### Authentication
- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signout` - User sign out
- `GET /api/auth/session` - Get current session

### Appointments
- `GET /api/appointments` - List appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/[id]` - Update appointment
- `DELETE /api/appointments/[id]` - Delete appointment

### Patients
- `GET /api/patients` - List patients
- `POST /api/patients` - Create patient
- `PUT /api/patients/[id]` - Update patient
- `DELETE /api/patients/[id]` - Delete patient

### Subscriptions
- `POST /api/subscriptions` - Create subscription
- `GET /api/subscriptions` - Get subscription status
- `POST /api/subscriptions/cancel` - Cancel subscription

### Webhooks
- `POST /api/webhook` - Stripe webhook handler

## Common Issues & Solutions

### Database Connection Issues

If you encounter database connection problems:

1. **Verify connection string** in `.env` file
2. **Check database server status**
3. **Ensure SSL mode is configured** for cloud databases
4. **Run:** `npx prisma db push` to sync schema

### Stripe Webhook Issues

Common Stripe webhook problems:

1. **Verify webhook secret** in `.env` file
2. **Check endpoint URL** in Stripe dashboard
3. **Ensure webhook is active**
4. **Test with Stripe CLI:** `stripe listen --forward-to localhost:3000/api/webhook`

### Authentication Problems

For authentication issues:

1. **Verify OAuth app settings** in provider dashboards
2. **Check callback URLs** match your configuration
3. **Ensure AUTH_SECRET** is properly set
4. **Clear browser cookies** and try again

### Build Errors

If you encounter build errors:

1. **Clear Next.js cache:** `rm -rf .next`
2. **Reinstall dependencies:** `rm -rf node_modules && npm install`
3. **Check TypeScript errors:** `npx tsc --noEmit`
4. **Verify environment variables** are set

## License

This project is licensed under the [MIT License](./LICENSE).
