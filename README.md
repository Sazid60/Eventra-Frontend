# Eventra - Events & Activities Platform (Frontend)

#### Live Frontend: [eventra-frontend-neon.vercel.app](https://eventra-frontend-neon.vercel.app)

#### Live Backend: [eventra-backend.vercel.app](https://eventra-backend.vercel.app)

#### Backend Repository: [https://github.com/Sazid60/Eventra-Backend.git](https://github.com/Sazid60/Eventra-Backend.git)

#### Video Demonstration: [Video_link](https://drive.google.com/file/d/1eeQLkki_Evg1nFA_3IS3wPqMEEpBY5z9/view)

Eventra is a full-featured event management platform frontend built with Next.js 16 and TypeScript. It supports three distinct roles (Admin, Host, Client) with role-based navigation and dashboards, secure JWT authentication with HTTP-only cookies, SSLCommerz payment integration with automated revenue splitting (90% host, 10% admin), peer-to-peer review system with host ratings, comprehensive analytics dashboards, and responsive UI. Features include: interest-based event discovery with advanced search & filtering, event booking with online payment options, host/event application system with admin approval, event lifecycle management (Open/Full/Cancelled/Completed status), image uploads via Cloudinary, email notifications (booking confirmations, host application email (confirm/rejection), payment receipts), contact form integration, user/host/event/payment management for admins, revenue tracking dashboards for hosts, participant management, SEO optimization with meta tags, mobile-first responsive design with adaptive navigation, and real-time stats display across all dashboard types.

---

## Project Overview

- Users discover and join events based on interests with advanced search and filtering
- Hosts create/manage events, track participants, view revenue dashboards, and manage event lifecycle
- Admins oversee users, hosts, events, payments, and approve/reject host/event applications
- JWT-based secure authentication with HTTP-only cookies
- Role-based navigation and dashboards for Clients, Hosts, and Admins
- Secure payments via SSLCommerz; reviews update host ratings; role-based dashboards expose key stats
- Responsive design works seamlessly across desktop, tablet, and mobile devices

##### Special Notes

- If you face any issue do not forget to refresh the page using refresh button or just hit browser refresh button because some status changes will be done by admin or host.
- *If you book an event and do not do payment please hit the leave button from the event details page to free up your seat.*
- If You leave a even before ending your money will not be refunded.
- *If you apply for host your account will be converted from client to host after admin approval and all your client data will be wiped off automatically*.
- *If you have applied for host, please wait for admin approval before accessing host features. before approval you will not be able to login not even as client*.
- Host can update event status to 'Completed' only after event date is passed.
- *For giving reviews you have to wait until admin mark the event as 'Completed'*
-  *For Host if the event is approved the events cant be deleted. It can be deleted only if not approved. but you can update unless the event date has not passed*


#### Logical Cores

- Clients can browse all available events with advanced search and filtering
- 90% of event revenue goes to hosts, 10% platform fee to admin
- Events have status tracking: Open, Full, Cancelled, Completed
- Users can become hosts through application and admin approval process
- Review and rating system allows clients to rate hosts after event completion
- Event Management: Hosts can create, edit, delete events; view participants; manage status
- Admins have comprehensive dashboards for user, host, event, and payment management


### No Previous date selection while creating event or updating event. You wont be able to test the review and mark as complete feature unless you use my `Client` and `Host` credential. Two events are created and date has been changed accordingly for testing purpose. If you login as host the mark as complete option you can do it. And If You Login as client you can give review for the completed event only (after mark as complete the review button will appear and you can test).


## Credentials for Testing

##### Admin Login

- _Admin Email_: admin@gmail.com
- _Admin Password_: Admin@12345

##### Host Login

- _Host Email_: host@gmail.com
- _Host Password_: Host@12345

##### Client Login

- _Client Email_: client@gmail.com
- _Client Password_: Client@12345

### Technology Stack

#### Frontend

