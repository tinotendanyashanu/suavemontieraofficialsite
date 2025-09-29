"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
  Star, 
  Crown, 
  Award, 
  Shield, 
  Heart,
  Scissors,
  Users,
  Calendar,
  Eye,
  Sparkles,
  Filter,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = [
    { id: "all", label: "All Work" },
    { id: "bespoke", label: "Bespoke Suits" },
    { id: "evening", label: "Evening Wear" },
    { id: "casual", label: "Casual Luxury" },
    { id: "wedding", label: "Wedding Attire" }
  ];

  const portfolioItems = [
    {
      id: 1,
      title: "Executive Three-Piece",
      category: "bespoke",
      client: "CEO of Fortune 500 Company",
      description: "A masterpiece in navy wool with subtle pinstripes, featuring hand-stitched lapels and custom mother-of-pearl buttons.",
      details: "Crafted from premium Ermenegildo Zegna fabric with hand-padded shoulders and full canvas construction.",
      fabric: "Super 150s Wool",
      time: "6 weeks",
      image: "/portfolio/suit-1.jpg",
      tags: ["Bespoke", "Three-piece", "Navy", "Pinstripe"]
    },
    {
      id: 2,
      title: "Wedding Tuxedo",
      category: "wedding",
      client: "Royal Wedding Guest",
      description: "Midnight black tuxedo with satin peak lapels and matching bow tie, designed for a prestigious royal wedding.",
      details: "Peak lapel tuxedo with hand-sewn buttonhole and custom silk lining featuring the client's family crest.",
      fabric: "Super 180s Wool",
      time: "8 weeks",
      image: "/portfolio/tuxedo-1.jpg",
      tags: ["Wedding", "Tuxedo", "Black Tie", "Peak Lapel"]
    },
    {
      id: 3,
      title: "Casual Blazer",
      category: "casual",
      client: "Tech Entrepreneur",
      description: "Modern blazer in soft cashmere blend, perfect for contemporary business casual environments.",
      details: "Unstructured design with patch pockets and natural shoulder line, crafted for comfort and style.",
      fabric: "Cashmere Blend",
      time: "4 weeks",
      image: "/portfolio/blazer-1.jpg",
      tags: ["Casual", "Blazer", "Cashmere", "Modern"]
    },
    {
      id: 4,
      title: "White Tie Ensemble",
      category: "evening",
      client: "Opera House Patron",
      description: "Full white tie ensemble with tailcoat, featuring traditional craftsmanship and impeccable proportions.",
      details: "Hand-tailored white tie tails with silk-faced lapels and matching white pique waistcoat.",
      fabric: "Fine Barathea",
      time: "10 weeks",
      image: "/portfolio/whitetie-1.jpg",
      tags: ["Evening", "White Tie", "Tailcoat", "Formal"]
    },
    {
      id: 5,
      title: "Double-Breasted Suit",
      category: "bespoke",
      client: "Investment Banker",
      description: "Classic double-breasted suit in charcoal wool, embodying timeless elegance and authority.",
      details: "Six-button double-breasted jacket with peak lapels and working buttonholes on the sleeves.",
      fabric: "Super 130s Wool",
      time: "5 weeks",
      image: "/portfolio/db-suit-1.jpg",
      tags: ["Double-breasted", "Charcoal", "Classic", "Peak Lapel"]
    },
    {
      id: 6,
      title: "Morning Coat",
      category: "wedding",
      client: "Father of the Bride",
      description: "Traditional morning coat for a country wedding, crafted with heritage techniques and attention to detail.",
      details: "Cut-away morning coat with matching striped trousers and grey waistcoat in finest wool.",
      fabric: "Worsted Wool",
      time: "7 weeks",
      image: "/portfolio/morning-1.jpg",
      tags: ["Morning Coat", "Wedding", "Traditional", "Grey"]
    }
  ];

  const filteredItems = selectedCategory === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const PortfolioModal = ({ item, onClose }) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div>
              <div className="aspect-[4/5] bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl mb-6 flex items-center justify-center">
                <Scissors className="w-24 h-24" style={{color: '#C6A66480'}} />
              </div>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-sm" style={{backgroundColor: '#C6A66410', borderColor: '#C6A66420', border: '1px solid', color: '#C6A664'}}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              
              <div className="mb-6">
                <h2 className="text-3xl font-light text-white mb-4">{item.title}</h2>
                <p className="font-medium mb-4" style={{color: '#C6A664'}}>{item.client}</p>
                <p className="text-zinc-300 leading-relaxed mb-6">{item.description}</p>
                <p className="text-zinc-400 leading-relaxed mb-8">{item.details}</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5" style={{color: '#C6A664'}} />
                  <span className="text-white font-medium">Fabric:</span>
                  <span className="text-zinc-300">{item.fabric}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5" style={{color: '#C6A664'}} />
                  <span className="text-white font-medium">Completion:</span>
                  <span className="text-zinc-300">{item.time}</span>
                </div>
              </div>
              
              <Button className="text-white px-6 py-3" style={{background: 'linear-gradient(to right, #C6A664, #B5954A)'}}>
                <Heart className="w-5 h-5 mr-2" />
                Commission Similar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8" style={{backgroundColor: '#C6A66410', borderColor: '#C6A66420', border: '1px solid', color: '#C6A664'}}>
              <Crown className="w-4 h-4" />
              Portfolio
            </div>
            <h1 className="text-5xl lg:text-7xl font-light mb-8 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Masterful
              <span className="block" style={{color: '#C6A664'}}>Creations</span>
            </h1>
            <p className="text-xl text-zinc-300 leading-relaxed">
              Explore our collection of bespoke garments, each one a testament to exceptional 
              craftsmanship and personalized design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Navigation */}
      <section className="py-12 px-4 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "text-black font-medium"
                    : "bg-zinc-900 border border-zinc-800 text-white hover:border-zinc-600"
                }`}
                style={selectedCategory === category.id ? {backgroundColor: '#C6A664'} : {}}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-600 transition-all duration-300 overflow-hidden group-hover:scale-105">
                    <div className="aspect-[4/5] bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative overflow-hidden">
                      <Scissors className="w-16 h-16 transition-all duration-300 group-hover:scale-110" style={{color: '#C6A66460'}} />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-sm rounded-full p-3">
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-sm font-medium mb-3" style={{color: '#C6A664'}}>{item.client}</p>
                      <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">{item.description}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-24 px-4 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-light mb-6">Our Achievements</h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Three decades of creating exceptional garments for discerning clientele.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "1,000+", label: "Bespoke Garments", icon: Scissors },
              { number: "30", label: "Years Experience", icon: Award },
              { number: "95%", label: "Client Retention", icon: Heart },
              { number: "15", label: "Countries Served", icon: Crown }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800 text-center">
                  <CardContent className="p-8">
                    <stat.icon className="w-12 h-12 mx-auto mb-4" style={{color: '#C6A664'}} />
                    <div className="text-4xl font-light text-white mb-2">{stat.number}</div>
                    <div className="text-zinc-400">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonial */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800 p-8">
              <CardContent className="p-0">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current" style={{color: '#C6A664'}} />
                  ))}
                </div>
                <blockquote className="text-xl text-zinc-300 leading-relaxed mb-6 italic">
                  "Each piece in their portfolio tells a story of exceptional craftsmanship. 
                  My bespoke suit has become my signature piece - perfectly fitted and timelessly elegant."
                </blockquote>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Richard Pemberton</div>
                    <div className="text-zinc-400 text-sm">Art Gallery Owner</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4" style={{background: 'linear-gradient(to right, #C6A664, #B5954A)'}}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-light text-black mb-6">
              Create Your Masterpiece
            </h2>
            <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
              Ready to join our portfolio of satisfied clients? Let us create something extraordinary for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="text-white px-8 py-4 text-lg" style={{background: 'linear-gradient(to right, #C6A664, #B5954A)'}}>
                <Calendar className="w-5 h-5 mr-2" />
                Start Your Commission
              </Button>
              <Button variant="outline" className="px-8 py-4 text-lg" style={{borderColor: '#C6A664', color: '#C6A664'}}>
                <Sparkles className="w-5 h-5 mr-2" />
                View Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Modal */}
      {selectedItem && (
        <PortfolioModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
};

export default PortfolioPage;