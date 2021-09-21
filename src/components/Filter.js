import React, { useState, useRef, useEffect } from 'react';
export default function Filter({ children, label }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(undefined);
    const buttonRef = useRef(undefined);

    useEffect(() => {
        const handleClick = event => {
            const isDropdownClicked = dropdownRef.current && dropdownRef.current.contains(event.target);
            const isButtonClicked = buttonRef.current && buttonRef.current.contains(event.target);

            if (isDropdownClicked || isButtonClicked) {
                return;
            }
            setIsOpen(false);
        };

        document.addEventListener("mousedown", handleClick);
        document.addEventListener("touchstart", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("touchstart", handleClick);
        };
    }, [dropdownRef, buttonRef]);

    return (
        <div classname="filter" aria-hidden="true"
            onMouseEnter={() => setIsOpen(!isOpen)}
            // For debug: comment out line below
            onMouseLeave={() => setIsOpen(!isOpen)}
        >
            <button
                ref={buttonRef}
                className="filter-button"
            >
                {label}
            </button>
            {isOpen && (
                <div ref={dropdownRef} className="filter-dropdown">
                    <div className="filter-dropdown-items">{children}</div>
                </div>
            )}
        </div>
    )
}