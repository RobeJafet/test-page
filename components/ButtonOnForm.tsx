import { useEffect, useRef, useState } from "react";

export default function ButtonOnForm() {
    const [isDesktop, setIsDesktop] = useState<boolean>(false);
    const linkRef = useRef<HTMLDivElement>(null);
    const handleResize = () => {
        setIsDesktop(window.matchMedia("(min-width: 993px)").matches);
    };
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const intervals = new Map<HTMLElement, NodeJS.Timeout>();
    const timeouts = new Map<HTMLElement, NodeJS.Timeout>();
    const originals = new Map<HTMLElement, string>();

    const shuffleString = (str: string): string => {
        const arr = str.split("");
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join("");
    };

    const getFirstTextNode = (el: HTMLElement): Text | null => {
        const walker = document.createTreeWalker(
            el,
            NodeFilter.SHOW_TEXT,
            null,
        );
        return walker.nextNode() as Text | null;
    };

    const stopScramble = (el: HTMLElement) => {
        clearInterval(intervals.get(el));
        clearTimeout(timeouts.get(el));
        const original = originals.get(el);
        const textNode = getFirstTextNode(el);
        if (original && textNode) {
            textNode.nodeValue = original;
        }
    };

    const startScramble = (el: HTMLElement) => {
        const textNode = getFirstTextNode(el);
        if (!textNode) return;

        const originalText = originals.get(el) || textNode.nodeValue || "";
        originals.set(el, originalText);
        if (textNode) {
            textNode.nodeValue = shuffleString(originalText);
        }
        const interval = setInterval(() => {
            if (textNode) {
                textNode.nodeValue = shuffleString(originalText);
            }
        }, 100);
        intervals.set(el, interval);

        const timeout = setTimeout(() => {
            stopScramble(el);
        }, 500);
        timeouts.set(el, timeout);
    };

    const handleMouseEnter = () => {
        if (linkRef.current && isDesktop) {
            if (timeouts.has(linkRef.current)) {
                stopScramble(linkRef.current);
            }
            startScramble(linkRef.current);
        }
    };
    const handleMouseLeave = () => {
        if (linkRef.current) {
            stopScramble(linkRef.current);
        }
    };

    return (
        <div className="bg-gray py-[8px] px-[12px] md:px-6 flex items-center gap-4 rounded-[50px] whitespace-pre cursor-pointer" ref={linkRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <span className="dot"></span>
            <p className="detail">send message</p>
        </div>
    );
}
