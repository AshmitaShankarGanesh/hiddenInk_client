import React from "react";

const Footer = () => {
    return (
        <footer className="bg-blue-300 text-black py-4 w-full fixed bottom-0 left-0 dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <div className="max-w mx-auto px-4 text-center">
                <p className="text-sm">&copy; 2025 HiddenInk. All rights reserved.</p>
                <div className="mt-2 space-x-4 flex justify-center align-center">
                    <p className="hover:underline cursor-pointer dark:hover:text-blue-400 transition-colors">Privacy Policy</p>
                    <p className="hover:underline cursor-pointer dark:hover:text-blue-400 transition-colors">Terms of Service</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer