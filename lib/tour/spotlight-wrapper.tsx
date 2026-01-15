"use client";
import React, {
  useEffect,
  useRef,
  useState,
  ReactNode,
  useLayoutEffect,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./_spotlight.css";
import { Section } from "../watch-files";
import { useEditingStatus } from "@/hooks/useEditingStatus";

interface SpotlightWrapperProps {
  children: ReactNode;
  tooltip: string;
  // open: boolean;
  // onClose: () => void;
  placement: "above" | "below" | "left" | "right";
  childType: Section;
}

interface Position {
  top: number;
  left: number;
  width: number;
}

export default function SpotlightWrapper({
  children,
  tooltip,
  // open,
  // onClose,
  placement,
  childType,
}: SpotlightWrapperProps) {
  const activeSection = useEditingStatus();

  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<Position>({
    top: 0,
    left: 0,
    width: 0,
  });
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    if (!activeSection || !ref.current) {
      setOpen(false);
      return;
    }

    if (activeSection?.section === childType) {
      // get the main DOM node for this element
      const parentEl = ref.current;

      // find the specific child you want to measure
      // e.g., first child element
      const firstChild = Array.from(parentEl.childNodes).find(
        (node) => node.nodeType === 1 // element nodes only
      );

      // fall back to parent if child not found
      const targetEl: ChildNode | undefined = firstChild || parentEl;

      const rect = targetEl.getBoundingClientRect();

      const rectBottom = window.innerHeight - rect.bottom;
      let top = 0;
      let left = 0;

      if (childType === "header") {
        const tooltipHeight = 44; // estimate height
        const gap = 8;
        top =
          placement === "below"
            ? rect.bottom + window.scrollY + gap
            : rect.top + window.scrollY - tooltipHeight - gap;
        left = rect.left + window.scrollX + rect.width * 0.2;
      } else if (childType === "sidebar") {
        top = rectBottom / 2;
        left = rect.width;
      } else {
        top = 23;
        left = rect.width / 2;
      }

      setPos({
        top,
        left,
        width: rect.width,
      });
      setOpen(true);

      setTimeout(() => {
        setOpen(false);
      }, 3000);
    } else {
      setOpen(false);
    }
  }, [activeSection, childType, placement]);

  return (
    <>
      {/* Background dim */}
      {open && <div className="spotlight-overlay" />}

      {/* Highlight target with motion animation */}
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={ref}
            className="spotlight-target"
            initial={{ boxShadow: "0px 0px 0px rgba(64,169,255,0)" }}
            animate={{
              boxShadow: [
                "0px 0px 15px rgba(255,165,0,0.25)",
                "0px 0px 25px rgba(255,165,0,0.6)",
                "0px 0px 15px rgba(255,165,0,0.25)",
              ],
              borderColor: ["#ff8c00", "#ffb347", "#ff8c00"],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {children}
          </motion.div>
        ) : (
          <div ref={ref}>{children}</div>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="spotlight-tooltip"
            className={`spotlight-tooltip ${placement}`}
            style={{ top: pos.top, left: pos.left }}
            initial={{
              opacity: 0,
              x: placement === "left" ? -10 : placement === "right" ? -10 : 0,
              y: placement === "above" ? -10 : placement === "below" ? 10 : 0,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              x: placement === "left" ? -10 : placement === "right" ? -10 : 0,
              y: placement === "above" ? -10 : placement === "below" ? 10 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {tooltip}
            <div className="spotlight-arrow" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
