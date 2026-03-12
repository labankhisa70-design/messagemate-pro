import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Developers from "./pages/Developers";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import SendSMS from "./pages/dashboard/SendSMS";
import Contacts from "./pages/dashboard/Contacts";
import Campaigns from "./pages/dashboard/Campaigns";
import SenderIds from "./pages/dashboard/SenderIds";
import Templates from "./pages/dashboard/Templates";
import Reports from "./pages/dashboard/Reports";
import ApiKeys from "./pages/dashboard/ApiKeys";
import Billing from "./pages/dashboard/Billing";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<DashboardOverview />} />
              <Route path="send" element={<SendSMS />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="campaigns" element={<Campaigns />} />
              <Route path="sender-ids" element={<SenderIds />} />
              <Route path="templates" element={<Templates />} />
              <Route path="reports" element={<Reports />} />
              <Route path="api-keys" element={<ApiKeys />} />
              <Route path="billing" element={<Billing />} />
              <Route path="settings" element={<DashboardSettings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
