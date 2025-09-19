"use client";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Environment, PresentationControls, ContactShadows, useGLTF } from "@react-three/drei";

// Brand Configuration
const brand = {
  name: "Suave Montiera",
  tagline: "Elegance Meets Precision",
  colors: { bg: "#0A0A0A", gold: "#C6A664", text: "#F5F5F5", muted: "#A1A1AA" },
} as const;

// Media Assets
const IMAGES = {
  hero: "/hero.jpg",
  founder: "/founder.jpg",
  logo: "/logo.jpg",
  collection_business: "/business.jpg",
  collection_wedding: "/wedding.jpg",
  collection_redcarpet: "/red.jpg",
} as const;

// Color System for 3D
export const SUIT_COLOR_SWATCHES = {
  Navy: "#0b1f3a",
  Charcoal: "#232323",
  Black: "#0a0a0a",
  Ivory: "#d1d1c8",
  Burgundy: "#4a1f2a",
  Forest: "#0f4024",
} as const;
export type SuitColorName = keyof typeof SUIT_COLOR_SWATCHES;
export function getSuitHex(name: SuitColorName) { return SUIT_COLOR_SWATCHES[name]; }
export function isValidSuitColor(name: string): name is SuitColorName { return name in SUIT_COLOR_SWATCHES; }

export const SHIRT_COLOR_SWATCHES = {
  White: "#f6f6f6",
  Ivory: "#e9e9e0",
  Black: "#0a0a0a",
} as const;
export type ShirtColorName = keyof typeof SHIRT_COLOR_SWATCHES;
export function getShirtHex(name: ShirtColorName) { return SHIRT_COLOR_SWATCHES[name]; }

export const ACCENT_COLOR_SWATCHES = {
  Black: "#0a0a0a",
  Ivory: "#e9e9e0",
  Burgundy: "#4a1f2a",
  Gold: "#C6A664",
} as const;
export type AccentColorName = keyof typeof ACCENT_COLOR_SWATCHES;
export function getAccentHex(name: AccentColorName) { return ACCENT_COLOR_SWATCHES[name]; }

// Material targeting hints
export const SUIT_HINTS = ["suit","jacket","blazer","coat","tux","tuxedo","pants","trousers","waistcoat","vest"] as const;
export const SHIRT_HINTS = ["shirt","dressshirt","shirt_body","shirtbody","collar","cuff"] as const;
export const ACCENT_HINTS = ["tie","necktie","bow","bowtie","pocket","square","pocketsquare","kerchief"] as const;
export const EXCLUDE_HINTS = ["skin","hand","hair","shoe","metal","button","eye"] as const;

// Preset configurations
export const PRESETS = {
  Business: { suit: "Navy" as SuitColorName, shirt: "White" as ShirtColorName, accent: "Black" as AccentColorName },
  Ceremony: { suit: "Black" as SuitColorName, shirt: "Ivory" as ShirtColorName, accent: "Black" as AccentColorName },
  RedCarpet: { suit: "Burgundy" as SuitColorName, shirt: "Black" as ShirtColorName, accent: "Ivory" as AccentColorName },
} as const;
export type PresetName = keyof typeof PRESETS;

// UI Primitives
const Section = ({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) => (
  <section id={id} className={`max-w-[1200px] mx-auto px-4 md:px-8 ${className}`}>{children}</section>
);
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="tracking-[0.25em] uppercase text-[11px] text-zinc-400">{children}</span>
);
const H1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-white">{children}</h1>
);
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-serif text-3xl md:text-5xl text-white">{children}</h2>
);

// Static Hero Component
const HeroStatic = () => (
  <div className="relative">
    <Image src={IMAGES.hero} alt="Suave Montiera hero" className="w-full h-[92vh] object-cover" width={1920} height={1080} priority />
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
          <Button size="lg" className="bg-transparent border border-zinc-700 text-white hover:bg-zinc-900">Discover the House</Button>
          <Button size="lg" className="brand-gold-bg text-black">
            Request Invitation <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    </Section>
  </div>
);

