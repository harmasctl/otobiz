import { lazy, Suspense } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import { LoadingPage } from "@/components/ui/loading";
import { AuthProvider } from "./providers/AuthProvider";
import BecomeSeller from "./pages/become-seller";

// Layouts
const AppLayout = lazy(() => import("./components/layout/AppLayout"));

// Auth Pages
const LoginPage = lazy(() => import("./pages/auth/login"));
const RegisterPage = lazy(() => import("./pages/auth/register"));
const AuthCallback = lazy(() => import("./pages/auth/callback"));

// Public Pages
const Home = lazy(() => import("./components/home"));
const SearchPage = lazy(() => import("./pages/vehicles/search"));
const VehicleDetailsPage = lazy(() => import("./pages/vehicles/details"));

// Protected Pages
const ProtectedRoute = lazy(() => import("./components/auth/ProtectedRoute"));
const DashboardPage = lazy(() => import("./pages/dashboard"));
const SavedVehiclesPage = lazy(() => import("./pages/dashboard/saved"));
const MyListingsPage = lazy(() => import("./pages/dashboard/listings"));
const ProfileSettings = lazy(() => import("./pages/settings/profile"));
const SecuritySettings = lazy(() => import("./pages/settings/security"));

// Dealer Pages
const DealerDashboard = lazy(() => import("./pages/dealer"));
const CreateListingPage = lazy(() => import("./pages/dealer/listings/create"));

// Admin Pages
const AdminDashboard = lazy(() => import("./pages/admin"));

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingPage />}>
        {import.meta.env.VITE_TEMPO && useRoutes(routes)}
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          {/* Direct register route */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Main Layout Routes */}
          <Route element={<AppLayout />}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="vehicles/:id" element={<VehicleDetailsPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="dashboard/saved" element={<SavedVehiclesPage />} />
              <Route path="dashboard/listings" element={<MyListingsPage />} />
              <Route path="settings/profile" element={<ProfileSettings />} />
              <Route path="settings/security" element={<SecuritySettings />} />
              <Route path="become-seller" element={<BecomeSeller />} />
            </Route>

            {/* Dealer Routes */}
            <Route element={<ProtectedRoute requireRole="dealer" />}>
              <Route path="dealer" element={<DealerDashboard />} />
              <Route
                path="dealer/listings/create"
                element={<CreateListingPage />}
              />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute requireRole="admin" />}>
              <Route path="admin" element={<AdminDashboard />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
