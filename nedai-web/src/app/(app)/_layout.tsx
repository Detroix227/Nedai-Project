import { useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/modules/auth/useAuthStore';
import { useChatStore } from '@/modules/chat/useChatStore';
import { useDocumentStore } from '@/modules/documents/useDocumentStore';
import { SplashScreen } from '@/components/SplashScreen';

export default function AppLayout() {
  const hydrated = useAuthStore((state) => state.hydrated);
  const bootstrapped = useAuthStore((state) => state.bootstrapped);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const bootstrapSession = useAuthStore((state) => state.bootstrapSession);
  
  const resetChat = useChatStore((state) => state.reset);
  const resetDocuments = useDocumentStore((state) => state.resetSession);
  const location = useLocation();

  useEffect(() => {
    if (hydrated && !bootstrapped) {
      bootstrapSession();
    }
  }, [hydrated, bootstrapped, bootstrapSession]);

  useEffect(() => {
    if (!isAuthenticated) {
      resetChat();
      resetDocuments();
    }
  }, [isAuthenticated, resetChat, resetDocuments]);

  if (!hydrated || !bootstrapped) {
    return <SplashScreen />; 
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
