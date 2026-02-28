import Navbar from './components/navbar/page';
import Footer from './components/footer/page';
import './globals.css';

export const metadata = {
  title: 'IPL Live Match Win Predictor',
  description: 'AI-powered win prediction for IPL matches',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 140px)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}