import { ArrowLeft, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import lotusIcon from "../../assets/lotus-icon.png";

export default function WeekHeader() {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                <img src={lotusIcon} alt="Lotus Icon" className="h-8 w-8" />
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
}
