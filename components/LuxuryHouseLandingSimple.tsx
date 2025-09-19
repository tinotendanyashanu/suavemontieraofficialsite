"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Simple brand config
const brand = {
  name: "Suave Montiera",
  tagline: "Elegance Meets Precision",
  colors: { bg: "#0A0A0A", gold: "#C6A664", text: "#F5F5F5", muted: "#A1A1AA" },
} as const;

// Simple hero image
const HERO_IMAGE = "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=2000&auto=format&fit=crop";

// UI Components
const Section = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <section className={`max-w-[1200px] mx-auto px-4 md:px-8 ${className}`}>{children}</section>
);

const H1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-white">{children}</h1>
);

// NavBar Component
const NavBar = () => (
  <div className="sticky top-0 z-50 backdrop-blur bg-black/50 border-b border-zinc-900">
    <Section className="py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full flex items-center justify-center brand-gold-bg">
          <span className="text-black font-semibold text-lg">S</span>
        </div>
        <div className="leading-tight">
          <div className="text-white font-medium tracking-wide">{brand.name}</div>
          <div className="text-[10px] text-zinc-400 tracking-[0.2em]">{brand.tagline}</div>
        </div>
      </div>
    </Section>
  </div>
);

// Hero Component
const HeroStatic = () => (
  <div className="relative">
    <img src={HERO_IMAGE} alt="Suave Montiera hero" className="w-full h-[92vh] object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
    <Section className="absolute inset-0 flex items-end pb-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
        <H1>
          Elegance Meets <span className="brand-gold">Precision</span>
        </H1>
        <p className="mt-4 text-zinc-300 max-w-2xl">
          A modern luxury house crafting architectural tailoring for icons and individuals.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" className="bg-transparent border border-zinc-700 text-white hover:bg-zinc-900">
            Discover the House
          </Button>
          <Button size="lg" className="brand-gold-bg text-black">
            Request Invitation <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    </Section>
  </div>
);

// Main Component
export default function LuxuryHouseLanding() {
  return (
    <div className="brand-bg min-h-screen text-white">
      <NavBar />
      <HeroStatic />
      <Section className="py-24">
        <div className="text-center">
          <h2 className="text-3xl font-serif text-white mb-4">Welcome to Suave Montiera</h2>
          <p className="text-zinc-400">This is a simplified version to test the basic functionality.</p>
          <p className="text-zinc-400 mt-2">3D showroom will be added once basic structure is working.</p>
        </div>
      </Section>
    </div>
  );
}
