import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Ruler, 
  Layers, 
  Sparkles, 
  RefreshCw, 
  ShoppingBag, 
  ShieldCheck, 
  Leaf, 
  TrendingUp, 
  ChevronRight 
} from "lucide-react";
import { CATEGORIES } from "../data/categories";
import { INITIAL_PRODUCTS } from "../data/products";
import { ProductCard } from "../components/common/ProductCard";

export const HomePage = () => {
  const featuredProducts = INITIAL_PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-24 pb-16">
      
      {/* =========================================================
          A. HERO SECTION
         ========================================================= */}
      <section className="relative min-h-[85vh] flex items-center bg-[#EFECE4] overflow-hidden">
        {/* Background Editorial Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
            alt="Editorial Sustainable Fashion"
            className="w-full h-full object-cover object-[center_30%] opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold uppercase tracking-widest text-primary">
              <Sparkles className="w-3.5 h-3.5 text-accent-dark" />
              Circular Fashion Reimagined
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-dark leading-[1.08]">
              Your Style.<br />
              <span className="italic font-normal text-primary">Your Cycle.</span>
            </h1>

            <p className="text-base sm:text-lg text-dark/80 font-normal leading-relaxed max-w-xl">
              Discover fashion, exchange what you don't need and create new styles from what you already own. A curated circular wardrobe marketplace powered by FitMatch intelligence.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/marketplace"
                className="luxury-btn luxury-btn-primary px-7 py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center gap-2 group"
              >
                Explore Marketplace
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/sell"
                className="luxury-btn luxury-btn-outline px-7 py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest bg-white/60 backdrop-blur-xs"
              >
                Sell Your Clothes
              </Link>
              <Link
                to="/stylist"
                className="luxury-btn luxury-btn-accent px-6 py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Discover Your Style
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-dark/15 max-w-lg">
              <div>
                <span className="block text-2xl font-serif font-bold text-primary">14K+</span>
                <span className="text-[11px] uppercase tracking-wider text-dark-muted font-medium">Garments Cycled</span>
              </div>
              <div>
                <span className="block text-2xl font-serif font-bold text-primary">98.4%</span>
                <span className="text-[11px] uppercase tracking-wider text-dark-muted font-medium">FitMatch Accuracy</span>
              </div>
              <div>
                <span className="block text-2xl font-serif font-bold text-primary">18.4 T</span>
                <span className="text-[11px] uppercase tracking-wider text-dark-muted font-medium">Carbon Saved</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          B. SHOPPING CATEGORIES
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 pb-4 border-b border-border">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Curated Collections</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark mt-1">Shop by Category</h2>
          </div>
          <Link
            to="/marketplace"
            className="text-xs uppercase tracking-wider font-bold text-primary hover:text-primary-dark flex items-center gap-1 transition-colors mt-2 sm:mt-0"
          >
            View All Categories <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/marketplace?category=${cat.id}`}
              className="group relative aspect-[4/5] rounded-sm overflow-hidden bg-white border border-border shadow-subtle hover:shadow-card transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase font-semibold tracking-widest text-accent mb-0.5">
                  {cat.itemCount}+ Available
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-medium tracking-tight">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================
          C. FEATURED PRODUCTS
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 pb-4 border-b border-border">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Handpicked Drops</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark mt-1">Featured Circular Pieces</h2>
          </div>
          <Link
            to="/marketplace"
            className="text-xs uppercase tracking-wider font-bold text-primary hover:text-primary-dark flex items-center gap-1 transition-colors mt-2 sm:mt-0"
          >
            Explore 3,800+ Products <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* =========================================================
          D. BUY, SELL AND EXCHANGE - 3 PROMOTIONAL CARDS
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">The STYLECYCLE Mechanism</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark mt-1">Buy, Sell & Exchange</h2>
          <p className="text-sm text-dark-muted mt-2">
            Three seamless modes designed to keep quality clothing in perpetual rotation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: BUY */}
          <div className="bg-white border border-border p-8 rounded-sm shadow-subtle hover:shadow-card transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary-soft text-primary flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-dark">1. Buy Curated Fashion</h3>
              <p className="text-xs leading-relaxed text-dark-muted">
                Acquire authentic designer and vintage staples at up to 70% below original retail prices. Every listing undergoes condition scoring and authenticity validation.
              </p>
              <ul className="text-xs space-y-1.5 text-dark-muted pt-2 border-t border-border">
                <li>&bull; Transparent 4-tier condition grading</li>
                <li>&bull; Safe UPI & Card checkout escrow</li>
                <li>&bull; Direct FitMatch sizing verification</li>
              </ul>
            </div>
            <Link
              to="/marketplace"
              className="text-xs uppercase tracking-wider font-bold text-primary hover:text-primary-dark flex items-center gap-1.5"
            >
              Shop Curated <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: SELL */}
          <div className="bg-white border border-border p-8 rounded-sm shadow-subtle hover:shadow-card transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent/30 text-dark flex items-center justify-center">
                <TrendingUp className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-dark">2. Sell with Ease</h3>
              <p className="text-xs leading-relaxed text-dark-muted">
                Monetize your unworn wardrobe in minutes. Upload multiple angles, set your fair price, and reach an active community of conscious buyers eager for your style.
              </p>
              <ul className="text-xs space-y-1.5 text-dark-muted pt-2 border-t border-border">
                <li>&bull; Fast drag-and-drop listing studio</li>
                <li>&bull; Automated price suggestions</li>
                <li>&bull; Integrated shipping labels & doorstep pickup</li>
              </ul>
            </div>
            <Link
              to="/sell"
              className="text-xs uppercase tracking-wider font-bold text-primary hover:text-primary-dark flex items-center gap-1.5"
            >
              List an Item <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 3: EXCHANGE */}
          <div className="bg-white border border-border p-8 rounded-sm shadow-subtle hover:shadow-card transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-dark">3. Direct Clothing Swap</h3>
              <p className="text-xs leading-relaxed text-dark-muted">
                Trade clothes directly with other community members without spending cash. Pick an item from your digital wardrobe, propose the swap, and complete the exchange.
              </p>
              <ul className="text-xs space-y-1.5 text-dark-muted pt-2 border-t border-border">
                <li>&bull; Zero cash outlay required</li>
                <li>&bull; Optional cash difference adjusters</li>
                <li>&bull; Peer-to-peer messaging and approvals</li>
              </ul>
            </div>
            <Link
              to="/exchange"
              className="text-xs uppercase tracking-wider font-bold text-primary hover:text-primary-dark flex items-center gap-1.5"
            >
              Browse Exchanges <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          E. FITMATCH SECTION
         ========================================================= */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold uppercase tracking-widest text-accent">
                <Ruler className="w-3.5 h-3.5" />
                Zero Guesswork Sizing
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
                Find Your Perfect Fit.
              </h2>

              <p className="text-sm leading-relaxed text-secondary/80">
                Returns due to poor sizing generate massive carbon emissions. STYLECYCLE's proprietary FitMatch engine compares your exact anatomical measurements with brand-specific dimensional grading curves to recommend your true size.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-primary-dark/60 rounded border border-white/10">
                  <span className="block text-accent font-serif text-xl font-bold">Brand Specific</span>
                  <span className="text-xs text-secondary/70">Custom curves for Zara, Levi's, H&M, Massimo Dutti & COS.</span>
                </div>
                <div className="p-4 bg-primary-dark/60 rounded border border-white/10">
                  <span className="block text-accent font-serif text-xl font-bold">Silhouette Ease</span>
                  <span className="text-xs text-secondary/70">Tailors for your preferred Slim, Regular, Relaxed or Oversized cut.</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/fitmatch"
                  className="luxury-btn bg-accent text-dark hover:bg-accent-light px-7 py-3 rounded-sm text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
                >
                  Configure FitMatch Profile <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Visual Interactive Graphic */}
            <div className="relative">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-md border border-white/20 shadow-floating text-white space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/20">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-accent tracking-wider">Sample Fit Match</span>
                    <h4 className="font-serif text-lg font-bold">Massimo Dutti Oversized Blazer</h4>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 rounded text-xs font-bold">
                    98% Fit Score
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-secondary/70">Chest Measurement:</span>
                    <span className="font-semibold text-white">92 cm (Optimal in Size M)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-secondary/70">Shoulder Span:</span>
                    <span className="font-semibold text-white">43 cm (Tailored Ease)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-secondary/70">Fit Recommendation:</span>
                    <span className="font-bold text-accent">Size Medium Recommended</span>
                  </div>
                </div>

                <p className="text-[11px] text-secondary/70 italic pt-1">
                  "Based on your chest (92cm) and preferred Regular silhouette, Size M gives exact natural drape without pulling across the back."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          F. DIGITAL WARDROBE
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual Showcase */}
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-sm overflow-hidden border border-border shadow-subtle">
                <img
                  src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80"
                  alt="Wardrobe Piece 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/3] rounded-sm overflow-hidden border border-border shadow-subtle">
                <img
                  src="https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80"
                  alt="Wardrobe Piece 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-[4/3] rounded-sm overflow-hidden border border-border shadow-subtle">
                <img
                  src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80"
                  alt="Wardrobe Piece 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] rounded-sm overflow-hidden border border-border shadow-subtle">
                <img
                  src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80"
                  alt="Wardrobe Piece 4"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text & Pitch */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-soft rounded-full text-xs font-semibold uppercase tracking-widest text-primary">
              <Layers className="w-3.5 h-3.5" />
              Closet Organization
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-dark">
              Your Entire Wardrobe, One Place.
            </h2>

            <p className="text-sm leading-relaxed text-dark-muted">
              Most people only wear 20% of the clothing they own. The STYLECYCLE Digital Wardrobe helps you digitize, categorize, and track every garment in your closet. Understand wear counts, color distribution, and seasonality to make intentional fashion choices.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded bg-primary-soft text-primary mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-dark">Intelligent Tagging & Storage</h4>
                  <p className="text-xs text-dark-muted">Catalog category, color, season, aesthetic, and wear frequency.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded bg-primary-soft text-primary mt-0.5">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-dark">One-Click Exchange Readiness</h4>
                  <p className="text-xs text-dark-muted">Items in your wardrobe can be directly proposed for circular trades anytime.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/wardrobe"
                className="luxury-btn luxury-btn-primary px-7 py-3 rounded-sm text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
              >
                Open My Digital Wardrobe <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          G. AI STYLIST
         ========================================================= */}
      <section className="bg-[#EFECE4] py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-xs font-semibold uppercase tracking-widest text-primary border border-border">
                <Sparkles className="w-3.5 h-3.5 text-accent-dark" />
                Outfit Intelligence
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-dark">
                Style More.<br />
                <span className="text-primary italic font-normal">Buy Smarter.</span>
              </h2>

              <p className="text-sm leading-relaxed text-dark-muted">
                Overcome "I have nothing to wear" syndrome. Our AI Stylist analyzes the items already in your wardrobe and generates cohesive outfit combinations tailored to your specific occasion, style vibe, and current weather.
              </p>

              <div className="flex flex-wrap gap-2 text-xs">
                {["Office Executive", "Weekend Brunch", "Campus Streetwear", "Art Gallery Walk", "Formal Dinner"].map((t) => (
                  <span key={t} className="px-3 py-1 bg-white rounded-sm border border-border text-dark font-medium">
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/stylist"
                  className="luxury-btn luxury-btn-primary px-7 py-3 rounded-sm text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
                >
                  Generate Outfits Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Stylist Visual Composition Card */}
            <div className="bg-white p-6 rounded-sm border border-border shadow-card space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Office Smart Casual Ensemble</span>
                <span className="text-xs text-dark-muted">Saved Combination</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="aspect-square rounded overflow-hidden bg-secondary">
                  <img src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80" alt="Top" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded overflow-hidden bg-secondary">
                  <img src="https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=300&q=80" alt="Bottom" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded overflow-hidden bg-secondary">
                  <img src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=300&q=80" alt="Shoes" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded overflow-hidden bg-secondary">
                  <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80" alt="Accessory" className="w-full h-full object-cover" />
                </div>
              </div>

              <p className="text-xs text-dark-muted italic bg-secondary p-3 rounded">
                "Combines the structured collar of your Oxford shirt with relaxed pleated chinos and clean minimal sneakers for understated authority."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          H. SUSTAINABLE FASHION IMPACT
         ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-soft/60 rounded-md border border-primary/20 p-8 sm:p-12">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-xs font-semibold uppercase tracking-widest text-primary border border-primary/20">
              <Leaf className="w-3.5 h-3.5 text-emerald-700" />
              Circular Fashion Philosophy
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark">
              Ending Fast Fashion Waste Through Active Wardrobe Cycles.
            </h2>

            <p className="text-xs sm:text-sm text-dark/80 leading-relaxed">
              The fashion industry generates over 92 million tons of textile waste annually. By extending the life of a single garment by just 9 months through reuse, resale, and circular exchange, its environmental carbon and water footprint is reduced by approximately 30%.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-white p-4 rounded border border-border">
                <span className="block text-primary font-bold text-lg">Zero Landfill</span>
                <span className="text-xs text-dark-muted">Keep authentic fabrics in active wardrobe rotation.</span>
              </div>
              <div className="bg-white p-4 rounded border border-border">
                <span className="block text-primary font-bold text-lg">2,700 Litres</span>
                <span className="text-xs text-dark-muted">Water saved for every pre-owned cotton shirt cycled.</span>
              </div>
              <div className="bg-white p-4 rounded border border-border">
                <span className="block text-primary font-bold text-lg">70% Cost Saving</span>
                <span className="text-xs text-dark-muted">Affordable luxury without compromising craft or quality.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
