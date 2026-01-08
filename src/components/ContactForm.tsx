import React, { useState } from 'react';
import LocalityAutocomplete from './LocalityAutocomplete';
import DropdownMenu from './ui/DropdownMenu';
import { useIntersectionObserver } from '../hooks';

const ContactForm: React.FC = () => {
    const [form, setForm] = useState({ name: '', phone: '', locality: '', poolType: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const ref = useIntersectionObserver();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validación básica
        if (!form.name || !form.phone || !form.locality || !form.poolType) {
            alert('Por favor completa los campos obligatorios.');
            return;
        }
        // Aquí se podría hacer fetch a un endpoint
        // ejemplo: fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })
        console.log('Solicitud enviada', form);
        setSubmitted(true);
    };

    return (
        <section id="contact" ref={ref} className="py-16 bg-neutral-50 rounded-xl fade-in-section">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-primary mb-6">Contacto</h2>
                <div className="bg-white rounded-xl shadow-md p-6">
                    {submitted ? (
                        <div className="text-center py-8">
                            <h3 className="text-lg font-semibold">¡Gracias! Hemos recibido tu solicitud.</h3>
                            <p className="text-sm text-gray-600 mt-2">Nos pondremos en contacto contigo en breve.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4" aria-label="Formulario de contacto">
                            <div>
                                <label htmlFor="name" className="block text-base font-medium text-gray-700 text-left">Nombre completo</label>
                                <input id="name" name="name" value={form.name} onChange={handleChange} required aria-required="true" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/30 h-10 pl-3" />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-base font-medium text-gray-700 text-left">Teléfono</label>
                                <input id="phone" name="phone" type="tel" inputMode="tel" pattern="[0-9+\- ()]{6,}" value={form.phone} onChange={handleChange} required aria-required="true" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/30 h-10 pl-3" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="locality" className="block text-base font-medium text-gray-700 text-left">Localidad</label>
                                    <LocalityAutocomplete
                                        value={form.locality}
                                        onChange={(value) => setForm({ ...form, locality: value })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="poolType" className="block text-base font-medium text-gray-700 text-left">Tipo de Piscina</label>
                                    <div className="mt-1">
                                        <DropdownMenu
                                            id="poolType"
                                            value={form.poolType}
                                            onChange={(value) => setForm({ ...form, poolType: value })}
                                            required
                                            options={[
                                                { value: 'privada', label: 'Privada' },
                                                { value: 'comunitaria', label: 'Comunitaria' },
                                                { value: 'hotel', label: 'Hotel/Spa' },
                                                { value: 'publica', label: 'Pública' },
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-base font-medium text-gray-700 text-left">Mensaje</label>
                                <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/30 pl-3 py-2" />
                            </div>

                            <div>
                                {/** Deshabilitar hasta que los campos obligatorios tengan contenido */}
                                {(() => {
                                    const isValid = form.name && form.phone && form.locality && form.poolType;
                                    return (
                                        <button
                                            type="submit"
                                            disabled={!isValid}
                                            aria-disabled={!isValid}
                                            className={`w-full text-white font-semibold px-4 py-3 rounded-md ${isValid ? 'bg-primary hover:opacity-95 hover:cursor-pointer' : 'bg-primary/30 cursor-not-allowed'}`}
                                        >
                                            Contáctanos
                                        </button>
                                    );
                                })()}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
