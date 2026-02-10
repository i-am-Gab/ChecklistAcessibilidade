import { useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  activeTab?:
    | "checklists"
    | "sobre"
    | "checklists"
    | "recursos";
}

export default function Header({
  activeTab = "checklists",
}: HeaderProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="px-4 sm:px-6 lg:px-8 py-4 lg:py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0"
            >
              <div className="w-8 h-8 bg-[#00b894] rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  CA
                </span>
              </div>
              <span className="font-semibold text-gray-900 text-sm sm:text-base">
                Checklists Acessibilidade
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <button
                onClick={() => navigate("/camadas")}
                className={
                  activeTab === "checklists"
                    ? "text-[#00b894] font-medium border-b-2 border-[#00b894] pb-1"
                    : "text-gray-600 hover:text-gray-900 transition-colors"
                }
              >
                Checklists
              </button>
              <button
                onClick={() => navigate("/sobre")}
                className={
                  activeTab === "sobre"
                    ? "text-[#00b894] font-medium border-b-2 border-[#00b894] pb-1"
                    : "text-gray-600 hover:text-gray-900 transition-colors"
                }
              >
                Sobre
              </button>
              <a
                href="https://docs.google.com/document/d/1kPfQyfptKh27_7PSyYxCl2j-122Bk0fgAX2dKliQZ00/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgb(0,0,0)] hover:text-gray-900 transition-colors font-bold text-[15px]"
              >
                Documentação
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4 space-y-3">
              <button
                onClick={() => {
                  navigate("/camadas");
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "checklists"
                    ? "bg-[#e8f8f5] text-[#00b894] font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Checklists
              </button>
              <button
                onClick={() => {
                  navigate("/sobre");
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "sobre"
                    ? "bg-[#e8f8f5] text-[#00b894] font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Sobre
              </button>
              <a
                href="https://docs.google.com/document/d/1kPfQyfptKh27_7PSyYxCl2j-122Bk0fgAX2dKliQZ00/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left px-4 py-2 rounded-lg text-gray-900 font-bold hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Documentação
              </a>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}