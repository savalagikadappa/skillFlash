import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Contact page aligned with global blue/cyan gradient + card/input styles
const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setSubmitted(true);
            setName('');
            setEmail('');
            setMessage('');
            setLoading(false);
            setTimeout(() => setSubmitted(false), 3000);
        }, 600);
    };

    return (
        <div className="min-h-screen bg-black text-white with-nav-offset pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-300 border border-blue-500/30 mb-6">Get In Touch</span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
                        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">Contact Us</span>
                    </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">We'd love to hear from you. Ask a question, propose a partnership, or just say hi — we'll get back fast.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Left Column */}
                    <div className="space-y-10 lg:col-span-1">
                        <div className="card space-y-6">
                            <h3 className="text-lg font-semibold">Connect With Us</h3>
                            <div className="flex flex-col gap-3 text-sm">
                                {[
                                    { href: 'https://linkedin.com', label: 'LinkedIn', tag: 'in' },
                                    { href: 'https://twitter.com', label: 'Twitter', tag: 'tw' },
                                    { href: 'https://instagram.com', label: 'Instagram', tag: 'ig' },
                                    { href: 'mailto:contact@yourcompany.com', label: 'Email Us', tag: '@' }
                                ].map((s, i) => (
                                    <a
                                        key={i}
                                        href={s.href}
                                        target={s.href.startsWith('http') ? '_blank' : undefined}
                                        rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="group flex items-center gap-3 px-3 py-2 rounded-lg bg-surface/60 hover:bg-surface/80 border border-white/10 hover:border-blue-500/40 transition text-gray-300"
                                    >
                                        <span className="w-8 h-8 inline-flex items-center justify-center rounded-md bg-gradient-to-br from-blue-600/20 to-cyan-600/20 text-blue-300 text-xs font-semibold group-hover:from-blue-600/30 group-hover:to-cyan-600/30">{s.tag}</span>
                                        <span className="group-hover:text-white transition-colors">{s.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="card space-y-3 text-sm">
                            <h3 className="text-lg font-semibold">Visit Our Office</h3>
                            <p className="text-gray-400">123 Design Studio Street</p>
                            <p className="text-gray-400">Creative District, CA 91234</p>
                            <p className="text-gray-400">Mon–Fri · 9:00 AM – 6:00 PM</p>
                        </div>
                        <div className="card text-sm space-y-3">
                            <h3 className="text-lg font-semibold">Support</h3>
                            <p className="text-gray-400 leading-relaxed">For account or billing issues, reach out to support any time. Typical response under 4 hours.</p>
                            <a href="mailto:support@yourcompany.com" className="inline-flex items-center gap-2 text-blue-400 hover:text-cyan-300 transition">
                                <span className="text-lg">✉️</span> support@yourcompany.com
                            </a>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="card p-8 md:p-10">
                            <h3 className="text-xl font-semibold mb-8">Send Us a Message</h3>
                            {submitted ? (
                                <div className="flex flex-col items-center gap-4 py-16">
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <p className="text-emerald-400 text-sm">Your message has been sent. We'll reply shortly.</p>
                                    <button onClick={()=>setSubmitted(false)} className="text-xs text-gray-400 hover:text-white transition">Send another message</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid sm:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="block text-[11px] font-medium uppercase tracking-widest text-gray-400">Name</label>
                                            <input id="name" type="text" value={name} onChange={(e)=>setName(e.target.value)} required placeholder="Your name" className="w-full rounded-md bg-surface/70 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 px-3 py-2.5 text-sm transition" />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="block text-[11px] font-medium uppercase tracking-widest text-gray-400">Email</label>
                                            <input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder="you@example.com" className="w-full rounded-md bg-surface/70 border border-white/10 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 px-3 py-2.5 text-sm transition" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="block text-[11px] font-medium uppercase tracking-widest text-gray-400">Message</label>
                                        <textarea id="message" value={message} onChange={(e)=>setMessage(e.target.value)} required placeholder="How can we help you?" rows={6} className="w-full rounded-md bg-surface/70 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 px-3 py-3 text-sm leading-relaxed resize-y transition" />
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                                        <button type="submit" disabled={loading} className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-sm font-semibold text-white tracking-wide shadow-md shadow-blue-900/30 hover:from-blue-700 hover:to-cyan-700 transition disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2">
                                            {loading ? 'Sending...' : 'Send Message'}
                                            {!loading && <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>}
                                        </button>
                                        <span className="text-[11px] text-gray-500">We'll never share your email.</span>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center text-sm">
                    <Link to="/" className="text-gray-400 hover:text-white transition">← Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default Contact;
