import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Code2,
  Database,
  Palette,
  Users,
  MessageCircle,
  Target,
  Lightbulb,
  Heart,
  Zap,
  Brain,
} from "lucide-react";

const hardSkills = [
  {
    category: "Frontend Development",
    icon: <Code2 className="w-6 h-6" />,
    skills: [
      { name: "Next.js 15", level: 95, color: "bg-black" },
      { name: "React 18", level: 90, color: "bg-blue-500" },
      { name: "TypeScript", level: 85, color: "bg-blue-600" },
      { name: "Tailwind CSS", level: 90, color: "bg-cyan-500" },
      { name: "JavaScript ES6+", level: 88, color: "bg-yellow-500" },
    ],
  },
  {
    category: "Backend & Database",
    icon: <Database className="w-6 h-6" />,
    skills: [
      { name: "Node.js", level: 80, color: "bg-green-600" },
      { name: "Prisma ORM", level: 85, color: "bg-indigo-600" },
      { name: "PostgreSQL", level: 75, color: "bg-blue-800" },
      { name: "API REST", level: 82, color: "bg-purple-600" },
      { name: "MongoDB", level: 70, color: "bg-green-700" },
    ],
  },
  {
    category: "Outils & Technologies",
    icon: <Palette className="w-6 h-6" />,
    skills: [
      { name: "Git/GitHub", level: 85, color: "bg-gray-800" },
      { name: "Vercel", level: 90, color: "bg-black" },
      { name: "OpenAI API", level: 75, color: "bg-green-600" },
      { name: "Chart.js", level: 70, color: "bg-pink-500" },
      { name: "Figma", level: 80, color: "bg-purple-500" },
    ],
  },
];

const softSkills = [
  {
    name: "Leadership",
    description:
      "Capacité à guider et motiver une équipe vers l'atteinte d'objectifs communs",
    icon: <Users className="w-8 h-8 text-blue-600" />,
    level: 85,
  },
  {
    name: "Communication",
    description:
      "Excellente communication écrite et orale, adaptation au public",
    icon: <MessageCircle className="w-8 h-8 text-green-600" />,
    level: 90,
  },
  {
    name: "Résolution de problèmes",
    description:
      "Approche analytique et créative pour résoudre des défis complexes",
    icon: <Target className="w-8 h-8 text-purple-600" />,
    level: 88,
  },
  {
    name: "Créativité",
    description:
      "Innovation dans la conception d'interfaces et solutions techniques",
    icon: <Lightbulb className="w-8 h-8 text-yellow-600" />,
    level: 85,
  },
  {
    name: "Empathie",
    description:
      "Compréhension des besoins utilisateurs et collaboration bienveillante",
    icon: <Heart className="w-8 h-8 text-red-600" />,
    level: 92,
  },
  {
    name: "Adaptabilité",
    description: "Flexibilité face aux changements et apprentissage continu",
    icon: <Zap className="w-8 h-8 text-orange-600" />,
    level: 87,
  },
  {
    name: "Esprit critique",
    description: "Analyse objective et prise de décisions éclairées",
    icon: <Brain className="w-8 h-8 text-indigo-600" />,
    level: 83,
  },
];

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Mes <span className="text-blue-600">Compétences</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Un aperçu de mes compétences techniques et qualités humaines qui me
            permettent de créer des solutions innovantes et de collaborer
            efficacement.
          </p>
        </div>

        {/* Hard Skills Section */}
        <section className="mb-20">
          <div className="flex items-center mb-8">
            <Code2 className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Compétences Techniques
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {hardSkills.map((category, categoryIndex) => (
              <Card
                key={categoryIndex}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <Badge
                          variant="secondary"
                          className={`${skill.color} text-white`}
                        >
                          {skill.level}%
                        </Badge>
                      </div>
                      <Progress
                        value={skill.level}
                        className="h-2 bg-gray-200 dark:bg-gray-700"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Soft Skills Section */}
        <section>
          <div className="flex items-center mb-8">
            <Heart className="w-8 h-8 text-red-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Qualités Humaines
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {softSkills.map((skill, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {skill.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-500">
                        Niveau
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {skill.level}%
                      </Badge>
                    </div>
                    <Progress
                      value={skill.level}
                      className="h-1.5 bg-gray-200 dark:bg-gray-700"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Intéressé par une collaboration ?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Ces compétences sont au service de vos projets web innovants.
            Discutons de la façon dont je peux contribuer à votre succès.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
              Me Contacter
            </button>
            <button className="px-8 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-colors">
              Voir mes Projets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
