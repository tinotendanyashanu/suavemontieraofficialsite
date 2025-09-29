"use client";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  User, 
  Scissors, 
  Award, 
  Star, 
  Shield, 
  Crown,
  Zap,
  Check,
  X,
  Heart,
  Eye
} from "lucide-react";
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
      <nav className="hidden md:flex items-center gap-8 text-sm">
        <a href="/" className="text-zinc-400 hover:text-[#C6A664] transition-colors">Home</a>
        <a href="/about" className="text-zinc-400 hover:text-[#C6A664] transition-colors">About</a>
        <a href="/services" className="text-zinc-400 hover:text-[#C6A664] transition-colors">Services</a>
        <a href="/portfolio" className="text-zinc-400 hover:text-[#C6A664] transition-colors">Portfolio</a>
        <a href="/showroom" className="text-zinc-400 hover:text-[#C6A664] transition-colors">Showroom</a>
        <a href="/contact" className="text-zinc-400 hover:text-[#C6A664] transition-colors">Contact</a>
        <a href="/faq" className="text-zinc-400 hover:text-[#C6A664] transition-colors">FAQ</a>
      </nav>
      <div className="flex items-center gap-4">
        <a 
          href="https://wa.me/48880516414" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-zinc-800"
          title="Contact us on WhatsApp"
        >
          💬
        </a>
        <AppointmentBooking />
      </div>
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
}: {
  suitHex: string;
  shirtHex: string;
  accentHex: string;
}) {
  // For now, always use the fallback realistic human figure
  // TODO: Implement GLB loading when the model is ready

  // Ultra-realistic suit model with proper tailoring details
  return (
    <group scale={1.8} position={[0, -1.7, 0]}>
      {/* Realistic Human Head with refined features */}
      <mesh position={[0, 1.85, 0]} castShadow>
        <sphereGeometry args={[0.11, 32, 32]} />
        <meshStandardMaterial 
          color="#f4d1a7" 
          roughness={0.8} 
          metalness={0.0}
          bumpScale={0.02}
        />
      </mesh>
      
      {/* Detailed facial features */}
      <mesh position={[-0.03, 1.87, 0.09]} castShadow>
        <sphereGeometry args={[0.008, 12, 12]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
      </mesh>
      <mesh position={[0.03, 1.87, 0.09]} castShadow>
        <sphereGeometry args={[0.008, 12, 12]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
      </mesh>
      
      {/* Nose bridge */}
      <mesh position={[0, 1.84, 0.105]} castShadow>
        <boxGeometry args={[0.012, 0.02, 0.008]} />
        <meshStandardMaterial color="#f4d1a7" roughness={0.8} />
      </mesh>
      
      {/* Professional hairstyle */}
      <mesh position={[0, 1.91, -0.02]} castShadow>
        <sphereGeometry args={[0.112, 16, 16]} />
        <meshStandardMaterial color="#2a1f1a" roughness={0.9} />
      </mesh>
      
      {/* Neck with proper proportions */}
      <mesh position={[0, 1.66, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.055, 0.15, 16]} />
        <meshStandardMaterial color="#f4d1a7" roughness={0.8} />
      </mesh>
      
      {/* Torso - Athletic build */}
      <mesh position={[0, 1.35, 0]} castShadow>
        <boxGeometry args={[0.32, 0.38, 0.18]} />
        <meshStandardMaterial color="#f4d1a7" roughness={0.8} />
      </mesh>
      
      {/* Chest definition for suit fit */}
      <mesh position={[0, 1.45, 0.09]} castShadow>
        <boxGeometry args={[0.28, 0.22, 0.05]} />
        <meshStandardMaterial color="#f4d1a7" roughness={0.8} />
      </mesh>
      
      {/* PREMIUM DRESS SHIRT - Crisp white business shirt */}
      <mesh position={[0, 1.38, 0.095]} castShadow>
        <boxGeometry args={[0.33, 0.40, 0.025]} />
        <meshStandardMaterial 
          color={shirtHex} 
          roughness={0.15} 
          metalness={0.05}
          envMapIntensity={0.3}
        />
      </mesh>
      
      {/* Dress shirt collar - Professional spread collar */}
      <mesh position={[-0.045, 1.58, 0.105]} rotation={[0, 0, 0.35]} castShadow>
        <boxGeometry args={[0.09, 0.07, 0.015]} />
        <meshStandardMaterial color={shirtHex} roughness={0.15} metalness={0.05} />
      </mesh>
      <mesh position={[0.045, 1.58, 0.105]} rotation={[0, 0, -0.35]} castShadow>
        <boxGeometry args={[0.09, 0.07, 0.015]} />
        <meshStandardMaterial color={shirtHex} roughness={0.15} metalness={0.05} />
      </mesh>
      
      {/* Shirt front placket */}
      <mesh position={[0, 1.35, 0.108]} castShadow>
        <boxGeometry args={[0.04, 0.35, 0.008]} />
        <meshStandardMaterial color={shirtHex} roughness={0.1} />
      </mesh>
      
      {/* LUXURY SUIT JACKET - Tailored business suit */}
      <mesh position={[0, 1.35, 0.115]} castShadow>
        <boxGeometry args={[0.37, 0.42, 0.035]} />
        <meshStandardMaterial 
          color={suitHex} 
          roughness={0.25} 
          metalness={0.08}
          envMapIntensity={0.4}
        />
      </mesh>
      
      {/* Suit jacket lapels - Notched lapels */}
      <mesh position={[-0.08, 1.52, 0.135]} rotation={[0, 0, 0.45]} castShadow>
        <boxGeometry args={[0.12, 0.18, 0.02]} />
        <meshStandardMaterial color={suitHex} roughness={0.25} metalness={0.08} />
      </mesh>
      <mesh position={[0.08, 1.52, 0.135]} rotation={[0, 0, -0.45]} castShadow>
        <boxGeometry args={[0.12, 0.18, 0.02]} />
        <meshStandardMaterial color={suitHex} roughness={0.25} metalness={0.08} />
      </mesh>
      
      {/* Lapel buttonhole - Premium detail */}
      <mesh position={[-0.09, 1.56, 0.145]} castShadow>
        <cylinderGeometry args={[0.003, 0.003, 0.01, 8]} />
        <meshStandardMaterial color="#C6A664" roughness={0.1} metalness={0.8} />
      </mesh>
      
      {/* LUXURY NECKTIE - Silk tie with texture */}
      <mesh position={[0, 1.28, 0.155]} castShadow>
        <boxGeometry args={[0.055, 0.32, 0.012]} />
        <meshStandardMaterial 
          color={accentHex} 
          roughness={0.3} 
          metalness={0.15}
          envMapIntensity={0.5}
        />
      </mesh>
      
      {/* Tie knot - Four-in-hand knot */}
      <mesh position={[0, 1.48, 0.155]} castShadow>
        <boxGeometry args={[0.065, 0.08, 0.02]} />
        <meshStandardMaterial color={accentHex} roughness={0.3} metalness={0.15} />
      </mesh>
      
      {/* Tie dimple - Professional detail */}
      <mesh position={[0, 1.44, 0.165]} castShadow>
        <boxGeometry args={[0.008, 0.02, 0.005]} />
        <meshStandardMaterial color={accentHex} roughness={0.4} />
      </mesh>
      
      {/* Suit vest/waistcoat */}
      <mesh position={[0, 1.18, 0.125]} castShadow>
        <boxGeometry args={[0.30, 0.16, 0.025]} />
        <meshStandardMaterial color={suitHex} roughness={0.25} metalness={0.08} />
      </mesh>
      
      {/* Waist and belt area */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <boxGeometry args={[0.28, 0.14, 0.16]} />
        <meshStandardMaterial color="#f4d1a7" roughness={0.8} />
      </mesh>
      
      {/* SUIT TROUSERS - Tailored dress pants */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <boxGeometry args={[0.30, 0.16, 0.18]} />
        <meshStandardMaterial 
          color={suitHex} 
          roughness={0.25} 
          metalness={0.08}
          envMapIntensity={0.4}
        />
      </mesh>
      
      {/* Trouser crease - Sharp pressed lines */}
      <mesh position={[-0.08, 0.7, 0.09]} castShadow>
        <boxGeometry args={[0.002, 0.6, 0.002]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} />
      </mesh>
      <mesh position={[0.08, 0.7, 0.09]} castShadow>
        <boxGeometry args={[0.002, 0.6, 0.002]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} />
      </mesh>
      
      {/* Upper legs with proper trouser fit */}
      <mesh position={[-0.08, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.058, 0.068, 0.4, 16]} />
        <meshStandardMaterial color={suitHex} roughness={0.25} metalness={0.08} />
      </mesh>
      <mesh position={[0.08, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.058, 0.068, 0.4, 16]} />
        <meshStandardMaterial color={suitHex} roughness={0.25} metalness={0.08} />
      </mesh>
      
      {/* Lower legs - Tapered trouser fit */}
      <mesh position={[-0.08, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.055, 0.35, 16]} />
        <meshStandardMaterial color={suitHex} roughness={0.25} metalness={0.08} />
      </mesh>
      <mesh position={[0.08, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.055, 0.35, 16]} />
        <meshStandardMaterial color={suitHex} roughness={0.25} metalness={0.08} />
      </mesh>
      
      {/* Structured shoulders - Tailored shoulder construction */}
      <mesh position={[-0.20, 1.48, 0]} castShadow>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshStandardMaterial color="#f4d1a7" roughness={0.8} />
      </mesh>
      <mesh position={[0.20, 1.48, 0]} castShadow>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshStandardMaterial color="#f4d1a7" roughness={0.8} />
      </mesh>
      
      {/* Suit jacket shoulders with padding */}
      <mesh position={[-0.20, 1.48, 0]} castShadow>
        <sphereGeometry args={[0.068, 16, 16]} />
        <meshStandardMaterial color={suitHex} roughness={0.25} metalness={0.08} />
      </mesh>
      <mesh position={[0.20, 1.48, 0]} castShadow>
        <sphereGeometry args={[0.068, 16, 16]} />
        <meshStandardMaterial color={suitHex} roughness={0.25} metalness={0.08} />
      </mesh>
      
      {/* Upper arms */}
      <mesh position={[-0.22, 1.25, 0]} rotation={[0, 0, 0.1]} castShadow>
        <cylinderGeometry args={[0.038, 0.045, 0.25, 12]} />
        <meshStandardMaterial color="#f4d1a7" roughness={0.8} />
      </mesh>
      <mesh position={[0.22, 1.25, 0]} rotation={[0, 0, -0.1]} castShadow>
        <cylinderGeometry args={[0.038, 0.045, 0.25, 12]} />
        <meshStandardMaterial color="#f4d1a7" roughness={0.8} />
      </mesh>
      
      {/* Suit sleeves - Tailored fit */}
      <mesh position={[-0.22, 1.25, 0]} rotation={[0, 0, 0.1]} castShadow>
        <cylinderGeometry args={[0.041, 0.048, 0.26, 12]} />
        <meshStandardMaterial color={suitHex} roughness={0.25} metalness={0.08} />
      </mesh>
      <mesh position={[0.22, 1.25, 0]} rotation={[0, 0, -0.1]} castShadow>
        <cylinderGeometry args={[0.041, 0.048, 0.26, 12]} />
        <meshStandardMaterial color={suitHex} roughness={0.25} metalness={0.08} />
      </mesh>
      
      {/* Forearms */}
      <mesh position={[-0.23, 0.98, 0]} castShadow>
        <cylinderGeometry args={[0.032, 0.035, 0.22, 12]} />
        <meshStandardMaterial color="#f4d1a7" roughness={0.8} />
      </mesh>
      <mesh position={[0.23, 0.98, 0]} castShadow>
        <cylinderGeometry args={[0.032, 0.035, 0.22, 12]} />
        <meshStandardMaterial color="#f4d1a7" roughness={0.8} />
      </mesh>
      
      {/* Suit sleeve forearms */}
      <mesh position={[-0.23, 0.98, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.038, 0.23, 12]} />
        <meshStandardMaterial color={suitHex} roughness={0.25} metalness={0.08} />
      </mesh>
      <mesh position={[0.23, 0.98, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.038, 0.23, 12]} />
        <meshStandardMaterial color={suitHex} roughness={0.25} metalness={0.08} />
      </mesh>
      
      {/* Dress shirt cuffs - French cuffs */}
      <mesh position={[-0.23, 0.85, 0]} castShadow>
        <cylinderGeometry args={[0.038, 0.038, 0.04, 12]} />
        <meshStandardMaterial color={shirtHex} roughness={0.15} />
      </mesh>
      <mesh position={[0.23, 0.85, 0]} castShadow>
        <cylinderGeometry args={[0.038, 0.038, 0.04, 12]} />
        <meshStandardMaterial color={shirtHex} roughness={0.15} />
      </mesh>
      
      {/* Cufflinks - Luxury detail */}
      <mesh position={[-0.25, 0.85, 0]} castShadow>
        <cylinderGeometry args={[0.006, 0.006, 0.02, 8]} />
        <meshStandardMaterial color="#C6A664" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[0.25, 0.85, 0]} castShadow>
        <cylinderGeometry args={[0.006, 0.006, 0.02, 8]} />
        <meshStandardMaterial color="#C6A664" roughness={0.1} metalness={0.9} />
      </mesh>
      
      {/* Hands - Refined */}
      <mesh position={[-0.23, 0.80, 0]} castShadow>
        <boxGeometry args={[0.052, 0.08, 0.028]} />
        <meshStandardMaterial color="#f4d1a7" roughness={0.8} />
      </mesh>
      <mesh position={[0.23, 0.80, 0]} castShadow>
        <boxGeometry args={[0.052, 0.08, 0.028]} />
        <meshStandardMaterial color="#f4d1a7" roughness={0.8} />
      </mesh>
      
      {/* LUXURY DRESS SHOES - Oxford style */}
      <mesh position={[-0.08, 0.12, 0.08]} castShadow>
        <boxGeometry args={[0.08, 0.06, 0.18]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          roughness={0.05} 
          metalness={0.4}
          envMapIntensity={0.6}
        />
      </mesh>
      <mesh position={[0.08, 0.12, 0.08]} castShadow>
        <boxGeometry args={[0.08, 0.06, 0.18]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          roughness={0.05} 
          metalness={0.4}
          envMapIntensity={0.6}
        />
      </mesh>
      
      {/* Shoe toe caps - Broguing detail */}
      <mesh position={[-0.08, 0.13, 0.15]} castShadow>
        <boxGeometry args={[0.07, 0.04, 0.06]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.03} metalness={0.5} />
      </mesh>
      <mesh position={[0.08, 0.13, 0.15]} castShadow>
        <boxGeometry args={[0.07, 0.04, 0.06]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.03} metalness={0.5} />
      </mesh>
      
      {/* PREMIUM SUIT BUTTONS - Mother of pearl */}
      <mesh position={[0, 1.45, 0.155]} castShadow>
        <cylinderGeometry args={[0.009, 0.009, 0.006, 8]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.05} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.35, 0.155]} castShadow>
        <cylinderGeometry args={[0.009, 0.009, 0.006, 8]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.05} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.25, 0.155]} castShadow>
        <cylinderGeometry args={[0.009, 0.009, 0.006, 8]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.05} metalness={0.1} />
      </mesh>
      
      {/* Sleeve buttons - Functional working buttonholes */}
      <mesh position={[-0.26, 0.88, 0]} castShadow>
        <cylinderGeometry args={[0.004, 0.004, 0.003, 6]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.05} metalness={0.1} />
      </mesh>
      <mesh position={[-0.26, 0.86, 0]} castShadow>
        <cylinderGeometry args={[0.004, 0.004, 0.003, 6]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.05} metalness={0.1} />
      </mesh>
      <mesh position={[0.26, 0.88, 0]} castShadow>
        <cylinderGeometry args={[0.004, 0.004, 0.003, 6]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.05} metalness={0.1} />
      </mesh>
      <mesh position={[0.26, 0.86, 0]} castShadow>
        <cylinderGeometry args={[0.004, 0.004, 0.003, 6]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.05} metalness={0.1} />
      </mesh>
      
      {/* Trouser hem - Perfect break */}
      <mesh position={[-0.08, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.046, 0.046, 0.02, 16]} />
        <meshStandardMaterial color={suitHex} roughness={0.2} />
      </mesh>
      <mesh position={[0.08, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.046, 0.046, 0.02, 16]} />
        <meshStandardMaterial color={suitHex} roughness={0.2} />
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
      <CraftsmanshipShowcase />
      <TheHouse />
      <Collections />
      <TestimonialsSection />
      <Lookbook />
      <NewsletterSignup />
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
  const [activeTab, setActiveTab] = useState<"colors" | "fabrics" | "measurements" | "details">("colors");
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [fabricType, setFabricType] = useState("wool");

  useEffect(() => {
    setSuit(PRESETS[preset].suit);
    setShirt(PRESETS[preset].shirt);
    setAccent(PRESETS[preset].accent);
  }, [preset]);

  const fabricTypes = [
    { id: "wool", name: "Super 120s Wool", texture: "Smooth, breathable, classic", price: "+$0" },
    { id: "cashmere", name: "Cashmere Blend", texture: "Ultra-soft, luxurious", price: "+$800" },
    { id: "silk", name: "Silk Wool Blend", texture: "Lustrous, elegant", price: "+$400" },
    { id: "linen", name: "Italian Linen", texture: "Lightweight, textured", price: "+$300" }
  ];

  const measurements = [
    { label: "Chest", value: "42\"", description: "Around fullest part" },
    { label: "Waist", value: "36\"", description: "Natural waistline" },
    { label: "Shoulders", value: "18\"", description: "Across shoulder blades" },
    { label: "Sleeve", value: "25\"", description: "From shoulder to cuff" },
    { label: "Length", value: "30\"", description: "Back jacket length" }
  ];

  const customizationTabs = [
    { id: "colors" as const, label: "Colors", icon: Sparkles },
    { id: "fabrics" as const, label: "Fabrics", icon: Eye },
    { id: "measurements" as const, label: "Fit", icon: User },
    { id: "details" as const, label: "Details", icon: Crown }
  ];

  const Swatch = ({ hex, active, label, onClick }: { hex: string; active: boolean; label: string; onClick: () => void }) => (
    <button onClick={onClick} aria-label={label} title={label} className={`group w-full flex items-center justify-between border rounded-xl px-3 py-2 transition-all ${active ? "border-brand-gold bg-brand-gold/10" : "border-zinc-800 bg-black hover:border-zinc-700"}`}>
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
          <div className="relative rounded-[24px] border border-zinc-900 overflow-hidden shadow-[0_0_80px_rgba(198,166,100,0.08)] h-[600px] md:h-[700px] lg:h-[800px]">
            <ShowroomCanvasHuman suit={suit} shirt={shirt} accent={accent} />
            
            {/* Measurements Overlay */}
            <AnimatePresence>
              {showMeasurements && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
                >
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-serif text-white">Measurements</h3>
                      <Button
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowMeasurements(false)}
                        className="border-zinc-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {measurements.map((measurement, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-zinc-800">
                          <div>
                            <div className="text-white font-medium">{measurement.label}</div>
                            <div className="text-xs text-zinc-400">{measurement.description}</div>
                          </div>
                          <div className="brand-gold font-mono">{measurement.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3D Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMeasurements(!showMeasurements)}
                className="bg-black/50 backdrop-blur-sm border-zinc-700 hover:bg-zinc-800"
              >
                <User className="w-4 h-4 mr-2" />
                Measurements
              </Button>
              <AppointmentBooking />
            </div>
          </div>
          <div className="mt-2 text-xs text-zinc-500 text-center">
            Click and drag to rotate · Mouse wheel to zoom · Full screen available
          </div>
          <div className="mt-3 text-center text-sm text-zinc-400">
            Professional 3D suit model with interactive controls. Select colors to see your customization choices.
          </div>
        </div>

        <aside className="lg:col-span-4 bg-zinc-950/70 border border-zinc-900 rounded-2xl p-6 self-start sticky top-24">
          <div>
            <Eyebrow>SHOWROOM</Eyebrow>
            <H2>Interactive Atelier</H2>
            <p className="text-zinc-400 text-sm mt-2">Craft your perfect suit with precision customization</p>
          </div>

          {/* Customization Tabs */}
          <div className="mt-6">
            <div className="flex space-x-1 bg-zinc-900/50 rounded-xl p-1">
              {customizationTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === tab.id 
                      ? "brand-gold-bg text-white" 
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
                >
                  <tab.icon className="w-3 h-3" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "colors" && (
              <div className="space-y-6">
                <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Presets</div>
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {(Object.keys(PRESETS) as PresetName[]).map((p) => (
                    <button 
                      key={p} 
                      onClick={() => setPreset(p)} 
                      className={`px-3 py-2 rounded-xl text-sm border transition-all ${
                        preset === p 
                          ? "brand-gold-bg border-brand-gold text-white" 
                          : "bg-black border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <div>
                  <div className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Suit Color</div>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(SUIT_COLOR_SWATCHES) as SuitColorName[]).map((k) => (
                      <Swatch key={k} hex={SUIT_COLOR_SWATCHES[k]} active={suit === k} label={k} onClick={() => setSuit(k)} />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Shirt Color</div>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(SHIRT_COLOR_SWATCHES) as ShirtColorName[]).map((k) => (
                      <Swatch key={k} hex={SHIRT_COLOR_SWATCHES[k]} active={shirt === k} label={k} onClick={() => setShirt(k)} />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Accent & Tie</div>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(ACCENT_COLOR_SWATCHES) as AccentColorName[]).map((k) => (
                      <Swatch key={k} hex={ACCENT_COLOR_SWATCHES[k]} active={accent === k} label={k} onClick={() => setAccent(k)} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "fabrics" && (
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Fabric Selection</div>
                {fabricTypes.map((fabric) => (
                  <div
                    key={fabric.id}
                    onClick={() => setFabricType(fabric.id)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all ${
                      fabricType === fabric.id
                        ? "border-brand-gold bg-brand-gold/10"
                        : "border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-medium">{fabric.name}</h3>
                      <span className="brand-gold text-sm font-medium">{fabric.price}</span>
                    </div>
                    <p className="text-zinc-400 text-sm">{fabric.texture}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "measurements" && (
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Size & Fit</div>
                <div className="space-y-3">
                  {measurements.map((measurement, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-zinc-800">
                      <div>
                        <div className="text-white font-medium">{measurement.label}</div>
                        <div className="text-xs text-zinc-400">{measurement.description}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <input 
                          type="text" 
                          defaultValue={measurement.value}
                          className="w-16 px-2 py-1 bg-zinc-800 border border-zinc-700 rounded brand-gold font-mono text-sm text-center"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full brand-gold-bg hover:bg-[#B89654] text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Fitting
                </Button>
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Finishing Details</div>
                <div className="space-y-4">
                  <div className="p-4 border border-zinc-800 rounded-xl">
                    <h3 className="text-white font-medium mb-2">Lapel Style</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {["Notch", "Peak", "Shawl"].map((style) => (
                        <button
                          key={style}
                          className="px-3 py-2 text-sm border border-zinc-700 rounded-lg hover:border-amber-600 hover:text-amber-400 transition-colors"
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 border border-zinc-800 rounded-xl">
                    <h3 className="text-white font-medium mb-2">Button Count</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {["1", "2", "3"].map((count) => (
                        <button
                          key={count}
                          className="px-3 py-2 text-sm border border-zinc-700 rounded-lg hover:border-amber-600 hover:text-amber-400 transition-colors"
                        >
                          {count} Button
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border border-zinc-800 rounded-xl">
                    <h3 className="text-white font-medium mb-2">Monogram</h3>
                    <input
                      type="text"
                      placeholder="Enter initials"
                      className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-amber-600 focus:outline-none"
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            <Button className="w-full brand-gold-bg hover:bg-[#B89654] text-white">
              <Heart className="w-4 h-4 mr-2" />
              Save Configuration
            </Button>
            <Button variant="outline" className="w-full border-brand-gold brand-gold hover:brand-gold-bg hover:text-white">
              <Zap className="w-4 h-4 mr-2" />
              Request Quote
            </Button>
          </div>

          <div className="mt-6 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <Crown className="w-5 h-5 text-amber-500" />
              <span className="text-white font-medium">Bespoke Service</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Starting from <span className="font-medium" style={{color: '#C6A664'}}>$3,200</span> · 
              Includes consultation, fittings, and lifetime alterations.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

// Premium Interactive Features
const AppointmentBooking = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", date: "", time: "", message: ""
  });

  const services = [
    { id: "consultation", name: "Consultation", duration: "60 min", price: "Complimentary" },
    { id: "fitting", name: "Fitting Session", duration: "90 min", price: "$150" },
    { id: "bespoke", name: "Bespoke Design", duration: "2 hours", price: "$300" },
    { id: "alteration", name: "Alterations", duration: "30 min", price: "$75" }
  ];

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
        style={{background: 'linear-gradient(to right, #C6A664, #B5954A)'}}
      >
        <Calendar className="w-5 h-5 mr-2" />
        Book Appointment
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-serif text-white">Book Your Appointment</h2>
                  <p className="text-zinc-400 mt-1">Schedule your personalized consultation</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="border-zinc-700 hover:bg-zinc-800"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-zinc-300 text-sm font-medium mb-2 block">Select Service</label>
                  <div className="space-y-2">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`p-4 border rounded-xl cursor-pointer transition-all ${
                          selectedService === service.id
                            ? "border-[#C6A664] bg-[#C6A66410]"
                            : "border-zinc-700 hover:border-zinc-600"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-white font-medium">{service.name}</h3>
                            <p className="text-zinc-400 text-sm">{service.duration}</p>
                          </div>
                          <span className="text-amber-400 font-medium">{service.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-zinc-300 text-sm font-medium mb-2 block">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:border-amber-600 focus:outline-none"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-zinc-300 text-sm font-medium mb-2 block">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:border-amber-600 focus:outline-none"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-zinc-300 text-sm font-medium mb-2 block">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:border-amber-600 focus:outline-none"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-zinc-300 text-sm font-medium mb-2 block">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:border-amber-600 focus:outline-none"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-zinc-300 text-sm font-medium mb-2 block">Preferred Time</label>
                  <select
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:border-amber-600 focus:outline-none"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  >
                    <option value="">Select time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-zinc-300 text-sm font-medium mb-2 block">Special Requests</label>
                <textarea
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:border-amber-600 focus:outline-none"
                  rows={3}
                  placeholder="Any specific requirements or questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                  className="flex-1 border-zinc-700 hover:bg-zinc-800"
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
                  onClick={() => {
                    // Handle form submission here
                    console.log('Booking submitted:', formData, selectedService);
                    setIsOpen(false);
                  }}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Confirm Booking
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <Section className="py-24 bg-gradient-to-br from-zinc-900 via-zinc-900 to-amber-900/20">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Crown className="w-12 h-12 brand-gold mx-auto mb-4" />
          <H2>Join The Inner Circle</H2>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
            Be the first to know about exclusive collections, private events, and bespoke offerings.
          </p>
        </motion.div>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 bg-zinc-800/50 border border-zinc-700 rounded-full text-white placeholder-zinc-400 focus:border-amber-600 focus:outline-none backdrop-blur-sm"
            required
          />
          <Button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-full"
          >
            {isSubscribed ? (
              <Check className="w-5 h-5" />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </Button>
        </div>
        {isSubscribed && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-amber-400 mt-4 font-medium"
          >
            Welcome to the inner circle! ✨
          </motion.p>
        )}
      </motion.form>
    </Section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Alexander Morrison",
      title: "CEO, Morrison Industries",
      content: "The attention to detail is extraordinary. Every stitch tells a story of craftsmanship that I've never experienced before. This isn't just tailoring—it's artistry.",
      rating: 5,
      image: "/testimonial1.jpg"
    },
    {
      name: "Victoria Blackwell",
      title: "Creative Director",
      content: "Suave Montiera transformed not just my wardrobe, but my confidence. The bespoke process was a journey of discovery, resulting in pieces that feel like extensions of myself.",
      rating: 5,
      image: "/testimonial2.jpg"
    },
    {
      name: "James Wellington",
      title: "Investment Banker",
      content: "I've worn suits from London, Milan, and New York. Nothing compares to the architectural precision and luxurious feel of Suave Montiera's creations.",
      rating: 5,
      image: "/testimonial3.jpg"
    }
  ];

  return (
    <Section className="py-24">
      <div className="text-center mb-16">
        <Eyebrow>TESTIMONIALS</Eyebrow>
        <H2>Voices of Distinction</H2>
        <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
          Hear from the discerning clientele who have experienced the Suave Montiera difference.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-zinc-900/50 border border-zinc-800 p-8 h-full">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" style={{color: '#C6A664'}} />
                ))}
              </div>
              <blockquote className="text-zinc-300 leading-relaxed mb-6 font-light italic">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-zinc-400" />
                </div>
                <div>
                  <div className="text-white font-medium">{testimonial.name}</div>
                  <div className="text-zinc-400 text-sm">{testimonial.title}</div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

const CraftsmanshipShowcase = () => {
  const craftDetails = [
    {
      icon: Scissors,
      title: "Hand-Cut Patterns",
      description: "Each pattern is individually cut by master craftsmen with over 20 years of experience."
    },
    {
      icon: Eye,
      title: "300+ Quality Checks",
      description: "Every garment undergoes rigorous inspection at multiple stages of creation."
    },
    {
      icon: Crown,
      title: "Finest Materials",
      description: "Sourced exclusively from renowned mills in England, Italy, and Scotland."
    },
    {
      icon: Award,
      title: "Award-Winning Design",
      description: "Recognized by international fashion councils for innovation in bespoke tailoring."
    }
  ];

  return (
    <Section className="py-24 bg-gradient-to-b from-zinc-950 to-zinc-900">
      <div className="text-center mb-16">
        <Eyebrow>CRAFTSMANSHIP</Eyebrow>
        <H2>The Art of Perfection</H2>
        <p className="text-zinc-400 mt-4 max-w-3xl mx-auto">
          Behind every Suave Montiera creation lies a dedication to excellence that spans generations. 
          Our artisans combine time-honored techniques with innovative precision.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {craftDetails.map((detail, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <detail.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-serif text-white mb-3">{detail.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{detail.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-4 bg-zinc-800/50 border border-zinc-700 rounded-2xl px-8 py-6 backdrop-blur-sm"
        >
          <Shield className="w-8 h-8" style={{color: '#C6A664'}} />
          <div className="text-left">
            <div className="text-white font-medium">Lifetime Guarantee</div>
            <div className="text-zinc-400 text-sm">Every piece backed by our commitment to excellence</div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

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
