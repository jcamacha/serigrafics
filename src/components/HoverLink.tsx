'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const MotionLink = motion.create ? motion.create(Link) : motion(Link);

interface HoverLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

export default function HoverLink({ href, children, className = '', onClick, active = false }: HoverLinkProps) {
  return (
    <MotionLink
      href={href}
      className={`relative inline-block ${className}`}
      onClick={onClick}
      initial="initial"
      whileHover="hover"
      animate="initial"
    >
      {children}
      {!active && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent origin-left"
          variants={{
            initial: { scaleX: 0 },
            hover: { scaleX: 1 },
          }}
          transition={{ duration: 0.3 }}
        />
      )}
    </MotionLink>
  );
}
