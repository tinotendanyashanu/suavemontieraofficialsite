"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
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
  Clock,
  CheckCircle,
  Zap,
  Eye,
  Sparkles
} from 'lucide-react';

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState("bespoke");

  const services = [
    {
      id: "bespoke",
      title: "Bespoke Tailoring",
      subtitle: "The Ultimate Expression",
      price: "From $3,200",
      duration: "4-6 weeks",
      icon: Crown,
      description: "Complete custom creation from pattern to final fitting. Every detail crafted specifically for you.",
      features: [
        "Personal consultation & design",
        "Custom pattern creation",
        "Premium fabric selection",
        "Multiple fittings (3-4)",
        "Hand-finished details",
        "Lifetime alterations",
        "Monogramming included",
        "Cedar hanger & garment bag"
      ],
      process: [
        "Initial consultation and measurements",
        "Design discussion and fabric selection",
        "Pattern creation and first fitting",
        "Second fitting and adjustments",
        "Final fitting and delivery"
      ]
    },
    {
      id: "made-to-measure",
      title: "Made to Measure",
      subtitle: "Precision & Style",
      price: "From $1,800",
      duration: "2-3 weeks",
      icon: Scissors,
      description: "Refined fit using our perfected patterns, adjusted to your measurements.",
      features: [
        "Professional measurements",
        "Style customization",
        "Quality fabric selection",
        "Two fittings included",
        "Machine and hand finishing",
        "Minor alterations",
        "Monogramming available",
        "Premium packaging"
      ],
      process: [
        "Measurement appointment",
        "Style and fabric selection",
        "First fitting and adjustments",
        "Final fitting and collection"
      ]
    },
    {
      id: "alterations",
      title: "Alterations & Repairs",
      subtitle: "Expert Modifications",
      price: "From $150",
      duration: "3-7 days",
      icon: Heart,
      description: "Professional alterations and repairs to ensure the perfect fit.",
      features: [
        "Waist adjustments",
        "Length modifications",
        "Shoulder adjustments",
        "Button replacements",
        "Trouser hemming",
        "Jacket sleeves",
        "Damage repairs",
        "Pressing service"
      ],
      process: [
        "Assessment and consultation",
        "Alteration planning",
        "Precise modifications",
        "Quality check and delivery"
      ]
    },
    {
      id: "styling",
      title: "Personal Styling",
      subtitle: "Complete Wardrobe",
      price: "From $500",
      duration: "2-4 hours",
      icon: Sparkles,
      description: "Professional styling consultation to elevate your entire wardrobe.",
      features: [
        "Wardrobe assessment",
        "Style consultation",
        "Color analysis",
        "Shopping assistance",
        "Outfit coordination",
        "Seasonal planning",
        "Care instructions",
        "Follow-up session"
      ],
      process: [
        "Wardrobe audit",
        "Style goals discussion",
        "Shopping and selection",
        "Styling session"
      ]
    }
  ];

  const currentService = services.find(s => s.id === selectedService);

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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C6A664]/10 border border-[#C6A664]/20 rounded-full text-[#C6A664] text-sm font-medium mb-8">
              <Scissors className="w-4 h-4" />
              Our Services
            </div>
            <h1 className="text-5xl lg:text-7xl font-light mb-8 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Tailoring
              <span className="block text-[#C6A664]">Excellence</span>
            </h1>
            <p className="text-xl text-zinc-300 leading-relaxed">
              From bespoke masterpieces to expert alterations, discover our comprehensive range of 
              tailoring services designed to elevate your style.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6 mb-16">
            {services.map((service, index) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedService(service.id)}
                className={`text-left p-6 rounded-2xl border transition-all duration-300 ${
                  selectedService === service.id 
                    ? "bg-[#C6A664] border-[#C6A664] text-white" 
                    : "bg-zinc-900/50 border-zinc-800 hover:border-[#C6A664]/50 text-white"
                }`}
              >
                <service.icon className={`w-8 h-8 mb-4 ${selectedService === service.id ? "text-white" : "text-[#C6A664]"}`} />
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className={`text-sm ${selectedService === service.id ? "text-black/80" : "text-zinc-400"}`}>
                  {service.subtitle}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className={`text-sm font-medium ${selectedService === service.id ? "text-white" : "text-[#C6A664]"}`}>
                    {service.price}
                  </span>
                  <span className={`text-xs ${selectedService === service.id ? "text-white/60" : "text-zinc-500"}`}>
                    {service.duration}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Service Details */}
          <motion.div
            key={selectedService}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-16 items-start"
          >
            <div>
              <div className="mb-8">
                <h2 className="text-4xl lg:text-5xl font-light mb-4">{currentService?.title}</h2>
                <p className="text-xl text-zinc-300 leading-relaxed mb-6">{currentService?.description}</p>
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2 text-[#C6A664]">
                    <Zap className="w-5 h-5" />
                    <span className="font-medium">{currentService?.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#C6A664]">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">{currentService?.duration}</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-6 text-white">What&apos;s Included</h3>
                <div className="grid gap-3">
                  {currentService?.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#C6A664] flex-shrink-0" />
                      <span className="text-zinc-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="bg-[#C6A664] hover:bg-[#B89654] text-white px-8 py-4 text-lg">
                <Calendar className="w-5 h-5 mr-2" />
                Book This Service
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div>
              <Card className="bg-zinc-900/50 border-zinc-800 mb-8">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-white">Our Process</h3>
                  <div className="space-y-6">
                    {currentService?.process.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-8 h-8 bg-[#C6A664] rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0 mt-1">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-zinc-300 leading-relaxed">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Service Guarantee */}
              <Card className="bg-gradient-to-r from-[#C6A66410] to-[#B5954A10] border-[#C6A664]/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-[#C6A664]" />
                    <h4 className="text-lg font-semibold text-white">Quality Guarantee</h4>
                  </div>
                  <p className="text-zinc-300">
                    We stand behind our craftsmanship with a comprehensive satisfaction guarantee. 
                    If you&apos;re not completely satisfied, we&apos;ll make it right.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-24 px-4 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-light mb-6">Service Comparison</h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Choose the service that best fits your needs and budget.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`h-full ${service.id === 'bespoke' ? 'border-[#C6A664] bg-[#C6A664]/5' : 'bg-zinc-900/50 border-zinc-800'}`}>
                  <CardContent className="p-8 text-center">
                    {service.id === 'bespoke' && (
                      <div className="bg-[#C6A664] text-black text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
                        MOST POPULAR
                      </div>
                    )}
                    <service.icon className="w-12 h-12 text-[#C6A664] mx-auto mb-6" />
                    <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                    <p className="text-zinc-400 mb-6">{service.subtitle}</p>
                    <div className="text-3xl font-bold text-[#C6A664] mb-2">{service.price}</div>
                    <div className="text-sm text-zinc-500 mb-8">{service.duration}</div>
                    <Button 
                      variant={service.id === 'bespoke' ? 'default' : 'outline'}
                      className={service.id === 'bespoke' ? 'bg-[#C6A664] hover:bg-[#B5954A] text-black w-full' : 'w-full border-zinc-700 hover:bg-zinc-800'}
                    >
                      Select Service
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-light mb-16">What Our Clients Say</h2>
            <Card className="bg-zinc-900/50 border-zinc-800 p-8">
              <CardContent className="p-0">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-[#C6A664] fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl text-zinc-300 leading-relaxed mb-6 italic">
                  &quot;The attention to detail is extraordinary. My bespoke suit fits like a second skin and 
                  the craftsmanship is evident in every stitch. Truly exceptional service.&quot;
                </blockquote>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">James Wellington</div>
                    <div className="text-zinc-400 text-sm">CEO, Wellington & Associates</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
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
              Schedule your consultation today and discover the perfect tailoring service for your needs.
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

export default ServicesPage;






