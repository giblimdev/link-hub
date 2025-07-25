"use client";

import React from "react";
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
  const currentYear = new Date().getFullYear();

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl"
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
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
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {/* About Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">JH</span>
                </div>
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
                      whileHover={{ scale: 1.1, rotate: 5 }}
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
                    whileHover={{ x: 5 }}
                    className="block text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById(link.href.substring(1))
                        ?.scrollIntoView({
                          behavior: "smooth",
                        });
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
                  onClick={() => window.open("mailto:contact@example.com")}
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
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
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
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="flex items-center text-gray-400 text-sm"
              >
                © {currentYear} Jean-Philippe HEURTEUX. Conçu avec
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mx-1"
                >
                  <Heart className="w-4 h-4 text-red-500" />
                </motion.span>
                et
                <Coffee className="w-4 h-4 text-amber-500 mx-1" />
              </motion.p>

              {/* Back to Top */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
