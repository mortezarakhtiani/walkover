'use client';

import {useEffect, useRef} from 'react';

/** Animated desktop cursor for Walkover. Mount once inside the root layout. */
export default function CustomCursor() {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
        if (!finePointer.matches) return;

        let raf = 0;
        let x = -200;
        let y = -200;
        let visible = false;

        // Skull source is 128x128; its original hotspot is (19, 0).
        // At 64px display size, the hotspot becomes (9.5, 0).
        const hotspotX = 8.61;
        const hotspotY = 0;

        const render = () => {
            cursor.style.transform = `translate3d(${x - hotspotX}px, ${y - hotspotY}px, 0)`;
            cursor.style.opacity = visible ? '1' : '0';
            raf = 0;
        };

        const scheduleRender = () => {
            if (!raf) raf = requestAnimationFrame(render);
        };

        const onMove = (event) => {
            x = event.clientX;
            y = event.clientY;
            visible = true;
            scheduleRender();

            const target = event.target instanceof Element ? event.target : null;
            const interactive = target?.closest(
                'a, button, [role="button"], input[type="button"], input[type="submit"], select, label, summary, [data-cursor="pointer"]'
            );
            cursor.dataset.hover = interactive ? 'true' : 'false';
        };

        const onDown = () => {
            cursor.dataset.click = 'true';
        };
        const onUp = () => {
            cursor.dataset.click = 'false';
        };
        const onLeave = () => {
            visible = false;
            scheduleRender();
        };
        const onEnter = () => {
            visible = true;
            scheduleRender();
        };

        document.addEventListener('pointermove', onMove, {passive: true});
        document.addEventListener('pointerdown', onDown);
        document.addEventListener('pointerup', onUp);
        document.addEventListener('pointercancel', onUp);
        document.addEventListener('pointerleave', onLeave);
        document.addEventListener('pointerenter', onEnter);

        return () => {
            document.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerdown', onDown);
            document.removeEventListener('pointerup', onUp);
            document.removeEventListener('pointercancel', onUp);
            document.removeEventListener('pointerleave', onLeave);
            document.removeEventListener('pointerenter', onEnter);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="walkover-custom-cursor" aria-hidden="true">
                <img src="/cursors/skull-animated.gif" alt="" draggable="false"/>
            </div>
            <style jsx global>{`
                @media (hover: hover) and (pointer: fine) {
                    html,
                    body,
                    body * {
                        cursor: none !important;
                    }

                    .walkover-custom-cursor {
                        position: fixed;
                        top: 0;
                        left: 0;
                        z-index: 2147483647;
                        width: 58px;
                        height: 58px;
                        pointer-events: none;
                        opacity: 0;
                        will-change: transform, opacity;
                        transition: opacity 100ms ease, filter 140ms ease;
                        transform: translate3d(-200px, -200px, 0);
                        transform-origin: 8.61px 0;
                    }

                    .walkover-custom-cursor img {
                        display: block;
                        width: 58px;
                        height: 58px;
                        object-fit: contain;
                        user-select: none;
                        -webkit-user-drag: none;
                    }

                    .walkover-custom-cursor[data-hover='true'] {
    filter: drop-shadow(0 0 5px rgba(37, 99, 235, 0.75));
}

                    .walkover-custom-cursor[data-click='true'] {
    filter: drop-shadow(0 0 9px rgba(59, 130, 246, 0.95));
}
                }

                @media (hover: none), (pointer: coarse) {
                    .walkover-custom-cursor {
                        display: none !important;
                    }
                }
            `}</style>
        </>
    );
}
