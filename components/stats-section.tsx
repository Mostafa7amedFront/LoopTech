"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Trophy, Star, Zap, Code2 } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: Trophy, value: 50, suffix: "+", label: "مشروع ناجح" },
  { icon: Star, value: 100, suffix: "%", label: "جودة عالية" },
  { icon: Zap, value: 24, suffix: "/7", label: "سرعة تنفيذ" },
  { icon: Code2, value: 10, suffix: "+", label: "تقنيات حديثة" },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: counterRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(
          { val: 0 },
          {
            val: value,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              setCount(Math.round(this.targets()[0].val))
            },
          },
        )
      },
      once: true,
    })

    return () => trigger.kill()
  }, [value])

  return (
    <span ref={counterRef}>
      {count}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

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
        statsRef.current?.children || [],
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,122,99,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(14,122,99,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            لماذا <span className="text-primary">LoopTech</span>؟
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            أرقام تتحدث عن نجاحاتنا وتميزنا في سوق التقنية
          </p>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border text-center hover:border-primary/50 transition-all duration-500"
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
