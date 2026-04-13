# Matheus Batista | Portfolio 2025

Personal portfolio and professional website for **Matheus Batista**, Software Engineer based in Brazil.

## Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with CSS custom properties
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (smooth transitions, micro-interactions)
- **Internationalization**: [next-intl](https://next-intl.dev/) (PT, EN, ES)
- **Theme**: Dark / Light mode via [next-themes](https://github.com/pacocoursey/next-themes)
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [Auth.js v5](https://authjs.dev/) (OAuth + Email)
- **Email**: [Resend](https://resend.com/)
- **File Storage**: Cloudflare R2
- **Deploy**: [Vercel](https://vercel.com/)

## Architecture

This project follows **Clean Architecture** principles with 4 layers:

```
src/
  domain/          -> Entities, repository interfaces (no dependencies)
  application/     -> Use cases, DTOs, validation schemas
  infrastructure/  -> Database, auth, email, storage implementations
  app/             -> Next.js routes, layouts, pages (presentation)
  components/      -> Reusable React components
```

## Features

- Server-Side Rendering (SSR) + Incremental Static Regeneration (ISR)
- Multi-language support (Portuguese, English, Spanish)
- Dark and Light mode with smooth transitions
- Apple-inspired design with premium micro-interactions
- Contact form with rate limiting
- Admin panel for content management
- SEO optimized (metadata, sitemap, structured data, Open Graph)
- Responsive design (mobile-first)

## Getting Started

### Prerequisites

- Node.js 18.17+
- PostgreSQL database
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/matheus-batista-web.git

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Seed the database
npx prisma db seed

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Copy `.env.example` to `.env` and fill in the required values. See the example file for all available configuration options.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## License

All rights reserved. This project is the personal portfolio of Matheus Batista.

---

Designed with care. Built with precision.
