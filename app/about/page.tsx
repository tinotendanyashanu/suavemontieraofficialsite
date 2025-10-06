"use client";
import React from "react";
import Image from "next/image";
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
  User,
  Calendar,
  MapPin
} from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Crown,
      title: "Excellence",
      description: "Every stitch, every detail crafted with uncompromising attention to perfection."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Our love for the art of tailoring drives us to create extraordinary garments."
    },
    {
      icon: Shield,
      title: "Heritage",
      description: "Preserving centuries-old techniques while embracing modern innovation."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "Building lasting relationships with clients through trust and exceptional service."
    }
  ];

  const milestones = [
    { year: "1995", title: "Founded", description: "Established in London with a vision for excellence" },
    { year: "2003", title: "Expansion",                     description: "Opened our flagship atelier in London&apos;s prestigious Savile Row district" },
    { year: "2010", title: "Recognition", description: "Awarded Master Tailor of the Year" },
    { year: "2018", title: "Global Reach", description: "Serving clients in 15 countries worldwide" },
    { year: "2025", title: "Innovation", description: "Leading digital tailoring revolution" }
  ];

  const team = [
    {
      name: "Alessandro Montiera",
      title: "Master Tailor & Founder",
      description: "With over 30 years of experience, Alessandro combines traditional Italian craftsmanship with modern innovation.",
      image: "/team/alessandro.jpg"
    },
    {
      name: "Victoria Sterling",
      title: "Head of Design",
      description: "Former Savile Row apprentice, Victoria brings contemporary elegance to classic tailoring.",
      image: "/team/victoria.jpg"
    },
    {
      name: "Marcus Chen",
      title: "Master Craftsman",
      description: "Specializing in precision fitting and complex alterations with an eye for perfection.",
      image: "/team/marcus.jpg"
    }
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C6A664]/10 border border-[#C6A664]/20 rounded-full text-[#C6A664] text-sm font-medium mb-8">
              <Crown className="w-4 h-4" />
              Our Heritage
            </div>
            <h1 className="text-5xl lg:text-7xl font-light mb-8 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Crafting Excellence
              <span className="block text-[#C6A664]">Since 1995</span>
            </h1>
            <p className="text-xl text-zinc-300 leading-relaxed">
              For three decades, Suave Montiera has been synonymous with uncompromising quality, 
              timeless elegance, and the finest bespoke tailoring tradition.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-24 px-4 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="w-full h-[600px] bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center">
                  <Scissors className="w-24 h-24" style={{color: '#C6A66480'}} />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#C6A664] rounded-2xl flex items-center justify-center">
                  <Crown className="w-16 h-16 text-black" />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl lg:text-5xl font-light mb-6">
                  The Montiera
                  <span className="block" style={{color: '#C6A664'}}>Legacy</span>
                </h2>
                <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                  Alessandro Montiera began his journey in a small atelier in Milan, learning the ancient 
                  art of tailoring from his grandfather. With a dream to bring Italian craftsmanship to 
                  the world, he established Suave Montiera in London&apos;s prestigious tailoring district.
                </p>
                <p className="text-lg text-zinc-300 leading-relaxed mb-8">
                  Today, our atelier represents the perfect fusion of traditional techniques and modern 
                  innovation, creating bespoke garments that tell each client&apos;s unique story.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-[#C6A664]">
                  <Award className="w-5 h-5" />
                  <span className="font-medium">Master Craftsman</span>
                </div>
                <div className="flex items-center gap-2 text-[#C6A664]">
                  <Star className="w-5 h-5" />
                  <span className="font-medium">30+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-[#C6A664]">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">1000+ Satisfied Clients</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-light mb-6">Our Values</h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              The principles that guide every thread, every cut, and every creation in our atelier.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-600 transition-all duration-300 h-full">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-[#C6A664] rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-white">{value.title}</h3>
                    <p className="text-zinc-400 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-4 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-light mb-6">Our Journey</h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Three decades of dedication to the art of bespoke tailoring.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[#C6A664]/30"></div>
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="w-1/2 pr-8">
                    <Card className="bg-zinc-900/70 border-zinc-800">
                      <CardContent className="p-6">
                        <div className="text-3xl font-bold text-[#C6A664] mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-semibold text-white mb-2">{milestone.title}</h3>
                        <p className="text-zinc-400">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-[#C6A664] rounded-full"></div>
                  </div>
                  <div className="w-1/2 pl-8"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-light mb-6">Master Craftsmen</h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Meet the artisans who bring decades of expertise to every garment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-600 transition-all duration-300 overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                    <User className="w-24 h-24" style={{color: '#C6A66480'}} />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                    <p className="text-[#C6A664] font-medium mb-4">{member.title}</p>
                    <p className="text-zinc-400 leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
              Begin Your Journey
            </h2>
            <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
              Experience the artistry of bespoke tailoring. Let us create something extraordinary for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-[#C6A664] hover:bg-[#B5954A] text-white px-8 py-4 text-lg"
                onClick={() => {
                  const phoneNumber = "+447734123456";
                  const message = encodeURIComponent(
                    "Hello! I would like to book a consultation to discuss bespoke tailoring services. Could you please help me schedule an appointment?"
                  );
                  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
                }}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book on WhatsApp
              </Button>
              <Button variant="outline" className="border-[#C6A664] text-[#C6A664] hover:bg-[#C6A664] hover:text-white px-8 py-4 text-lg">
                <MapPin className="w-5 h-5 mr-2" />
                Visit Our Atelier
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
