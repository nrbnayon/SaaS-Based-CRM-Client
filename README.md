# PrimeFlow - SAAS CRM Client

A comprehensive SAAS-based CRM client application built with Next.js. This platform combines HR testing, financial management, AI-powered chat assistance, and complete business analytics in one unified dashboard.

## Features

### 🔐 Authentication System
- **Complete Auth Flow**: Login, signup, password reset, OTP verification
- **Secure Access**: Protected routes with role-based permissions
- **Password Recovery**: Forgot password and reset functionality

### 📊 Dashboard & Analytics  
- **Overview Dashboard**: Comprehensive business metrics and KPI tracking
- **Reports & Analytics**: Generate detailed reports across all business functions
- **Account Management**: User profile and account settings

### 👥 HR Management
- **HR Test Creation**: Create custom HR assessment questions and tests to evaluate candidates
- **Performance Analytics**: Track HR performance metrics with detailed analytics
- **Candidate Evaluation**: Comprehensive testing and evaluation system

### 💰 Financial Management
- **Financial Planning**: Complete financial tracking and planning tools
- **Account Management**: Manage multiple financial accounts and transactions
- **Expense Tracking**: Monitor income, expenses, VAT, and savings

### 🤖 AI Integration
- **AI Chat Assistant**: Intelligent chat interface for business queries and automation
- **Smart Recommendations**: AI-powered insights and recommendations
- **Automated Workflows**: Streamline business processes with AI assistance

### ⚡ Additional Features
- **Upgrade System**: Subscription management and plan upgrades
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Real-time Updates**: Live data synchronization across the platform

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Icons**: Lucide React
- **Font**: Geist (optimized with `next/font`)
- **Architecture**: Route Groups for organized code structure
- **State Management**: React Context API & Server Components
- **Authentication**: NextAuth.js (presumed)
- **Database**: (Configure as needed)
- **Deployment**: Vercel recommended

## Getting Started

### Prerequisites

Make sure you have one of the following package managers installed:
- [Node.js](https://nodejs.org/) (18.17 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [yarn](https://yarnpkg.com/)
- [pnpm](https://pnpm.io/)
- [bun](https://bun.sh/)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd saas-based-crm-client
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure

```
saas-based-crm-client/
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/           # Authentication routes group
│   │   │   ├── components/   # Auth-specific components
│   │   │   ├── forgot-password/
│   │   │   ├── login/
│   │   │   ├── reset-password/
│   │   │   ├── signup/
│   │   │   ├── success/
│   │   │   ├── verify-otp/
│   │   │   ├── layout.tsx
│   │   │   └── loading.tsx
│   │   ├── (dashboard)/      # Dashboard routes group
│   │   │   ├── accounts/
│   │   │   ├── chat-ai/
│   │   │   ├── components/
│   │   │   ├── financial-plan/
│   │   │   ├── hr-test/
│   │   │   ├── overview/
│   │   │   ├── profile/
│   │   │   ├── reports/
│   │   │   ├── upgrade/
│   │   │   ├── layout.tsx
│   │   │   └── loading.tsx
│   │   ├── api/              # API routes
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   ├── loading.tsx       # Global loading UI
│   │   ├── not-found.tsx     # 404 page
│   │   └── page.tsx          # Landing page
│   ├── components/           # Shared UI components
│   ├── data/                 # Data layer / utilities
│   ├── lib/                  # Utility libraries
│   ├── types/                # TypeScript type definitions
│   └── .env                  # Environment variables
├── .gitignore
└── components.json           # shadcn/ui configuration
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Dependencies

- **next**: React framework for production
- **react**: JavaScript library for building user interfaces
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Beautiful & consistent icon toolkit

## Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository to Vercel
3. Vercel will automatically detect it's a Next.js project and configure the build settings
4. Deploy with a single click

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Other Deployment Options

- **Netlify**: Connect your Git repository and deploy
- **Railway**: Simple deployment with database support
- **Digital Ocean App Platform**: Container-based deployment
- **AWS Amplify**: Full-stack deployment with AWS services

## Environment Variables

Create a `.env.local` file in the root directory for environment-specific variables:

```env
# Database
DATABASE_URL="your-database-url"

# Authentication
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Add other environment variables as needed
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - utility-first CSS framework
- [Lucide React](https://lucide.dev/guide/packages/lucide-react) - icon library documentation

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need support, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using Next.js and modern web technologies**