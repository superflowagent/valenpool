import React, { useEffect, useRef, useState } from 'react';

interface LocalityAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
}

const LocalityAutocomplete: React.FC<LocalityAutocompleteProps> = ({ value, onChange }) => {
    const [municipalities, setMunicipalities] = useState<string[] | null>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        // Load CSV once from public folder
        let mounted = true;
        fetch('/pool_photos/municipios_vlc.csv')
            .then((r) => r.text())
            .then((text) => {
                if (!mounted) return;
                const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
                setMunicipalities(lines);
                setError(null);
            })
            .catch((err) => {
                console.error('Failed to load municipios CSV', err);
                setError('No se pudieron cargar las localidades');
                setMunicipalities([]);
            })
            .finally(() => setLoading(false));
        return () => { mounted = false; };
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && inputRef.current && !inputRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filterSuggestions = (q: string) => {
        if (!municipalities || !q) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }
        const ql = q.toLowerCase();
        const starts = municipalities.filter((m) => m.toLowerCase().startsWith(ql));
        const includes = municipalities.filter((m) => !m.toLowerCase().startsWith(ql) && m.toLowerCase().includes(ql));
        const combined = [...starts, ...includes].slice(0, 10);
        setSuggestions(combined);
        setHighlightedIndex(-1);
        setIsOpen(combined.length > 0);
    };

    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

    const handleChange = (q: string) => {
        onChange(q);
        setHighlightedIndex(-1);
        if (!q || q.length < 1) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }
        // immediate filtering (no debounce)
        filterSuggestions(q);
    };

    const handleSelect = (s: string) => {
        onChange(s);
        setSuggestions([]);
        setIsOpen(false);
        setHighlightedIndex(-1);
    };

    return (
        <div className="relative">
            <div className="relative flex items-center">
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            if (suggestions.length > 0) {
                                e.preventDefault();
                                const item = highlightedIndex >= 0 ? suggestions[highlightedIndex] : suggestions[0];
                                handleSelect(item);
                            }
                        } else if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            setIsOpen(true);
                            setHighlightedIndex((idx) => Math.min(suggestions.length - 1, idx + 1));
                            const next = dropdownRef.current?.querySelectorAll('button')[Math.min(suggestions.length - 1, Math.max(0, highlightedIndex + 1))] as HTMLElement | undefined;
                            next?.scrollIntoView({ block: 'nearest' });
                        } else if (e.key === 'ArrowUp') {
                            e.preventDefault();
                            setHighlightedIndex((idx) => Math.max(-1, idx - 1));
                            const prev = dropdownRef.current?.querySelectorAll('button')[Math.max(0, highlightedIndex - 1)] as HTMLElement | undefined;
                            prev?.scrollIntoView({ block: 'nearest' });
                        } else if (e.key === 'Escape') {
                            setIsOpen(false);
                        }
                    }}
                    onFocus={() => suggestions.length > 0 && setIsOpen(true)}
                    placeholder={loading ? 'Cargando localidades…' : 'Busca tu localidad...'}
                    className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/30 h-10 pl-3"
                    aria-autocomplete="list"
                    aria-expanded={isOpen}
                    aria-label="Localidad"
                />
            </div>

            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}

            {isOpen && suggestions.length > 0 && (
                <div ref={dropdownRef} role="listbox" aria-activedescendant={highlightedIndex >= 0 ? `loc-option-${highlightedIndex}` : undefined} className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                    {suggestions.map((s, i) => {
                        const isHighlighted = i === highlightedIndex;
                        return (
                            <button
                                id={`loc-option-${i}`}
                                key={s}
                                type="button"
                                onMouseEnter={() => setHighlightedIndex(i)}
                                onClick={() => handleSelect(s)}
                                className={`w-full text-left px-4 py-3 cursor-pointer focus:outline-none border-b border-gray-100 last:border-0 text-gray-700 ${isHighlighted ? 'bg-blue-50 text-primary' : 'hover:bg-blue-50 hover:text-primary'}`}
                                aria-selected={isHighlighted}
                                role="option"
                            >
                                {s}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default LocalityAutocomplete;
