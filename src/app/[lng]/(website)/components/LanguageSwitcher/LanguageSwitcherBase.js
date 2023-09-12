import Link from "next/link";
import { languages } from "../../../../i18n/settings";

const LanguageSwitcherBase = ({ lng }) => {
  const flags = {
    en: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="30"
        viewBox="0 0 60 30"
      >
        <clipPath id="s">
          <path id="s" d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        <clipPath id="t">
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
        </clipPath>
        <g clip-path="url(#s)">
          <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6" />
          <path
            d="M0,0 L60,30 M60,0 L0,30"
            clip-path="url(#t)"
            stroke="#C8102E"
            stroke-width="4"
          />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6" />
        </g>
      </svg>
    ),
    de: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="30"
        viewBox="0 0 30 20"
      >
        <path d="M0,0 h30 v7 h-30 z" fill="#000" />
        <path d="M0,7 h30 v7 h-30 z" fill="#D00" />
        <path d="M0,14 h30 v6 h-30 z" fill="#FFD700" />
      </svg>
    ),
    es: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 30 20"
      >
        <path d="M0,0 h30 v20 h-30 z" fill="#FFC400" />
        <path d="M0,5 h30 v10 h-30 z" fill="#AA151B" />
      </svg>
    ),
    pl: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="30"
        viewBox="0 0 30 20"
      >
        <path d="M0,0 h30 v10 h-30 z" fill="#FFF" />
        <path d="M0,10 h30 v10 h-30 z" fill="#E92030" />
      </svg>
    ),
  };

  return (
    <div style={{ marginTop: 50 }}>
      {languages.map((l, index) => {
        const flagSvg = flags[l];
        return (
          <span key={l}>
            {index > 0 && " / "}
            <Link href={`/${l}`}>{flagSvg}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default LanguageSwitcherBase;
