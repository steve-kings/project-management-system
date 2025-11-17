import { MessageCircle, Globe } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 py-4 px-6 mt-auto">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-600 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                    <span>© 2025 Developed by</span>
                    <a 
                        href="https://kingscreation.co.ke" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                        <Globe className="size-3.5" />
                        kingscreation.co.ke
                    </a>
                </div>
                
                <a 
                    href="https://wa.me/254788419041" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-green-600 dark:text-green-400 hover:underline"
                >
                    <MessageCircle className="size-4" />
                    <span>WhatsApp: +254 788 419 041</span>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
