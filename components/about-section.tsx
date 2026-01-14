"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Lightbulb, Settings, Headphones } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Lightbulb,
    title: "خبرة تقنية",
    description: "فريق من المطورين المحترفين بخبرة واسعة في أحدث التقنيات",
  },
  {
    icon: Settings,
    title: "حلول مخصصة",
    description: "نصمم حلولاً تناسب احتياجاتك الخاصة ومتطلبات عملك الفريدة",
  },
  {
    icon: Headphones,
    title: "دعم مستمر",
    description: "نوفر دعماً فنياً متواصلاً لضمان استمرارية ونجاح مشروعك",
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 ref={titleRef} className="text-3xl md:text-5xl font-bold mb-6">
            من نحن في <span className="text-primary">LoopTech</span>
          </h2>
          <p ref={textRef} className="text-lg text-muted-foreground leading-relaxed">
            نحن شركة تقنية رائدة متخصصة في تقديم حلول رقمية متكاملة. نجمع بين الإبداع والخبرة التقنية لتحويل رؤيتك إلى
            منتجات رقمية استثنائية تساهم في نمو أعمالك وتحقيق أهدافك.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
