import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { type ApiWeek } from "../../pages/Dashboard";
import { cn } from "../../lib/cn";

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const allHabits = [
  "8h de sono",
  "Alimentação saudável",
  "Exercício físico",
  "Sem substâncias",
  "Cuidado com saúde",
];

type Props = { weeks: ApiWeek[] };

type DayData = {
  day: number;
  key: string;
  completedHabits: number;
  habitStatus: boolean[]; // índice = hábito
};

function buildCalendarData(weeks: ApiWeek[]) {
  // map: "2026-05-10" → boolean[] (um por hábito)
  const map: Record<string, boolean[]> = {};

  weeks.forEach((week) => {
    if (!week.habits) return;
    week.habits.forEach((habit, habitIndex) => {
      habit.days.forEach((done, dayIndex) => {
        const date = new Date(week.start_date);
        date.setDate(date.getDate() + dayIndex);
        const key = date.toISOString().split("T")[0];

        if (!map[key]) map[key] = Array(allHabits.length).fill(false);
        if (done) map[key][habitIndex] = true;
      });
    });
  });

  return map;
}

function getDotStyle(count: number) {
  if (count === 0) return "bg-muted/60 text-muted-foreground";
  if (count <= 2) return "bg-red-400/20 text-red-600 ring-1 ring-red-400/40";
  if (count <= 4) return "bg-yellow-400/20 text-yellow-700 ring-1 ring-yellow-400/40";
  return "bg-ring/15 text-ring ring-1 ring-ring/40";
}

function getDotIndicator(count: number) {
  if (count === 0) return null;
  if (count <= 2) return "bg-red-400";
  if (count <= 4) return "bg-yellow-400";
  return "bg-ring";
}

export default function HabitsCalendar({ weeks }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);

  const habitsMap = useMemo(() => buildCalendarData(weeks), [weeks]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date().toISOString().split("T")[0];

  const firstDayOfMonth = new Date(year, month, 1);
  const startingDayIndex = firstDayOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  const calendarDays: (DayData | null)[] = [];
  for (let i = 0; i < startingDayIndex; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const key = date.toISOString().split("T")[0];
    const habitStatus = habitsMap[key] ?? Array(allHabits.length).fill(false);
    const completedHabits = habitStatus.filter(Boolean).length;
    calendarDays.push({ day, key, completedHabits, habitStatus });
  }

  return (
    <>
      <div className="rounded-2xl border border-border bg-card shadow-sm p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
            className="p-2 rounded-lg hover:bg-muted transition"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h2 className="text-base font-semibold capitalize">{monthName}</h2>
          <button
            onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
            className="p-2 rounded-lg hover:bg-muted transition"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Dias da semana */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((d) => (
            <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Dias do mês */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((item, index) => {
            if (!item) return <div key={index} />;

            const isToday = item.key === today;
            const dot = getDotIndicator(item.completedHabits);

            return (
              <button
                key={item.key}
                onClick={() => item.completedHabits > 0 && setSelectedDay(item)}
                className={cn(
                  "aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 text-xs font-medium transition-all",
                  getDotStyle(item.completedHabits),
                  isToday && "ring-2 ring-ring ring-offset-1",
                  item.completedHabits === 0 && "cursor-default",
                )}
              >
                <span>{item.day}</span>
                {dot && (
                  <span className={cn("h-1 w-1 rounded-full", dot)} />
                )}
              </button>
            );
          })}
        </div>

        {/* Legenda */}
        <div className="flex items-center gap-4 mt-5 flex-wrap text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            1–2 hábitos
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            3–4 hábitos
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-ring" />
            5 hábitos
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedDay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
          onClick={() => setSelectedDay(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-card border border-border shadow-xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold text-foreground">
                  {new Date(selectedDay.key + "T12:00:00").toLocaleDateString("pt-BR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {selectedDay.completedHabits} de {allHabits.length} hábitos
                </p>
              </div>
              <button
                onClick={() => setSelectedDay(null)}
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Barra de progresso */}
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden mb-5">
              <div
                className="h-full rounded-full bg-ring transition-all"
                style={{
                  width: `${(selectedDay.completedHabits / allHabits.length) * 100}%`,
                }}
              />
            </div>

            {/* Lista de hábitos */}
            <div className="space-y-2">
              {allHabits.map((habit, i) => {
                const done = selectedDay.habitStatus[i];
                return (
                  <div
                    key={habit}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5",
                      done ? "bg-ring/10" : "bg-muted/40",
                    )}
                  >
                    <span
                      className={cn(
                        "h-5 w-5 rounded-full flex items-center justify-center border-2 shrink-0",
                        done
                          ? "bg-ring border-ring"
                          : "border-border",
                      )}
                    >
                      {done && (
                        <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span
                      className={cn(
                        "text-sm",
                        done ? "text-foreground font-medium" : "text-muted-foreground line-through",
                      )}
                    >
                      {habit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}