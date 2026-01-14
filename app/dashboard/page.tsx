"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash2, LogOut, FolderOpen, ImageIcon, X, Upload, Link, ExternalLink } from "lucide-react"

interface Project {
  id: string
  title: string
  category: string
  image: string
  link?: string
}

const categories = ["تطوير ويب", "تطبيقات موبايل", "أنظمة مخصصة", "UI/UX Design"]

const defaultProjects: Project[] = [
  { id: "1", title: "متجر إلكتروني متكامل", category: "تطوير ويب", image: "/ecommerce-store.png", link: "" },
  { id: "2", title: "تطبيق توصيل طعام", category: "تطبيقات موبايل", image: "/food-delivery-app-screen.png", link: "" },
  { id: "3", title: "نظام إدارة مخزون", category: "أنظمة مخصصة", image: "/inventory-system.jpg", link: "" },
  { id: "4", title: "منصة تعليمية", category: "تطوير ويب", image: "/learning-platform.png", link: "" },
  { id: "5", title: "تطبيق حجز مواعيد", category: "تطبيقات موبايل", image: "/booking-app.jpg", link: "" },
  { id: "6", title: "لوحة تحكم تحليلات", category: "UI/UX Design", image: "/analytics-dashboard.png", link: "" },
]

export default function DashboardPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [imageType, setImageType] = useState<"upload" | "link">("upload")
  const [newProject, setNewProject] = useState({
    title: "",
    category: categories[0],
    image: "",
    link: "",
  })

  useEffect(() => {
    const isAdmin = localStorage.getItem("looptech_admin")
    if (!isAdmin) {
      router.push("/login")
      return
    }

    const savedProjects = localStorage.getItem("looptech_projects")
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    } else {
      setProjects(defaultProjects)
      localStorage.setItem("looptech_projects", JSON.stringify(defaultProjects))
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("looptech_admin")
    router.push("/login")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewProject({ ...newProject, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault()
    const project: Project = {
      id: Date.now().toString(),
      title: newProject.title,
      category: newProject.category,
      image: newProject.image || `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(newProject.title)}`,
      link: newProject.link,
    }
    const updatedProjects = [...projects, project]
    setProjects(updatedProjects)
    localStorage.setItem("looptech_projects", JSON.stringify(updatedProjects))
    setNewProject({ title: "", category: categories[0], image: "", link: "" })
    setImageType("upload")
    setShowAddModal(false)
  }

  const handleDeleteProject = (id: string) => {
    const updatedProjects = projects.filter((p) => p.id !== id)
    setProjects(updatedProjects)
    localStorage.setItem("looptech_projects", JSON.stringify(updatedProjects))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FolderOpen className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold">لوحة تحكم المشاريع</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">تسجيل الخروج</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-primary">{projects.length}</div>
            <div className="text-sm text-muted-foreground">إجمالي المشاريع</div>
          </div>
          {categories.slice(0, 3).map((cat) => (
            <div key={cat} className="bg-card border border-border rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-foreground">
                {projects.filter((p) => p.category === cat).length}
              </div>
              <div className="text-sm text-muted-foreground">{cat}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">المشاريع</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            إضافة مشروع
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-card border border-border rounded-xl overflow-hidden group hover:border-primary/50 transition-all"
            >
              <div className="aspect-video relative overflow-hidden bg-muted">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <span className="text-xs text-primary font-medium">{project.category}</span>
                <h3 className="text-lg font-semibold mt-1">{project.title}</h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    عرض المشروع
                  </a>
                )}
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="mt-3 flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  حذف المشروع
                </button>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">لا توجد مشاريع حالياً</p>
          </div>
        )}
      </main>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowAddModal(false)
                setImageType("upload")
                setNewProject({ title: "", category: categories[0], image: "", link: "" })
              }}
              className="absolute top-4 left-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-6">إضافة مشروع جديد</h3>

            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">اسم المشروع</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full bg-muted border border-border rounded-xl py-3 px-4 focus:outline-none focus:border-primary transition-colors"
                  placeholder="أدخل اسم المشروع"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">التصنيف</label>
                <select
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  className="w-full bg-muted border border-border rounded-xl py-3 px-4 focus:outline-none focus:border-primary transition-colors"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">رابط المشروع (اختياري)</label>
                <div className="relative">
                  <Link className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="url"
                    value={newProject.link}
                    onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                    className="w-full bg-muted border border-border rounded-xl py-3 pr-11 pl-4 focus:outline-none focus:border-primary transition-colors"
                    placeholder="https://example.com"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">رابط الموقع أو التطبيق الخاص بالمشروع</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">صورة المشروع (اختياري)</label>
                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      setImageType("upload")
                      setNewProject({ ...newProject, image: "" })
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition-colors ${
                      imageType === "upload"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Upload className="w-4 h-4" />
                    رفع صورة
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImageType("link")
                      setNewProject({ ...newProject, image: "" })
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition-colors ${
                      imageType === "link"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    رابط صورة
                  </button>
                </div>

                {imageType === "upload" && (
                  <div>
                    <label className="block w-full cursor-pointer">
                      <div
                        className={`w-full border-2 border-dashed rounded-xl py-6 px-4 text-center transition-colors ${
                          newProject.image ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                        }`}
                      >
                        {newProject.image ? (
                          <div className="space-y-3">
                            <img
                              src={newProject.image || "/placeholder.svg"}
                              alt="Preview"
                              className="w-full h-32 object-cover rounded-lg mx-auto"
                            />
                            <p className="text-sm text-primary">تم رفع الصورة بنجاح</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                            <p className="text-sm text-muted-foreground">اضغط لاختيار صورة</p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, WEBP</p>
                          </div>
                        )}
                      </div>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                    {newProject.image && (
                      <button
                        type="button"
                        onClick={() => setNewProject({ ...newProject, image: "" })}
                        className="mt-2 text-sm text-red-500 hover:text-red-400"
                      >
                        إزالة الصورة
                      </button>
                    )}
                  </div>
                )}

                {imageType === "link" && (
                  <div>
                    <div className="relative">
                      <ImageIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="url"
                        value={newProject.image}
                        onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                        className="w-full bg-muted border border-border rounded-xl py-3 pr-11 pl-4 focus:outline-none focus:border-primary transition-colors"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    {newProject.image && (
                      <div className="mt-3">
                        <img
                          src={newProject.image || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = "/abstract-colorful-swirls.png"
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">اتركه فارغاً لاستخدام صورة افتراضية</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  إضافة
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setImageType("upload")
                    setNewProject({ title: "", category: categories[0], image: "", link: "" })
                  }}
                  className="flex-1 bg-muted text-foreground py-3 rounded-xl font-medium hover:bg-muted/80 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
