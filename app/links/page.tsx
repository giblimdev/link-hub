"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Globe,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Mail,
  Smartphone,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type ProjectStatus = "completed" | "in-progress" | "beta";

interface Project {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string;
  status: ProjectStatus;
  progress: number;
  lastUpdate: string;
  features: string[];
  techStack: { name: string; color: string }[];
  category: string;
  duration: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Link-Hub",
    description:
      "Portfolio moderne avec présentation de projets et interface interactive pour présenter mes créations.",
    url: "https://link-hub-pi.vercel.app/",
    image: "/images/link-hub-preview.jpg",
    status: "completed",
    progress: 100,
    lastUpdate: "2025-07-25",
    features: [
      "Affichage responsive des projets",
      "Filtrage par catégorie avec animations",
      "Détails des technologies utilisées",
      "Animations fluides avec Framer Motion",
      "Design moderne avec glassmorphism",
      "Hover effects interactifs",
    ],
    techStack: [
      { name: "Next.js 15", color: "bg-black" },
      { name: "TypeScript", color: "bg-blue-600" },
      { name: "Tailwind CSS", color: "bg-cyan-500" },
      { name: "Framer Motion", color: "bg-purple-600" },
      { name: "ShadCN/UI", color: "bg-gray-800" },
    ],
    category: "Portfolio",
    duration: "1 mois",
  },
  {
    id: 2,
    title: "CS-50 Blog",
    description:
      "Application de Bllog moderne avec  gestion des medias et recherche par cathegories et tag optimisé pour le SEO.",
    url: "https://cs50-blog-online.vercel.app/",
    image: "/images/fm-next-preview.jpg",
    status: "in-progress",
    progress: 85,
    lastUpdate: "2025-07-15",
    features: [
      "Éditeur de contenu WYSIWYG avec support Markdown",
      "Gestion avancée des médias (images, vidéos, documents)",
      "Système de catégorisation et tags intelligents",
      "Optimisation SEO automatique (meta tags, sitemap, schema markup)",
      "Recherche full-text avec filtres avancés",
      "Système de commentaires modéré avec authentification",
      "Tableau de bord analytique (vues, engagement, top articles)",
      "Mode sombre/clair avec préférences utilisateur",
      "Newsletter intégrée avec gestion des abonnés",
      "Partage social optimisé avec Open Graph",
      "Sauvegarde automatique des brouillons",
      "Planification de publication d'articles",
      "Système de révisions et historique des versions",
      "Génération automatique de résumés d'articles",
    ],
    techStack: [
      { name: "Next.js 15", color: "bg-black" },
      { name: "OpenAI API", color: "bg-green-600" },
      { name: "Prisma", color: "bg-indigo-600" },
      { name: "PostgreSQL", color: "bg-blue-800" },
    ],
    category: "FinTech",
    duration: "4 mois",
  },
  {
    id: 3,
    title: "ProjectManager",
    description:
      "Application complète de gestion de projets avec suivi des tâches, collaboration d'équipe et analytics.",
    url: "https://project-manager-online.vercel.app/",
    image: "/images/project-manager-preview.jpg",
    status: "completed",
    progress: 100,
    lastUpdate: "2024-12-10",
    features: [
      "Dashboard analytics avancé",
      "Gestion des tâches avec drag & drop",
      "Collaboration temps réel",
      "Système de notifications",
      "Rapports automatisés",
      "Intégrations tierces",
    ],
    techStack: [
      { name: "React", color: "bg-blue-500" },
      { name: "TypeScript", color: "bg-blue-600" },
      { name: "Node.js", color: "bg-green-600" },
      { name: "MongoDB", color: "bg-green-500" },
      { name: "Socket.io", color: "bg-gray-700" },
    ],
    category: "Management",
    duration: "3 mois",
  },

  {
    id: 4,
    title: "New Horizon",
    description:
      "Pate forme de reservation gratuite. de gestion d'un hebergement  à la gesstion des reservation.",
    url: "https://new-horizon-inky.vercel.app/",
    image: "/images/new-horizon-preview.jpg",
    status: "completed",
    progress: 100,
    lastUpdate: "2024-11-30",
    features: [
      "Système de réservation en ligne avec calendrier interactif",
      "Gestion multi-propriétés et multi-chambres",
      "Tarification dynamique et promotions automatisées",
      "Check-in/Check-out numérique avec codes QR",
      "Gestion des disponibilités en temps réel",
      "Messagerie intégrée hôte-voyageur",
      "Notifications push et SMS automatiques",
      "Chat en temps réel avec support multilingue",
      "Système de reviews et évaluations bidirectionnelles",
      "Paiements sécurisés (Stripe, PayPal) avec split payments",
      "Facturation automatique et reçus électroniques",
      "Tableau de bord financier avec analytics",
      "Synchronisation automatique avec OTAs (Booking, Airbnb)",
      "Gestion intelligente du ménage et maintenance",
      "Système de concierge virtuel avec IA",
      "Géolocalisation et recommandations locales",
      "Dashboard propriétaire avec métriques avancées",
      "Gestion des équipes et permissions granulaires",
      "Backup automatique et historique des données",
      "API REST pour intégrations tierces",
    ],
    techStack: [
      { name: "Next15", color: "bg-blue-500" },
      { name: "Node.js", color: "bg-green-600" },
    ],
    category: "Productivity",
    duration: "5 mois",
  },
  {
    id: 5,
    title: "FM OnLine",
    description:
      "Application présentant des documents et permettent un apprentissages de  ces dernier.",
    url: "https://fm-online-ten.vercel.app/",
    image: "/images/fm-next-preview.jpg",
    status: "in-progress",
    progress: 85,
    lastUpdate: "202-07-20",
    features: [
      "gestion de l'authentification et des autorisations",
      "lecture dynamique de documents",
      "aide à l'apprentissage",
    ],
    techStack: [
      { name: "Next.js 15", color: "bg-black" },
      { name: "BetterAuth", color: "bg-green-600" },
      { name: "Prisma", color: "bg-indigo-600" },
      { name: "PostgreSQL", color: "bg-blue-800" },
    ],
    category: "FinTech",
    duration: "4 mois",
  },
  {
    id: 6,
    title: "FM Next",
    description: "Application  delecture de rituel simple et fonctionnelle.",
    url: "https://fm-next-jade.vercel.app/",
    image: "/images/fm-next-preview.jpg",
    status: "in-progress",
    progress: 85,
    lastUpdate: "2024-12-20",
    features: [
      "présentation des rituelles",
      "lecture dynamique de rituelles avec pagination",
      "aide à l'apprentissage des rituelles",
    ],
    techStack: [
      { name: "Next.js 14", color: "bg-black" },
      { name: "OpenAI API", color: "bg-green-600" },
      { name: "Prisma", color: "bg-indigo-600" },
      { name: "PostgreSQL", color: "bg-blue-800" },
      { name: "Chart.js", color: "bg-pink-500" },
    ],
    category: "FinTech",
    duration: "4 mois",
  },
  {
    id: 7,
    title: "LMS",
    description:
      "Application de gestion de contenue a d'estination ds étudiant et des facilitateurs.",
    url: "https://lms.vercel.app/",
    image: "/images/fm-next-preview.jpg",
    status: "in-progress",
    progress: 85,
    lastUpdate: "2024-12-20",
    features: [
      // Gestion des cours et contenu
      "Création de cours interactifs avec modules et chapitres",
      "Éditeur de contenu riche (vidéos, documents, quiz, exercices)",
      "Bibliothèque de ressources pédagogiques organisée",
      "Upload et streaming vidéo optimisé",

      // Expérience étudiante
      "Tableau de bord étudiant personnalisé",
      "Suivi de progression avec badges et certifications",
      "Système de notation et évaluations automatisées",
      "Forums de discussion par cours",
      "Messagerie directe étudiant-facilitateur",

      // Outils pédagogiques avancés
      "Quiz interactifs avec correction automatique",
      "Système de peer review et évaluation par les pairs",

      // Gestion administrative
      "Gestion des inscriptions et cohortes",
      "Système de présence et assiduité",
      "Génération de rapports de performance",
      "Gestion des certificats et diplômes numériques",

      // Accessibilité et mobilité
      "Application mobile responsive (iOS/Android)",
      "Mode hors-ligne pour contenus téléchargés",
      "Support multi-langues",
      "Fonctionnalités d'accessibilité (WCAG 2.1)",
      "Thèmes personnalisables",
    ],
    techStack: [
      { name: "Next.js 15", color: "bg-black" },
      { name: "Prisma", color: "bg-indigo-600" },
      { name: "PostgreSQL", color: "bg-blue-800" },
    ],
    category: "FinTech",
    duration: "4 mois",
  },
  {
    id: 8,
    title: "Next-Store",
    description:
      "Application de e-commerce moderne avec gestion des produits, panier et paiement.",
    url: "https://next-store-navy-one.vercel.app/",
    image: "/images/fm-next-preview.jpg",
    status: "in-progress",
    progress: 85,
    lastUpdate: "2024-12-20",
    features: [
      "Gestion des produits avec catégories et filtres",
      "Panier d'achat dynamique avec gestion des quantités",
      "Processus de paiement sécurisé (Stripe, PayPal)",
      "Système de gestion des commandes et historique",
      "Notifications par email pour les commandes",
      "Intégration de la gestion des stocks",
      "Système de wishlist et favoris",
      "Avis et évaluations des produits",
      "Tableau de bord administrateur pour la gestion des produits",
      "Support multi-langues et multi-devises",
      "Optimisation SEO pour les produits",
      "Intégration de Google Analytics pour le suivi des ventes",
      "Système de coupons et promotions",
      "Gestion des retours et remboursements",
      "Support client intégré (chat en direct, FAQ)",
      "Système de recommandation de produits",
      "Intégration de la logistique (suivi des livraisons)",
      "Gestion des utilisateurs et permissions",
      "API REST pour intégrations tierces",
      "Mode sombre/clair avec préférences utilisateur",
      "Sauvegarde automatique des données",
      "Génération de rapports de ventes et performance",
      "Support des abonnements et produits récurrents",
      "Intégration de la gestion des taxes",
      "Système de parrainage et fidélisation",
      "Gestion des promotions saisonnières",
      "Support des marketplaces (Amazon, eBay)",
    ],
    techStack: [
      { name: "Next.js 14", color: "bg-black" },
      { name: "OpenAI API", color: "bg-green-600" },
      { name: "Prisma", color: "bg-indigo-600" },
      { name: "PostgreSQL", color: "bg-blue-800" },
      { name: "Chart.js", color: "bg-pink-500" },
    ],
    category: "FinTech",
    duration: "4 mois",
  },
];

