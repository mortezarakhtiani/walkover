'use client';

import React, {useRef, useState} from 'react';

function isRTL(text: string) {
    return /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(text);
}

export interface InfoCardProps {
    image: string;
    title: string;
    width?: number | string;
    height?: number | string;
    borderColor?: string;
    borderBgColor?: string;
    borderWidth?: number;
    borderPadding?: number;
    cardBgColor?: string;
    shadowColor?: string;
    patternColor1?: string;
    patternColor2?: string;
    textColor?: string;
    hoverTextColor?: string;
    fontFamily?: string;
    rtlFontFamily?: string;
    effectBgColor?: string;
    contentPadding?: string;
    imageHeight?: number | string;
    className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
                                                      image,
                                                      title,
                                                      width = '100%',
                                                      height = '100%',
                                                      borderColor = '#DAFF3E',
                                                      borderBgColor = '#242424',
                                                      borderWidth = 3,
                                                      borderPadding = 10,
                                                      cardBgColor = '#000',
                                                      shadowColor = '#242424',
                                                      patternColor1 = 'rgba(230,230,230,0.15)',
                                                      patternColor2 = 'rgba(240,240,240,0.15)',
                                                      textColor = '#f5f5f5',
                                                      hoverTextColor = '#242424',
                                                      fontFamily = "'Roboto Mono', monospace",
                                                      rtlFontFamily = "'Montserrat', sans-serif",
                                                      effectBgColor = '#DAFF3E',
                                                      contentPadding = '4px 10px 2px',
                                                      imageHeight = 'auto',
                                                      className = '',
                                                  }) => {
    const [hovered, setHovered] = useState(false);
    const borderRef = useRef<HTMLDivElement>(null);

    const rtl = isRTL(title) || isRTL(title);
    const effectiveFont = rtl ? rtlFontFamily : fontFamily;

    const pattern =
        `linear-gradient(45deg, ${patternColor1} 25%, transparent 25%, transparent 75%, ${patternColor2} 75%),` +
        `linear-gradient(-45deg, ${patternColor2} 25%, transparent 25%, transparent 75%, ${patternColor1} 75%)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const border = borderRef.current;
        if (!border) return;

        const rect = border.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const angle = Math.atan2(y, x);

        border.style.setProperty('--rotation', `${angle}rad`);
    };

    return (
        <div
            ref={borderRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
                setHovered(false);
                borderRef.current?.style.setProperty('--rotation', '0rad');
            }}
            className={`relative flex min-w-0 cursor-pointer flex-col overflow-hidden ${className}`}
            style={{
                width,
                height,
                border: `${borderWidth}px solid transparent`,
                borderRadius: '1em',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                backgroundImage: `linear-gradient(${cardBgColor}, ${cardBgColor}), conic-gradient(from var(--rotation, 0rad), ${borderColor} 0deg, ${borderColor} 90deg, ${borderBgColor} 90deg, ${borderBgColor} 360deg)`,
                padding: borderPadding,
                boxSizing: 'border-box',
                fontFamily: effectiveFont,
                boxShadow: hovered ? `0 8px 30px ${shadowColor}55` : 'none',
                transition: 'box-shadow 0.3s ease',
            }}
        >
            <div
                className="relative flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-[0.65em]"
                style={{
                    backgroundColor: 'transparent',
                }}
            >
                {/* Image */}
                <div
                    className="relative w-full shrink-0 overflow-hidden"
                    style={{
                        height: imageHeight,
                        aspectRatio: imageHeight === 'auto' ? '16 / 10' : undefined,
                    }}
                >
                    <img
                        src={image}
                        alt={title}
                        className="block h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                    />

                    <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"/>
                </div>

                {/* Content */}
                <div
                    className="flex min-h-0 flex-1 flex-col"
                    style={{
                        padding: contentPadding,
                    }}
                >
                    <h3
                        dir={isRTL(title) ? 'rtl' : 'ltr'}
                        className="relative mb-0 w-full shrink-0 overflow-hidden text-center text-xl font-bold"
                        style={{
                            color: hovered ? hoverTextColor : textColor,
                            transition: 'color 0.3s ease',
                            letterSpacing: '-.01em',
                            lineHeight: 1.2,
                        }}
                    >
            <span className="relative z-10 block px-1 py-0.5">
              {title}
            </span>

                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-1"
                            style={{
                                clipPath: hovered
                                    ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                                    : 'polygon(0 50%, 100% 50%, 100% 50%, 0 50%)',
                                transformOrigin: 'center',
                                transition: 'clip-path 0.4s cubic-bezier(.1,.5,.5,1)',
                                backgroundColor: effectBgColor,
                            }}
                        />
                    </h3>


                </div>
            </div>
        </div>
    );
};

export default InfoCard;
