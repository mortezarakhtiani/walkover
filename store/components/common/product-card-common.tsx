"use client"

import {motion, useReducedMotion} from "framer-motion"
import {buttonVariants} from "@/components/ui/button"
import {ShoppingCart, Star, Heart} from "lucide-react"
import {useState} from "react"
import {cn} from "@/lib/utils"
import {toAbsoluteUrl} from "@/lib/helpers"
import {toPersianDigits, toPersianSplit} from "@/lib/to-persian"
import {useStoreClient} from "@/store/components/context"
import {DiscountBadge} from '@/store/components/ui/discount-badge'


interface ProductRevealCardProps {
    id: string | number
    badge?: boolean
    bgColor?: string
    borderColor?: string
    title: string
    discount?: number
    total: number
    logo: string
    hoverImage?: string
    label?: number | string
    star?: number
    showAddButton?: boolean
    description?: string
    reviewCount?: number
    onAdd?: () => void
    onFavorite?: () => void
    onDetails?: () => void
    enableAnimations?: boolean
    className?: string
}

export function ProductRevealCard({
                                      id,
                                      badge = false,
                                      bgColor,
                                      borderColor,
                                      title,
                                      discount,
                                      total,
                                      logo,
                                      hoverImage,
                                      label,
                                      star,
                                      showAddButton = true,
                                      description = "",
                                      reviewCount,
                                      onAdd,
                                      onFavorite,
                                      onDetails,
                                      enableAnimations = true,
                                      className,
                                  }: ProductRevealCardProps) {
    const [isFavorite, setIsFavorite] = useState(false)
    const shouldReduceMotion = useReducedMotion()
    const shouldAnimate = enableAnimations && !shouldReduceMotion

    const {showCartSheet, showProductDetailsSheet} = useStoreClient()

    const handleFavorite = () => {
        setIsFavorite(!isFavorite)
        onFavorite?.()
    }

    const handleAdd = () => {
        if (onAdd) {
            onAdd()
        } else {
            showCartSheet()
        }
    }

    const handleDetails = () => {
        if (onDetails) {
            onDetails()
        } else {
            showProductDetailsSheet(id)
        }
    }

    const containerVariants = {
        rest: {
            scale: 1,
            y: 0,
            filter: "blur(0px)",
        },
        hover: shouldAnimate ? {
            scale: 1.03,
            y: -8,
            filter: "blur(0px)",
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 30,
                mass: 0.8,
            }
        } : {},
    }

    const imageVariants = {
        rest: {scale: 1},
        hover: {scale: 1.1},
    }

    const overlayVariants = {
        rest: {
            y: "100%",
            opacity: 0,
            filter: "blur(4px)",
        },
        hover: {
            y: "0%",
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                type: "spring" as const,
                stiffness: 400,
                damping: 28,
                mass: 0.6,
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    }

    const contentVariants = {
        rest: {
            opacity: 0,
            y: 20,
            scale: 0.95,
        },
        hover: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 400,
                damping: 25,
                mass: 0.5,
            },
        },
    }

    const buttonVariants_motion = {
        rest: {
            scale: 1,
            y: 0,
            transition: {duration: 0.05, ease: "easeOut" as const},
        },
        hover: {
            scale: 1.05,
            y: -2,
            transition: {duration: 0.05, ease: "easeOut" as const},
        },
        tap: {scale: 0.95},
    }

    const favoriteVariants = {
        rest: {scale: 1, rotate: 0},
        favorite: {
            scale: [1, 1.3, 1],
            rotate: [0, 10, -10, 0],
            transition: {
                duration: 0.5,
                ease: "easeInOut" as const
            }
        },
    }

    return (
        <motion.div
            data-slot="product-reveal-card"
            initial="rest"
            whileHover="hover"
            variants={containerVariants}
            style={{
                backgroundColor: bgColor || undefined,
                borderColor: borderColor || undefined,
            }}
            className={cn(
                "relative rounded-md border border-border bg-black text-white overflow-hidden",
                "shadow-lg shadow-black/5 group",
                className
            )}
        >
            {/* Image Container */}
            <div className="relative overflow-hidden">
                <motion.img
                    src={toAbsoluteUrl(logo)}
                    alt={title}
                    className="object-contain"
                    style={{
                        width: "100%",
                        height: "300px",
                        margin: "0 auto",
                    }}
                    variants={imageVariants}
                    transition={{type: "spring", stiffness: 300, damping: 30}}
                />

                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to top, rgba(255,255,255,0.3) -550%, transparent 100%)",
                    }}
                />

                {/* Favorite Button */}
                <motion.button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleFavorite();
                    }}
                    variants={favoriteVariants}
                    animate={isFavorite ? "favorite" : "rest"}
                    className={cn(
                        "absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur-sm",
                        isFavorite
                            ? "bg-red-600 text-white"
                            : "bg-white/20 text-white hover:bg-white/30"
                    )}
                >
                    <Heart className={cn("w-4 h-4", isFavorite && "fill-current")}/>
                </motion.button>

                {/* Discount Badge */}
                {badge && <DiscountBadge discount={discount}/>}
            </div>

            {/* Content */}
            <div className="px-6 pt-4 pb-3 space-y-3">
                {/* Rating */}
                {star != null && (
                    <div className="flex items-center gap-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={cn(
                                        "w-4 h-4",
                                        i < Math.floor(star)
                                            ? "text-yellow-400 fill-current"
                                            : "text-muted-foreground"
                                    )}
                                />
                            ))}
                        </div>

                        <span className="text-sm text-muted-foreground">
                            {toPersianDigits(String(star))}
                            {reviewCount != null &&
                                ` (${toPersianDigits(String(reviewCount))} بازدیدها)`}
                        </span>
                    </div>
                )}

                {/* Product Info */}
                <div className="space-y-3 sm:space-y-4">
                    <motion.h3
                        className="truncate text-sm font-bold leading-6 tracking-tight sm:text-base"
                        initial={{opacity: 0.9}}
                        whileHover={{opacity: 1}}
                        transition={{duration: 0.3}}
                        title={title}
                    >
                        {title}
                    </motion.h3>

                    <div className="flex items-center justify-end gap-2">


                        {label != null && label !== "" && Number(label) > total && (
                            <span className="text-xs text-muted-foreground line-through sm:text-sm">
                                {toPersianSplit(String(label))}
                            </span>
                        )}

                        <span className="text-base font-bold text-primary sm:text-lg">
                            {toPersianSplit(String(total))}
                        </span>

                        <span className="text-xs font-bold text-primary sm:text-sm">
    تومان
