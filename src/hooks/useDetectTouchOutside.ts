import { useEffect, useRef } from 'react';

interface UseDetectTouchOutsideArgs {
    onOutsideTouch: () => void;
    onInsideTouch: () => void;
    condition: boolean;
}

export const useDetectTouchOutside = <T extends HTMLElement>({ condition, onInsideTouch, onOutsideTouch }: UseDetectTouchOutsideArgs) => {
    const ref = useRef<T>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (event.target instanceof HTMLElement && ref.current && ref.current.contains(event.target)) {
                onInsideTouch();
                return;
            }

            onOutsideTouch();
        }
        if (condition) {
            document.addEventListener("mousedown", e => handleClickOutside(e));
        } else {
            document.removeEventListener("mousedown", e => handleClickOutside(e));
        }

        return () => {
            document.removeEventListener("mousedown", e => handleClickOutside(e));
        };
    }, [onOutsideTouch, onInsideTouch, condition]);

    return { ref };
}