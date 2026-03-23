import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { messaging } from './components/utils/firebase'
import { getToken } from 'firebase/messaging'
import { useEffect } from 'react'
import { setToken } from './redux/firebaseTokenSlice'
import { useDispatch } from 'react-redux'
import { lazy, Suspense } from 'react'
import SavedJobs from './components/SavedJobs'
const Login = lazy(() => import('./components/auth/Login'))
const Signup = lazy(() => import('./components/auth/Signup'))
const Home = lazy(() => import('./components/Home'))
const Jobs = lazy(() => import('./components/Jobs'))
const Browse = lazy(() => import('./components/Browse'))
const Profile = lazy(() => import('./components/Profile'))
const JobDescription = lazy(() => import('./components/JobDescription'))
const Companies = lazy(() => import('./components/admin/Companies'))
const CompanyCreate = lazy(() => import('./components/admin/CompanyCreate'))
const CompanySetup = lazy(() => import('./components/admin/CompanySetup'))
const AdminJobs = lazy(() => import("./components/admin/AdminJobs"));
const PostJob = lazy(() => import('./components/admin/PostJob'))
const Applicants = lazy(() => import('./components/admin/Applicants'))
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute'))
const Roadmaps = lazy(() => import('./components/Roadmaps'))
const SuperAdminDashboard = lazy(() => import('./components/superadmin/SuperAdminDashboard'))
const SuperAdminProtectedRoute = lazy(() => import('./components/superadmin/SuperAdminProtectedRoute'))

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "saved-jobs",
    element: <SavedJobs />
  },
  // New Roadmaps routes
  {
    path: "/roadmaps",
    element: <Roadmaps />
  },
  {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute> 
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute> 
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute> 
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute> 
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute> 
  },
  // Super Admin routes
  {
    path: "/superadmin/dashboard",
    element: <SuperAdminProtectedRoute><SuperAdminDashboard /></SuperAdminProtectedRoute>
  },
]);

function App() {
  const dispatch = useDispatch();
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      console.log(token);

      dispatch(setToken(token))

    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }
  
  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <div>
      <Suspense>
        <RouterProvider router={appRouter} />
      </Suspense>
    </div>
  );
}

export default App;
