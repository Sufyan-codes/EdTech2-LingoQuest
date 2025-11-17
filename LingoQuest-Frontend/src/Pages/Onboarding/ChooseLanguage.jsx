import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ChooseLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    { code: "NG", name: "Hausa", country: "Nigeria" }
  ];

  const filteredLanguages = languages.filter(language =>
    language.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    language.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-gradient-to-r from-[#DFF5F7] via-[#DFF5F7] to-[#F0F7F0] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-[#8F2D56] lg:text-4xl md:text-3xl text-2xl font-bold mb-4">
            Choose Your Language
          </h1>
          <p className="text-[#8F2D56] text-lg mb-6 max-w-2xl mx-auto">
            Select the language you want to master. You can always add more languages later.
          </p>

          {/* Search Input */}
          <div className="max-w-md mx-auto mb-8">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-[#8F2D56] bg-[#DEEDED] text-[#8F2D56] px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFBC42] placeholder-[#8F2D56]"
              placeholder="Search languages..."
            />
          </div>
        </div>

        {/* Languages Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mb-12">
          {filteredLanguages.map((language, index) => (
            <div
              key={`${language.code}-${language.name}-${index}`}
              className={`bg-[#218381] flex flex-col items-center justify-center p-6 rounded-xl text-white cursor-pointer transition-all duration-300 ${
                selectedLanguage?.code === language.code && selectedLanguage?.name === language.name
                  ? "ring-4 ring-[#FFBC42] transform scale-105"
                  : "hover:shadow-lg hover:transform hover:scale-105"
              }`}
              onClick={() => setSelectedLanguage(language)}
            >
              <p className="text-2xl font-bold mb-2">{language.code}</p>
              <span className="text-lg font-medium text-center">{language.name}</span>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Link 
            to={selectedLanguage ? '/onboarding1' : '#'}
            className={`inline-block px-8 py-4 font-semibold rounded-lg transition-all duration-300 ${
              selectedLanguage 
                ? "bg-[#FFBC42] text-[#8F2D56] hover:bg-[#ffa90d] hover:shadow-lg transform hover:scale-105"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Continue
          </Link>
          
          {selectedLanguage && (
            <p className="text-[#8F2D56] mt-4 text-sm">
              Selected: <span className="font-semibold">{selectedLanguage.name}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}