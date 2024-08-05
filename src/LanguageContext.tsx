import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext<{ language: string; handleLanguageChange: (newLanguage: string) => void }>({
  language: 'en', // Default value
  handleLanguageChange: () => { }, // Placeholder for actual function
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<string>('en'); // Specify the type of language

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
};
