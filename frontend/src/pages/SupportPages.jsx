import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Info, 
  Mail, 
  HelpCircle, 
  Truck, 
  RotateCcw, 
  ArrowLeftRight, 
  ShieldCheck, 
  FileText, 
  Send,
  CheckCircle2
} from "lucide-react";

export const SupportPages = () => {
  const { section = "about" } = useParams();
  const [activeSection, setActiveSection] = useState(section);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "", subject: "General Inquiry" });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const navLinks = [
    { id: "about", label: "About Us", icon: Info },
    { id: "contact", label: "Contact Us", icon: Mail },
    { id: "faqs", label: "FAQs", icon: HelpCircle },
    { id: "help", label: "Help Centre", icon: HelpCircle },
    { id: "shipping", label: "Shipping & Delivery", icon: Truck },
    { id: "returns", label: "Returns & Refunds", icon: RotateCcw },
    { id: "exchange-policy", label: "Exchange Policy", icon: ArrowLeftRight },
    { id: "privacy", label: "Privacy Policy", icon: ShieldCheck },
    { id: "terms", label: "Terms & Conditions", icon: FileText }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Banner */}
      <div className="pb-4 border-b border-border">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Customer Guidance & Care</span>
        <h1 className="font-serif text-3xl font-bold text-dark mt-1">STYLECYCLE Information Hub</h1>
        <p className="text-xs text-dark-muted mt-1">Learn about our circular mission, logistics, fit assurance, and exchange standards.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        
        {/* Navigation Sidebar */}
        <aside className="bg-white border border-border p-4 rounded-sm shadow-subtle space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveSection(link.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-sm transition-colors text-left ${
                  isActive ? "bg-primary text-white" : "text-dark hover:bg-secondary"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {link.label}
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <div className="md:col-span-3 bg-white border border-border p-8 rounded-sm shadow-subtle min-h-[480px]">
          
          {/* ABOUT US */}
          {activeSection === "about" && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-dark">About STYLECYCLE</h2>
              <div className="text-xs sm:text-sm text-dark/80 leading-relaxed space-y-4">
                <p>
                  STYLECYCLE is a smart circular fashion e-commerce marketplace dedicated to extending the active lifecycle of clothing. We believe that true luxury lies in conscious preservation, architectural craftsmanship, and thoughtful personal expression.
                </p>
                <p>
                  By uniting authenticated resale with direct clothing exchange, digital wardrobe organization, AI personal styling, and proprietary FitMatch size accuracy, STYLECYCLE eliminates the friction, uncertainty, and environmental toll of conventional fast fashion.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-secondary rounded border border-border">
                    <h4 className="font-bold text-dark mb-1">Our Mission</h4>
                    <p className="text-xs text-dark-muted">Make fashion affordable, reduce textile waste, and empower every individual to maximize their wardrobe's creative utility.</p>
                  </div>
                  <div className="p-4 bg-secondary rounded border border-border">
                    <h4 className="font-bold text-dark mb-1">Our Vision</h4>
                    <p className="text-xs text-dark-muted">A world where zero garments end up in landfills, and clothing circulates continuously between appreciative closets.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CONTACT US */}
          {activeSection === "contact" && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-dark">Contact Our Concierge</h2>
              <p className="text-xs text-dark-muted">We're here to assist with garment verification, sizing inquiries, and order support.</p>

              {contactSubmitted ? (
                <div className="py-8 text-center space-y-3 bg-emerald-50 rounded border border-emerald-200 p-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-emerald-900">Inquiry Delivered</h4>
                  <p className="text-xs text-emerald-800">Our customer team will respond within 4 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs max-w-lg">
                  <div className="space-y-1">
                    <label className="font-semibold uppercase text-dark">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full p-2.5 bg-secondary border border-border rounded-sm"
                      placeholder="Tara Deshmukh"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold uppercase text-dark">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full p-2.5 bg-secondary border border-border rounded-sm"
                      placeholder="tara@example.com"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold uppercase text-dark">Subject</label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full p-2.5 bg-secondary border border-border rounded-sm"
                    >
                      <option>General Inquiry</option>
                      <option>Order & Tracking</option>
                      <option>Exchange Mediation</option>
                      <option>FitMatch Consultation</option>
                      <option>Seller Payout Support</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold uppercase text-dark">Message *</label>
                    <textarea
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full p-2.5 bg-secondary border border-border rounded-sm"
                      placeholder="How can our circular team assist you today?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="luxury-btn luxury-btn-primary px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" /> Send Message
                  </button>
                </form>
              )}
            </div>
          )}

          {/* FAQS */}
          {activeSection === "faqs" && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-dark">Frequently Asked Questions</h2>
              <div className="space-y-4 text-xs divide-y divide-border">
                {[
                  {
                    q: "How does the direct clothing exchange work?",
                    a: "When you browse the Exchange Marketplace, you can click 'Swap Clothes' on any exchange-enabled listing. Choose a garment from your own Digital Wardrobe, propose an optional cash difference if values differ, and submit the trade. If the other member accepts, both parties receive shipping labels."
                  },
                  {
                    q: "What is FitMatch and how does it guarantee my size?",
                    a: "FitMatch compares your anatomical dimensions (chest, waist, hips, etc.) with brand-specific sizing curves (Zara, Levi's, Massimo Dutti, etc.) and accounts for your preferred silhouette (Slim, Regular, Relaxed, or Oversized) to predict the best fit."
                  },
                  {
                    q: "How are garment conditions verified?",
                    a: "All listings adhere to a strict 4-tier grading standard: Brand New (tags intact), Like New (mint, worn 1-2 times), Good (well-maintained, minor natural wear), and Fair (visible vintage character). Listings must pass image and description moderation."
                  },
                  {
                    q: "Can I use the AI Stylist with pieces from outside the marketplace?",
                    a: "Yes! You can upload and digitize your own existing wardrobe items into My Wardrobe, and the AI Stylist will generate outfit matrices entirely from what you already own."
                  }
                ].map((faq, i) => (
                  <div key={i} className="pt-3 first:pt-0 space-y-1">
                    <h4 className="font-bold text-dark text-sm">{faq.q}</h4>
                    <p className="text-dark-muted leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HELP CENTRE */}
          {activeSection === "help" && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-dark">Help Centre & Guidance</h2>
              <p className="text-xs text-dark-muted leading-relaxed">
                Welcome to the STYLECYCLE resolution and support centre. Below you can find actionable guides on how to buy, sell, exchange, and resolve disputes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-secondary rounded border border-border space-y-2">
                  <h4 className="font-bold text-primary">Buyer Protection Escrow</h4>
                  <p className="text-dark-muted">Funds are held securely until you receive and verify the garment matches its listed condition.</p>
                </div>
                <div className="p-4 bg-secondary rounded border border-border space-y-2">
                  <h4 className="font-bold text-primary">Seller Doorstep Pickups</h4>
                  <p className="text-dark-muted">Once a piece is purchased, a pre-paid BlueDart courier pickup is scheduled directly at your door.</p>
                </div>
              </div>
            </div>
          )}

          {/* SHIPPING & DELIVERY */}
          {activeSection === "shipping" && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-dark">Shipping & Delivery Standards</h2>
              <div className="text-xs text-dark/80 space-y-3 leading-relaxed">
                <p>We partner with premier carbon-neutral logistics networks across India to deliver your garments safely and sustainably.</p>
                <ul className="space-y-2 pl-4 list-disc text-dark-muted">
                  <li><strong>Standard Delivery:</strong> 3-5 business days across metro cities (Mumbai, Delhi NCR, Bangalore, Pune, Hyderabad, Chennai, Kolkata).</li>
                  <li><strong>Regional Delivery:</strong> 5-7 business days for non-metro tier 2 & 3 pin codes.</li>
                  <li><strong>Shipping Fee:</strong> Flat ₹149 for orders under ₹2,999. Orders above ₹2,999 qualify for Free Standard Insured Shipping.</li>
                  <li><strong>Circular Packaging:</strong> All orders are dispatched in 100% biodegradable or recycled mailers.</li>
                </ul>
              </div>
            </div>
          )}

          {/* RETURNS & REFUNDS */}
          {activeSection === "returns" && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-dark">Returns & Refund Policy</h2>
              <div className="text-xs text-dark/80 space-y-3 leading-relaxed">
                <p>To promote conscious consumerism and avoid the unnecessary carbon footprint of frivolous returns, pre-owned circular items are protected by our Authenticity & Condition Guarantee:</p>
                <ul className="space-y-2 pl-4 list-disc text-dark-muted">
                  <li><strong>Condition Mismatch:</strong> If an item arrives with undeclared flaws or differs significantly from its listed condition tier, you are eligible for a 100% full refund upon initiating a claim within 48 hours of delivery.</li>
                  <li><strong>Sizing Protection:</strong> If you used FitMatch and the garment dimensional measurements were inaccurately listed by the seller, our team provides instant free relisting or return mediation.</li>
                </ul>
              </div>
            </div>
          )}

          {/* EXCHANGE POLICY */}
          {activeSection === "exchange-policy" && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-dark">Exchange Guidelines & Protocol</h2>
              <div className="text-xs text-dark/80 space-y-3 leading-relaxed">
                <p>Circular wardrobe exchanges are the beating heart of STYLECYCLE. To ensure trust and equity between members:</p>
                <ul className="space-y-2 pl-4 list-disc text-dark-muted">
                  <li>Both parties must provide accurate photographic condition documentation before an exchange is greenlit.</li>
                  <li>Couriers pick up both garments simultaneously to ensure synchronized transit.</li>
                  <li>Any agreed cash difference is safely escrowed until both members confirm receipt.</li>
                </ul>
              </div>
            </div>
          )}

          {/* PRIVACY POLICY */}
          {activeSection === "privacy" && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-dark">Privacy & Data Governance</h2>
              <div className="text-xs text-dark/80 space-y-3 leading-relaxed">
                <p>Your privacy and measurement data are guarded with strict encryption standards. We never sell or share anatomical metrics with third-party advertisers. Body measurements are used exclusively for FitMatch calculations.</p>
              </div>
            </div>
          )}

          {/* TERMS & CONDITIONS */}
          {activeSection === "terms" && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-dark">Terms & Conditions</h2>
              <div className="text-xs text-dark/80 space-y-3 leading-relaxed">
                <p>By accessing STYLECYCLE, users agree to trade authentic, legally owned apparel, respect condition grading guidelines, and uphold respectful peer-to-peer communication.</p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
