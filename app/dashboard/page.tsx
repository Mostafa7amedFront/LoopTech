"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash2, LogOut, FolderOpen, ImageIcon, X } from "lucide-react"

interface Project {
  id: string
  title: string
  category: string
  image: string
}

const categories = ["تطوير ويب", "تطبيقات موبايل", "أنظمة مخصصة", "UI/UX Design"]

const defaultProjects: Project[] = [
  { id: "1", title: "متجر إلكتروني متكامل", category: "تطوير ويب", image: "/ecommerce-store.png" },
  { id: "2", title: "تطبيق توصيل طعام", category: "تطبيقات موبايل", image: "/food-delivery-app-screen.png" },
  { id: "3", title: "نظام إدارة مخزون", category: "أنظمة مخصصة", image: "/inventory-system.jpg" },
  { id: "4", title: "منصة تعليمية", category: "تطوير ويب", image: "/learning-platform.png" },
  { id: "5", title: "تطبيق حجز مواعيد", category: "تطبيقات موبايل", image: "/booking-app.jpg" },
  { id: "6", title: "لوحة تحكم تحليلات", category: "UI/UX Design", image: "/analytics-dashboard.png" },
]

export default function DashboardPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [newProject, setNewProject] = useState({
    title: "",
    category: categories[0],
    image: "",
  })

  useEffect(() => {
    // Check authentication
    const isAdmin = localStorage.getItem("looptech_admin")
    if (!isAdmin) {
      router.push("/login")
      return
    }

    // Load projects from localStorage or use defaults
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

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault()
    const project: Project = {
      id: Date.now().toString(),
      title: newProject.title,
      category: newProject.category,
      image: newProject.image || `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(newProject.title)}`,
    }
    const updatedProjects = [...projects, project]
    setProjects(updatedProjects)
    localStorage.setItem("looptech_projects", JSON.stringify(updatedProjects))
    setNewProject({ title: "", category: categories[0], image: "" })
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
      {/* Header */}
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
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

        {/* Add Button */}
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

        {/* Projects Grid */}
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

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 left-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-6">إضافة مشروع جديد</h3>

            <form onSubmit={handleAddProject} className="space-y-4">
              {/* Title */}
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

              {/* Category */}
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

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium mb-2">رابط الصورة (اختياري)</label>
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
                <p className="text-xs text-muted-foreground mt-1">اتركه فارغاً لاستخدام صورة افتراضية</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  إضافة
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
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
