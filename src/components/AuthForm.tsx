import { useState } from 'react';
import './AuthForm.scss';
import { register, login } from '../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const AuthForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isLogin) {
                const { token, expiryDate } = await login(email, password);
                localStorage.setItem('token', token);
                localStorage.setItem('tokenExpiry', expiryDate);
                toast.success('Successfully logged in!');
                navigate('/dashboard');
            } else {
                await register(name, email, password);
                toast.success('Account successfully created!');
                setIsLogin(true);
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                {!isLogin && (
                    <div>
                        <label>Name:</label>
                        <input
                            type="string"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                )}
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
                </button>
            </form>
            <p>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                    className="toggle-button"
                    onClick={() => setIsLogin((prev) => !prev)}
                    disabled={isLoading}
                >
                    {isLogin ? 'Register' : 'Login'}
                </button>
            </p>
        </div>
    );
};

export default AuthForm;