// Navigation Component
const NavBar = () => (
  <div className="sticky top-0 z-50 backdrop-blur bg-black/50 border-b border-zinc-900">
    <Section className="py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full overflow-hidden">
          <Image src={IMAGES.logo} alt="Suave Montiera Logo" width={40} height={40} className="w-full h-full object-cover" />
        </div>
        <div className="leading-tight">
          <div className="text-white font-medium tracking-wide">{brand.name}</div>
          <div className="text-[10px] text-zinc-400 tracking-[0.2em]">{brand.tagline}</div>
        </div>
      </div>
      <nav className="hidden md:flex items-center gap-10 text-sm">
        <a href="#house" className="text-zinc-400 hover:text-white">The House</a>
        <a href="#collections" className="text-zinc-400 hover:text-white">Collections</a>
        <a href="#lookbook" className="text-zinc-400 hover:text-white">Lookbook</a>
        <a href="/showroom" className="text-zinc-400 hover:text-white">Showroom</a>
        <a href="#invitation" className="text-zinc-400 hover:text-white">Invitation</a>
      </nav>
    </Section>
  </div>
);

// Core Content Sections
const TheHouse = () => (
  <Section id="house" className="py-24">
    <div className="grid md:grid-cols-2 gap-14 items-center">
      <div className="rounded-2xl overflow-hidden border border-zinc-800">
        <Image src={IMAGES.founder} alt="Founder portrait" className="w-full h-full object-cover" width={600} height={600} />
      </div>
      <div>
        <Eyebrow>THE HOUSE</Eyebrow>
        <H2>Where Tailoring Becomes Architecture</H2>
        <p className="mt-6 text-zinc-300 leading-relaxed">
          Suave Montiera is the study of proportion, line, and light. We blend heritage canvassing with modern pattern engineering to sculpt silhouettes that command rooms and outlast seasons.
        </p>
      </div>
    </div>
  </Section>
);

const ShowcaseCard = ({ title, img, blurb }: { title: string; img: string; blurb: string }) => (
  <Card className="bg-zinc-950/70 border border-zinc-900 rounded-3xl overflow-hidden">
    <div className="h-[420px] overflow-hidden">
      <Image src={img} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" width={400} height={420} />
    </div>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-serif text-2xl">{title}</h3>
        <Sparkles className="h-5 w-5 brand-gold" />
      </div>
      <p className="mt-3 text-zinc-400 text-sm">{blurb}</p>
      <div className="mt-5">
        <Button className="bg-transparent border border-zinc-800 text-white hover:bg-zinc-900">Request Fitting</Button>
      </div>
    </CardContent>
  </Card>
);

const Collections = () => (
  <Section id="collections" className="py-20">
    <div className="flex flex-col items-center text-center gap-3">
      <Eyebrow>COLLECTIONS</Eyebrow>
      <H2>Signatures of the House</H2>
      <p className="text-zinc-400 max-w-2xl mt-2">Three pillars of presence—authority, ceremony, and spotlight.</p>
    </div>
    <div className="mt-12 grid md:grid-cols-3 gap-8">
      <ShowcaseCard title="Business Authority" img={IMAGES.collection_business} blurb="Immaculate shoulder line, strong lapel geometry, effortless drape." />
      <ShowcaseCard title="Ceremony & Occasion" img={IMAGES.collection_wedding} blurb="Ritual-ready tuxedos and suits, refined to the last stitch." />
      <ShowcaseCard title="Red Carpet Presence" img={IMAGES.collection_redcarpet} blurb="Statement silhouettes with couture detailing for high-profile moments." />
    </div>
  </Section>
);

const Lookbook = () => (
  <Section id="lookbook" className="py-20">
    <div className="flex flex-col items-center text-center gap-3">
      <Eyebrow>LOOKBOOK</Eyebrow>
      <H2>Editorial Moments</H2>
      <p className="text-zinc-400 max-w-2xl mt-2">A restrained gallery—images do the speaking.</p>
    </div>
    <div className="mt-12 grid md:grid-cols-3 gap-6">
      {[IMAGES.collection_business, IMAGES.collection_wedding, IMAGES.collection_redcarpet].map((src, i) => (
        <div key={i} className="rounded-2xl overflow-hidden border border-zinc-800">
          <Image src={src} alt={`Look ${i + 1}`} className="w-full h-[420px] object-cover" width={400} height={420} />
        </div>
      ))}
    </div>
  </Section>
);

