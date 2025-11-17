import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading } from '../features/authSlice';
import { authAPI } from '../services/api';
import { Loader2Icon } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                dispatch(setLoading(true));
                const response = await authAPI.getMe();
                dispatch(setUser(response.data.user));
            } catch (error) {
                console.error('Auth check failed:', error);
                navigate('/login');
            } finally {
                dispatch(setLoading(false));
            }
        };

        if (!user) {
            checkAuth();
        }
    }, [user, navigate, dispatch]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-white dark:bg-zinc-950">
                <Loader2Icon className="size-7 text-blue-500 animate-spin" />
            </div>
        );
    }

    return user ? children : null;
};

export default ProtectedRoute;
