# How to Download Your ZYZOPS Website Project

## Option 1: Download as ZIP from v0 (Easiest)

1. **In the v0 Interface**:
   - Look at the top-right corner of the v0 screen
   - Click the **three dots menu (⋯)** button
   - Select **"Download ZIP"**
   - Your project will download as a ZIP file

2. **Extract the ZIP**:
   - Right-click the downloaded ZIP file
   - Select "Extract All" (Windows) or double-click (Mac)
   - Choose where to save it

3. **Open Terminal/Command Prompt**:
   ```bash
   cd path/to/my-project
   ```

4. **Install Dependencies**:
   ```bash
   npm install
   ```

5. **Run the Project**:
   ```bash
   npm run dev
   ```

6. **Visit Website**:
   - Open http://localhost:3000 in your browser

---

## Option 2: Deploy to Vercel (Recommended for Production)

1. **Connect to GitHub**:
   - In v0 Settings → Git
   - Click "Connect Repository"
   - Authorize and select/create a GitHub repo

2. **Deploy to Vercel**:
   - Click "Publish" button in v0
   - Connect your GitHub account
   - Select the repository
   - Click "Deploy"
   - Your site will be live at a Vercel URL

---

## Option 3: Manual Setup (Advanced)

1. **Copy all files** from the v0 project
2. **Create project folder**:
   ```bash
   mkdir zyzops-website
   cd zyzops-website
   ```

3. **Initialize Git** (optional):
   ```bash
   git init
   ```

4. **Copy package.json and install**:
   ```bash
   npm install
   ```

5. **Run development server**:
   ```bash
   npm run dev
   ```

---

## Project Structure After Download

```
my-project/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin pages
│   ├── signin/            # Sign-in page
│   ├── notifications/     # User notifications
│   └── page.tsx           # Home page
├── components/            # React components
│   └── sections/          # Page sections
├── public/               # Static files (images)
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.ts    # Tailwind config
└── README.md            # Documentation
```

---

## Login Credentials (For Testing)

### Admin Access
- **Email**: zaynabrehann@gmail.com
- **Password**: admin123
- **Access**: Admin Dashboard, Manage Messages

### Regular User
- **Email**: user@example.com
- **Password**: user123
- **Access**: Notifications Page, Updates

---

## Key Features to Test

1. **Sign In Page** (`/signin`)
   - Switch between User and Admin login
   - Try demo credentials

2. **Admin Dashboard** (`/admin/dashboard`)
   - View contact form submissions
   - Mark messages as read
   - Delete messages
   - Logout button (goes to home)

3. **Portfolio** (`/portfolio`)
   - Filter by service type
   - View 8+ sample projects

4. **Contact Form** (Home page)
   - Submit a message
   - Get confirmation
   - Message appears in admin dashboard

5. **WhatsApp Button**
   - Functional WhatsApp link
   - Opens WhatsApp with preset message

---

## Customization Guide

### Change Contact Information
Edit `components/sections/contact.tsx`:
```typescript
// Line 72: Email
<p className="text-gray-300 font-light">zaynabrehann@gmail.com</p>

// Line 82: Phone
<p className="text-gray-300 font-light">03245531819</p>

// Line 92: Location
<p className="text-gray-300 font-light">Lahore Cantt, Pakistan</p>
```

### Add More Portfolio Items
Edit `components/sections/portfolio.tsx`:
```typescript
const projects = [
  // Add your projects here with service, image, title, etc.
];
```

### Change Admin Credentials
Edit `app/api/admin/login/route.ts`:
```typescript
const ADMIN_USERS = [
  { email: 'your-email@example.com', password: 'your-password', name: 'Your Name' },
];
```

---

## Troubleshooting

### Port Already in Use
```bash
npm run dev -- -p 3001  # Use different port
```

### Dependencies Won't Install
```bash
npm install --legacy-peer-deps
```

### Clear Cache
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

### Build for Production
```bash
npm run build
npm run start
```

---

## Environment Variables (Optional)

Create `.env.local` file for sensitive data:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## Need Help?

1. Check **README.md** in project folder
2. Review **comments** in component files
3. Test with **demo credentials** provided
4. Check browser **Developer Tools** (F12) for errors

---

## Next Steps

1. ✅ Download ZIP from v0
2. ✅ Extract and install dependencies
3. ✅ Run `npm run dev`
4. ✅ Visit http://localhost:3000
5. ✅ Test with demo credentials
6. ✅ Customize with your information
7. ✅ Deploy to Vercel when ready

---

**Your ZYZOPS website is ready to use and customize!**
