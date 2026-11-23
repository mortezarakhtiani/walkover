'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
        if (!finePointer.matches) return;

        let rafId = 0;
        let x = 0;
        let y = 0;

        const render = () => {
            cursor.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0)`;
            rafId = 0;
        };

        const onMove = (event) => {
            x = event.clientX;
            y = event.clientY;
            cursor.style.opacity = '1';

            if (!rafId) rafId = requestAnimationFrame(render);
        };

        const onLeave = (event) => {
            if (event.relatedTarget === null) cursor.style.opacity = '0';
        };

        const onBlur = () => {
            cursor.style.opacity = '0';
        };

        document.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('mouseout', onLeave);
        window.addEventListener('blur', onBlur);

        return () => {
            document.removeEventListener('pointermove', onMove);
            document.removeEventListener('mouseout', onLeave);
            window.removeEventListener('blur', onBlur);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div ref={cursorRef} className="walkover-custom-cursor" aria-hidden="true">
            <img src="/cursors/crosshair.svg" alt="" draggable={false} />
        </div>
    );
}