- **Framework & Language**: Next.js, React, TypeScript 
- **Styling & UI**: Tailwind CSS, Radix UI, ShadCN/UI Components, tailwind-merge
- **State Management**: Server Components, React Hooks, Client-side State
- **Forms & Validation**: React Hook Form, Zod 
- **Authentication & Security**: JWT, HTTP-only Cookies
- **Animations & UX**: React Fast Marquee, Sonner, React Spinners, tw-animate-css
- **Icons & Assets**: Lucide React, Next.js Image Optimization
- **Date Handling**: date-fns
- **Other Utilities**: cookie, class-variance-authority

#### Backend

- **Framework & Runtime**: Node.js, Express
- **Database & ORM**: PostgreSQL, Prisma ORM
- **Authentication & Security**: JWT, bcryptjs, HTTP-only cookies
- **File & Media Storage**: Cloudinary
- **Email & Notifications**: Nodemailer
- **Payment Integration**: SSLCommerz
- **Validation & Utilities**: Zod, axios, dotenv, cookie-parser, cors

#### Dev Tools & Build

- **Module Bundler & Compiler**: Next.js 16, TypeScript
- **Linting & Code Quality**: ESLint, eslint-config-next
- **Development Utilities**: @types/node, @types/react, baseline-browser-mapping
- **PostCSS**: @tailwindcss/postcss

#### Deployment & Hosting

- **Frontend**: Vercel
- **Backend**: Vercel
- **Database**: PostgreSQL (Neon)
- **Storage**: Cloudinary 

### Project Features

#### **1. Public Pages**

- **Homepage**:
  - Hero banner with dynamic stats (total users, hosts, events, completed events)
  - "How It Works" section with client features
  - Recent events showcase with "See All Events" link
  - Reviews marquee (client testimonials from completed events)
  - Host features section
  - Breadcrumb navigation for user journey
  - FAQ accordion with common questions
  - Contact form with email integration
  - Responsive footer with social links (WhatsApp, Phone, LinkedIn)
- **All Events Page**: Grid/list view with search, filters (category, date, location), and pagination (includes mind like features)
- **Event Details Page**: Full event info, host profile, participant list, booking/payment integration
- **Login & Register Pages**: JWT-based authentication with role selection, form persistence, success toasts
- SEO-optimized metadata for home and all-events pages

#### **2. Authentication & Authorization**

- JWT-based secure authentication with HTTP-only cookies
- Registration with default role as Client
- Login with role-based redirection (Client → All events page, Host → Host Dashboard, Admin → Admin Dashboard)
- After event Booking Client redirection to My Booked Events page 
- Role-specific navigation (navbar changes based on user role)
- Protected routes with middleware
- Logout functionality with success notifications
- "Become a Host" application flow for clients (requires admin approval)

#### **3. Client Features**

- **Browse & Book Events**:
  - Search sort filter events by keyword, category, date, location
  - View event details with host information and participants info. 
  - Book events with secure payment processing SSLCommerz
  - Join/leave events before start date
- **Dashboard**:
  - View Booked Events
  - features list
- **My Booked Events**:
  - Full list of booked events with status
  - Search, filter, sort, pagination
  - Leave event option (before event date)
- **Profile Management**:
  - Update name, bio, profile photo, contact number, location
  - Add/edit interests (tags for matching)
  - View and edit profile information
- **Ratings & Reviews**:
  - Rate and review hosts after event completion (1–5 stars)
- **Become a Host**:
  - Apply to become a host (converts account from Client to Host wipes client info)
  - Admin approval required
  - Data migration handled automatically

#### **4. Host Features**

- **Event Management**:
  - Create new events with details (title, description, date, time, location, images, capacity, joining fee, categories)
  - Edit/update own events
  - Delete events (if status pending only)
  - View event participant list (in event details page)
  - Manage event status (Completed)
- **Host Dashboard**:
  - Analytics overview 
  - Revenue tracking and earnings summary
- **My Created Events**:
  - List of all hosted events
  - Search, filter, sort, pagination
  - Quick actions (edit, manage status)