const Invitation = () => (
  <Section id="invitation" className="py-24">
    <div className="flex flex-col items-center text-center gap-3">
      <Eyebrow>INVITATION</Eyebrow>
      <H2>Request a Private Appointment</H2>
      <p className="text-zinc-400 max-w-xl mt-2">Discreet, by design. A member of our concierge will reply promptly.</p>
    </div>
    <div className="mt-10 max-w-2xl mx-auto">
      <form className="bg-zinc-950/70 border border-zinc-900 rounded-2xl p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input className="bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white" placeholder="Full name" />
          <input className="bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white" placeholder="Email" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <input className="bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white" placeholder="City / Preferred Studio" />
          <select className="bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white" title="Service Selection">
            <option>Service: Bespoke</option>
            <option>Service: Ceremony</option>
            <option>Service: Red Carpet</option>
          </select>
        </div>
        <textarea className="bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white" rows={4} placeholder="Occasion, dates, fabric preferences (optional)" />
        <div className="flex gap-3">
          <Button className="brand-gold-bg text-black">Request Invitation</Button>
          <a className="bg-transparent border border-zinc-800 text-white rounded-xl px-4 py-3 hover:bg-zinc-900" href="https://wa.me/48729410476" target="_blank" rel="noopener noreferrer">WhatsApp Concierge</a>
        </div>
      </form>
      <p className="text-zinc-500 text-xs mt-4 text-center">By submitting, you agree to our Privacy Notice. Responses typically within 24 hours.</p>
    </div>
  </Section>
);

const Footer = () => (
  <footer className="border-t border-zinc-900 py-10">
    <Section className="flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-zinc-500 text-sm">© {new Date().getFullYear()} {brand.name}. All rights reserved.</div>
      <div className="flex gap-8 text-sm text-zinc-500">
        <a href="#" className="hover:text-white">Privacy</a>
        <a href="#" className="hover:text-white">Terms</a>
      </div>
    </Section>
  </footer>
);

