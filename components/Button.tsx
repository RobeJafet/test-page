'use client'

import LinkComponent from "./LinkComponent";
import { useState, useRef, useEffect } from "react";


export default function Button(props: Button) {
    const [isDesktop, setIsDesktop] = useState<boolean>(false);
    const linkRef = useRef<HTMLDivElement>(null);

    const dot = props.dotOrArrow === 'dot';
    const gray = props.whiteOrGray === 'gray';

    const handleResize = () => {
        setIsDesktop(window.matchMedia('(min-width: 993px)').matches);
    };
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const intervals = new Map<HTMLElement, NodeJS.Timeout>();
    const timeouts = new Map<HTMLElement, NodeJS.Timeout>();
    const originals = new Map<HTMLElement, string>();

    const shuffleString = (str: string): string => {
      const arr = str.split('');
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr.join('');
    };

    const getFirstTextNode = (el: HTMLElement): Text | null => {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
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

      const originalText = originals.get(el) || textNode.nodeValue || '';
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
        if ( linkRef.current && isDesktop) {
            if (timeouts.has(linkRef.current)) {
                stopScramble(linkRef.current);
            }
            startScramble(linkRef.current);
        }
    };
    const handleMouseLeave = () => {
        if ( linkRef.current) {
            stopScramble(linkRef.current);
        }
    };

    return (
        <div ref={linkRef} className="flex" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
             <LinkComponent {...props} 
            className={`${gray ? 'bg-gray' : 'bg-white'} py-[8px] px-[12px] md:px-6 flex items-center gap-4 rounded-[50px]`} 
            
        >
            {dot ? 
                <span className="dot"></span> : 
                <svg
                    width="12"
                    height="11"
                    viewBox="0 0 12 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[11px] h-4"
                >
                    <path
                        d="M11 5.17997L6.52701 0.707092M11 5.17997L6.47299 9.70698M11 5.17997L0.5 5.18005"
                        stroke="#12161C"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                    />
                </svg>
            }
            <p className="detail">
                {props.label}
            </p>
        </LinkComponent>
        </div>
       
    );
}
   