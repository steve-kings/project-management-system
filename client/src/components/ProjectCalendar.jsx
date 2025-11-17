import { Calendar, Clock } from 'lucide-react';

const ProjectCalendar = ({ tasks }) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Get tasks with due dates
    const tasksWithDates = tasks.filter(t => t.dueDate);

    // Group tasks by date
    const tasksByDate = tasksWithDates.reduce((acc, task) => {
        const date = new Date(task.dueDate).toDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(task);
        return acc;
    }, {});

    // Get days in month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    const statusColors = {
        TODO: 'bg-gray-500',
        IN_PROGRESS: 'bg-amber-500',
        REVIEW: 'bg-blue-500',
        DONE: 'bg-green-500',
    };

    return (
        <div className="space-y-6">
            {/* Calendar Header */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Calendar className="size-5" />
                        {monthNames[currentMonth]} {currentYear}
                    </h2>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-sm font-medium text-gray-600 dark:text-zinc-400 py-2">
                            {day}
                        </div>
                    ))}
                    
                    {days.map((day, index) => {
                        if (!day) {
                            return <div key={`empty-${index}`} className="aspect-square" />;
                        }

                        const date = new Date(currentYear, currentMonth, day);
                        const dateString = date.toDateString();
                        const dayTasks = tasksByDate[dateString] || [];
                        const isToday = date.toDateString() === today.toDateString();

                        return (
                            <div
                                key={day}
                                className={`aspect-square border border-gray-200 dark:border-zinc-800 rounded-lg p-2 ${
                                    isToday ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-500' : 'bg-white dark:bg-zinc-900'
                                }`}
                            >
                                <div className={`text-sm font-medium ${
                                    isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                                }`}>
                                    {day}
                                </div>
                                <div className="mt-1 space-y-1">
                                    {dayTasks.slice(0, 2).map((task, i) => (
                                        <div
                                            key={i}
                                            className={`text-xs px-1 py-0.5 rounded truncate ${statusColors[task.status]} text-white`}
                                            title={task.title}
                                        >
                                            {task.title}
                                        </div>
                                    ))}
                                    {dayTasks.length > 2 && (
                                        <div className="text-xs text-gray-500 dark:text-zinc-400">
                                            +{dayTasks.length - 2} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Clock className="size-5" />
                    Upcoming Tasks
                </h3>
                <div className="space-y-3">
                    {tasksWithDates
                        .filter(t => new Date(t.dueDate) >= today && t.status !== 'DONE')
                        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                        .slice(0, 5)
                        .map((task, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-zinc-800 rounded-lg">
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
                                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded ${statusColors[task.status]} text-white`}>
                                    {task.status.replace('_', ' ')}
                                </span>
                            </div>
                        ))}
                    {tasksWithDates.filter(t => new Date(t.dueDate) >= today && t.status !== 'DONE').length === 0 && (
                        <p className="text-center text-gray-500 dark:text-zinc-400 py-8">
                            No upcoming tasks
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCalendar;
