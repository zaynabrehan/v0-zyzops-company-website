# ZYZOPS - Digital Solutions Company Website

A modern, full-featured website for ZYZOPS digital solutions company with admin dashboard, user authentication, portfolio filtering, and contact management.

## Features

### 🎨 Design
- Dark blue theme with white and grey text
- Responsive mobile-first design
- Smooth animations and transitions
- Modern gradient effects

### 👥 User Management
- **User Authentication**: Regular users can sign in for notifications
- **Admin Access**: Admin dashboard with message management
- **Dual Login System**: Separate sign-in for users and admins
- **Logout Functionality**: Secure logout that redirects to home

### 📋 Services & Portfolio
- **12 Digital Services**: Web Dev, App Dev, Cybersecurity, Graphic Design, Video Editing, AI Chatbot, Copywriting, SEO, Social Media Marketing, Ads Management, SaaS, Digital Marketing
- **Portfolio Filtering**: Filter portfolio by service type
- **Project Showcase**: Display completed projects with tech stack

### 📧 Contact Management
- **Contact Form**: Users can submit inquiries
- **Admin Dashboard**: View and manage all submissions
- **WhatsApp Integration**: Direct WhatsApp messaging (03245531819)
- **Email**: zaynabrehann@gmail.com
- **Location**: Lahore Cantt, Pakistan

### 🔐 Authentication
**Admin Credentials:**
- Email: zaynabrehann@gmail.com or admin@zyzops.com
- Password: admin123

**Demo User:**
- Email: user@example.com
- Password: user123

## Pages & Routes

### Public Pages
- `/` - Home page with all sections
- `/signin` - Sign in page (users and admins)
- `/notifications` - User notifications page
- `/portfolio` - Portfolio with service filtering

### Admin Pages
- `/admin/login` - Admin login
- `/admin/dashboard` - Manage contact messages

## Sections

1. **Navigation Bar** - With sign-in link
2. **Banner** - Sliding notification banner (Zyzops is on the way)
3. **Hero Section** - Main call-to-action
4. **Services** - 12 digital services offered
5. **Portfolio** - Filterable project showcase
6. **Why Choose Us** - Company benefits
7. **Process** - Service delivery process
8. **Testimonials** - Client feedback
9. **About** - Company information
10. **Contact** - Get in touch form
11. **Footer** - Links and contact info

## Technical Stack

- **Frontend**: Next.js 14+, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Storage**: localStorage (demo)
- **API Routes**: Next.js API routes

## Installation & Running Locally

1. **Clone or Download the project**
   ```bash
   cd my-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

4. **Open in browser**
   - Navigate to http://localhost:3000

## Building for Production

```bash
npm run build
npm run start
```

## Downloading as ZIP

### From v0 Interface:
1. Click the three dots menu (⋯) in the top-right
2. Select "Download ZIP"
3. Extract the ZIP file on your computer
4. Follow installation steps above

### Using GitHub (Recommended):
1. Push code to GitHub repository
2. Clone locally: `git clone <repository-url>`
3. Install and run as above

## File Structure

```
my-project/
├── app/
│   ├── api/
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   └── messages/
│   │   └── user/
│   │       └── login/
│   ├── admin/
│   │   ├── dashboard/
│   │   └── login/
│   ├── notifications/
│   ├── signin/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── sections/
│   │   ├── navbar.tsx
│   │   ├── hero.tsx
│   │   ├── services.tsx
│   │   ├── portfolio.tsx
│   │   ├── contact.tsx
│   │   ├── testimonials.tsx
│   │   ├── footer.tsx
│   │   └── ...
│   ├── gradient-text.tsx
│   └── glow-button.tsx
├── public/
├── package.json
└── tsconfig.json
```

## Customization

### Update Contact Information
Edit `/components/sections/contact.tsx` and `/components/sections/footer.tsx`:
- Change email: zaynabrehann@gmail.com
- Change phone: 03245531819
- Change location: Lahore Cantt, Pakistan

### Add More Services
Edit `/components/sections/services.tsx`:
- Add service objects to the `services` array
- Update portfolio categories

### Update Portfolio Projects
Edit `/components/sections/portfolio.tsx`:
- Add project objects to the `projects` array
- Update categories array

### Change Admin Credentials
Edit `/app/api/admin/login/route.ts`:
- Update `ADMIN_USERS` array with new credentials

## Security Notes

⚠️ **Important**: This is a demo implementation. For production:
- Never hardcode credentials
- Use a proper database (Supabase, Firebase, MongoDB)
- Implement proper JWT authentication
- Use environment variables for sensitive data
- Add CSRF protection
- Implement rate limiting

## Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Go to vercel.com
3. Import repository
4. Deploy automatically

### Deploy Elsewhere
- Ensure Node.js 18+ is installed
- Set up environment variables
- Run: `npm run build && npm run start`

## Support & Features

- **Responsive Design**: Works on all devices
- **Dark Mode**: Dark blue theme throughout
- **Animations**: Smooth transitions and effects
- **Accessibility**: Semantic HTML, ARIA labels
- **Performance**: Optimized images and code splitting

## Future Enhancements

- Real database integration
- Email notifications
- Payment integration for services
- Blog section
- Client testimonials management
- Analytics dashboard
- Multi-language support

---

**Built with v0 and modern web technologies**
