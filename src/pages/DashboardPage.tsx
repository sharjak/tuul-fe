import { useNavigate } from 'react-router-dom';
import './DashboardPage.scss';

const DashboardPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </nav>

            <div className="content">
                <h1>Welcome to Your Dashboard</h1>
                <p>You are successfully logged in!</p>
            </div>
        </div>
    );
};

export default DashboardPage;
