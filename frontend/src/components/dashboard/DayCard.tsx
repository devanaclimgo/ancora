import { useState } from "react"
import {
  Moon,
  Utensils,
  Dumbbell,
  Stethoscope,
  Ban,
  FileText,
  ChevronDown,
  Check,
  Save,
} from "lucide-react"
import { cn } from "../../lib/cn";

const categories = [
  { key: "sono", label: "Sono", icon: Moon, placeholder: "Ex: Dormi 8h, qualidade boa..." },
  { key: "alimentacao", label: "Alimentacao", icon: Utensils, placeholder: "Ex: 3 refeicoes, poucas frutas..." },
  { key: "exercicio", label: "Exercicio", icon: Dumbbell, placeholder: "Ex: Caminhada 30min, yoga..." },
  { key: "saude", label: "Saude fisica", icon: Stethoscope, placeholder: "Ex: Tomei remedios, consulta marcada..." },
  { key: "substancias", label: "Substancias", icon: Ban, placeholder: "Ex: Sem alcool, 2 cafes..." },
  { key: "extra", label: "Anotacoes", icon: FileText, placeholder: "Notas extras do dia..." },
]

interface DayCardProps {
  dayNumber: number
  dayLabel: string
}

export function DayCard({ dayNumber, dayLabel }: DayCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [saved, setSaved] = useState(false)
  const [values, setValues] = useState<Record<string, string>>({})

  const filledCount = Object.values(values).filter((v) => v.trim().length > 0).length
  const isFilled = filledCount > 0

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div
      className={cn(
        "rounded-2xl border bg-card shadow-sm transition-all duration-300",
        expanded ? "border-primary/30 shadow-md" : "border-border"
      )}
    >
      {/* Card header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-4 sm:p-5 text-left"
        aria-expanded={expanded}
      >
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
            isFilled
              ? "bg-teal border-teal text-teal-foreground"
              : "border-border bg-background text-muted-foreground"
          )}
        >
          {isFilled ? (
            <Check className="h-4 w-4" />
          ) : (
            <span className="text-xs font-bold">{dayNumber}</span>
          )}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground text-sm">
            Dia {dayNumber}
          </p>
          <p className="text-xs text-muted-foreground">{dayLabel}</p>
        </div>
        {isFilled && (
          <span className="text-xs font-medium text-teal mr-2">
            {filledCount}/{categories.length}
          </span>
        )}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            expanded && "rotate-180"
          )}
        />
      </button>

      {/* Card body (expanded) */}
      {expanded && (
        <div className="border-t border-border px-4 pb-5 pt-4 sm:px-5">
          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.key}>
                <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <cat.icon className="h-3.5 w-3.5" />
                  {cat.label}
                </label>
                <textarea
                  value={values[cat.key] || ""}
                  onChange={(e) => handleChange(cat.key, e.target.value)}
                  placeholder={cat.placeholder}
                  rows={2}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-ring/20 outline-none transition-all resize-none"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSave}
            className={cn(
              "mt-5 w-full rounded-xl py-2.5 text-sm font-semibold transition-all flex items-center justify-center gap-2",
              saved
                ? "bg-teal text-teal-foreground"
                : "bg-primary text-primary-foreground hover:bg-lavender/90"
            )}
          >
            {saved ? (
              <>
                <Check className="h-4 w-4" />
                Salvo
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Salvar
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
