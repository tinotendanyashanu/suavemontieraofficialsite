"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
  Plus, 
  Minus,
  Crown, 
  Award, 
  Shield, 
  Heart,
  Scissors,
  Users,
  Calendar,
  Clock,
  Eye,
  Sparkles,
  Mail,
  HelpCircle
} from 'lucide-react';

const FAQPage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "bespoke", label: "Bespoke Tailoring" },
    { id: "process", label: "Our Process" },
    { id: "pricing", label: "Pricing & Payment" },
    { id: "appointments", label: "Appointments" },
    { id: "alterations", label: "Alterations" }
  ];

  const faqs = [
    {
      id: 1,
      category: "bespoke",
      question: "What's the difference between bespoke and made-to-measure?",
      answer: "Bespoke tailoring involves creating a completely unique pattern from scratch, specifically for your body and requirements. Every aspect is customizable, from the cut and style to the smallest details. Made-to-measure uses an existing pattern that's adjusted to your measurements, offering some customization but within established parameters. Bespoke requires more fittings and time but provides the ultimate personalized result."
    },
    {
      id: 2,
      category: "process",
      question: "How long does the bespoke process take?",
      answer: "A bespoke suit typically takes 6-8 weeks from your initial consultation to completion. This includes multiple fittings: first fitting after 2-3 weeks, second fitting after 4-5 weeks, and final fitting for delivery. Rush orders can be accommodated for an additional fee, potentially reducing the timeline to 4-5 weeks."
    },
    {
      id: 3,
      category: "pricing",
      question: "What are your starting prices?",
      answer: "Our bespoke suits start from £3,200, made-to-measure from £1,800, and alterations from £150. Prices vary based on fabric choice, complexity of design, and additional details. We offer transparent pricing with no hidden costs, and a detailed quote is provided during your consultation."
    },
    {
      id: 4,
      category: "appointments",
      question: "How do I schedule a consultation?",
      answer: "You can schedule a consultation by calling us at +44 20 7734 1234, emailing appointments@suavemontiera.com, or using our online booking system. Initial consultations are complimentary and typically last 60-90 minutes. We recommend booking at least one week in advance."
    },
    {
      id: 5,
      category: "process",
      question: "How many fittings are included?",
      answer: "Bespoke garments include 3-4 fittings as standard: initial measurements and design consultation, first fitting on the half-made garment, second fitting for fine adjustments, and final fitting for delivery. Made-to-measure includes 2 fittings. Additional fittings can be arranged if needed."
    },
    {
      id: 6,
      category: "alterations",
      question: "Can you alter suits made by other tailors?",
      answer: "Yes, our expert tailors can alter and repair garments from any maker. We assess each piece individually to determine the best approach. Common alterations include waist adjustments, trouser hemming, sleeve shortening, and shoulder modifications. We provide honest advice on what's achievable for each garment."
    },
    {
      id: 7,
      category: "pricing",
      question: "Do you offer payment plans?",
      answer: "Yes, we offer flexible payment options for our clients. For bespoke orders over £2,000, you can spread payments across the creation timeline: 50% deposit, 30% at first fitting, and 20% on completion. We also accept major credit cards and bank transfers."
    },
    {
      id: 8,
      category: "bespoke",
      question: "What fabrics do you offer?",
      answer: "We work with prestigious mills including Ermenegildo Zegna, Holland & Sherry, Scabal, and Dormeuil. Our fabric library includes over 3,000 options ranging from traditional wools and tweeds to luxury cashmeres and silks. We can also source specific fabrics upon request."
    },
    {
      id: 9,
      category: "process",
      question: "What happens if I'm not satisfied?",
      answer: "Client satisfaction is our priority. If you're not completely happy with your garment, we'll work with you to make it right. This may include additional adjustments, modifications, or in rare cases, creating a new garment. We stand behind our craftsmanship with a comprehensive guarantee."
    },
    {
      id: 10,
      category: "appointments",
      question: "Can I bring someone to my appointment?",
      answer: "Absolutely! Many clients bring their spouse, partner, or trusted friend for a second opinion. Our private fitting rooms can comfortably accommodate additional guests. We find this often helps in making decisions about style and fabric choices."
    },
    {
      id: 11,
      category: "alterations",
      question: "How long do alterations take?",
      answer: "Simple alterations like hemming or taking in seams typically take 3-5 days. More complex work such as shoulder adjustments or significant restructuring may take 1-2 weeks. Rush services are available for urgent requirements with 48-hour turnaround for an additional fee."
    },
    {
      id: 12,
      category: "bespoke",
      question: "Do you make shirts and accessories?",
      answer: "Yes, we create bespoke shirts, ties, pocket squares, and other accessories to complement your suits. Our shirts start from £450 and feature the same attention to detail as our suits, including mother-of-pearl buttons and hand-finished seams."
    }
  ];

  const filteredFAQs = selectedCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C6A66410] border border-[#C6A66420] rounded-full text-[#C6A664] text-sm font-medium mb-8">
              <HelpCircle className="w-4 h-4" />
              Frequently Asked Questions
            </div>
            <h1 className="text-5xl lg:text-7xl font-light mb-8 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Your Questions
              <span className="block text-[#C6A664]">Answered</span>
            </h1>
            <p className="text-xl text-zinc-300 leading-relaxed">
              Everything you need to know about our bespoke tailoring services, process, and experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-4 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-[#C6A664] text-black font-medium"
                    : "bg-zinc-900 border border-zinc-800 text-white hover:border-[#C6A66450]"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            layout
            className="space-y-4"
          >
            <AnimatePresence>
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="bg-zinc-900/50 border-zinc-800 hover:border-[#C6A66450] transition-all duration-300">
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-zinc-900/30 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                        <div className="flex-shrink-0">
                          {openFAQ === faq.id ? (
                            <Minus className="w-5 h-5 text-[#C6A664]" />
                          ) : (
                            <Plus className="w-5 h-5 text-[#C6A664]" />
                          )}
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {openFAQ === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6">
                              <div className="w-full h-px bg-[#C6A664]/20 mb-6"></div>
                              <p className="text-zinc-300 leading-relaxed">{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-24 px-4 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-light mb-6">Still Have Questions?</h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Our team is here to help. Get in touch for personalized answers and expert guidance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Book Consultation",
                description: "Schedule a complimentary consultation to discuss your needs in person.",
                action: "Book Now",
                primary: true
              },
              {
                icon: Mail,
                title: "Email Us",
                description: "Send us your questions and we'll respond within 24 hours.",
                action: "Send Email",
                primary: false
              },
              {
                icon: Scissors,
                title: "Visit Atelier",
                description: "Come see our craftsmanship and fabric collection firsthand.",
                action: "Get Directions",
                primary: false
              }
            ].map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`text-center transition-all duration-300 ${
                  action.primary 
                    ? "bg-[#C6A664] border-[#C6A664] hover:bg-[#B5954A]" 
                    : "bg-zinc-900/50 border-zinc-800 hover:border-[#C6A66450]"
                }`}>
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                      action.primary ? "bg-black" : "bg-[#C6A664]"
                    }`}>
                      <action.icon className={`w-8 h-8 ${action.primary ? "text-[#C6A664]" : "text-black"}`} />
                    </div>
                    <h3 className={`text-xl font-semibold mb-4 ${action.primary ? "text-black" : "text-white"}`}>
                      {action.title}
                    </h3>
                    <p className={`mb-6 leading-relaxed ${action.primary ? "text-black/80" : "text-zinc-400"}`}>
                      {action.description}
                    </p>
                    <Button 
                      className={action.primary 
                        ? "bg-[#C6A664] hover:bg-[#B5954A] text-white" 
                        : "bg-[#C6A664] text-black hover:bg-[#B5954A]"
                      }
                    >
                      {action.action}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-light mb-6">Our Promise</h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Quality, craftsmanship, and client satisfaction are at the heart of everything we do.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Crown,
                title: "Excellence",
                description: "Uncompromising quality in every stitch and detail."
              },
              {
                icon: Shield,
                title: "Guarantee",
                description: "Complete satisfaction guarantee on all our work."
              },
              {
                icon: Heart,
                title: "Personal Service",
                description: "Dedicated attention to your unique style and preferences."
              },
              {
                icon: Award,
                title: "Heritage",
                description: "30 years of traditional craftsmanship and innovation."
              }
            ].map((promise, index) => (
              <motion.div
                key={promise.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800 text-center h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-[#C6A66410] rounded-xl flex items-center justify-center mx-auto mb-4">
                      <promise.icon className="w-6 h-6 text-[#C6A664]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">{promise.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{promise.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-[#C6A664]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-light text-black mb-6">
              Ready to Begin?
            </h2>
            <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
              Let's discuss your vision and create something extraordinary together. 
              Your perfect garment awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#C6A664] hover:bg-[#B5954A] text-white px-8 py-4 text-lg">
                <Calendar className="w-5 h-5 mr-2" />
                Book Consultation
              </Button>
              <Button variant="outline" className="border-[#C6A664] text-[#C6A664] hover:bg-[#C6A664] hover:text-black px-8 py-4 text-lg">
                <Eye className="w-5 h-5 mr-2" />
                View Portfolio
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
