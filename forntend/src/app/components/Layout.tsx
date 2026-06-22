import { Outlet, Link, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EnquiryPopup, WhatsAppFloatingButton, CallFloatingButton } from './LeadCaptureComponents';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [scrollTriggered, setScrollTriggered] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Blur any focused element (like a footer link) to prevent the browser 
    // from auto-scrolling back down to keep it in view after the route changes.
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // Force instant scroll to top after React renders the new page
    document.documentElement.style.scrollBehavior = 'auto';

    // Defer the actual scroll so the browser has time to paint the new DOM
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      const root = document.getElementById('root');
      if (root) root.scrollTop = 0;

      // Re-enable global scroll behavior after scroll completes
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = '';
      }, 50);
    });
  }, [location.pathname]);

  useEffect(() => {
    const openHandler = () => setEnquiryOpen(true);
    const scrollHandler = () => {
      if (!scrollTriggered && window.scrollY > 700 && !location.pathname.startsWith('/contact')) {
        setScrollTriggered(true);
        setEnquiryOpen(true);
      }
    };
    window.addEventListener('truvex:open-enquiry', openHandler);
    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => {
      window.removeEventListener('truvex:open-enquiry', openHandler);
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [location.pathname, scrollTriggered]);

  return (
    <div className="min-h-screen overflow-x-clip bg-background font-sans text-foreground">
      <Header onOpenEnquiry={() => setEnquiryOpen(true)} />

      <main className="min-h-screen pb-16 md:pb-0" >
        <Outlet />
      </main>

      <Footer onOpenEnquiry={() => setEnquiryOpen(true)} />

      <div className="hidden fixed bottom-0 left-0 right-0 z-50 grid w-screen max-w-full grid-cols-2 border-t border-border bg-white p-2 shadow-2xl md:hidden">
        <Link to="/buyers" className="market-button min-h-12 bg-accent py-3 text-center text-sm font-bold text-white">
          Post Requirement
        </Link>
        <Link to="/supplier-listing" className="market-button min-h-12 bg-primary py-3 text-center text-sm font-bold text-white">
          Find Supplier
        </Link>
      </div>
      <WhatsAppFloatingButton />
      <CallFloatingButton />
      <EnquiryPopup open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </div>
  );
}

