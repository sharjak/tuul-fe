import AuthForm from '../components/AuthForm';
import { useAuthRedirect } from '../hooks/useAuthRedirect';

const AuthPage = () => {
    useAuthRedirect(true, '/dashboard');
    return (
        <div>
            <AuthForm />
        </div>
    );
};

export default AuthPage;
