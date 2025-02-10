import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthRedirect = (redirectIfAuthenticated: boolean, targetPath: string) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (redirectIfAuthenticated && token) {
      navigate(targetPath);
    } 
    if (!redirectIfAuthenticated && !token) {
      navigate(targetPath);
    }
  }, [redirectIfAuthenticated, targetPath, token, navigate]);
};
