import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface Option {
    value: string;
    label: string;
}

interface DropdownMenuProps {
    id?: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    placeholder?: string;
    required?: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ id, value, onChange, options, placeholder = 'Selecciona...', required = false }) => {
    const selected = options.find((o) => o.value === value);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const [contentStyle, setContentStyle] = useState<React.CSSProperties>({});
    const [open, setOpen] = useState(false);

    const updateWidth = () => {
        const w = triggerRef.current?.getBoundingClientRect().width;
        if (w) setContentStyle({ width: `${w}px` });
    };

    useEffect(() => {
        if (open) {
            const id = requestAnimationFrame(updateWidth);
            return () => cancelAnimationFrame(id);
        }
    }, [open]);

    useEffect(() => {
        const onResize = () => {
            if (open) {
                const id = requestAnimationFrame(updateWidth);
                return () => cancelAnimationFrame(id);
            }
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [open]);

    return (
        <DropdownMenuPrimitive.Root onOpenChange={(o) => setOpen(o)}>
            <DropdownMenuPrimitive.Trigger asChild>
                <button
                    ref={triggerRef}
                    id={id}
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={open}
                    aria-required={required}
                    className={`w-full rounded-md border border-gray-200 bg-white px-3 py-2 pr-4 text-sm shadow-sm focus:border-primary focus:ring focus:ring-primary/30 h-10 text-foreground flex items-center justify-between`}
                >
                    <span className={`${selected ? '' : 'text-gray-400'}`}>
                        {selected ? selected.label : placeholder}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
            </DropdownMenuPrimitive.Trigger>

            <DropdownMenuPrimitive.Content sideOffset={4} align="start" style={contentStyle} className="z-50 mt-1 rounded-md border bg-white p-0 shadow-lg max-h-60 overflow-y-auto">
                {options.map((o) => (
                    <DropdownMenuPrimitive.Item
                        key={o.value}
                        onSelect={() => onChange(o.value)}
                        className={`w-full text-left px-4 py-3 cursor-pointer focus:outline-none border-b border-gray-100 last:border-0 text-gray-700 hover:bg-blue-50 hover:text-primary`}
                    >
                        {o.label}
                    </DropdownMenuPrimitive.Item>
                ))}
            </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Root>
    );
};

export default DropdownMenu;
