// src/components/common/Footer.jsx
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <motion.footer
            className="bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 text-white text-sm py-6 mt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p>© {new Date().getFullYear()} GST Billing App. All rights reserved.</p>

                <div className="flex gap-4">
                    <a
                        href="https://github.com/gitsuraj061"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-yellow-300 transition duration-300"
                    >
                        GitHub
                    </a>
                    <a
                        href="mailto:koli82251@gmail.com"
                        className="hover:text-yellow-300 transition duration-300"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
