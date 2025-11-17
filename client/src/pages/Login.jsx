import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const googleButtonRef = useRef(null);

    useEffect(() => {
        // Initialize Google Sign-In
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: handleGoogleResponse,
                auto_select: false,
                cancel_on_tap_outside: true,
            });

            // Render the Google Sign-In button
            window.google.accounts.id.renderButton(
                googleButtonRef.current,
                {
                    theme: 'outline',
                    size: 'large',
                    width: googleButtonRef.current?.offsetWidth || 400,
                    text: 'continue_with',
                    shape: 'rectangular',
                    logo_alignment: 'left',
                }
            );

            // Display One Tap prompt
            window.google.accounts.id.prompt();
        }
    }, []);

    const handleGoogleResponse = async (response) => {
        try {
            const result = await authAPI.loginWithGoogleToken(response.credential);
            
            if (result.success) {
                dispatch(setUser(result.user));
                toast.success('Login successful!');
                navigate('/dashboard', { replace: true });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-950 dark:to-zinc-900">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 dark:border-zinc-800">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600 dark:text-zinc-400">
                        Sign in to manage your projects
                    </p>
                </div>

                <div ref={googleButtonRef} className="w-full"></div>

                <div className="mt-6 text-center text-sm text-gray-500 dark:text-zinc-400">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </div>
            </div>
        </div>
    );
};

export default Login;
