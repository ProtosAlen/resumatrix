
import { useLanguage } from '../LanguageContext'; // Import only what's used



const LanguageSwitcher = () => {
    console.log("Called LanguageSwitcher()");
    const { language, handleLanguageChange } = useLanguage();
    //const translations = useTranslations(language);

    const handleSelectLanguage = (newLanguage: string) => {
        handleLanguageChange(newLanguage);
    };

    return (
        <select value={language} onChange={(e) => handleSelectLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="sl">Slovenian</option>
            {/* Add more language options */}
        </select>
    );
};


export default LanguageSwitcher;
