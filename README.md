# ZoomStore

A modern e-commerce UI built with Next.js, Tailwind CSS, and shadcn/ui components.

## Features

- 🛍️ Product browsing with responsive grid layout
- 🛒 Shopping cart modal with quantity management
- 📱 Mobile-responsive design
- 🎨 Clean, modern UI using Tailwind CSS
- 📦 Product detail pages with related products
- 👨‍💼 Admin dashboard for managing users, products, and orders
- 🚚 Checkout and shipping flow
- 🔐 Authentication pages (login/register)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd zoomstore
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
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

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see ZoomStore.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── products/          # Product listing and details
│   ├── checkout/          # Checkout flow
│   ├── shipping/          # Shipping details
│   ├── login/             # Authentication pages
│   └── register/
├── components/ui/         # Reusable UI components
│   ├── CartModal.jsx      # Shopping cart modal
│   ├── ProductCard.jsx    # Product card component
│   └── Navbar.jsx         # Navigation bar
└── public/                # Static assets
```

## Pages

- **Home** (`/`) - Landing page with ZoomStore branding
- **Products** (`/products`) - Product listing with grid layout
- **Product Details** (`/products/[id]`) - Individual product page with add-to-cart
- **Admin Dashboard** (`/admin`) - Management interface
  - Users (`/admin/users`) - User management
  - Products (`/admin/products`) - Product catalog management
  - Orders (`/admin/orders`) - Order tracking
- **Checkout** (`/checkout`) - Order summary and checkout
- **Shipping** (`/shipping`) - Shipping details form
- **Authentication** (`/login`, `/register`) - User authentication

## UI Components

### CartModal

- Radix UI Dialog-based shopping cart
- Quantity controls with increment/decrement buttons
- Stock status indicators
- Cart summary with subtotal, shipping, and total
- "Continue Shopping" and "Proceed to Checkout" actions

### ProductCard

- Product image with hover effects
- Title, subtitle, and price display
- "Add to Cart" and "View Cart" buttons
- Cart modal integration

### Navbar

- ZoomStore branding with shopping bag icon
- Navigation links (Home, Products, Collections, Admin)
- Cart button with modal trigger
- User profile avatar

## Technologies

- **Framework:** Next.js 15.5.0 with App Router
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI primitives
- **Icons:** Lucide React
- **Fonts:** Geist Sans and Geist Mono

## Environment Variables

No environment variables are required for the static UI demo. For production deployment with authentication and database integration, you would need:

```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=your-deployment-url
MONGODB_URI=your-mongodb-connection-string
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com/new)
3. Deploy with default Next.js settings

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Heroku
- Railway
- DigitalOcean App Platform

## Development

To extend the application:

1. **Add new pages:** Create files in the `app/` directory
2. **Create components:** Add reusable components to `components/ui/`
3. **Add functionality:** Currently static - integrate with APIs, state management (Redux), and backend services
4. **Testing:** Add Jest/Vitest for unit tests and Playwright for E2E tests

## License

This project is for demonstration purposes.
