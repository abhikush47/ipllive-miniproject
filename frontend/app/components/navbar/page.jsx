'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          {/* Logo */}
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            <span className={styles.logoBall}>🏏</span>
            <span className={styles.logoText}>IPL Predictor</span>
          </Link>

          {/* Hamburger Menu */}
          <button
            className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation Links */}
          <ul className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
            <li>
              <Link href="/" className={styles.link} onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/predictor" className={styles.link} onClick={closeMenu}>
                Predictor
              </Link>
            </li>
            <li>
              <Link href="/about" className={styles.link} onClick={closeMenu}>
                About Us
              </Link>
            </li>
          </ul>

          {/* CTA Button */}
          <Link
            href="/predictor"
            className={styles.ctaButton}
            onClick={closeMenu}
          >
            Try Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
