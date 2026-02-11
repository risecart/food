import { useEffect, useRef } from "react";

interface TouchOutsideProps {
  onOutsideTouch: () => void;
}

const  useTouchOutside = ({ onOutsideTouch }: TouchOutsideProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event:any) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onOutsideTouch();
    }
  };

  useEffect(() => {
    document.addEventListener('touchmove', handleClickOutside);

    return () => {
      document.removeEventListener('touchmove', handleClickOutside);
    };
  }, []);

  return ref;
};
export default useTouchOutside