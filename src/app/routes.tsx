import { createBrowserRouter } from 'react-router';
import Layout from './components/Layout';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import HowItWorksPage from './components/pages/HowItWorksPage';
import ServicesPage from './components/pages/ServicesPage';
import CategoriesPage from './components/pages/CategoriesPage';
import ForBuyersPage from './components/pages/ForBuyersPage';
import ForSuppliersPage from './components/pages/ForSuppliersPage';
import WhyTruvexPage from './components/pages/WhyTruvexPage';
import RoadmapPage from './components/pages/RoadmapPage';
import ContactPage from './components/pages/ContactPage';
import TestimonialsPage from './components/pages/TestimonialsPage';
import FAQPage from './components/pages/FAQPage';
import PricingPage from './components/pages/PricingPage';
import BlogPage from './components/pages/BlogPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'about', Component: AboutPage },
      { path: 'how-it-works', Component: HowItWorksPage },
      { path: 'services', Component: ServicesPage },
      { path: 'categories', Component: CategoriesPage },
      { path: 'for-buyers', Component: ForBuyersPage },
      { path: 'for-suppliers', Component: ForSuppliersPage },
      { path: 'why-truvex', Component: WhyTruvexPage },
      { path: 'roadmap', Component: RoadmapPage },
      { path: 'contact', Component: ContactPage },
      { path: 'testimonials', Component: TestimonialsPage },
      { path: 'faq', Component: FAQPage },
      { path: 'pricing', Component: PricingPage },
      { path: 'blog', Component: BlogPage },
    ],
  },
]);
