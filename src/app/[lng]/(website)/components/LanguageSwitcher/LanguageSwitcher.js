import { useTranslation } from "../../../../i18n";
import LanguageSwitcherBase from "./LanguageSwitcherBase";

const LanguageSwitcher = ({ lng }) => {
  const { t } = useTranslation(lng);
  return <LanguageSwitcherBase t={t} lng={lng} />;
};

export default LanguageSwitcher;
