import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.scss';
import { pairVehicle, unpairVehicle } from '../services/vehicleService';
import { getDetails, UserDetailsDto } from '../services/userService';
import { toast } from 'react-toastify';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [userDetails, setUserDetails] = useState<UserDetailsDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [pairing, setPairing] = useState(false);
    const [unpairing, setUnpairing] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const details = await getDetails();
                setUserDetails(details);
            } catch (err) {
                toast.error('Failed to fetch user details.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            handlePair();
        }
    };

    const handlePair = async () => {
        setPairing(true);
        try {
            await pairVehicle(code);
            toast.success('Scooter paired successfully!');
            const updatedDetails = await getDetails();
            setUserDetails(updatedDetails);
            setCode('');
        } catch (err) {
            toast.error('Failed to pair scooter.');
        } finally {
            setPairing(false);
        }
    };

    const handleUnpair = async () => {
        if (!userDetails?.activeVehicle?.code) {
            toast.error('No active vehicle to unpair.');
            return;
        }

        setUnpairing(true);
        try {
            await unpairVehicle(userDetails.activeVehicle.code);
            toast.success('Scooter unpaired successfully!');
            const updatedDetails = await getDetails();
            setUserDetails(updatedDetails);
        } catch (err) {
            toast.error('Failed to unpair scooter.');
        } finally {
            setUnpairing(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading user details...</div>;
    }

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <span className="user-email">{userDetails?.email}</span>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </nav>

            <div className="dashboard-content">
                {userDetails?.activeVehicle ? (
                    <div className="scooter-card">
                        <h2>Paired Scooter</h2>
                        <h3>{userDetails.activeVehicle.code}</h3>
                        <button onClick={handleUnpair} className="action-button unpair-button" disabled={unpairing}>
                            {unpairing ? 'Unpairing Scooter...' : 'Unpair Scooter'}
                        </button>
                    </div>
                ) : (
                    <div className="scooter-card">
                        <h2>Pair a Scooter</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handlePair();
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Enter scooter code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="input-field"
                                disabled={pairing}
                            />
                            <button
                                type="submit"
                                className="action-button pair-button"
                                disabled={pairing || !code.trim()}
                            >
                                {pairing ? 'Pairing Scooter...' : 'Pair Scooter'}
                            </button>
                        </form>
                    </div>

                )}
            </div>
        </div>
    );
};

export default DashboardPage;