- **Payment History**:
  - Transaction history for all events
  - Revenue breakdown (90% host, 10% admin)
  - Search, filter, sort, pagination
- **Profile Management**:
  - Update host profile (name, bio, profile photo, contact, location)
  - View host rating and review summary
  - Manage account settings

#### **5. Admin Features**

- **Admin Dashboard**:
  - Platform analytics 
  - Real-time statistics overview
  - Visual stats cards for quick insights
- **User Management**:
  - View all Clients
  - Suspend/Unsuspend Client accounts
  - Search, filter, sort, pagination
- **Host Management**:
  - View all hosts
  - Suspend/Unsuspend Host accounts
  - Search, filter, sort, pagination
- **Event Application Management**:
  - Review pending event applications
  - Approve/reject events
  - Monitor event submissions
  - Search, filter, sort, pagination
- **Host Application Management**:
  - Review "Become a Host" applications
  - Approve/reject host requests
  - Search, filter, sort, pagination
- **Payment History**:
  - View all platform transactions
  - Track admin revenue (10% commission)
  - Search, filter, sort, pagination
- **Profile Management**:
  - Update admin profile (contact number. profile photo)
  - Manage account settings

#### **6. Advanced Features**

- **Search & Filtering**:
  - Event search by keyword, category, date range, location
  - Advanced filters (status, price range, capacity)
  - Sort by date, popularity, price
  - Debounced search for performance
- **Payment Integration**:
  - Secure online payment via SSLCommerz
  - Automated invoice generation and sent to email
  - Revenue split (90% host, 10% admin)
  - Payment status tracking
- **Email Notifications**:
  - Booking confirmations
  - Host approval emails (confirm/reject)
- **Review & Rating System**:
  - Post-event reviews for hosts
  - 1–5 star rating scale
  - Average rating calculation
  - Review display on host profiles
- **Image Management**:
  - Cloudinary integration
  - Image upload for events and profiles
  - Automatic image optimization
  - Responsive image serving
- **Responsive Design**:
  - Mobile-first approach
  - Tablet and desktop optimized
  - Touch-friendly UI
  - Adaptive navigation (hamburger menu on mobile)

- **SEO Optimization**:
  - Meta tags for all public pages

### Project Setup

#### Clone the Repo

```bash
git clone https://github.com/Sazid60/Eventra-Frontend.git
cd Eventra-Frontend
```

#### Add .env

```env
NEXT_PUBLIC_BASE_API_URL=https://eventra-backend.vercel.app/api/v1
NODE_ENV=development
JWT_SECRET=your-jwt-secret
REFRESH_TOKEN_SECRET=your-refresh-secret
RESET_PASS_TOKEN=your-reset-token
```

#### Install Dependencies

```bash
npm install
# or
yarn install
# or
bun install
```

#### Run the Project

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

The application will be available at `http://localhost:3000`

#### Build for Production

```bash
npm run build
npm run start
```

### Folder Structure

```
Frontend/
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── (auth)/     # Login, Register pages
│   │   ├── (commonLayout)/  # Public pages (Home, Events)
│   │   ├── (dashboardLayout)/ # Protected dashboards
│   │   │   ├── admin/  # Admin dashboard pages
│   │   │   ├── host/   # Host dashboard pages
│   │   │   └── (clientDashboardLayout)/ # Client dashboard
│   │   ├── layout.tsx  # Root layout
│   │   └── globals.css # Global styles
│   ├── assets/         # Images, icons, SVGs
│   ├── components/     # React components
│   │   ├── modules/    # Feature-specific components
│   │   ├── shared/     # Reusable components
│   │   └── ui/         # ShadCN UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions, configs
│   ├── services/       # API service functions
│   ├── types/          # TypeScript interfaces
│   └── zod/            # Zod validation schemas
├── .env                # Environment variables
├── next.config.ts      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS config
├── tsconfig.json       # TypeScript config
└── package.json        # Dependencies
```


