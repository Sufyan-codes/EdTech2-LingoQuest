import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../context/OnboardingContext";

// Import all flag assets
import FR from "../../assets/icons/FR.svg";
import ES from "../../assets/icons/ES.svg";
import CN from "../../assets/icons/CN.svg";
import NG from "../../assets/icons/NG.svg";

export default function ChooseLanguage() {
  const navigate = useNavigate();
  const { setLanguage } = useOnboarding();
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Language List
  const languages = [
    { code: "French", name: "French", flag: FR },
    { code: "Spanish", name: "Spanish", flag: ES },
    { code: "Chinese", name: "Chinese", flag: CN },
    { code: "Yoruba", name: "Yoruba", flag: NG },
  ];

  // Filter search results
  const filteredLanguages = useMemo(() => {
    return languages.filter((lang) =>
      lang.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleContinue = async () => {
    if (!selected) return;
    setLoading(true);

    // Save to onboarding context
    setLanguage(selected);

    setLoading(false);
    navigate("/onboarding1");
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#DFF3F1] to-[#F6FDFB] flex justify-center py-14 px-6">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0E4E49] text-center">
          Choose Your Language
        </h1>

        <p className="text-[#5F7D78] text-center text-lg mt-3">
          Select the language you want to master. You can always add more languages later!
        </p>

        {/* Search Bar */}
        <div className="flex justify-center mt-8">
          <div className="w-full max-w-2xl">
            <input
              type="text"
              placeholder="🔍 Search languages"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-[#2EA148] focus:outline-none"
            />
          </div>
        </div>

        {/* Languages Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10">
          {filteredLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelected(lang)}
              className={`
                bg-white rounded-xl p-6 shadow-sm border 
                flex flex-col items-center gap-4 transition-all
                hover:shadow-md
                ${
                  selected?.code === lang.code
                    ? "border-[#2EA148] ring-2 ring-[#2EA148]"
                    : "border-gray-200"
                }
              `}
            >
              <img src={lang.flag} alt={lang.name} className="w-14 h-14 object-contain" />
              <p className="text-lg font-semibold text-[#0E4E49]">{lang.name}</p>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <div className="flex justify-end mt-12">
          <button
            onClick={handleContinue}
            disabled={!selected || loading}
            className={`px-8 py-3 rounded-md text-white font-semibold text-lg shadow-md
              transition-all 
              ${
                selected
                  ? "bg-[#2EA148] hover:bg-[#27913F]"
                  : "bg-gray-400 cursor-not-allowed"
              }
            `}
          >
            {loading ? (
              <span className="inline-block animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              "Next"
            )}
          </button>
        </div>
      </div>
    </section>
  );
}