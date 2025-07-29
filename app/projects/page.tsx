"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ExternalLink,
  Github,
  Calendar,
  Filter,
  Search,
  Eye,
  Code,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const projects = [
  {
    id: 2,
    title: "CS-50 Blog",
    description:
      "Application de Blog moderne avec gestion des médias et recherche par catégories et tags optimisé pour le SEO.",
    url: "https://cs50-blog-online.vercel.app/",
    github: "https://github.com/username/cs50-blog",
    image: "/images/cs50-blog-preview.jpg",
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
    ],
    techStack: [
      { name: "Next.js 15", color: "bg-black" },
      { name: "OpenAI API", color: "bg-green-600" },
      { name: "Prisma", color: "bg-indigo-600" },
      { name: "PostgreSQL", color: "bg-blue-800" },
    ],
    category: "Blog & CMS",
    duration: "4 mois",
  },
  {
    id: 4,
    title: "New Horizon",
    description:
      "Plateforme de réservation gratuite, de gestion d'un hébergement à la gestion des réservations.",
    url: "https://new-horizon-inky.vercel.app/",
    github: "https://github.com/username/new-horizon",
    image: "/images/new-horizon-preview.jpg",
    status: "completed",
    progress: 100,
    lastUpdate: "2024-11-30",
    features: [
      "Système de réservation en ligne avec calendrier interactif",
      "Gestion multi-propriétés et multi-chambres",
      "Tarification dynamique et promotions automatisées",
      "Check-in/Check-out numérique avec codes QR",
      "Paiements sécurisés (Stripe, PayPal) avec split payments",
      "Dashboard propriétaire avec métriques avancées",
    ],
    techStack: [
      { name: "Next.js 15", color: "bg-blue-500" },
      { name: "Node.js", color: "bg-green-600" },
      { name: "Stripe API", color: "bg-purple-600" },
      { name: "PostgreSQL", color: "bg-blue-800" },
    ],
    category: "Booking & Hospitality",
    duration: "5 mois",
  },
  {
    id: 7,
    title: "LMS Platform",
    description:
      "Application de gestion de contenu à destination des étudiants et des facilitateurs.",
    url: "https://lms.vercel.app/",
    github: "https://github.com/username/lms-platform",
    image: "/images/lms-preview.jpg",
    status: "in-progress",
    progress: 85,
    lastUpdate: "2024-12-20",
    features: [
      "Création de cours interactifs avec modules et chapitres",
      "Éditeur de contenu riche (vidéos, documents, quiz, exercices)",
      "Tableau de bord étudiant personnalisé",
      "Quiz interactifs avec correction automatique",
      "Recommandations de contenu personnalisées via IA",
      "Application mobile responsive (iOS/Android)",
    ],
    techStack: [
      { name: "Next.js 14", color: "bg-black" },
      { name: "OpenAI API", color: "bg-green-600" },
      { name: "Prisma", color: "bg-indigo-600" },
      { name: "PostgreSQL", color: "bg-blue-800" },
      { name: "Chart.js", color: "bg-pink-500" },
    ],
    category: "Education & LMS",
    duration: "4 mois",
  },
];

const categories = [
  "Tous",
  "Blog & CMS",
  "Booking & Hospitality",
  "Education & LMS",
  "FinTech",
];

type ProjectStatus = "completed" | "in-progress" | "planned";

const statusConfig: Record<
  ProjectStatus,
  {
    label: string;
    color: string;
    icon: React.ComponentType<any>;
  }
> = {
  completed: { label: "Terminé", color: "bg-green-500", icon: CheckCircle2 },
  "in-progress": { label: "En cours", color: "bg-blue-500", icon: Clock },
  planned: { label: "Planifié", color: "bg-yellow-500", icon: AlertCircle },
};

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "Tous" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <Code className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Mes{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Projets
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez mes réalisations récentes : des applications web modernes
            alliant innovation technique et expérience utilisateur
            exceptionnelle.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200 dark:border-gray-700"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-center">
            <Badge
              variant="secondary"
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
            >
              {filteredProjects.length} projet
              {filteredProjects.length > 1 ? "s" : ""} trouvé
              {filteredProjects.length > 1 ? "s" : ""}
            </Badge>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => {
            const StatusIcon =
              statusConfig[project.status as ProjectStatus]?.icon || Clock;
            return (
              <Card
                key={project.id}
                className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm overflow-hidden"
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
                  <div className="absolute top-4 left-4">
                    <Badge
                      className={`${
                        statusConfig[project.status as ProjectStatus]?.color
                      } text-white flex items-center gap-1`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig[project.status as ProjectStatus]?.label}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 text-gray-700"
                    >
                      {project.category}
                    </Badge>
                  </div>
                  {project.status === "in-progress" && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-white">
                          Progression
                        </span>
                        <span className="text-xs font-bold text-white">
                          {project.progress}%
                        </span>
                      </div>
                      <Progress
                        value={project.progress}
                        className="h-1 bg-white/30"
                      />
                    </div>
                  )}
                </div>

                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </CardTitle>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {project.duration}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, index) => (
                        <Badge
                          key={index}
                          className={`${tech.color} text-white text-xs`}
                        >
                          {tech.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Fonctionnalités clés
                    </h4>
                    <ul className="space-y-1">
                      {project.features.slice(0, 3).map((feature, index) => (
                        <li
                          key={index}
                          className="text-xs text-gray-600 dark:text-gray-300 flex items-start"
                        >
                          <CheckCircle2 className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {project.features.length > 3 && (
                        <li className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                          +{project.features.length - 3} autres
                          fonctionnalités...
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      asChild
                    >
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Voir le projet
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200 dark:border-gray-600"
                      asChild
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>

                  {/* Last Update */}
                  <div className="text-xs text-gray-500 text-center pt-2">
                    Dernière mise à jour :{" "}
                    {new Date(project.lastUpdate).toLocaleDateString("fr-FR")}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Aucun projet trouvé
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Essayez de modifier vos critères de recherche ou de filtrage.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-20 p-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm rounded-2xl border border-blue-200 dark:border-blue-800">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Un projet en tête ?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Ces réalisations reflètent ma passion pour le développement web
            moderne. Discutons de votre prochain projet ensemble !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold">
              Commencer un projet
            </Button>
            <Button
              variant="outline"
              className="px-8 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
            >
              Télécharger mon CV
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
