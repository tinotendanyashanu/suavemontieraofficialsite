"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar,
  Crown,
  Shield,
  Award,
  Users,
  Send,
  CheckCircle
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Atelier",
      details: ["15 Savile Row", "London W1S 3PJ", "United Kingdom"],
      action: "Get Directions"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+44 20 7734 1234", "+44 20 7734 5678", "Mon-Sat 9AM-6PM"],
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "WhatsApp",
      details: ["+48 880 516 414", "Quick responses", "Available 24/7"],
      action: "Message on WhatsApp",
      href: "https://wa.me/48880516414"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@suavemontiera.com", "appointments@suavemontiera.com", "We respond within 24 hours"],
      action: "Send Email"
    },
    {
      icon: Clock,
      title: "Opening Hours",
      details: ["Mon-Fri: 9:00 AM - 7:00 PM", "Saturday: 10:00 AM - 6:00 PM", "Sunday: By appointment only"],
      action: "Book Appointment"
    }
  ];

  const services = [
    "Bespoke Tailoring",
    "Made to Measure",
    "Alterations & Repairs",
    "Personal Styling",
    "Wardrobe Consultation",
    "Other Inquiry"
  ];

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
              <MapPin className="w-4 h-4" />
              Contact Us
            </div>
            <h1 className="text-5xl lg:text-7xl font-light mb-8 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Visit Our
              <span className="block" style={{color: '#C6A664'}}>Atelier</span>
            </h1>
            <p className="text-xl text-zinc-300 leading-relaxed">
              Experience the art of bespoke tailoring in person. Schedule your consultation 
              or visit our Savile Row atelier.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-600 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#C6A664'}}>
                      <info.icon className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-4">{info.title}</h3>
                    <div className="space-y-2 mb-6">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-zinc-400 text-sm">{detail}</p>
                      ))}
                    </div>
                    {info.href ? (
                      <a 
                        href={info.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 border border-zinc-700 hover:bg-zinc-800 text-sm rounded-md transition-colors"
                      >
                        {info.action}
                      </a>
                    ) : (
                      <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800 text-sm">
                        {info.action}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24 px-4 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <h2 className="text-4xl lg:text-5xl font-light mb-6">Get in Touch</h2>
                <p className="text-xl text-zinc-400">
                  Ready to begin your bespoke journey? Send us a message and we&apos;ll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-[#C6A664] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-[#C6A664] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+44 20 1234 5678"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-[#C6A664] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Service Interest</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:border-[#C6A664] focus:outline-none transition-colors"
                      required
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements, preferred appointment times, or any questions you have..."
                    rows={6}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-[#C6A664] focus:outline-none transition-colors resize-none"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full text-white py-4 text-lg" style={{background: 'linear-gradient(to right, #C6A664, #B5954A)'}}
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Map & Location Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative">
                  <MapPin className="w-24 h-24 text-[#C6A66460]" />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-white text-sm font-medium">15 Savile Row</p>
                    <p className="text-zinc-300 text-xs">London W1S 3PJ</p>
                  </div>
                </div>
              </Card>

              {/* Location Benefits */}
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-white mb-6">Why Visit Our Atelier?</h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: Crown,
                        title: "Premium Location",
                        description: "Located in the heart of Savile Row, the world&apos;s tailoring capital."
                      },
                      {
                        icon: Users,
                        title: "Personal Consultation",
                        description: "Meet with our master tailors for personalized advice and fittings."
                      },
                      {
                        icon: Award,
                        title: "Fabric Library",
                        description: "Browse our extensive collection of premium fabrics from renowned mills."
                      },
                      {
                        icon: Shield,
                        title: "Private Fitting Rooms",
                        description: "Enjoy complete privacy in our luxuriously appointed fitting suites."
                      }
                    ].map((benefit, index) => (
                      <div key={benefit.title} className="flex gap-4">
                        <div className="w-12 h-12 bg-[#C6A66410] rounded-xl flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-6 h-6 text-[#C6A664]" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">{benefit.title}</h4>
                          <p className="text-zinc-400 text-sm">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid gap-4">
                <Button 
                  className="w-full bg-[#C6A664] hover:bg-[#B5954A] text-white py-4 text-lg font-medium"
                  onClick={() => {
                    const phoneNumber = "+447734123456";
                    const message = encodeURIComponent(
                      "Hello! I would like to schedule an appointment for a consultation. Could you please help me find a suitable time?"
                    );
                    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
                  }}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule on WhatsApp
                </Button>
                <Button variant="outline" className="w-full border-[#C6A664] text-[#C6A664] hover:bg-[#C6A664] hover:text-black py-4 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-light mb-6">Common Questions</h2>
            <p className="text-xl text-zinc-400">
              Quick answers to frequently asked questions about our services and process.
            </p>
          </motion.div>

          <div className="grid gap-6">
            {[
              {
                question: "How long does a bespoke suit take?",
                answer: "A bespoke suit typically takes 6-8 weeks from initial consultation to completion, including multiple fittings."
              },
              {
                question: "What's included in the consultation?",
                answer: "Our consultation includes measurements, style discussion, fabric selection, and design planning - completely complimentary."
              },
              {
                question: "Do you offer alterations on existing garments?",
                answer: "Yes, our expert tailors can alter and repair garments from any maker to ensure the perfect fit."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                    <p className="text-zinc-400 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800 px-8 py-3">
              View All FAQs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
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
              Visit Us Today
            </h2>
            <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
              Experience the difference of true bespoke craftsmanship. Our atelier doors are open 
              Monday through Saturday.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#C6A664] hover:bg-[#B5954A] text-white px-8 py-4 text-lg">
                <MapPin className="w-5 h-5 mr-2" />
                Get Directions
              </Button>
              <Button variant="outline" className="border-[#C6A664] text-[#C6A664] hover:bg-[#C6A664] hover:text-black px-8 py-4 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Call Ahead
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;