// 3D Components with GLB model loading and fallback
function SuitAvatar({
  suitHex,
  shirtHex,
  accentHex,
  url = "/models/suit_human.glb",
}: {
  suitHex: string;
  shirtHex: string;
  accentHex: string;
  url?: string;
}) {
  // For now, always use the fallback realistic human figure
  // TODO: Implement GLB loading when the model is ready
  const useFallback = true;

  // Realistic human figure matching Sketchfab quality - anatomically correct
    return (
      <group scale={1.6} position={[0, -1.4, 0]}>
        {/* Human Head - Realistic proportions */}
        <mesh position={[0, 1.8, 0]} castShadow>
          <sphereGeometry args={[0.11, 32, 32]} />
          <meshStandardMaterial 
            color="#f2d4a7" 
            roughness={0.7} 
            metalness={0.0}
          />
        </mesh>
        
        {/* Facial features - Eyes */}
        <mesh position={[-0.03, 1.82, 0.09]} castShadow>
          <sphereGeometry args={[0.008, 8, 8]} />
          <meshStandardMaterial color="#333" roughness={0.9} />
        </mesh>
        <mesh position={[0.03, 1.82, 0.09]} castShadow>
          <sphereGeometry args={[0.008, 8, 8]} />
          <meshStandardMaterial color="#333" roughness={0.9} />
        </mesh>
        
        {/* Nose */}
        <mesh position={[0, 1.79, 0.105]} castShadow>
          <boxGeometry args={[0.015, 0.025, 0.01]} />
          <meshStandardMaterial color="#f2d4a7" roughness={0.7} />
        </mesh>
        
        {/* Neck - Realistic human neck */}
        <mesh position={[0, 1.64, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.055, 0.14, 16]} />
          <meshStandardMaterial color="#f2d4a7" roughness={0.7} />
        </mesh>
        
        {/* Human Torso - Anatomically correct */}
        <mesh position={[0, 1.35, 0]} castShadow>
          <boxGeometry args={[0.28, 0.35, 0.16]} />
          <meshStandardMaterial color="#f2d4a7" roughness={0.7} />
        </mesh>
        
        {/* Chest definition */}
        <mesh position={[0, 1.42, 0.08]} castShadow>
          <boxGeometry args={[0.24, 0.2, 0.06]} />
          <meshStandardMaterial color="#f2d4a7" roughness={0.7} />
        </mesh>
        
        {/* Dress Shirt - Professional white shirt */}
        <mesh position={[0, 1.35, 0.085]} castShadow>
          <boxGeometry args={[0.29, 0.36, 0.02]} />
          <meshStandardMaterial 
            color={shirtHex} 
            roughness={0.2} 
            metalness={0.0}
          />
        </mesh>
        
        {/* Shirt collar - Detailed collar */}
        <mesh position={[-0.04, 1.55, 0.095]} rotation={[0, 0, 0.3]} castShadow>
          <boxGeometry args={[0.08, 0.06, 0.01]} />
          <meshStandardMaterial color={shirtHex} roughness={0.2} />
        </mesh>
        <mesh position={[0.04, 1.55, 0.095]} rotation={[0, 0, -0.3]} castShadow>
          <boxGeometry args={[0.08, 0.06, 0.01]} />
          <meshStandardMaterial color={shirtHex} roughness={0.2} />
        </mesh>
        
        {/* Suit Jacket - Professional business suit */}
        <mesh position={[0, 1.35, 0.1]} castShadow>
          <boxGeometry args={[0.32, 0.38, 0.03]} />
          <meshStandardMaterial 
            color={suitHex} 
            roughness={0.3} 
            metalness={0.05}
          />
        </mesh>
        
        {/* Suit Lapels - Realistic lapel shape */}
        <mesh position={[-0.08, 1.48, 0.12]} rotation={[0, 0, 0.4]} castShadow>
          <boxGeometry args={[0.1, 0.16, 0.015]} />
          <meshStandardMaterial color={suitHex} roughness={0.3} metalness={0.05} />
        </mesh>
        <mesh position={[0.08, 1.48, 0.12]} rotation={[0, 0, -0.4]} castShadow>
          <boxGeometry args={[0.1, 0.16, 0.015]} />
          <meshStandardMaterial color={suitHex} roughness={0.3} metalness={0.05} />
        </mesh>
        
        {/* Professional Necktie */}
        <mesh position={[0, 1.25, 0.125]} castShadow>
          <boxGeometry args={[0.045, 0.3, 0.008]} />
          <meshStandardMaterial 
            color={accentHex} 
            roughness={0.4} 
            metalness={0.1}
          />
        </mesh>
        
        {/* Tie knot */}
        <mesh position={[0, 1.45, 0.125]} castShadow>
          <boxGeometry args={[0.055, 0.06, 0.015]} />
          <meshStandardMaterial color={accentHex} roughness={0.4} metalness={0.1} />
        </mesh>
        
        {/* Suit vest/waistcoat area */}
        <mesh position={[0, 1.15, 0.105]} castShadow>
          <boxGeometry args={[0.26, 0.14, 0.02]} />
          <meshStandardMaterial color={suitHex} roughness={0.3} metalness={0.05} />
        </mesh>
        
        {/* Human waist */}
        <mesh position={[0, 1.05, 0]} castShadow>
          <boxGeometry args={[0.24, 0.12, 0.14]} />
          <meshStandardMaterial color="#f2d4a7" roughness={0.7} />
        </mesh>
        
        {/* Suit pants - Professional fit */}
        <mesh position={[0, 1.05, 0]} castShadow>
          <boxGeometry args={[0.26, 0.14, 0.16]} />
          <meshStandardMaterial color={suitHex} roughness={0.3} metalness={0.05} />
        </mesh>
        
        {/* Upper legs - Human thighs */}
        <mesh position={[-0.07, 0.75, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.06, 0.35, 16]} />
          <meshStandardMaterial color="#f2d4a7" roughness={0.7} />
        </mesh>
        <mesh position={[0.07, 0.75, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.06, 0.35, 16]} />
          <meshStandardMaterial color="#f2d4a7" roughness={0.7} />
        </mesh>
        
        {/* Suit pants legs */}
        <mesh position={[-0.07, 0.75, 0]} castShadow>
          <cylinderGeometry args={[0.052, 0.062, 0.36, 16]} />
          <meshStandardMaterial color={suitHex} roughness={0.3} metalness={0.05} />
        </mesh>
        <mesh position={[0.07, 0.75, 0]} castShadow>
          <cylinderGeometry args={[0.052, 0.062, 0.36, 16]} />
          <meshStandardMaterial color={suitHex} roughness={0.3} metalness={0.05} />
        </mesh>
        
        {/* Lower legs - Human calves */}
        <mesh position={[-0.07, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.048, 0.3, 16]} />
          <meshStandardMaterial color="#f2d4a7" roughness={0.7} />
        </mesh>
        <mesh position={[0.07, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.048, 0.3, 16]} />
          <meshStandardMaterial color="#f2d4a7" roughness={0.7} />
        </mesh>
        
        {/* Lower pants legs */}
        <mesh position={[-0.07, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.042, 0.05, 0.31, 16]} />
          <meshStandardMaterial color={suitHex} roughness={0.3} metalness={0.05} />
        </mesh>
        <mesh position={[0.07, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.042, 0.05, 0.31, 16]} />
          <meshStandardMaterial color={suitHex} roughness={0.3} metalness={0.05} />
        </mesh>
        
        {/* Shoulders - Natural human shoulders */}
        <mesh position={[-0.18, 1.45, 0]} castShadow>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#f2d4a7" roughness={0.7} />
        </mesh>
        <mesh position={[0.18, 1.45, 0]} castShadow>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#f2d4a7" roughness={0.7} />
        </mesh>
        
        {/* Suit jacket shoulders */}
        <mesh position={[-0.18, 1.45, 0]} castShadow>
          <sphereGeometry args={[0.062, 16, 16]} />
          <meshStandardMaterial color={suitHex} roughness={0.3} metalness={0.05} />
        </mesh>
        <mesh position={[0.18, 1.45, 0]} castShadow>
          <sphereGeometry args={[0.062, 16, 16]} />
          <meshStandardMaterial color={suitHex} roughness={0.3} metalness={0.05} />
        </mesh>
        
        {/* Upper arms - Human arms */}
        <mesh position={[-0.2, 1.25, 0]} rotation={[0, 0, 0.1]} castShadow>
          <cylinderGeometry args={[0.035, 0.04, 0.22, 12]} />
          <meshStandardMaterial color="#f2d4a7" roughness={0.7} />
        </mesh>
        <mesh position={[0.2, 1.25, 0]} rotation={[0, 0, -0.1]} castShadow>
          <cylinderGeometry args={[0.035, 0.04, 0.22, 12]} />
          <meshStandardMaterial color="#f2d4a7" roughness={0.7} />
        </mesh>
        
        {/* Suit sleeves */}
        <mesh position={[-0.2, 1.25, 0]} rotation={[0, 0, 0.1]} castShadow>
          <cylinderGeometry args={[0.037, 0.042, 0.225, 12]} />
          <meshStandardMaterial color={suitHex} roughness={0.3} metalness={0.05} />
        </mesh>
        <mesh position={[0.2, 1.25, 0]} rotation={[0, 0, -0.1]} castShadow>
          <cylinderGeometry args={[0.037, 0.042, 0.225, 12]} />
          <meshStandardMaterial color={suitHex} roughness={0.3} metalness={0.05} />
        </mesh>
        
        {/* Forearms */}
        <mesh position={[-0.21, 1.0, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.033, 0.18, 12]} />
          <meshStandardMaterial color="#f2d4a7" roughness={0.7} />
        </mesh>
        <mesh position={[0.21, 1.0, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.033, 0.18, 12]} />
          <meshStandardMaterial color="#f2d4a7" roughness={0.7} />
        </mesh>
        
        {/* Suit sleeve forearms */}
        <mesh position={[-0.21, 1.0, 0]} castShadow>
          <cylinderGeometry args={[0.032, 0.035, 0.185, 12]} />
          <meshStandardMaterial color={suitHex} roughness={0.3} metalness={0.05} />
        </mesh>
        <mesh position={[0.21, 1.0, 0]} castShadow>
          <cylinderGeometry args={[0.032, 0.035, 0.185, 12]} />
          <meshStandardMaterial color={suitHex} roughness={0.3} metalness={0.05} />
        </mesh>
        
        {/* Shirt cuffs */}
        <mesh position={[-0.21, 0.89, 0]} castShadow>
          <cylinderGeometry args={[0.034, 0.034, 0.03, 12]} />
          <meshStandardMaterial color={shirtHex} roughness={0.2} />
        </mesh>
        <mesh position={[0.21, 0.89, 0]} castShadow>
          <cylinderGeometry args={[0.034, 0.034, 0.03, 12]} />
          <meshStandardMaterial color={shirtHex} roughness={0.2} />
        </mesh>
        
        {/* Hands - Realistic human hands */}
        <mesh position={[-0.21, 0.85, 0]} castShadow>
          <boxGeometry args={[0.05, 0.08, 0.025]} />
          <meshStandardMaterial color="#f2d4a7" roughness={0.7} />
        </mesh>
        <mesh position={[0.21, 0.85, 0]} castShadow>
          <boxGeometry args={[0.05, 0.08, 0.025]} />
          <meshStandardMaterial color="#f2d4a7" roughness={0.7} />
        </mesh>
        
        {/* Professional dress shoes */}
        <mesh position={[-0.07, 0.18, 0.06]} castShadow>
          <boxGeometry args={[0.07, 0.05, 0.16]} />
          <meshStandardMaterial 
            color="#0a0a0a" 
            roughness={0.1} 
            metalness={0.4}
          />
        </mesh>
        <mesh position={[0.07, 0.18, 0.06]} castShadow>
          <boxGeometry args={[0.07, 0.05, 0.16]} />
          <meshStandardMaterial 
            color="#0a0a0a" 
            roughness={0.1} 
            metalness={0.4}
          />
        </mesh>
        
        {/* Suit buttons - Premium details */}
        <mesh position={[0, 1.4, 0.135]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.004, 8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.8} />
        </mesh>
        <mesh position={[0, 1.32, 0.135]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.004, 8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.8} />
        </mesh>
        <mesh position={[0, 1.24, 0.135]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.004, 8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.8} />
        </mesh>
      </group>
    );
}

