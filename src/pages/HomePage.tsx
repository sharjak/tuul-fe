import { useNavigate } from 'react-router-dom';
import './HomePage.scss';
import { useAuthRedirect } from '../hooks/useAuthRedirect';

const HomePage = () => {
    const navigate = useNavigate();
    useAuthRedirect(true, '/dashboard');

    return (
        <div className="home-container">
            <h1>Welcome to Tuul</h1>
            <button className="auth-button" onClick={() => navigate('/auth')}>
                Sign In
            </button>
        </div>
    );
};

export default HomePage;
