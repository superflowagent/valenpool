import React, { useState } from 'react';
import LocalityAutocomplete from './LocalityAutocomplete';
import DropdownMenu from './ui/DropdownMenu';
import { useIntersectionObserver } from '../hooks';

const ContactForm: React.FC = () => {
    const [form, setForm] = useState({ name: '', phone: '', locality: '', poolType: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);
    const [resultMessage, setResultMessage] = useState<string | null>(null);
    const ref = useIntersectionObserver();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Validación básica
        if (!form.name || !form.phone || !form.locality || !form.poolType) {
            alert('Por favor completa los campos obligatorios.');
            return;
        }

        setSending(true);
        setResultMessage(null);

        try {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('phone', form.phone);
            formData.append('locality', form.locality);
            formData.append('poolType', form.poolType);
            formData.append('message', form.message);
            const accessKey = (import.meta as { env?: { VITE_WEB3FORMS_KEY?: string } })?.env?.VITE_WEB3FORMS_KEY || '7c31f864-c88f-4457-8ca5-31a3f3cfce1d';
            formData.append('access_key', accessKey);

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                setSubmitted(true);
                setResultMessage('Enviado correctamente. ¡Gracias!');
                setForm({ name: '', phone: '', locality: '', poolType: '', message: '' });
            } else {
                setResultMessage(data.message || 'Error al enviar el formulario');
            }
        } catch (err: unknown) {
            console.error('Error enviando formulario', err);
            setResultMessage('Error de red al enviar el formulario');
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="contact" ref={ref} className="py-16 bg-neutral-50 rounded-xl fade-in-section">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-primary mb-6">Contacto</h2>
                <div className="bg-white rounded-xl shadow-md p-6">
                    {submitted ? (
                        <div className="text-center py-8">
                            <h3 className="text-lg font-semibold">¡Formulario enviado!</h3>
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
                                            disabled={!isValid || sending}
                                            aria-disabled={!isValid || sending}
                                            className={`w-full text-white font-semibold px-4 py-3 rounded-md ${isValid && !sending ? 'bg-primary hover:opacity-95 hover:cursor-pointer' : 'bg-primary/30 cursor-not-allowed'}`}
                                        >
                                            {sending ? 'Enviando...' : 'Contáctanos'}
                                        </button>
                                    );
                                })()}

                            {resultMessage && (
                                <p className="mt-3 text-sm text-center text-gray-700" role="status">{resultMessage}</p>
                            )}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
