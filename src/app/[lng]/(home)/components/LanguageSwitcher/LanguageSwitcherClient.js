"use client";
import { LanguageSwitcherBase } from "./LanguageSwitcherBase";
import { useTranslation } from "../../../i18n/client";

const LanguageSwitcherClient = ({ lng }) => {
  const { t } = useTranslation(lng);
  return <LanguageSwitcherBase t={t} lng={lng} />;
};

export default LanguageSwitcherClient;
