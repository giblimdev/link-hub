"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Code,
  Mail,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Accueil", href: "#home", icon: Home },
  { name: "À propos", href: "#about", icon: User },
  { name: "Projets", href: "#projects", icon: Briefcase },
  { name: "Compétences", href: "#skills", icon: Code },
  { name: "Contact", href: "#contact", icon: Mail },
  { name: "Liens", href: "/links", icon: ExternalLink },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Détection du scroll pour effet de transparence - Optimisé
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Détection de la section active - Optimisé
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = navItems
            .filter((item) => item.href.startsWith("#"))
            .map((item) => item.href.substring(1));

          const current = sections.find((section) => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 100 && rect.bottom >= 100;
            }
            return false;
          });

          if (current) setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setIsOpen(false);
    if (href.startsWith("#")) {
      const element = document.getElementById(href.substring(1));
      element?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Fermer le menu mobile lors du redimensionnement
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavClick("#home")}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">JH</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Jean-Philippe HEURTEUX
              </span>
            </div>
          </motion.div>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive =
                activeSection === item.href.substring(1) ||
                (item.href === "/links" &&
                  typeof window !== "undefined" &&
                  window.location.pathname === "/links");

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.href.startsWith("#") ? (
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 hover:bg-accent group",
                        isActive
                          ? "text-primary bg-accent"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg border border-blue-600/20"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 hover:bg-accent group",
                        isActive
                          ? "text-primary bg-accent"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>{item.name}</span>
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden md:block">
            <Button
              onClick={() => handleNavClick("#contact")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
              size="sm"
            >
              <Mail className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
              Contactez-moi
            </Button>
          </div>

          {/* Menu Mobile */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>

        {/* Menu Mobile Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
                onClick={() => setIsOpen(false)}
              />

              {/* Menu Content */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-4 z-40"
              >
                <div className="space-y-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive =
                      activeSection === item.href.substring(1) ||
                      (item.href === "/links" &&
                        typeof window !== "undefined" &&
                        window.location.pathname === "/links");

                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {item.href.startsWith("#") ? (
                          <button
                            onClick={() => handleNavClick(item.href)}
                            className={cn(
                              "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group",
                              isActive
                                ? "bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-primary border border-blue-600/20"
                                : "hover:bg-accent text-muted-foreground hover:text-foreground"
                            )}
                          >
                            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="font-medium">{item.name}</span>
                          </button>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group",
                              isActive
                                ? "bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-primary border border-blue-600/20"
                                : "hover:bg-accent text-muted-foreground hover:text-foreground"
                            )}
                          >
                            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}

                  {/* CTA Mobile */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.05 }}
                    className="pt-4 border-t border-gray-200/50"
                  >
                    <Button
                      onClick={() => handleNavClick("#contact")}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg group"
                      size="lg"
                    >
                      <Mail className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                      Contactez-moi
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Barre de progression de scroll */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
        style={{
          scaleX:
            typeof window !== "undefined"
              ? window.scrollY /
                (document.documentElement.scrollHeight - window.innerHeight)
              : 0,
          transformOrigin: "0%",
        }}
        initial={{ scaleX: 0 }}
        animate={{
          scaleX:
            typeof window !== "undefined"
              ? window.scrollY /
                (document.documentElement.scrollHeight - window.innerHeight)
              : 0,
        }}
        transition={{ duration: 0.1 }}
      />
    </motion.header>
  );
}
