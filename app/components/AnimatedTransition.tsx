"use client"

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

function AnimatedTransition( {children}:{ children: React.ReactNode } ){
    const pathName = usePathname() // retrieves the current pathname from the URL

    return (
        <AnimatePresence mode='wait' initial={true}>
            <motion.div
                key={pathName}
                initial={{ opacity: 0, scale: 0.98 }} // Contents appear
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeIn",  delay: 0.05}}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

export default AnimatedTransition