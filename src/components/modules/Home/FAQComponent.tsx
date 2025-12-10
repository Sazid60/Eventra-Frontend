"use client";


import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FAQItem } from "./FAQ";

interface FAQItemProps {
    item: FAQItem;
}

const FAQItemComponent = ({ item } : FAQItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-border/50 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-2 py-4 flex items-center justify-between hover:bg-accent/30 transition-colors rounded-lg group"
            >
                <h3 className="text-left text-base md:text-lg font-medium text-foreground group-hover:text-[#45aaa2] transition-colors">
                    {item.question}
                </h3>
                <ChevronDown
                    className={`h-5 w-5 text-[#45aaa2] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {isOpen && (
                <div className="pb-4 pl-0 pr-8 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {item.answer}
                    </p>
                </div>
            )}
        </div>
    );
};

export default FAQItemComponent;