"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronDown } from "lucide-react"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const shapesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial page load animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.fromTo(titleRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(subtitleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .fromTo(
          buttonsRef.current?.children || [],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.2 },
          "-=0.4",
        )

      // Floating shapes animation
      gsap.to(".floating-shape", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        rotation: "random(-15, 15)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.5,
          from: "random",
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Shapes */}
      <div ref={shapesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="floating-shape absolute bottom-40 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="floating-shape absolute top-1/2 right-1/3 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />
        <div className="floating-shape absolute bottom-20 right-1/4 w-32 h-32 border border-primary/20 rounded-full" />
        <div className="floating-shape absolute top-1/3 left-1/4 w-24 h-24 border border-primary/10 rounded-lg rotate-45" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,122,99,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,122,99,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-balance">
            نحوّل أفكارك الرقمية
            <br />
            <span className="text-primary">إلى واقع</span>
          </h1>
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            نحن LoopTech، شركة متخصصة في تطوير مواقع الويب وتطبيقات الموبايل والحلول البرمجية المخصصة التي تساعد عملك
            على النمو والتميز
          </p>
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-teal-700 text-primary-foreground text-lg px-8 py-6 group">
              ابدأ مشروعك
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 text-foreground hover:bg-primary/10 text-lg px-8 py-6 bg-transparent"
            >
              أعمالنا
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-primary/50" />
      </div>
    </section>
  )
}
