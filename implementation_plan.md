# Phase 1: Routing & Directory Architecture

To migrate `nedai-app` to the web step-by-step, the foundational first piece is substituting mobile routing (`expo-router`) with a robust web counterpart. We will start here.

## The Strategy: Centralized `react-router-dom`

Since the React Native app uses `expo-router`'s file-based routing strategy, everything centers around the `app/` directory (e.g., `app/(auth)/login.tsx`, `app/(app)/_layout.tsx`). For Vite React web apps, there is no built-in file-based routing out-of-the-box. We will use the industry standard **`react-router-dom`** to explicitly structure our paths.

### Requirements for Phase 1
- **Install Dependency**: `npm install react-router-dom` in `nedai-web`
- **Recreate the Directory**: Build the `src/app/` folder to literally mirror the `app/` directory in the mobile codebase.
- **Implement Central Router**: Configure the `App.tsx` file using `<BrowserRouter>` and `<Routes>` to map to the imported pages manually.

---

### Pros of this approach
- **No Magic / Highly Predictable**: Unlike file-based routing plugins which rely on build-time scraping, all routes are visibly mapped in one place (`App.tsx`), making debugging dead simple.
- **Perfect Support for Nested Layouts**: `react-router-dom` has built-in `<Outlet />` patterns that directly translate the behavior of `expo-router`'s `<Slot />` and `_layout.tsx` components.
- **High Compatibility**: It works identically out of the box without needing complex Vite plugin setups, keeping build times fast.

### Cons of this approach
- **Manual Mapping**: When you add a new screen in `src/app/(auth)/new-screen.tsx`, it will not be magically available. You will need to explicitly add a `<Route path="/new-screen" element={<NewScreen />} />` entry to `App.tsx`.
- **Slight Departure from Expo's DX**: You don't get the automated dynamic typing for routes that Expo provides (e.g. `useRouter<'/route-name'>`). 

---

## Direct Implementation Snapshot

Here is what the exact implementation of Phase 1 will look like code-wise:

#### 1. The Directory Structure setup
```text
nedai-web/src/
  ├── app/
  │   ├── (auth)/
  │   │   └── login.tsx      # Web equivalent of mobile login
  │   └── (app)/
  │       └── _layout.tsx    # Protected route layout 
  ├── App.tsx                # Where react-router is configured
```

#### 2. The `App.tsx` Router Configuration
We will write the `<BrowserRouter>` wrapper, mapping out the routes exactly as Expo previously did.
```tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './app/(auth)/login';
import AppLayout from './app/(app)/_layout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        
        {/* Protected nested layout like (app)/_layout */}
        <Route element={<AppLayout />}>
           <Route path="/" element={<div>Home/Dashboard</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

#### 3. Transforming `_layout.tsx` 
We will adapt Expo Router's `<Stack>` and `<Redirect>` to web versions: `<Outlet />` and `<Navigate />`.

## User Review Required

> [!IMPORTANT]
> This is step one. By doing this we lay the physical folder structure to copy your codebase into and connect it together. 
> 
> **Do you approve of installing `react-router-dom` and scaffolding this initial layout layer right now?** Once this is done, the next logic step would be either State Management (Zustand) or Tailwind styling.
