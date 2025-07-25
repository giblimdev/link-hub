"use client";

import React, { useState, useEffect, useRef, JSX } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  Variants,
  Transition,
} from "framer-motion";
import {
  ArrowDown,
  Code,
  Palette,
  Zap,
  Star,
  Github,
  Linkedin,
  Mail,
  Download,
  Play,
  ChevronRight,
  Sparkles,
  Rocket,
  Heart,
  Coffee,
  MousePointer,
  Eye,
  Award,
  TrendingUp,
  Users,
  Clock,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface TypingAnimationProps {
  texts: string[];
  className?: string;
}

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  status: string;
  color: string;
}

interface Stat {
  label: string;
  value: number;
  suffix: string;
}

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
}

interface SkillCard {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  color: string;
}

/* -------------------------------------------------------------------------- */
/*                               ANIMATED BACKGROUND - FIXÉ                  */
/* -------------------------------------------------------------------------- */

const FloatingElements: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  // Éléments prédéfinis pour éviter l'hydratation mismatch
  const elements: FloatingElement[] = [
    { id: 0, x: 29.38, y: 58.05, size: 29.09, duration: 15.2, delay: 2.1 },
    { id: 1, x: 58.27, y: 37.64, size: 47.54, duration: 18.7, delay: 1.3 },
    { id: 2, x: 57.85, y: 18.15, size: 31.81, duration: 12.4, delay: 4.2 },
    { id: 3, x: 11.89, y: 34.95, size: 42.32, duration: 20.1, delay: 0.8 },
    { id: 4, x: 78.28, y: 48.08, size: 23.8, duration: 16.3, delay: 3.5 },
    { id: 5, x: 87.56, y: 35.87, size: 20.13, duration: 14.9, delay: 1.7 },
    { id: 6, x: 88.21, y: 44.55, size: 21.04, duration: 19.2, delay: 2.9 },
    { id: 7, x: 12.14, y: 16.66, size: 25.99, duration: 11.8, delay: 4.1 },
    { id: 8, x: 16.22, y: 32.11, size: 42.28, duration: 17.5, delay: 0.6 },
    { id: 9, x: 17.88, y: 11.47, size: 43.46, duration: 13.7, delay: 3.2 },
    { id: 10, x: 3.03, y: 33.26, size: 36.27, duration: 15.9, delay: 1.4 },
    { id: 11, x: 0.56, y: 49.28, size: 48.38, duration: 21.3, delay: 2.8 },
    { id: 12, x: 83.28, y: 8.61, size: 36.4, duration: 12.6, delay: 4.7 },
    { id: 13, x: 61.47, y: 87.76, size: 37.68, duration: 18.1, delay: 1.9 },
    { id: 14, x: 22.98, y: 59.22, size: 48.93, duration: 16.8, delay: 3.6 },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {elements.map((element) => (
          <div
            key={element.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-xl"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: element.size,
              height: element.size,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: element.size,
            height: element.size,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.7, 0.4, 0.3],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                               TYPING ANIMATION                            */
/* -------------------------------------------------------------------------- */

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  texts,
  className = "",
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [currentText, setCurrentText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const fullText = texts[currentTextIndex];

        if (!isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length + 1));
          if (currentText === fullText) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setCurrentText(fullText.substring(0, currentText.length - 1));
          if (currentText === "") {
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-blue-500"
      >
        |
      </motion.span>
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 SCROLL REVEAL                             */
/* -------------------------------------------------------------------------- */

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = "up",
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: "easeOut",
      } as Transition,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                STATS COUNTER                              */
/* -------------------------------------------------------------------------- */

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  suffix = "",
  duration = 2,
}) => {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min(
          (timestamp - startTime) / (duration * 1000),
          1
        );
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-bold text-3xl">
      {count}
      {suffix}
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                              */
/* -------------------------------------------------------------------------- */

export default function HomePage(): JSX.Element {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll-based animations
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Loading state
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Mouse tracking avec debounce
  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const skills: Skill[] = [
    { name: "React/Next.js", level: 95, color: "from-blue-500 to-cyan-500" },
    { name: "TypeScript", level: 90, color: "from-blue-600 to-indigo-600" },
    { name: "Node.js", level: 88, color: "from-green-500 to-emerald-500" },
    { name: "UI/UX Design", level: 85, color: "from-purple-500 to-pink-500" },
    { name: "MongoDB", level: 82, color: "from-green-600 to-teal-600" },
  ];

  const projects: Project[] = [
    {
      title: "Link-Hub",
      description: "Portfolio interactif moderne",
      tech: ["Next.js", "Framer Motion", "TypeScript"],
      status: "Terminé",
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "ProjectManager",
      description: "Application de gestion complète",
      tech: ["React", "Node.js", "MongoDB"],
      status: "Terminé",
      color: "from-green-500 to-teal-500",
    },
    {
      title: "FM Next",
      description: "Suivi financier avec IA",
      tech: ["Next.js", "OpenAI", "Prisma"],
      status: "En cours",
      color: "from-orange-500 to-red-500",
    },
  ];

  const stats: Stat[] = [
    { label: "Projets Réalisés", value: 15, suffix: "+" },
    { label: "Clients Satisfaits", value: 12, suffix: "" },
    { label: "Tasses de Café", value: 247, suffix: "" },
    { label: "Lignes de Code", value: 50, suffix: "k+" },
  ];

  const socialLinks: SocialLink[] = [
    { icon: Github, href: "https://github.com", color: "hover:text-gray-900" },
    {
      icon: Linkedin,
      href: "https://linkedin.com",
      color: "hover:text-blue-600",
    },
    {
      icon: Mail,
      href: "mailto:contact@example.com",
      color: "hover:text-red-500",
    },
  ];

  const skillCards: SkillCard[] = [
    {
      icon: Code,
      title: "Frontend",
      desc: "React, Next.js, TypeScript",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Backend",
      desc: "Node.js, Express, APIs",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Palette,
      title: "Design",
      desc: "UI/UX, Figma, Animation",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Award,
      title: "DevOps",
      desc: "Docker, AWS, CI/CD",
      color: "from-orange-500 to-red-500",
    },
  ];

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Custom Cursor - Optimisé */}
      <motion.div
        className="fixed w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.3,
        }}
      />

      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"
      >
        <FloatingElements />

        {/* Grid Pattern optimisé */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform-gpu z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Hero Section */}
      <motion.section
        id="home"
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center px-4"
      >
        <div className="text-center max-w-4xl mx-auto relative z-10">
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 border border-blue-200 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Développeur Full-Stack Passionné
            </Badge>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Jean-Philippe HEURTEUX
            </span>
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 h-12 flex items-center justify-center"
          >
            Je crée des{" "}
            <TypingAnimation
              texts={[
                "applications web modernes",
                "expériences utilisateur uniques",
                "solutions digitales innovantes",
                "interfaces créatives",
              ]}
              className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Développeur passionné avec <strong>3+ années d'expérience</strong>,
            je transforme vos idées en réalités digitales époustouflantes avec
            les technologies les plus récentes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Eye className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Découvrir mes projets
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 hover:border-blue-400 px-8 py-4 text-lg font-semibold hover:bg-blue-50 transition-all duration-300 group"
              onClick={() => window.open("mailto:contact@example.com")}
            >
              <Mail className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Me contacter
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col items-center"
          >
            <p className="text-sm text-gray-500 mb-2">Découvrez mon univers</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="cursor-pointer"
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <ArrowDown className="w-6 h-6 text-blue-500" />
            </motion.div>
          </motion.div>
        </div>

        {/* Hero Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-200 rounded-full opacity-20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-purple-200 rounded-full opacity-20"
          />
        </div>
      </motion.section>

      {/* About Section */}
      <section
        id="about"
        className="relative py-32 px-4 bg-white/50 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-700 border border-green-200 mb-4">
                <User className="w-4 h-4 mr-2" />À propos de moi
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Passionné par l'innovation
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Développeur Full-Stack avec une passion dévorante pour la
                  création d'expériences digitales exceptionnelles. Chaque ligne
                  de code que j'écris est guidée par l'innovation et la
                  recherche de la perfection.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Spécialisé dans l'écosystème React/Next.js, je maîtrise
                  également les technologies backend modernes pour créer des
                  applications complètes et performantes.
                </p>

                <div className="flex flex-wrap gap-3 py-4">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Node.js",
                    "MongoDB",
                    "Tailwind",
                  ].map((tech) => (
                    <Badge
                      key={tech}
                      className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    onClick={() => window.open("/cv.pdf", "_blank")}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger CV
                  </Button>

                  <div className="flex gap-2">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <Button
                          key={index}
                          variant="outline"
                          size="icon"
                          className={`${social.color} transition-colors duration-200`}
                          onClick={() => window.open(social.href, "_blank")}
                        >
                          <Icon className="w-4 h-4" />
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur-xl opacity-20" />
                <Card className="relative bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center"
                      >
                        <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                          <AnimatedCounter
                            end={stat.value}
                            suffix={stat.suffix}
                          />
                        </div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 border border-purple-200 mb-4">
                <Code className="w-4 h-4 mr-2" />
                Mes Compétences
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Technologies Maîtrisées
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
              <div className="space-y-8">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">
                        {skill.name}
                      </span>
                      <span className="font-bold text-gray-600">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-6">
                {skillCards.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      className="group"
                    >
                      <Card className="p-6 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="relative py-32 px-4 bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 border border-blue-200 mb-4">
                <Rocket className="w-4 h-4 mr-2" />
                Mes Réalisations
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Projets Récents
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10, rotateY: 5 }}
                  className="group h-full"
                >
                  <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm overflow-hidden">
                    <div
                      className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                          {project.status}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {project.title}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group"
                        onClick={() => window.open("/links", "_blank")}
                      >
                        <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Voir le projet
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="text-center mt-12">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-300 hover:bg-blue-50 hover:border-blue-400 px-8 py-4 group"
                onClick={() => window.open("/links", "_blank")}
              >
                <Eye className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Voir tous mes projets
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="relative py-32 px-4">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-xl" />
              <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl p-12">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex justify-center mb-6">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Rocket className="w-16 h-16 text-blue-500" />
                    </motion.div>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Prêt à créer quelque chose d'incroyable ?
                    </span>
                  </h2>

                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Transformons ensemble vos idées en réalité digitale.
                    Contactez-moi et donnons vie à votre vision !
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg group shadow-xl hover:shadow-2xl transition-all duration-300"
                      onClick={() => window.open("mailto:contact@example.com")}
                    >
                      <Mail className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                      Démarrons un projet
                      <Sparkles className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-gray-300 hover:border-purple-400 px-8 py-4 text-lg group hover:bg-purple-50 transition-all duration-300"
                      onClick={() =>
                        window.open("https://calendly.com", "_blank")
                      }
                    >
                      <Clock className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                      Planifier un appel
                    </Button>
                  </div>
                </motion.div>
              </Card>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Made with Love Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="text-center py-8 text-gray-500"
      >
        <p className="flex items-center justify-center gap-2 text-sm">
          Conçu avec
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-4 h-4 text-red-500" />
          </motion.span>
          et beaucoup de
          <Coffee className="w-4 h-4 text-amber-500" />
        </p>
      </motion.div>
    </div>
  );
}
