# BEACON - AI-Powered Government Schemes Platform

## Project Overview
BEACON is an AI-powered government schemes automation platform that helps Indian citizens discover and apply for government schemes, scholarships, and programs through an intelligent chatbot interface.

## Tech Stack
- **Frontend**: React with TypeScript, Tailwind CSS v4.0
- **Animations**: Framer Motion (motion/react)
- **Backend**: Supabase (Edge Functions, KV Store)
- **UI Components**: shadcn/ui
- **Icons**: lucide-react

## Project Structure

### Root Files
```
/App.tsx                          # Main application entry point with routing
/Attributions.md                  # Attribution information
/styles/globals.css               # Global styles and Tailwind configuration
```

### Components (Custom)
```
/components/AuthSystem.tsx        # Phone + OTP authentication system
/components/ChatbotInterface.tsx  # AI chatbot for data collection
/components/Dashboard.tsx         # Main dashboard component
/components/LandingPage.tsx       # Landing page with hero section
/components/PaymentInterface.tsx  # UPI payment processing interface
/components/SchemesDashboard.tsx  # Schemes listing with eligibility checking
/components/UserProfile.tsx       # User profile data collection form
```

### UI Components (shadcn/ui)
```
/components/ui/                   # All shadcn components
  - accordion.tsx
  - alert-dialog.tsx
  - alert.tsx
  - aspect-ratio.tsx
  - avatar.tsx
  - badge.tsx
  - breadcrumb.tsx
  - button.tsx
  - calendar.tsx
  - card.tsx
  - carousel.tsx
  - chart.tsx
  - checkbox.tsx
  - collapsible.tsx
  - command.tsx
  - context-menu.tsx
  - dialog.tsx
  - drawer.tsx
  - dropdown-menu.tsx
  - form.tsx
  - hover-card.tsx
  - input-otp.tsx
  - input.tsx
  - label.tsx
  - menubar.tsx
  - navigation-menu.tsx
  - pagination.tsx
  - popover.tsx
  - progress.tsx
  - radio-group.tsx
  - resizable.tsx
  - scroll-area.tsx
  - select.tsx
  - separator.tsx
  - sheet.tsx
  - sidebar.tsx
  - skeleton.tsx
  - slider.tsx
  - sonner.tsx
  - switch.tsx
  - table.tsx
  - tabs.tsx
  - textarea.tsx
  - toggle-group.tsx
  - toggle.tsx
  - tooltip.tsx
  - use-mobile.ts
  - utils.ts
```

### Backend
```
/supabase/functions/server/
  - index.tsx                     # Hono server with API routes
  - kv_store.tsx                  # Key-value store utilities (PROTECTED - DO NOT MODIFY)
```

### Utilities
```
/utils/supabase/
  - info.tsx                      # Supabase configuration (projectId, publicAnonKey)
```

### System Components
```
/components/figma/
  - ImageWithFallback.tsx         # Protected image component
```

## Key Features

### 1. Authentication System
- Phone number input with validation
- OTP verification (mock implementation)
- Glassmorphic UI design
- Smooth animations with Framer Motion

### 2. AI Chatbot Interface
- Collects user data through conversational flow
- Questions cover: name, age, gender, occupation, income, caste, disability status
- Real-time typing indicator
- Message history display
- Stable textbox layout (no glitching)

### 3. Schemes Dashboard
- Displays 8+ government schemes
- Automatic eligibility checking based on user profile
- Visual indicators (Eligible/Not Eligible)
- One-click application process
- Application status tracking

### 4. User Profile
- Comprehensive data collection form
- Fields: name, age, gender, occupation, income, caste, disability, document uploads
- Form validation
- Glassmorphic card design

### 5. Payment Interface
- UPI payment integration (mock)
- Payment amount display
- Success confirmation
- Automatic navigation after payment

## Application Flow
1. **Landing Page** → User views BEACON introduction
2. **Authentication** → Phone number + OTP verification
3. **AI Agent** → Chatbot collects user data (7 questions)
4. **Profile** → User can review/edit profile information
5. **Schemes** → Browse schemes with eligibility status
6. **Apply** → One-click application for eligible schemes
7. **Payment** → Process scheme fees via UPI (if applicable)
8. **Confirmation** → View application status

## Design System

### Color Scheme
- Primary: Purple/Blue gradient theme
- Glass morphism effects throughout
- Semi-transparent backgrounds with blur
- Gradient accents and borders

### Animations
- Fade-in animations on component mount
- Slide-in animations for chat messages
- Hover effects on interactive elements
- Smooth transitions between states

## Environment Variables Required
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_DB_URL`

## Setup Instructions for GitHub

### 1. Initialize Git Repository
\`\`\`bash
git init
git add .
git commit -m "Initial commit: BEACON AI Government Schemes Platform"
\`\`\`

### 2. Create .gitignore
\`\`\`
node_modules/
.env
.env.local
dist/
build/
.DS_Store
*.log
\`\`\`

### 3. Push to GitHub
\`\`\`bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
\`\`\`

## Development Notes

### Recent Fixes
- ✅ Fixed chatbot textbox glitching by stabilizing layout structure
- ✅ Resolved controlled/uncontrolled input warnings
- ✅ Proper state initialization in all forms
- ✅ Consistent string values for all inputs

### Known Limitations
- Gemini AI integration is mocked (questions are predefined)
- OTP verification is simulated (not real SMS)
- Document uploads are UI-only (no actual storage)
- UPI payments are mocked (no real payment gateway)

## Future Enhancements
- Real Gemini AI integration for dynamic conversations
- Actual SMS OTP via Twilio/Firebase
- Document storage in Supabase Storage
- Real payment gateway integration
- Multi-language support
- Advanced scheme filtering
- Application tracking dashboard
- Admin panel for scheme management

## Hackathon Highlights
✨ Modern glassy-themed UI with premium animations
✨ Intelligent AI agent for seamless data collection
✨ Automatic eligibility checking
✨ End-to-end application automation
✨ Mobile-responsive design
✨ Accessibility-first approach

## License
MIT License (or specify your preferred license)

## Author
Built for [Hackathon Name] by [Your Name]

---

**Note**: This project was built using Figma Make. When recreating locally, ensure all dependencies are installed via npm/yarn.
