import { TrendingUp, CheckCircle, Clock, AlertCircle, Users, Calendar } from 'lucide-react';

const ProjectAnalytics = ({ tasks, project }) => {
    // Calculate metrics
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'DONE').length;
    const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS').length;
    const todoTasks = tasks.filter(t => t.status === 'TODO').length;
    
    const completionRate = totalTasks > 0 
        ? Math.round((completedTasks / totalTasks) * 100) 
        : 0;

    const overdueTasks = tasks.filter(t => {
        if (!t.due_date || t.status === 'DONE') return false;
        return new Date(t.due_date) < new Date();
    }).length;

    // Priority breakdown
    const highPriority = tasks.filter(t => t.priority === 'HIGH').length;
    const mediumPriority = tasks.filter(t => t.priority === 'MEDIUM').length;
    const lowPriority = tasks.filter(t => t.priority === 'LOW').length;

    // Type breakdown
    const tasksByType = {
        TASK: tasks.filter(t => t.type === 'TASK').length,
        BUG: tasks.filter(t => t.type === 'BUG').length,
        FEATURE: tasks.filter(t => t.type === 'FEATURE').length,
        IMPROVEMENT: tasks.filter(t => t.type === 'IMPROVEMENT').length,
        OTHER: tasks.filter(t => t.type === 'OTHER').length,
    };

    const metrics = [
        {
            label: 'Completion Rate',
            value: `${completionRate}%`,
            icon: TrendingUp,
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-100 dark:bg-blue-500/10',
        },
        {
            label: 'Completed',
            value: completedTasks,
            icon: CheckCircle,
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-100 dark:bg-green-500/10',
        },
        {
            label: 'In Progress',
            value: inProgressTasks,
            icon: Clock,
            color: 'text-amber-600 dark:text-amber-400',
            bgColor: 'bg-amber-100 dark:bg-amber-500/10',
        },
        {
            label: 'Overdue',
            value: overdueTasks,
            icon: AlertCircle,
            color: 'text-red-600 dark:text-red-400',
            bgColor: 'bg-red-100 dark:bg-red-500/10',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, index) => (
                    <div key={index} className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-zinc-400">{metric.label}</p>
                                <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                            </div>
                            <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                                <metric.icon className={`size-6 ${metric.color}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Status Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Task Status
                    </h3>
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 dark:text-zinc-400">To Do</span>
                                <span className="text-gray-900 dark:text-white font-medium">{todoTasks}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-zinc-800 h-2 rounded">
                                <div 
                                    className="h-2 rounded bg-gray-500" 
                                    style={{ width: `${totalTasks > 0 ? (todoTasks / totalTasks) * 100 : 0}%` }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 dark:text-zinc-400">In Progress</span>
                                <span className="text-gray-900 dark:text-white font-medium">{inProgressTasks}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-zinc-800 h-2 rounded">
                                <div 
                                    className="h-2 rounded bg-amber-500" 
                                    style={{ width: `${totalTasks > 0 ? (inProgressTasks / totalTasks) * 100 : 0}%` }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 dark:text-zinc-400">Completed</span>
                                <span className="text-gray-900 dark:text-white font-medium">{completedTasks}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-zinc-800 h-2 rounded">
                                <div 
                                    className="h-2 rounded bg-green-500" 
                                    style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Priority Breakdown */}
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Priority Distribution
                    </h3>
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 dark:text-zinc-400">High Priority</span>
                                <span className="text-gray-900 dark:text-white font-medium">{highPriority}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-zinc-800 h-2 rounded">
                                <div 
                                    className="h-2 rounded bg-red-500" 
                                    style={{ width: `${totalTasks > 0 ? (highPriority / totalTasks) * 100 : 0}%` }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 dark:text-zinc-400">Medium Priority</span>
                                <span className="text-gray-900 dark:text-white font-medium">{mediumPriority}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-zinc-800 h-2 rounded">
                                <div 
                                    className="h-2 rounded bg-amber-500" 
                                    style={{ width: `${totalTasks > 0 ? (mediumPriority / totalTasks) * 100 : 0}%` }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 dark:text-zinc-400">Low Priority</span>
                                <span className="text-gray-900 dark:text-white font-medium">{lowPriority}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-zinc-800 h-2 rounded">
                                <div 
                                    className="h-2 rounded bg-green-500" 
                                    style={{ width: `${totalTasks > 0 ? (lowPriority / totalTasks) * 100 : 0}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Task Types */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Task Types
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(tasksByType).map(([type, count]) => (
                        <div key={type} className="text-center p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{count}</p>
                            <p className="text-sm text-gray-600 dark:text-zinc-400 capitalize">{type.toLowerCase()}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Info */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Project Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-500/10 rounded">
                            <Users className="size-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-zinc-400">Team Members</p>
                            <p className="text-base font-medium text-gray-900 dark:text-white">
                                {project.members?.length || 0}
                            </p>
                        </div>
                    </div>
                    {project.start_date && (
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 dark:bg-green-500/10 rounded">
                                <Calendar className="size-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-zinc-400">Start Date</p>
                                <p className="text-base font-medium text-gray-900 dark:text-white">
                                    {new Date(project.start_date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    )}
                    {project.end_date && (
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-100 dark:bg-red-500/10 rounded">
                                <Calendar className="size-5 text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-zinc-400">End Date</p>
                                <p className="text-base font-medium text-gray-900 dark:text-white">
                                    {new Date(project.end_date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectAnalytics;
