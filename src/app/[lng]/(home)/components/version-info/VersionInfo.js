"use client";
import { useEffect, useState } from "react";

const VersionInfo = () => {
  const [versionInfo, setVersionInfo] = useState(null);

  useEffect(() => {
    fetch("/version.json")
      .then((response) => response.json())
      .then((data) => setVersionInfo(data));
  }, []);

  return (
    <div>
      {versionInfo
        ? `Aktualna wersja: ${versionInfo.version}, data budowy: ${versionInfo.buildDate}`
        : "Pobieranie informacji o wersji..."}
    </div>
  );
};

export default VersionInfo;
