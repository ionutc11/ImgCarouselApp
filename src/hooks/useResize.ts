import { useEffect } from "react";

const useResize = (handleResize: () => void) => {
  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useResize;
