"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Mail, Phone, MapPin } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      )

      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      )

      gsap.fromTo(
        infoRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => setIsSubmitting(false), 2000)
  }

  return (
    <section ref={sectionRef} id="contact" className="py-16 md:py-24 relative overflow-x-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div ref={titleRef} className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-5xl font-bold mb-4">تواصل معنا</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            هل لديك مشروع في ذهنك؟ دعنا نساعدك في تحويله إلى واقع
          </p>
        </div>

        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-5 md:space-y-6 p-5 md:p-8 rounded-2xl bg-card border border-border"
          >
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">الاسم</label>
              <Input
                type="text"
                placeholder="أدخل اسمك الكامل"
                className="bg-muted border-border focus:border-primary h-11 md:h-12"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">البريد الإلكتروني</label>
              <Input
                type="email"
                placeholder="example@email.com"
                className="bg-muted border-border focus:border-primary h-11 md:h-12"
                required
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">تفاصيل المشروع</label>
              <Textarea
                placeholder="اخبرنا عن مشروعك..."
                rows={4}
                className="bg-muted border-border focus:border-primary resize-none"
                required
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-teal-700 text-primary-foreground group h-12"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "جاري الإرسال..."
              ) : (
                <>
                  إرسال الرسالة
                  <Send className="mr-2 h-4 w-4 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-6 md:space-y-8">
            <div className="p-5 md:p-8 rounded-2xl bg-card border border-border">
              <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-foreground">معلومات التواصل</h3>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-1">البريد الإلكتروني</p>
                    <p className="text-sm md:text-base text-foreground font-medium" dir="ltr">
                      info@looptech.dev
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-1">رقم الهاتف</p>
                    <p className="text-sm md:text-base text-foreground font-medium" dir="ltr">
                      +966 50 123 4567
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-1">الموقع</p>
                    <p className="text-sm md:text-base text-foreground font-medium">الرياض، المملكة العربية السعودية</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social CTA */}
            <div className="p-5 md:p-8 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-foreground">مستعد لبدء مشروعك؟</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
                تواصل معنا اليوم واحصل على استشارة مجانية لمشروعك القادم
              </p>
              <Button
                variant="outline"
                className="border-primary text-foreground hover:bg-primary hover:text-primary-foreground bg-transparent w-full md:w-auto"
              >
                احجز استشارة مجانية
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
