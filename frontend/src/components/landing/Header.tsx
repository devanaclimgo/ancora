import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const navLinks = [
  { label: "O que é PLEASE?", href: "#please" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Começar", href: "#cta" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSmoothScroll = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="h-8 w-8 rounded-lg bg-[#7F679C] flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-semibold text-lg">PLEASE</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleSmoothScroll(link.href)}
              className="text-sm font-medium text-gray-600 hover:text-[#7F679C] transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <Link
          to="/login"
          className="rounded-xl bg-[#7F679C] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition shadow-sm"
        >
          Login
        </Link>
      </div>
    </header>
  )
}