</span>
                    </div>
                </div>
            </div>

            {/* Reveal Overlay */}
            <motion.div
                variants={overlayVariants}
                className="absolute inset-0 bg-black backdrop-blur-xl flex flex-col justify-end"
            >
                <div className="p-6 space-y-4">

                    {/* Hover Product Image */}
                    <motion.div
                        variants={contentVariants}
                        className="flex items-center justify-center mb-0"
                    >
                        {hoverImage && (
                            <img
                                src={toAbsoluteUrl(hoverImage)}
                                alt={`${title} - تصویر دوم`}
                                className="object-contain"
                                style={{
                                    width: "80%",
                                    height: "270px",
                                    margin: "0 auto",
                                }}
                            />
                        )}
                    </motion.div>

                    {/* Colors & Sizes */}
                    <motion.div variants={contentVariants}>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                            {/* Available Colors */}
                            <div className="bg-white/10 rounded-md p-3">
                                <div className="font-semibold mb-2">رنگ‌های موجود</div>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="w-5 h-5 rounded-full bg-black border border-white/40"
                                          title="مشکی"/>
                                    <span className="w-5 h-5 rounded-full bg-white border border-gray-300"
                                          title="سفید"/>
                                    <span className="w-5 h-5 rounded-full bg-red-600" title="قرمز"/>
                                    <span className="w-5 h-5 rounded-full bg-blue-500" title="آبی"/>
                                </div>
                            </div>

                            {/* Available Sizes */}
                            <div className="bg-white/10 rounded-md p-3">
                                <div className="font-semibold mb-2">سایزهای موجود</div>
                                <div className="flex items-center justify-center gap-1">
                                    {["S", "M", "L", "XL"].map((size) => (
                                        <span
                                            key={size}
                                            className="px-1.5 py-1 rounded border border-white/30"
                                        >
                                            {size}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div variants={contentVariants} className="space-y-3">
                        {showAddButton && (
                            <motion.button
                                onClick={handleAdd}
                                variants={buttonVariants_motion}
                                initial="rest"
                                whileHover="hover"
                                whileTap="tap"
                                className={cn(
                                    buttonVariants({variant: "default"}),
                                    "w-full h-12 font-medium",
                                    "bg-red-600 text-white",
                                    "hover:bg-red-700 hover:text-white",
                                )}
                            >
                                <ShoppingCart className="w-4 h-4 mr-2 text-foreground"/>
                                افزودن به سبد
                            </motion.button>
                        )}

                        <motion.button
                            onClick={handleDetails}
                            variants={buttonVariants_motion}
                            initial="rest"
                            whileHover="hover"
                            whileTap="tap"
                            className={cn(
                                buttonVariants({variant: "inline"}),
                                "w-full h-10 font-medium border border-border shadow-none"
                            )}
                        >
                            جزئیات بیشتر
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
}