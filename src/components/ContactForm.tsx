import React, { useState } from 'react';
import LocalityAutocomplete from './LocalityAutocomplete';
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
                <h2 className="text-3xl font-bold text-[#1a3d65] mb-6">Contacto</h2>
                <div className="bg-white rounded-xl shadow-md p-6">
                    {submitted ? (
                        <div className="text-center py-8">
                            <h3 className="text-lg font-semibold">¡Gracias! Hemos recibido tu solicitud.</h3>
                            <p className="text-sm text-gray-600 mt-2">Nos pondremos en contacto contigo en breve.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4" aria-label="Formulario de contacto">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-left">Nombre completo</label>
                                <input id="name" name="name" value={form.name} onChange={handleChange} required aria-required="true" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-[#1a3d65] focus:ring focus:ring-[#1a3d65]/30 h-10 pl-3" />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 text-left">Teléfono</label>
                                <input id="phone" name="phone" type="tel" inputMode="tel" pattern="[0-9+\- ()]{6,}" value={form.phone} onChange={handleChange} required aria-required="true" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-[#1a3d65] focus:ring focus:ring-[#1a3d65]/30 h-10 pl-3" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="locality" className="block text-sm font-medium text-gray-700 text-left">Localidad</label>
                                    <LocalityAutocomplete
                                        value={form.locality}
                                        onChange={(value) => setForm({ ...form, locality: value })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="poolType" className="block text-sm font-medium text-gray-700 text-left">Tipo de Piscina</label>
                                    <select id="poolType" name="poolType" value={form.poolType} onChange={handleChange} required aria-required="true" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-[#1a3d65] focus:ring focus:ring-[#1a3d65]/30 h-10 pl-3">
                                        <option value="">Selecciona...</option>
                                        <option>Privada</option>
                                        <option>Comunitaria</option>
                                        <option>Hotel/Spa</option>
                                        <option>Pública</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 text-left">Mensaje</label>
                                <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-[#1a3d65] focus:ring focus:ring-[#1a3d65]/30 pl-3" />
                            </div>

                            <div>
                                <button type="submit" className="w-full bg-[#1a3d65] text-white font-semibold px-4 py-3 rounded-md">Contáctanos</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
