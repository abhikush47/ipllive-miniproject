'use client';

import Link from 'next/link';
import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Brand Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>IPL Predictor</h3>
            <p className={styles.description}>
              AI-powered win prediction for IPL matches using advanced machine learning and historical cricket data.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Twitter" className={styles.socialLink}>
                𝕏
              </a>
              <a href="#" aria-label="LinkedIn" className={styles.socialLink}>
                in
              </a>
              <a href="#" aria-label="GitHub" className={styles.socialLink}>
                ◆
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.section}>
            <h4 className={styles.sectionSubtitle}>Quick Links</h4>
            <ul className={styles.linksList}>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/predictor">Live Predictor</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className={styles.section}>
            <h4 className={styles.sectionSubtitle}>Resources</h4>
            <ul className={styles.linksList}>
              <li>
                <a href="#">Documentation</a>
              </li>
              <li>
                <a href="#">API Reference</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.section}>
            <h4 className={styles.sectionSubtitle}>Contact</h4>
            <p className={styles.contactInfo}>
              Email: contact@iplpredictor.com
            </p>
            <p className={styles.contactInfo}>
              Phone: +91 (555) 123-4567
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © 2024 IPL Predictor. Built by 6 Students. All rights reserved.
          </p>
          <p className={styles.powered}>
            Powered by Next.js & Flask
          </p>
        </div>
      </div>
    </footer>
  );
}
