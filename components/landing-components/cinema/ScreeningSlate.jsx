"use client";

/*
 * The title card that bridges REEL 01 → REEL 02.
 * The hero ends on this exact frame (the featured video still, full-bleed, with this slate on it)
 * and the screening scene starts on it, so the cut between the two sections is invisible.
 * Keep the markup/classes identical in both places.
 */
export const BRIDGE_DIM = 0.42; // darkness over the bridging still, shared by both scenes

export default function ScreeningSlate({ as: Tag = "p", id }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Tag id={id} className="mt-6 font-display text-[clamp(3rem,9vw,8.5rem)] font-bold leading-[0.95] text-[#EAE6DF]">
        <span className="block">چراغ‌ها را</span>
        <span className="block">
          روشن <span className="text-[#dc2626]">نکن.</span>
        </span>
      </Tag>
    </div>
  );
}
