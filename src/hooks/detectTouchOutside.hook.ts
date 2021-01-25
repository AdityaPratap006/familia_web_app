import { useEffect, useRef } from 'react';

interface UseDetectTouchOutsideArgs {
    onOutsideTouch: () => void;
}

export const useDetectTouchOutside = <T extends HTMLElement>({ onOutsideTouch }: UseDetectTouchOutsideArgs) => {
    const ref = useRef<T>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (ref.current && ref.current.contains(event.target as T)) {
                return;
            }

            onOutsideTouch();
        }

        document.addEventListener("touchstart", e => handleClickOutside(e));
        document.addEventListener("mousedown", e => handleClickOutside(e));
        return () => {
            document.removeEventListener("touchstart", e => handleClickOutside(e));
            document.removeEventListener("mousedown", e => handleClickOutside(e));

        };
    });

    return { ref };
}