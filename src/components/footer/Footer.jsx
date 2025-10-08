export default function Footer() {
    return (
        <section className="footer_section w-full px-[100px] py-[100px] pb-[20px] bg-white relative z-1">
            <div className="grid grid-cols-2">
                <div>
                    <h2 class="text-5xl font-bold uppercase mb-4">
                        Subscribe to
                        <span class="relative inline-block">
                            <span class="relative z-10">Newsletter</span>
                            <span
                                class="absolute bottom-1 left-0 w-full h-3 bg-[#fce300] z-0"
                            ></span>
                        </span>
                    </h2>

                    <p class="text-black text-lg tracking-wide font-medium mb-10">
                        Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and scrambled it to
                        make a type specimen book. Took a galley of type and scrambled it to
                        make a type specimen book.
                    </p>
                </div>

                <form
                    class="flex flex-col md:flex-row items-center justify-end gap-4"
                >
                    <input
                        type="email"
                        placeholder="ex.your@gmail.com"
                        class="w-full md:w-[600px] bg-gray-200 text-gray-700 placeholder-gray-500 font-bold px-6 py-3 rounded-md focus:outline-none"
                    />
                    <button
                        type="submit"
                        class="bg-black text-white font-bold uppercase px-6 py-3 rounded-md hover:bg-gray-800 transition-all"
                    >
                        Submit
                    </button>
                </form>
            </div>

            <div class="mx-auto mt-[50px]">
                <div class="grid grid-cols-12 gap-6 border-b border-dashed border-neutral-400 pt-6 pb-6">
                    <div class="col-span-12 md:col-span-4">
                        <h3 class="text-2xl md:text-3xl font-semibold uppercase tracking-wide">
                            Let’s have a conversation!
                        </h3>
                    </div>

                    <div class="col-span-12 md:col-span-4 flex items-center justify-center">
                        <p class="text-xl md:text-2xl font-bold uppercase tracking-wide">
                            Call Now: +91-9958-87-1603
                        </p>
                    </div>

                    <div class="col-span-12 flex items-center justify-end gap-5">
                        <a href="#" aria-label="Facebook" class="hover:opacity-70">
                            <svg viewBox="0 0 24 24" class="w-5 h-5 fill-black"><path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5.03 3.69 9.2 8.5 9.94v-7.03H8.1v-2.9h2.4V9.84c0-2.38 1.42-3.7 3.6-3.7 1.04 0 2.14.19 2.14.19v2.35h-1.21c-1.2 0-1.57.75-1.57 1.52v1.82h2.67l-.43 2.9h-2.24V22c4.81-.74 8.5-4.91 8.5-9.94Z" /></svg>
                        </a>
                        <a href="#" aria-label="Pinterest" class="hover:opacity-70">
                            <svg viewBox="0 0 24 24" class="w-5 h-5 fill-black"><path d="M12.04 2C6.53 2 4 5.5 4 8.74c0 1.64.64 3.1 2.02 3.64.23.09.44 0 .51-.25.05-.17.16-.6.2-.78.07-.25.04-.34-.15-.56-.4-.45-.66-1.03-.66-1.85 0-2.38 1.78-4.51 4.63-4.51 2.52 0 3.91 1.54 3.91 3.6 0 2.71-1.2 5-2.98 5-1 0-1.75-.83-1.51-1.85.29-1.22.86-2.53.86-3.4 0-.79-.42-1.46-1.28-1.46-1.02 0-1.84 1.06-1.84 2.47 0 .9.31 1.51.31 1.51l-1.26 5.33c-.37 1.56-.06 3.47-.03 3.67.02.08.12.1.18.04.08-.1 1.19-1.6 1.57-3.08l.6-2.33c.31.6 1.22 1.1 2.19 1.1 2.88 0 4.83-2.73 4.83-6.39C18.5 5.13 16.05 2 12.04 2Z" /></svg>
                        </a>
                        <a href="#" aria-label="LinkedIn" class="hover:opacity-70">
                            <svg viewBox="0 0 24 24" class="w-5 h-5 fill-black"><path d="M20.45 20.45h-3.55v-5.58c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.68H9.34V9h3.41v1.56h.05c.47-.9 1.62-1.86 3.34-1.86 3.57 0 4.23 2.35 4.23 5.4v6.35ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.54V9h3.58v11.45Z" /></svg>
                        </a>
                        <a href="#" aria-label="Instagram" class="hover:opacity-70">
                            <svg viewBox="0 0 24 24" class="w-5 h-5 fill-black"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.96.24 2.64.52.72.28 1.33.66 1.93 1.26.6.6.98 1.21 1.26 1.93.28.68.47 1.47.52 2.64.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.96-.52 2.64a5 5 0 0 1-1.26 1.93 5 5 0 0 1-1.93 1.26c-.68.28-1.47.47-2.64.52-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.96-.24-2.64-.52a5 5 0 0 1-1.93-1.26 5 5 0 0 1-1.26-1.93c-.28-.68-.47-1.47-.52-2.64C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.24-1.96.52-2.64.28-.72.66-1.33 1.26-1.93.6-.6 1.21-.98 1.93-1.26.68-.28 1.47-.47 2.64-.52C8.42 2.17 8.8 2.16 12 2.16Zm0 1.82c-3.15 0-3.52.01-4.76.07-.98.05-1.52.21-1.87.35-.47.18-.8.39-1.15.74-.35.35-.56.68-.74 1.15-.14.35-.3.89-.35 1.87-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05.98.21 1.52.35 1.87.18.47.39.8.74 1.15.35.35.68.56 1.15.74.35.14.89.3 1.87.35 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.98-.05 1.52-.21 1.87-.35.47-.18.8-.39 1.15-.74.35-.35.56-.68.74-1.15.14-.35.3-.89.35-1.87.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-.98-.21-1.52-.35-1.87a2.9 2.9 0 0 0-.74-1.15 2.9 2.9 0 0 0-1.15-.74c-.35-.14-.89-.3-1.87-.35-1.24-.06-1.61-.07-4.76-.07Zm0 3.5a4.52 4.52 0 1 1 0 9.04 4.52 4.52 0 0 1 0-9.04Zm0 1.82a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm5.76-2.1a1.06 1.06 0 1 1-2.12 0 1.06 1.06 0 0 1 2.12 0Z" /></svg>
                        </a>
                        <a href="#" aria-label="YouTube" class="hover:opacity-70">
                            <svg viewBox="0 0 24 24" class="w-5 h-5 fill-black"><path d="M23.5 7.1a4 4 0 0 0-2.8-2.8C18.8 3.7 12 3.7 12 3.7s-6.8 0-8.7.6A4 4 0 0 0 .5 7.1 41.4 41.4 0 0 0 0 12a41.4 41.4 0 0 0 .5 4.9 4 4 0 0 0 2.8 2.8c1.9.6 8.7.6 8.7.6s6.8 0 8.7-.6a4 4 0 0 0 2.8-2.8c.4-1.6.5-3.2.5-4.9 0-1.7-.1-3.3-.5-4.9ZM9.7 15.4V8.6l6 3.4-6 3.4Z" /></svg>
                        </a>
                    </div>
                </div>
            </div>

            <section class="mx-auto">
                <div class="grid grid-cols-12 gap-6 border-b border-dashed border-neutral-400">
                    <aside class="relative col-span-12 md:col-span-4 border-r border-dashed border-neutral-400 py-10">
                        <div class="hidden md:block absolute -left-6 top-24 w-56 h-56 bg-[#e8d22b] rounded-full -z-10"></div>

                        <nav class="space-y-5 uppercase tracking-wide">
                            <a href="#" class="block hover:underline">Home</a>
                            <a href="#" class="block hover:underline">About Us</a>
                            <a href="#" class="block hover:underline">Services</a>
                            <a href="#" class="block hover:underline">Work</a>
                            <a href="#" class="block hover:underline">Human Resources</a>
                            <a href="#" class="block hover:underline">Contact Us</a>
                        </nav>
                    </aside>

                    <div class="col-span-12 md:col-span-4 border-r border-dashed border-neutral-400">
                        <div class="h-[420px] flex flex-col items-center justify-center">
                            <div class="w-64 h-72 border border-neutral-400 flex items-center justify-center text-neutral-500 uppercase tracking-widest text-sm">
                                India Map
                            </div>

                            <div class="mt-10 flex items-center justify-center gap-12 opacity-80">
                                <div class="w-28 h-10 bg-neutral-300"></div>
                                <div class="w-28 h-10 bg-neutral-300"></div>
                                <div class="w-10 h-10 rounded-full bg-neutral-300"></div>
                            </div>
                        </div>
                    </div>

                    <div class="col-span-12 md:col-span-4 relative py-8">
                        <div class="absolute right-0 top-0 bottom-0 border-r border-neutral-800"></div>

                        <div class="space-y-2 pb-8">
                            <h4 class="uppercase font-semibold">Noida (Delhi NCR)</h4>
                            <p class="text-sm leading-relaxed">
                                3rd Floor, Plot No. D5-6, Sector 3, Noida, Uttar Pradesh 201301
                            </p>
                            <div class="flex items-center gap-3">
                                <svg viewBox="0 0 24 24" class="w-4 h-4 fill-black"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1.3.5 2.7.8 4.1.8.7 0 1.3.6 1.3 1.3v3.6c0 .7-.6 1.3-1.3 1.3C9.8 22 2 14.2 2 4.3 2 3.6 2.6 3 3.3 3h3.6c.7 0 1.3.6 1.3 1.3 0 1.4.3 2.8.8 4.1.2.4.1.9-.2 1.2l-2.2 2.2Z" /></svg>
                                <span class="text-sm">(+91) 9953 91 7978</span>
                            </div>
                        </div>

                        <div class="space-y-2 pb-8 border-t border-dashed border-neutral-300 pt-6">
                            <h4 class="uppercase font-semibold">Noida (Delhi NCR)</h4>
                            <p class="text-sm leading-relaxed">
                                3rd Floor, Plot No. D5-6, Sector 3, Noida, Uttar Pradesh 201301
                            </p>
                            <div class="flex items-center gap-3">
                                <svg viewBox="0 0 24 24" class="w-4 h-4 fill-black"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1.3.5 2.7.8 4.1.8.7 0 1.3.6 1.3 1.3v3.6c0 .7-.6 1.3-1.3 1.3C9.8 22 2 14.2 2 4.3 2 3.6 2.6 3 3.3 3h3.6c.7 0 1.3.6 1.3 1.3 0 1.4.3 2.8.8 4.1.2.4.1.9-.2 1.2l-2.2 2.2Z" /></svg>
                                <span class="text-sm">(+91) 9953 91 7978</span>
                            </div>
                        </div>

                        <div class="space-y-2 pb-2 border-t border-dashed border-neutral-300 pt-6">
                            <h4 class="uppercase font-semibold">Noida (Delhi NCR)</h4>
                            <p class="text-sm leading-relaxed">
                                3rd Floor, Plot No. D5-6, Sector 3, Noida, Uttar Pradesh 201301
                            </p>
                            <div class="flex items-center gap-3">
                                <svg viewBox="0 0 24 24" class="w-4 h-4 fill-black"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1.3.5 2.7.8 4.1.8.7 0 1.3.6 1.3 1.3v3.6c0 .7-.6 1.3-1.3 1.3C9.8 22 2 14.2 2 4.3 2 3.6 2.6 3 3.3 3h3.6c.7 0 1.3.6 1.3 1.3 0 1.4.3 2.8.8 4.1.2.4.1.9-.2 1.2l-2.2 2.2Z" /></svg>
                                <span class="text-sm">(+91) 9953 91 7978</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer class="py-6">
                <div class="flex flex-col md:flex-row items-center md:items-baseline justify-between gap-4">
                    <p class="text-sm uppercase tracking-wide">
                        Privacy Policy | Disclaimer
                    </p>
                    <p class="text-sm uppercase tracking-wide">
                        © 2025 GTF Technologies
                    </p>
                </div>
            </footer>

        </section>
    )
}