import React, { useState, useRef, useEffect } from 'react';

interface LocalityAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
}

const LocalityAutocomplete: React.FC<LocalityAutocompleteProps> = ({ value, onChange }) => {
    const [input, setInput] = useState(value);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Inicializar Google Places API
    useEffect(() => {
        if (window.google) {
            setAutocompleteService(new window.google.maps.places.AutocompleteService());
        }
    }, []);

    // Manejar búsqueda de localidades
    const handleSearch = (searchValue: string) => {
        setInput(searchValue);

        if (searchValue.length < 2) {
            setSuggestions([]);
            return;
        }

        if (autocompleteService) {
            autocompleteService.getPlacePredictions(
                {
                    input: searchValue,
                    componentRestrictions: { country: 'es' },
                    types: ['(cities)'],
                },
                (predictions) => {
                    if (predictions) {
                        const localityNames = predictions.map((p) => p.main_text);
                        setSuggestions(localityNames);
                        setIsOpen(true);
                    }
                }
            );
        }
    };

    // Manejar selección
    const handleSelect = (locality: string) => {
        setInput(locality);
        onChange(locality);
        setSuggestions([]);
        setIsOpen(false);
    };

    // Cerrar dropdown al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
                inputRef.current && !inputRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative">
            <div className="relative flex items-center">
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => suggestions.length > 0 && setIsOpen(true)}
                    placeholder="Busca tu localidad..."
                    className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-[#1a3d65] focus:ring focus:ring-[#1a3d65]/30 h-10 pl-3"
                    aria-autocomplete="list"
                    aria-expanded={isOpen}
                    required
                />
            </div>

            {isOpen && suggestions.length > 0 && (
                <div
                    ref={dropdownRef}
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto"
                >
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleSelect(suggestion)}
                            className="w-full text-left px-4 py-3 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none border-b border-gray-100 last:border-0 text-gray-700 hover:text-[#1a3d65]"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            )}

            {input && !suggestions.includes(input) && input.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">Presiona Enter o selecciona una localidad</p>
            )}
        </div>
    );
};

export default LocalityAutocomplete;
