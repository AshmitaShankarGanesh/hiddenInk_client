import React from "react";

const Footer = () => {
    return (
        <footer className="bg-blue-300 text-black py-4 w-full fixed bottom-0 left-0">
            <div className="max-w mx-auto px-4 text-center">
                <p className="text-sm">&copy; 2025 HiddenInk. All rights reserved.</p>
                <div className="mt-2 space-x-4 flex justify-center align-center">
                    <p className="hover:underline">Privacy Policy</p>
                    <p className="hover:underline">Terms of Service</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer