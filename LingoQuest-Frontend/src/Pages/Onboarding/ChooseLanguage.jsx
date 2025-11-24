import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../context/OnboardingContext";

export default function ChooseLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { setLanguage } = useOnboarding();

  const languages = [
    { code: "FR", name: "French", country: "France" },
    { code: "SA", name: "Arabic", country: "Saudi Arabia" },
    { code: "PT", name: "Portuguese", country: "Portugal" },
    { code: "ES", name: "Spanish", country: "Spain" },
    { code: "DE", name: "German", country: "Germany" },
    { code: "KE", name: "Swahili", country: "Kenya" },
    { code: "CN", name: "Chinese", country: "China" },
    { code: "JP", name: "Japanese", country: "Japan" },
    { code: "KR", name: "Korean", country: "Korea" },
    { code: "NG", name: "Yoruba", country: "Nigeria" },
    { code: "IT", name: "Italian", country: "Italy" },
    { code: "HA", name: "Hausa", country: "Nigeria" }
  ];

  const filteredLanguages = languages.filter(language =>
    language.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    language.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleContinue = () => {
    if (!selectedLanguage) return;
    setLanguage(selectedLanguage);               // save to context (and localStorage)
    navigate("/onboarding1");                    // go to step 1
  };

  return (
    <section className="bg-[#FFF8E7] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-[#1A535C] lg:text-4xl md:text-3xl text-2xl font-bold mb-4">
            Choose Your Language
          </h1>
          <p className="text-[#699EA1] text-lg mb-6 max-w-2xl mx-auto">
            Select the language you want to master. You can always add more languages later.
          </p>

          <div className="max-w-md mx-auto mb-8">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-[#BDDBD9] bg-transparent text-[#1A535C] px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFBC42] placeholder-[#1A535C]"
              placeholder="Search languages..."
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mb-12">
          {filteredLanguages.map((language, index) => (
            <button
              key={`${language.code}-${language.name}-${index}`}
              type="button"
              onClick={() => handleSelect(language)}
              className={`w-full bg-white flex flex-col items-center justify-center p-6 rounded-xl text-[#1A535C] transition-all duration-300 ${
                selectedLanguage?.code === language.code
                  ? "ring-4 ring-[#FFBC42] transform scale-105"
                  : "hover:shadow-lg hover:scale-105"
              }`}
            >
              <p className="text-2xl font-bold mb-2">{language.code}</p>
              <span className="text-lg font-medium text-center">{language.name}</span>
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedLanguage}
            className={`inline-block px-8 py-4 font-semibold rounded-lg transition-all duration-300 ${
              selectedLanguage
                ? "bg-[#FF6B6B] text-white hover:bg-[#ffa90d] hover:shadow-lg transform hover:scale-105"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Continue
          </button>

          {selectedLanguage && (
            <p className="text-[#1A535C] mt-4 text-sm">
              Selected: <span className="font-semibold">{selectedLanguage.name}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
