import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadTheme } from '../features/themeSlice'
import { setWorkspaces, setCurrentWorkspace, addTask, updateTask, deleteTask } from '../features/workspaceSlice'
import { workspaceAPI } from '../services/api'
import { Loader2Icon } from 'lucide-react'
import toast from 'react-hot-toast'
import socketService from '../services/socket'

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const { loading, currentWorkspace } = useSelector((state) => state.workspace)
    const dispatch = useDispatch()

    // Initial load of theme and workspaces
    useEffect(() => {
        dispatch(loadTheme())
        loadWorkspaces()
        
        // Connect to Socket.IO
        socketService.connect()

        // Cleanup on unmount
        return () => {
            socketService.disconnect()
        }
    }, [])

    // Join workspace room when workspace changes
    useEffect(() => {
        if (currentWorkspace?._id) {
            socketService.joinWorkspace(currentWorkspace._id)
        }
    }, [currentWorkspace?._id])

    // Socket.IO event listeners
    useEffect(() => {
        const handleTaskCreated = (task) => {
            console.log('Task created via Socket.IO:', task)
            dispatch(addTask(task))
            toast.success('New task added')
        }

        const handleTaskUpdated = (task) => {
            console.log('Task updated via Socket.IO:', task)
            dispatch(updateTask(task))
        }

        const handleTaskDeleted = ({ taskIds }) => {
            console.log('Tasks deleted via Socket.IO:', taskIds)
            dispatch(deleteTask(taskIds))
        }

        socketService.onTaskCreated(handleTaskCreated)
        socketService.onTaskUpdated(handleTaskUpdated)
        socketService.onTaskDeleted(handleTaskDeleted)

        return () => {
            socketService.offTaskCreated(handleTaskCreated)
            socketService.offTaskUpdated(handleTaskUpdated)
            socketService.offTaskDeleted(handleTaskDeleted)
        }
    }, [dispatch])

    const loadWorkspaces = async () => {
        try {
            const response = await workspaceAPI.getAll()
            const workspaces = response.data.workspaces
            dispatch(setWorkspaces(workspaces))
            
            // Set current workspace from localStorage or first workspace
            const savedWorkspaceId = localStorage.getItem('currentWorkspaceId')
            const currentWs = workspaces.find(w => w._id === savedWorkspaceId) || workspaces[0]
            if (currentWs) {
                dispatch(setCurrentWorkspace(currentWs._id))
            }
        } catch (error) {
            console.error('Failed to load workspaces:', error)
            toast.error('Failed to load workspaces')
        }
    }

    if (loading) return (
        <div className='flex items-center justify-center h-screen bg-white dark:bg-zinc-950'>
            <Loader2Icon className="size-7 text-blue-500 animate-spin" />
        </div>
    )

    return (
        <div className="flex bg-white dark:bg-zinc-950 text-gray-900 dark:text-slate-100">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex-1 flex flex-col h-screen">
                <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                <div className="flex-1 h-full p-6 xl:p-10 xl:px-16 overflow-y-scroll">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Layout
