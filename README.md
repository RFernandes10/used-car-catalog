# Used Car Catalog - React TypeScript Application

A modern, fully functional used car catalog web application built with React, TypeScript, and Tailwind CSS. Features a clean, elegant design with comprehensive filtering, search capabilities, and detailed car information pages.

> **Live Demo:** [used-car-catalog.vercel.app](https://used-car-catalog.vercel.app)

<p align="center">
  <img src="https://github.com/RFernandes10/used-car-catalog/raw/main/screenshot.png" alt="Used Car Catalog Preview" width="100%" />
</p>

## Design Philosophy

## Design Philosophy

This application follows a **Contemporary Elegant** design approach with:

- **Warm color palette**: Cream backgrounds (#faf8f3), deep forest green (#2d4a3d), soft gold (#d4a574), and muted rose accents
- **Sophisticated typography**: Playfair Display for headings (elegant serif) paired with Lato for body text (clean sans-serif)
- **Generous spacing**: Ample whitespace and breathing room throughout the interface
- **Smooth interactions**: 300ms ease-out transitions on all interactive elements
- **Premium feel**: Soft rounded corners (16px-24px), subtle shadows, and refined details

## Technology Stack

### Frontend
- **React 19** - UI library with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling with OKLCH color system
- **Wouter** - Lightweight client-side routing
- **Context API** - Global state management (no Redux needed)
- **Lucide React** - Beautiful SVG icons
- **shadcn/ui** - Pre-built accessible components

### Development & Testing
- **Vite** - Lightning-fast build tool
- **Vitest** - Unit testing framework
- **TypeScript** - Static type checking
- **Prettier** - Code formatting
- **ESLint** - Code linting

## Project Structure

```
used-car-catalog/
├── client/
│   ├── public/              # Static assets (favicon, robots.txt)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── CarCard.tsx
│   │   │   ├── CarFilters.tsx
│   │   │   ├── CarList.tsx
│   │   │   └── ui/          # shadcn/ui components
│   │   ├── contexts/        # React Context providers
│   │   │   ├── CarContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   ├── data/            # Sample data
│   │   │   └── cars.ts
│   │   ├── pages/           # Page components
│   │   │   ├── Catalog.tsx
│   │   │   ├── CarDetail.tsx
│   │   │   └── NotFound.tsx
│   │   ├── types/           # TypeScript type definitions
│   │   │   └── car.ts
│   │   ├── __tests__/       # Test files
│   │   │   └── CarContext.test.ts
│   │   ├── App.tsx          # Root component with routing
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles and design tokens
│   └── index.html
├── server/                  # Express server (optional for production)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── vite.config.ts
```

## Key Components

### CarContext (State Management)
Manages global state for the car catalog using React Context API:
- Stores all cars from sample data
- Handles filtering logic (make, model, year, price, body type, fuel type)
- Provides search functionality
- Exposes utility functions: `getCarById()`, `getUniqueMakes()`, `getModelsByMake()`

```typescript
const { cars, filteredCars, filters, setFilters, resetFilters } = useCars();
```

### CarCard Component
Displays individual car listings with:
- Car image with hover zoom effect
- Key specs (mileage, fuel type)
- Condition badge
- Price display
- Link to detail page

### CarFilters Component
Provides comprehensive filtering:
- **Basic filters**: Make, Model
- **Advanced filters**: Year range, Price range, Body type, Fuel type
- **Search**: Full-text search across make, model, and description
- **Reset**: Clear all filters button

### CarList Component
Grid layout for displaying filtered cars:
- Responsive grid (1 column mobile, 2 columns tablet, 3 columns desktop)
- Empty state when no cars match filters
- Results count display

### Catalog Page
Main listing page with:
- Hero section with introduction
- Sticky filter sidebar
- Car grid with responsive layout
- Footer CTA section

### CarDetail Page
Full car information page with:
- Large hero image
- Quick info card (price, mileage, transmission)
- Detailed specifications
- Features checklist
- Full description
- Back to catalog button

## Getting Started

### Prerequisites
- Node.js 18+ and pnpm 10+
- Modern web browser

### Installation

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Start development server**:
   ```bash
   pnpm dev
   ```
   The app will be available at `http://localhost:3000`

3. **Build for production**:
   ```bash
   pnpm build
   ```

4. **Preview production build**:
   ```bash
   pnpm preview
   ```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## Features

### Implemented
- ✅ Browse car listings with essential information
- ✅ Click to view full car details
- ✅ Filter by make, model, year range, price range
- ✅ Filter by body type and fuel type
- ✅ Full-text search across cars
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Accessible navigation and keyboard support
- ✅ Clean, well-commented codebase
- ✅ Basic Jest tests for filtering logic
- ✅ Context API for state management
- ✅ Client-side routing with Wouter

### Future Enhancements
- Backend API integration (Node.js + Express + PostgreSQL)
- User authentication
- Favorites/wishlist functionality
- Advanced search with saved filters
- Contact form for inquiries
- Admin panel for managing inventory
- Image gallery with multiple photos per car
- Financing calculator
- Trade-in valuation tool

## Code Quality

### Accessibility
- Semantic HTML throughout
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators on interactive elements
- Color contrast meets WCAG AA standards
- Alt text on all images

### Performance
- Lazy loading for images
- Memoized filtered results
- Optimized re-renders with useMemo
- CSS-in-JS via Tailwind (no runtime overhead)
- Tree-shaking enabled for unused code

### Maintainability
- Clear component separation of concerns
- Comprehensive TypeScript types
- Consistent naming conventions
- Well-documented functions and components
- Minimal dependencies (no bloat)
- Easy to extend with new features

## Styling System

### Design Tokens (CSS Variables)
All colors are defined as CSS variables in `client/src/index.css`:

```css
--primary: oklch(0.45 0.12 150);           /* Deep forest green */
--accent: oklch(0.65 0.15 40);             /* Soft gold */
--background: oklch(0.98 0.01 70);         /* Warm cream */
--foreground: oklch(0.3 0.08 150);         /* Deep text */
```

### Typography
- **Display**: Playfair Display Bold (72px+)
- **Body**: Lato Regular (16px)
- **Metadata**: Lato Light (12px)

### Spacing
Uses Tailwind's default spacing scale with custom container padding:
- Mobile: 1rem (16px)
- Tablet: 1.5rem (24px)
- Desktop: 2rem (32px)

### Border Radius
- Small: 0.65rem
- Medium: 1rem (default)
- Large: 1.25rem

## Environment Variables

The application uses these environment variables (automatically injected):

```
VITE_APP_ID              # Application ID
VITE_APP_TITLE           # App title
VITE_APP_LOGO            # App logo URL
VITE_ANALYTICS_ENDPOINT  # Analytics endpoint
VITE_ANALYTICS_WEBSITE_ID # Analytics website ID
```

## Sample Data

The application includes 10 sample cars with realistic data:
- Toyota Camry (2021)
- Honda Civic (2020)
- Ford F-150 (2019)
- Chevrolet Equinox (2022)
- Mazda CX-5 (2021)
- Hyundai Elantra (2020)
- BMW 3 Series (2019)
- Tesla Model 3 (2021)
- Volkswagen Jetta (2020)
- Subaru Outback (2021)

To use real data, replace `SAMPLE_CARS` in `client/src/data/cars.ts` with API calls.

## Backend Integration (Optional)

To extend this to a full-stack application with a real backend:

### 1. Setup Express Server
```typescript
// server/index.ts
import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.get('/api/cars', async (req, res) => {
  const cars = await prisma.car.findMany();
  res.json(cars);
});
```

### 2. Setup Prisma Schema
```prisma
// prisma/schema.prisma
model Car {
  id          String   @id @default(cuid())
  make        String
  model       String
  year        Int
  price       Int
  mileage     Int
  color       String
  imageUrl    String
  transmission String
  fuelType    String
  bodyType    String
  engineSize  String
  horsepower  Int
  description String
  features    String[]
  condition   String
  vin         String   @unique
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 3. Update CarContext to Fetch from API
```typescript
useEffect(() => {
  const fetchCars = async () => {
    const response = await fetch('/api/cars');
    const data = await response.json();
    setCars(data);
  };
  fetchCars();
}, []);
```

### Other Platforms
To deploy elsewhere:

```bash
# Build the project
pnpm build

# Deploy the dist/ folder to your hosting provider
# (Vercel, Netlify, Railway, etc.)
```

## Contributing

When adding new features:

1. **Create components** in `client/src/components/`
2. **Add types** to `client/src/types/`
3. **Write tests** in `client/src/__tests__/`
4. **Update styles** in `client/src/index.css`
5. **Document** with clear comments

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions:
- Check the code comments for implementation details
- Review the TypeScript types for API contracts
- Run tests to verify functionality
- Refer to the Tailwind CSS and shadcn/ui documentation

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
