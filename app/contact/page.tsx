"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader2,
  Github,
  Linkedin,
  Twitter,
  Calendar,
  Clock,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@johndoe.dev",
    href: "mailto:contact@johndoe.dev",
    color: "from-blue-500 to-blue-600",
    hoverColor: "hover:text-blue-500",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+33 1 23 45 67 89",
    href: "tel:+33123456789",
    color: "from-green-500 to-green-600",
    hoverColor: "hover:text-green-500",
  },
  {
    icon: MapPin,
    label: "Localisation",
    value: "Paris, France",
    href: "https://maps.google.com/?q=Paris,France",
    color: "from-red-500 to-red-600",
    hoverColor: "hover:text-red-500",
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com",
    color: "hover:text-gray-900",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com",
    color: "hover:text-blue-600",
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: "https://twitter.com",
    color: "hover:text-blue-400",
  },
];

const availabilityInfo = [
  {
    icon: Clock,
    label: "Réponse",
    value: "< 24h",
    description: "Temps de réponse moyen",
  },
  {
    icon: Calendar,
    label: "Disponibilité",
    value: "Ouvert",
    description: "Nouveau projet",
  },
  {
    icon: Globe,
    label: "Fuseau horaire",
    value: "GMT+1",
    description: "Paris, France",
  },
];

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Le sujet est requis";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("loading");

    // Simulation d'envoi
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset status après 5 secondes
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      id="contact"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* ------------------------------------------------------------------ */}
        {/*                                HEADER                              */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            Contact
          </Badge>

          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Parlons de votre projet
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Une idée en tête ? Un projet à concrétiser ? N'hésitez pas à me
            contacter. Je serais ravi de discuter avec vous et de donner vie à
            vos ambitions digitales.
          </p>
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/*                            MAIN CONTENT                           */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* --------------------------- FORM ----------------------------- */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  Envoyez-moi un message
                </CardTitle>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <div className="relative">
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Votre nom"
                          className={cn(
                            "pl-10 transition-colors",
                            errors.name && "border-red-500 focus:border-red-500"
                          )}
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="votre@email.com"
                          className={cn(
                            "pl-10 transition-colors",
                            errors.email &&
                              "border-red-500 focus:border-red-500"
                          )}
                        />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet *
                    </label>
                    <div className="relative">
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Sujet de votre message"
                        className={cn(
                          "pl-10 transition-colors",
                          errors.subject &&
                            "border-red-500 focus:border-red-500"
                        )}
                      />
                      <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Décrivez votre projet, vos besoins, vos attentes..."
                      rows={6}
                      className={cn(
                        "resize-none transition-colors",
                        errors.message && "border-red-500 focus:border-red-500"
                      )}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.message}
                      </p>
                    )}
                    <p className="text-gray-400 text-xs mt-1">
                      {formData.message.length} caractères (minimum 10)
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 h-12 text-base font-medium"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </Button>

                  {/* Status Messages */}
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>
                        Message envoyé avec succès ! Je vous répondrai
                        rapidement.
                      </span>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800"
                    >
                      <AlertCircle className="w-5 h-5" />
                      <span>Erreur lors de l'envoi. Veuillez réessayer.</span>
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* --------------------------- SIDEBAR -------------------------- */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Contact Info */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Informations de contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      target={
                        info.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        info.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={cn(
                        "flex items-center gap-4 p-3 rounded-lg transition-all duration-200 group hover:bg-gray-50",
                        info.hoverColor
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r",
                          info.color
                        )}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {info.label}
                        </p>
                        <p className="text-gray-600 text-sm">{info.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Disponibilité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {availabilityInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <div key={info.label} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">
                            {info.label}:
                          </span>
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800"
                          >
                            {info.value}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-xs">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Suivez-moi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 transition-colors",
                          social.color
                        )}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
