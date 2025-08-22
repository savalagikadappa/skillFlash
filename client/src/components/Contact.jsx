import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Tailwind styling applied

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setTimeout(() => {
            setSubmitted(true);
            setName('');
            setEmail('');
            setMessage('');

            // Reset submission status after showing success message
            setTimeout(() => {
                setSubmitted(false);
            }, 3000);
        }, 600);
    };

    return (
                <div className="max-w-6xl mx-auto px-4 pb-24">
                    <div className="text-center mb-16">
                        <span className="inline-block text-accent text-xs font-semibold tracking-widest uppercase mb-3">Get in Touch</span>
                        <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-sm">We'd love to hear from you. Let us know how we can help you. Feel free to reach out.</p>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-10">
                        <div className="space-y-10 lg:col-span-1">
                            <div className="card space-y-4">
                                <h3 className="text-white font-semibold text-lg">Connect With Us</h3>
                                <div className="flex flex-col gap-3">
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface/60 hover:bg-surface border border-white/5 hover:border-accent/40 transition text-gray-300 text-sm">
                                        <span className="w-8 h-8 inline-flex items-center justify-center rounded-md bg-accent/15 text-accent">in</span>
                                        <span>LinkedIn</span>
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface/60 hover:bg-surface border border-white/5 hover:border-accent/40 transition text-gray-300 text-sm">
                                        <span className="w-8 h-8 inline-flex items-center justify-center rounded-md bg-accent/15 text-accent">tw</span>
                                        <span>Twitter</span>
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface/60 hover:bg-surface border border-white/5 hover:border-accent/40 transition text-gray-300 text-sm">
                                        <span className="w-8 h-8 inline-flex items-center justify-center rounded-md bg-accent/15 text-accent">ig</span>
                                        <span>Instagram</span>
                                    </a>
                                    <a href="mailto:contact@yourcompany.com" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface/60 hover:bg-surface border border-white/5 hover:border-accent/40 transition text-gray-300 text-sm">
                                        <span className="w-8 h-8 inline-flex items-center justify-center rounded-md bg-accent/15 text-accent">@</span>
                                        <span>Email Us</span>
                                    </a>
                                </div>
                            </div>
                            <div className="card space-y-2">
                                <h3 className="text-white font-semibold text-lg">Visit Our Office</h3>
                                <p className="text-gray-400 text-sm">123 Design Studio Street</p>
                                <p className="text-gray-400 text-sm">Creative District, CA 91234</p>
                                <p className="text-gray-400 text-sm">Mon-Fri: 9:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <div className="card">
                                <h3 className="text-white font-semibold text-lg mb-6">Send Us a Message</h3>
                                {submitted ? (
                                    <div className="flex flex-col items-center gap-3 py-10">
                                        <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        <p className="text-emerald-400 text-sm">Thank you! Your message has been sent successfully.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="block text-xs font-medium uppercase tracking-wide text-gray-400">Name</label>
                                                <input id="name" type="text" value={name} onChange={(e)=>setName(e.target.value)} required placeholder="Your name" className="w-full bg-surface rounded-md border border-white/10 focus:border-accent focus:ring-accent px-3 py-2.5 text-sm" />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wide text-gray-400">Email</label>
                                                <input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder="Your email" className="w-full bg-surface rounded-md border border-white/10 focus:border-accent focus:ring-accent px-3 py-2.5 text-sm" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wide text-gray-400">Message</label>
                                            <textarea id="message" value={message} onChange={(e)=>setMessage(e.target.value)} required placeholder="How can we help you?" rows={6} className="w-full bg-surface rounded-md border border-white/10 focus:border-accent focus:ring-accent px-3 py-2.5 text-sm resize-y" />
                                        </div>
                                        <button type="submit" className="btn-primary w-full sm:w-auto inline-flex items-center gap-2">
                                            <span>Send Message</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 text-center">
                        <Link to="/" className="text-sm text-gray-400 hover:text-white transition">← Back to Home</Link>
                    </div>
                </div>
    );
};

export default Contact;
