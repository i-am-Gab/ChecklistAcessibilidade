import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full text-center">
        {/* Logo/Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#00b894] rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8">
          <span className="text-white font-bold text-2xl sm:text-3xl">
            CA
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 px-4 break-words">
          Checklist Acessibilidade
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
          Acompanhe o seu progresso para um desenvolvimento
          acessível.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/camadas")}
          className="bg-[#00b894] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium hover:bg-[#00a380] transition-all flex items-center gap-2 sm:gap-3 mx-auto group"
        >
          Acessar Checklists
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}