const statusConfig = {
  completed: {
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
    label: "Terminé",
  },
  "in-progress": {
    icon: Clock,
    color: "text-blue-600",
    bg: "bg-blue-100",
    label: "En cours",
  },
  beta: {
    icon: AlertCircle,
    color: "text-orange-600",
    bg: "bg-orange-100",
    label: "Beta",
  },
} as const;

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const categories = [
    "all",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const toggleProjectExpansion = (projectId: number) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Mon Portfolio
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Développeur Full-Stack passionné par la création d'applications web
            modernes.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              contact@example.com
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              +33 1 23 45 67 89
            </Button>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category === "all" ? "Tous" : category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const StatusIcon = statusConfig[project.status].icon;
            const statusColor = statusConfig[project.status].color;
            const statusBg = statusConfig[project.status].bg;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  {/* Project Header */}
                  <div
                    className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden cursor-pointer"
                    onClick={() => toggleProjectExpansion(project.id)}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 right-4">
                      <Badge className={`${statusBg} ${statusColor} border-0`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig[project.status].label}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-white/20 text-white border-0"
                      >
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Project Content */}
                  <CardContent className="flex-1 flex flex-col p-6">
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Avancement
                        </span>
                        <span className="text-sm font-bold text-blue-600">
                          {project.progress}%
                        </span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Technologies
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 3).map((tech, index) => (
                          <Badge
                            key={index}
                            className={`${tech.color} text-white text-xs border-0`}
                          >
                            {tech.name}
                          </Badge>
                        ))}
                        {project.techStack.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.techStack.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="flex gap-2">
                        <Button
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.url, "_blank");
                          }}
                        >
                          <Globe className="w-4 h-4 mr-2" />
                          Voir le projet
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.url, "_blank");
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Expanded Details Modal */}
                <AnimatePresence>
                  {expandedProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                      onClick={() => setExpandedProject(null)}
                    >
                      <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-6">
                            <h2 className="text-2xl font-bold">
                              {project.title}
                            </h2>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setExpandedProject(null)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </Button>
                          </div>

                          <div className="space-y-6">
                            <div>
                              <h3 className="font-semibold mb-2">
                                Description
                              </h3>
                              <p className="text-gray-700">
                                {project.description}
                              </p>
                            </div>

                            <div>
                              <h3 className="font-semibold mb-2">
                                Fonctionnalités
                              </h3>
                              <ul className="space-y-2">
                                {project.features.map((feature, index) => (
                                  <li key={index} className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h3 className="font-semibold mb-2">
                                Stack Technique
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech, index) => (
                                  <Badge
                                    key={index}
                                    className={`${tech.color} text-white`}
                                  >
                                    {tech.name}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-4">
                              <Button
                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                onClick={() =>
                                  window.open(project.url, "_blank")
                                }
                              >
                                <Globe className="w-4 h-4 mr-2" />
                                Visiter le site
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              Intéressé par une collaboration ?
            </h2>
            <p className="text-gray-600 mb-6">
              N'hésitez pas à me contacter pour discuter de vos projets.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Mail className="w-5 h-5 mr-2" />
                Me contacter
              </Button>
              <Button variant="outline" size="lg">
                <Github className="w-5 h-5 mr-2" />
                Voir GitHub
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
