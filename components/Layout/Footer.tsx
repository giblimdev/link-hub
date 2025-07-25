"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Coffee,
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  Code,
  Palette,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentYear, setCurrentYear] = useState(2024); // Valeur par défaut stable

  useEffect(() => {
    setIsClient(true);
    setCurrentYear(new Date().getFullYear());
  }, []);

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@example.com", label: "Email" },
  ];

  const skills = [
    { icon: Code, label: "Frontend" },
    { icon: Zap, label: "Backend" },
    { icon: Palette, label: "Design" },
  ];

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Positions fixes pour les particules (évite Math.random())
  const particlePositions = [
    { left: 15, top: 25 },
    { left: 35, top: 45 },
    { left: 65, top: 30 },
    { left: 80, top: 55 },
    { left: 45, top: 65 },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Static Waves - TOUJOURS rendues (pas de condition isClient) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-20"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          {/* Première vague - statique */}
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="rgba(59, 130, 246, 0.1)"
          />
          {/* Deuxième vague - statique */}
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C878.21,72.86,1014.68,96.36,1200,55.91V0Z"
            fill="rgba(147, 51, 234, 0.1)"
          />
          {/* Troisième vague - statique */}
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            fill="rgba(56, 189, 248, 0.08)"
          />
        </svg>
      </div>

      {/* Floating elements - SEULEMENT côté client */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Éléments flous statiques TOUJOURS rendus */}
        <div className="absolute w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl left-[20%] top-[20%]" />
        <div className="absolute w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl left-[50%] top-[40%]" />
        <div className="absolute w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl left-[80%] top-[60%]" />

        {/* Animations conditionnelles */}
        {isClient && (
          <>
            {/* Floating elements animés */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`floating-${i}`}
                className="absolute w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl"
                style={{
                  left: `${25 + i * 30}%`,
                  top: `${25 + i * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Wave particles animées */}
            {particlePositions.map((position, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                style={{
                  left: `${position.left}%`,
                  top: `${position.top}%`,
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.6,
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-6xl mx-auto px-4 py-16 mt-8">
          <motion.div
            initial={isClient ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }}
            whileInView={isClient ? { opacity: 1, y: 0 } : {}}
            transition={isClient ? { duration: 0.8 } : {}}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {/* About Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <motion.div
                  whileHover={isClient ? { rotate: 360 } : {}}
                  transition={isClient ? { duration: 0.5 } : {}}
                  className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
                >
                  <span className="text-white font-bold text-xl">JH</span>
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Jean-Philippe
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Développeur Full-Stack
                  </p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                Créateur d'expériences digitales modernes et performantes.
                Passionné par l'innovation et les nouvelles technologies.
              </p>

              {/* Skills */}
              <div className="flex space-x-4">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.label}
                      whileHover={isClient ? { scale: 1.1, rotate: 5 } : {}}
                      className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2"
                    >
                      <Icon className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-300">
                        {skill.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4">Navigation Rapide</h3>
              <div className="space-y-3">
                {[
                  { name: "Accueil", href: "#home" },
                  { name: "À propos", href: "#about" },
                  { name: "Projets", href: "#projects" },
                  { name: "Compétences", href: "#skills" },
                  { name: "Contact", href: "#contact" },
                ].map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    whileHover={isClient ? { x: 5 } : {}}
                    className="block text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      if (typeof document !== "undefined") {
                        document
                          .getElementById(link.href.substring(1))
                          ?.scrollIntoView({
                            behavior: "smooth",
                          });
                      }
                    }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Contact & Social */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4">Restons Connectés</h3>

              <div className="space-y-4">
                <p className="text-gray-300">
                  Prêt à collaborer ? Contactez-moi pour discuter de votre
                  prochain projet !
                </p>

                <Button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.open("mailto:contact@example.com");
                    }
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group"
                >
                  <Mail className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  Me contacter
                </Button>

                {/* Social Links */}
                <div className="flex space-x-4 pt-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={isClient ? { scale: 1.2, rotate: 5 } : {}}
                        whileTap={isClient ? { scale: 0.9 } : {}}
                        className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5 text-gray-300 hover:text-white" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Copyright */}
              <motion.p
                initial={isClient ? { opacity: 0 } : { opacity: 1 }}
                whileInView={isClient ? { opacity: 1 } : {}}
                className="flex items-center text-gray-400 text-sm"
              >
                © {currentYear} Jean-Philippe HEURTEUX. Conçu avec
                <motion.span
                  animate={isClient ? { scale: [1, 1.2, 1] } : {}}
                  transition={isClient ? { duration: 2, repeat: Infinity } : {}}
                  className="mx-1"
                >
                  <Heart className="w-4 h-4 text-red-500" />
                </motion.span>
                et
                <Coffee className="w-4 h-4 text-amber-500 mx-1" />
              </motion.p>

              {/* Back to Top */}
              <motion.button
                whileHover={isClient ? { scale: 1.1 } : {}}
                whileTap={isClient ? { scale: 0.9 } : {}}
                onClick={scrollToTop}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <ArrowUp className="w-4 h-4" />
                <span className="text-sm">Retour en haut</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
