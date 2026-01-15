# NutriTracker

A modern nutrition tracking web app built with Next.js, Supabase, and USDA FoodData Central API.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (auth + PostgreSQL database)
- **USDA FoodData Central API** (free nutrition data)
- **Vercel** (deployment ready)

## Features (MVP)

✅ **Implemented:**
- Sign up / Login with Supabase Auth
- Calculate daily nutritional needs (BMI + recommendations)
- Search USDA food database (500k+ foods)
- Log foods eaten today with automatic nutrition totals
- Set and track daily calorie/macro goals
- Meal suggestions (5-10 curated ideas)
- Mobile responsive design

## Setup Instructions

### 1. Clone and Install

```bash
npm install
```

### 2. Get API Keys

#### Supabase (Auth + Database)
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your project URL and anon key from Settings → API
3. Run the SQL schema in `supabase-schema.md` in your Supabase SQL Editor
4. (Optional) Run the sample meal data in `sample-meals.sql`

#### USDA FoodData Central API
1. Get a free API key at [fdc.nal.usda.gov/api-key-signup.html](https://fdc.nal.usda.gov/api-key-signup.html)
2. No credit card required

#### RapidAPI Nutrition Calculator (Optional - for BMI/daily needs)
1. Subscribe (free tier) at [rapidapi.com/sprestrelski/api/nutrition-calculator](https://rapidapi.com/sprestrelski/api/nutrition-calculator)
2. Copy your RapidAPI key

### 3. Environment Variables

Create `.env.local` in the root directory:

```env
# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# USDA FoodData Central API (required)
USDA_API_KEY=your_usda_api_key

# RapidAPI (optional - for BMI calculator on /dashboard)
RAPIDAPI_KEY=your_rapidapi_key
RAPIDAPI_HOST=nutrition-calculator.p.rapidapi.com
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Database Schema

Run the SQL in `supabase-schema.md` to create:
- `profiles` - User profiles (auto-created on signup)
- `user_goals` - Daily nutrition targets
- `food_logs` - Logged foods with nutrition snapshots
- `meal_suggestions` - Curated meal ideas

## Project Structure

```
app/
├── page.tsx                 # Landing page
├── login/page.tsx          # Login
├── signup/page.tsx         # Signup
├── app/
│   ├── layout.tsx          # Protected app layout
│   ├── page.tsx            # Today's progress
│   ├── search/page.tsx     # Food search
│   ├── goals/page.tsx      # Set daily goals
│   └── meals/page.tsx      # Meal suggestions
├── api/
│   ├── foods/
│   │   ├── search/route.ts     # USDA search proxy
│   │   └── [fdcId]/route.ts    # Food details
│   ├── bmi/route.ts            # BMI calculator
│   └── nutrition-info/route.ts # Daily recommendations
lib/
├── supabase/
│   ├── client.ts           # Browser client
│   └── server.ts           # Server client
├── usda.ts                 # USDA API helper
└── rapidapi.ts             # RapidAPI helper
```

## Deployment (Vercel)

1. Push to GitHub
2. Import project in [vercel.com](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy

## Next Steps (Post-MVP)

- Weekly meal planning
- Grocery lists
- Recipe details with photos
- Barcode scanning
- Integration with fitness trackers
- Advanced analytics
- Social features

## Tutorial Talking Points

When presenting this project, emphasize:

### Architecture
- **Server-side auth** with Supabase SSR (cookies-based sessions)
- **Row Level Security (RLS)** ensures users only see their own data
- **API route handlers** act as secure proxies (keys never reach browser)
- **Nutrition snapshots** in logs preserve history even if food data changes

### Data Flow
1. User searches food → `/api/foods/search` → USDA API
2. User logs food → Client → Supabase RLS-protected insert
3. Today page → Server component → Supabase query → Aggregate totals

### Performance
- Server components for data fetching (no client-side waterfalls)
- Edge-ready (all routes can run on edge runtime)
- Debounced search (production: add `use-debounce`)

### Security
- All API keys server-side only
- Supabase RLS policies enforce `user_id` checks
- Auth middleware redirects unauthenticated users

## License

MIT