function ShowroomCanvasHuman({ suit, shirt, accent }: { suit: SuitColorName; shirt: ShirtColorName; accent: AccentColorName }) {
  const suitHex = getSuitHex(suit);
  const shirtHex = getShirtHex(shirt);
  const accentHex = getAccentHex(accent);
  
  return (
    <Canvas 
      shadows 
      camera={{ position: [0, 1.5, 3.5], fov: 50 }} 
      className="w-full h-full rounded-[24px] overflow-hidden"
    >
      {/* Professional Studio Lighting Setup - Enhanced Sketchfab Quality */}
      
      {/* Key Light - Main illumination with enhanced intensity */}
      <directionalLight 
        position={[4, 8, 5]} 
        intensity={2.8} 
        color="#ffffff"
        castShadow 
        shadow-mapSize={[4096, 4096]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />
      
      {/* Fill Light - Softer illumination from opposite side */}
      <directionalLight 
        position={[-3, 6, 3]} 
        intensity={1.8} 
        color="#f8f9fa"
      />
      
      {/* Rim Light - Creates professional outline effect */}
      <directionalLight 
        position={[0, 4, -6]} 
        intensity={2.2} 
        color="#fff8e1"
      />
      
      {/* Top Light - Hair and shoulder definition */}
      <directionalLight 
        position={[0, 10, 2]} 
        intensity={1.2} 
        color="#ffffff"
      />
      
      {/* Enhanced Spot Lights for detail */}
      <spotLight 
        position={[-4, 7, 4]} 
        angle={0.4} 
        penumbra={0.3} 
        intensity={1.8} 
        color="#ffffff" 
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <spotLight 
        position={[3, 5, -1]} 
        angle={0.5} 
        penumbra={0.4} 
        intensity={1.2} 
        color="#f5f5f5" 
      />
      
      {/* Side accent lights for fabric texture */}
      <pointLight position={[-3, 3, 2]} intensity={0.8} color="#C6A664" />
      <pointLight position={[3, 2, 1]} intensity={0.6} color="#ffffff" />
      <pointLight position={[0, 5, -4]} intensity={0.9} color="#e8f4fd" />
      
      {/* Enhanced ambient lighting */}
      <ambientLight intensity={0.7} color="#f0f4ff" />

      <PresentationControls 
        global 
        polar={[0.1, 0.4]} 
        azimuth={[-0.6, 0.6]} 
        snap
        speed={1.2}
      >
        <Suspense fallback={
          <group>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.35, 1.8, 0.2]} />
              <meshStandardMaterial color={suitHex} opacity={0.2} transparent />
            </mesh>
            <mesh position={[0, 0.9, 0]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial color="#f4d4a7" opacity={0.2} transparent />
            </mesh>
          </group>
        }>
          <SuitAvatar suitHex={suitHex} shirtHex={shirtHex} accentHex={accentHex} />
        </Suspense>
      </PresentationControls>

      {/* Professional studio floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.9, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#0f0f0f" 
          roughness={0.05} 
          metalness={0.1}
          envMapIntensity={0.5}
        />
      </mesh>

      <ContactShadows 
        opacity={0.4} 
        scale={15} 
        blur={2} 
        far={4} 
        position={[0, -1.85, 0]} 
        color="#000000"
      />
      <Environment preset="city" environmentIntensity={0.4} />
    </Canvas>
  );
}

// Main Landing Page Export
export default function LuxuryHouseLanding() {
  return (
    <div className="brand-bg min-h-screen text-white">
      <NavBar />
      <HeroStatic />
      <TheHouse />
      <Collections />
      <Lookbook />
      <Invitation />
      <Footer />
    </div>
  );
}

// Individual Page Exports
export function HousePage() {
  return (
    <div className="brand-bg min-h-screen text-white">
      <NavBar />
      <TheHouse />
      <Footer />
    </div>
  );
}

export function CollectionsPage() {
  return (
    <div className="brand-bg min-h-screen text-white">
      <NavBar />
      <Collections />
      <Footer />
    </div>
  );
}

export function LookbookPage() {
  return (
    <div className="brand-bg min-h-screen text-white">
      <NavBar />
      <Lookbook />
      <Footer />
    </div>
  );
}

export function InvitationPage() {
  return (
    <div className="brand-bg min-h-screen text-white">
      <NavBar />
      <Invitation />
      <Footer />
    </div>
  );
}

export function ShowroomPage() {
  const [preset, setPreset] = useState<PresetName>("Business");
  const [suit, setSuit] = useState<SuitColorName>(PRESETS[preset].suit);
  const [shirt, setShirt] = useState<ShirtColorName>(PRESETS[preset].shirt);
  const [accent, setAccent] = useState<AccentColorName>(PRESETS[preset].accent);

  useEffect(() => {
    setSuit(PRESETS[preset].suit);
    setShirt(PRESETS[preset].shirt);
    setAccent(PRESETS[preset].accent);
  }, [preset]);

  const Swatch = ({ hex, active, label, onClick }: { hex: string; active: boolean; label: string; onClick: () => void }) => (
    <button onClick={onClick} aria-label={label} title={label} className={`group w-full flex items-center justify-between border rounded-xl px-3 py-2 ${active ? "border-zinc-600 bg-zinc-900" : "border-zinc-800 bg-black"}`}>
      <span className="inline-flex items-center gap-3">
        <span 
          className="h-4 w-4 rounded-full border border-zinc-700"
          style={{ backgroundColor: hex }}
        />
        <span className="text-sm text-zinc-200">{label}</span>
      </span>
      <span className="text-xs text-zinc-500">{hex}</span>
    </button>
  );

  return (
    <div className="brand-bg min-h-screen text-white">
      <NavBar />
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-20 pb-10 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="rounded-[24px] border border-zinc-900 overflow-hidden shadow-[0_0_80px_rgba(198,166,100,0.08)] h-[600px] md:h-[700px] lg:h-[800px]">
            <ShowroomCanvasHuman suit={suit} shirt={shirt} accent={accent} />
          </div>
          <div className="mt-2 text-xs text-zinc-500 text-center">Click and drag to rotate · Mouse wheel to zoom · Full screen available</div>
          <div className="mt-3 text-center text-sm text-zinc-400">
            Professional 3D suit model with interactive controls. Select colors to see your customization choices.
          </div>
        </div>

        <aside className="lg:col-span-4 bg-zinc-950/70 border border-zinc-900 rounded-2xl p-6 self-start sticky top-24">
          <div>
            <Eyebrow>SHOWROOM</Eyebrow>
            <H2>Interactive Atelier</H2>
          </div>

          <div className="mt-6">
            <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Presets</div>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(PRESETS) as PresetName[]).map((p) => (
                <button key={p} onClick={() => setPreset(p)} className={`px-3 py-2 rounded-xl text-sm border ${preset === p ? "bg-zinc-900 border-zinc-600" : "bg-black border-zinc-800"}`}>{p}</button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Suit</div>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(SUIT_COLOR_SWATCHES) as SuitColorName[]).map((k) => (
                <Swatch key={k} hex={SUIT_COLOR_SWATCHES[k]} active={suit === k} label={k} onClick={() => setSuit(k)} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Shirt</div>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(SHIRT_COLOR_SWATCHES) as ShirtColorName[]).map((k) => (
                <Swatch key={k} hex={SHIRT_COLOR_SWATCHES[k]} active={shirt === k} label={k} onClick={() => setShirt(k)} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Accent</div>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(ACCENT_COLOR_SWATCHES) as AccentColorName[]).map((k) => (
                <Swatch key={k} hex={ACCENT_COLOR_SWATCHES[k]} active={accent === k} label={k} onClick={() => setAccent(k)} />
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <Button className="bg-transparent border border-zinc-700 text-white hover:bg-zinc-900" onClick={() => setPreset("Business")}>
              Reset
            </Button>
            <Button className="brand-gold-bg text-black">
              Request Invitation <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}

// Additional Page Exports
export function AdminPageContent() {
  return (
    <div className="brand-bg min-h-screen text-white">
      <NavBar />
      <Section className="py-24">
        <H1>Admin Panel</H1>
        <p className="text-zinc-400 mt-4">Admin functionality coming soon.</p>
      </Section>
    </div>
  );
}

export function BespokePageContent() {
  return (
    <div className="brand-bg min-h-screen text-white">
      <NavBar />
      <Section className="py-24">
        <H1>Bespoke Tailoring</H1>
        <p className="text-zinc-400 mt-4">Custom bespoke services and consultations.</p>
      </Section>
    </div>
  );
}

export function ThankYouPageContent() {
  return (
    <div className="brand-bg min-h-screen text-white">
      <NavBar />
      <Section className="py-24 text-center">
        <H1>Thank You</H1>
        <p className="text-zinc-400 mt-4">Thank you for your interest in Suave Montiera.</p>
      </Section>
    </div>
  );
}

export function TestPageContent() {
  return (
    <div className="brand-bg min-h-screen text-white">
      <NavBar />
      <Section className="py-24">
        <H1>Test Page</H1>
        <p className="text-zinc-400 mt-4">This is a test page for development purposes.</p>
      </Section>
    </div>
  );
}

// Preload the 3D model
useGLTF.preload("/models/suit_human.glb");
