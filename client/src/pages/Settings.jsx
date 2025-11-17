import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Bell, Shield, Palette, LogOut } from 'lucide-react';
import { authAPI } from '../services/api';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { toggleTheme } from '../features/themeSlice';

const Settings = () => {
    const { user } = useSelector((state) => state.auth);
    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');

    const handleLogout = async () => {
        try {
            await authAPI.logout();
            dispatch(logout());
            toast.success('Logged out successfully');
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Failed to logout');
        }
    };

    const tabs = [
        { id: 'profile', name: 'Profile', icon: User },
        { id: 'notifications', name: 'Notifications', icon: Bell },
        { id: 'appearance', name: 'Appearance', icon: Palette },
        { id: 'security', name: 'Security', icon: Shield },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                    Settings
                </h1>
                <p className="text-gray-500 dark:text-zinc-400 text-sm">
                    Manage your account settings and preferences
                </p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-zinc-800">
                <nav className="flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-300'
                            }`}
                        >
                            <tab.icon className="size-4" />
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-6">
                {activeTab === 'profile' && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Profile Information
                        </h2>

                        <div className="flex items-center gap-4">
                            <img
                                src={user?.image}
                                alt={user?.name}
                                className="size-20 rounded-full bg-gray-200 dark:bg-zinc-800"
                            />
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    {user?.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-zinc-400">
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={user?.name || ''}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white"
                                />
                                <p className="mt-1 text-xs text-gray-500 dark:text-zinc-400">
                                    Managed by Google Account
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'notifications' && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Notification Preferences
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        Email Notifications
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                                        Receive email updates about your projects
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="size-4 text-blue-600 rounded"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        Task Assignments
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                                        Get notified when you're assigned to a task
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="size-4 text-blue-600 rounded"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        Project Updates
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                                        Receive updates about project changes
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="size-4 text-blue-600 rounded"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'appearance' && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Appearance Settings
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-3">
                                    Theme
                                </label>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => theme === 'dark' && dispatch(toggleTheme())}
                                        className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                                            theme === 'light'
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                                                : 'border-gray-300 dark:border-zinc-700'
                                        }`}
                                    >
                                        <div className="text-center">
                                            <div className="size-12 mx-auto mb-2 bg-white border border-gray-300 rounded"></div>
                                            <p className="font-medium text-gray-900 dark:text-white">Light</p>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => theme === 'light' && dispatch(toggleTheme())}
                                        className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                                            theme === 'dark'
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                                                : 'border-gray-300 dark:border-zinc-700'
                                        }`}
                                    >
                                        <div className="text-center">
                                            <div className="size-12 mx-auto mb-2 bg-zinc-900 border border-zinc-700 rounded"></div>
                                            <p className="font-medium text-gray-900 dark:text-white">Dark</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Security Settings
                        </h2>

                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg">
                                <p className="text-sm text-blue-800 dark:text-blue-300">
                                    Your account is secured with Google Sign-In. Security settings are managed through your Google Account.
                                </p>
                            </div>

                            <div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    <LogOut className="size-4" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;
