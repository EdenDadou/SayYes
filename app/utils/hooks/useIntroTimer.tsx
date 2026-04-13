import { useEffect, useState } from "react";
import { VIDEO_DURATION } from "~/routes/_index";

export default function useIntroTimer() {
  const [isIntroFinish, setIsIntroFinish] = useState(false);
  const [shouldPlayIntro, setShouldPlayIntro] = useState(false);

  useEffect(() => {
    const lastPlayedDate = localStorage.getItem("introPlayedDate");
    const today = new Date().toLocaleDateString();
    if (lastPlayedDate !== today) {
      localStorage.setItem("introPlayedDate", today);
      setShouldPlayIntro(true);
      const timeoutLine = setTimeout(
        () => {
          setIsIntroFinish(true);
          setShouldPlayIntro(false);
        },
        VIDEO_DURATION * 1000 + 500
      );

      return () => {
        clearTimeout(timeoutLine);
      };
    } else {
      setIsIntroFinish(true);
    }
  }, []);

  return { isIntroFinish, shouldPlayIntro };
}
