"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "متجر إلكتروني متكامل",
    category: "تطوير ويب",
    image: "/modern-ecommerce-dark.png",
  },
  {
    title: "تطبيق توصيل طعام",
    category: "تطبيقات موبايل",
    image: "/food-delivery-mobile-app-dark-interface.jpg",
  },
  {
    title: "نظام إدارة مخزون",
    category: "أنظمة مخصصة",
    image: "/inventory-management-dashboard-dark-theme.jpg",
  },
  {
    title: "منصة تعليمية",
    category: "تطوير ويب",
    image: "/online-learning-platform-dark-mode.jpg",
  },
  {
    title: "تطبيق حجز مواعيد",
    category: "تطبيقات موبايل",
    image: "/appointment-booking-app-dark-interface.jpg",
  },
  {
    title: "لوحة تحكم تحليلات",
    category: "UI/UX Design",
    image: "/analytics-dashboard-dark-theme-teal-accents.jpg",
  },
]

const categories = ["الكل", "تطوير ويب", "تطبيقات موبايل", "أنظمة مخصصة", "UI/UX Design"]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState("الكل")

  const filteredProjects = activeFilter === "الكل" ? projects : projects.filter((p) => p.category === activeFilter)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        filterRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: filterRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
      )
    }
  }, [activeFilter])

  return (
    <section ref={sectionRef} id="projects" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">أعمالنا</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نماذج من المشاريع التي قمنا بتنفيذها لعملائنا
          </p>
        </div>

        {/* Filter Buttons */}
        <div ref={filterRef} className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={`${project.title}-${index}`}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-500"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <ExternalLink className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs text-primary font-medium">{project.category}</span>
                <h3 className="text-lg font-semibold mt-1 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
