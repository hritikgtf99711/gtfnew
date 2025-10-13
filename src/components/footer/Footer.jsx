import Image from "next/image";
import {
  FaFacebookF,
  FaPinterestP,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import "./footer.css";

export default function Footer() {
  return (
    <section className="footer_section w-full px-[100px] py-[100px] pb-[20px] bg-white relative z-9">
      <div className="grid grid-cols-2">
        <div>
          <p className="mb-[20px]">Company Steps</p>
          <h2 className="text-[64px] uppercase tracking-[2px] leading-[70px]">
            Subscribe to Newsletter
          </h2>
          {/* <h2 className="text-5xl font-bold uppercase mb-4">
                        Subscribe to 
                        <span className="relative inline-block ml-[10px]">
                            <span className="relative z-10">Newsletter</span>
                            <span
                                className="absolute bottom-1 left-0 w-full h-3 bg-[#fce300] z-0"
                            ></span>
                        </span>
                    </h2> */}

          <p className="text-black text-lg tracking-wide font-medium mt-[40]">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. Took a galley of type and
            scrambled it to make a type specimen book.
          </p>
        </div>

        <form className="flex flex-col items-end justify-center gap-4">
          <input
            type="email"
            placeholder="ex.your@gmail.com"
            className="w-full md:w-[600px] bg-gray-200 placeholder-gray-400 px-6 py-3 rounded-md focus:outline-none"
          />
          <button
            type="submit"
            className="bg-black text-white uppercase px-6 py-3 rounded-md hover:bg-gray-800 transition-all  md:w-[600px] tracking-[2px]"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="mx-auto mt-[100px]">
        <div className="grid grid-cols-12 gap-6 border-b border-dashed border-neutral-400 border-t">
          <div className="col-span-12 md:col-span-4 py-6 border-r border-dashed border-neutral-400">
            <h3 className="text-[20px] font-bold uppercase tracking-wide ">
              Let's have a conversation!
            </h3>
          </div>

          <div className="col-span-12 md:col-span-4 flex items-center justify-center border-r border-dashed border-neutral-400 ">
            <p className="text-[20px] font-bold uppercase tracking-wide">
              Call Now: +91-9958-87-1603
            </p>
          </div>

          <div className="col-span-12 md:col-span-4 flex items-center justify-end gap-5 ">
            <a href="#" aria-label="Facebook" className="hover:opacity-70">
              <FaFacebookF size={24} />
            </a>
            <a href="#" aria-label="Pinterest" className="hover:opacity-70">
              <FaPinterestP size={24} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:opacity-70">
              <FaLinkedinIn size={24} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:opacity-70">
              <FaInstagram size={24} />
            </a>
            <a href="#" aria-label="YouTube" className="hover:opacity-70">
              <FaYoutube size={24} />
            </a>
          </div>
        </div>
      </div>

      <section className="mx-auto">
        <div className="grid grid-cols-12 gap-6 border-b border-dashed border-neutral-400">
          <aside className="relative col-span-12 md:col-span-4 border-r border-dashed border-neutral-400 py-10 flex items-end">
            <div className="hidden md:block absolute left-0 bottom-24 w-56 h-56 bg-[#FDE93D] rounded-full -z-10"></div>

            <nav className="space-y-5 uppercase tracking-wide">
              <a href="#" className="block">
                Home
              </a>
              <a href="#" className="block">
                About Us
              </a>
              <a href="#" className="block">
                Services
              </a>
              <a href="#" className="block">
                Work
              </a>
              <a href="#" className="block">
                Human Resources
              </a>
              <a href="#" className="block">
                Contact Us
              </a>
            </nav>
          </aside>

          <div className="col-span-12 md:col-span-4 border-r border-dashed border-neutral-400">
            <div className="flex flex-col items-center justify-center mt-[100px] px-[50px]">
              <div className="relative flex items-center justify-center text-neutral-500 uppercase tracking-widest text-sm">
                <Image
                  alt="footer map"
                  height={350}
                  width={350}
                  src="/assets/footer/map.webp"
                  unoptimized
                />
                <span className="absolute h-[8px] w-[8px] bg-[#2AAEE4] animate_scale_opacity top-[37%] left-[calc(38%-15px)]"></span>
                <span className="absolute h-[8px] w-[8px] bg-[#FDE93D] animate_scale_opacity top-[37%] left-[38%]"></span>
                <span className="absolute h-[8px] w-[8px] bg-[#D93F92] animate_scale_opacity top-[73%] left-[14%]"></span>
                <span className="absolute h-[8px] w-[8px] bg-[#800080] animate_scale_opacity top-[77%] left-[19%]"></span>
                <span className="absolute h-[8px] w-[8px] bg-[#008000] animate_scale_opacity top-[92%] left-[25%]"></span>
              </div>

              <div className="mt-10 flex items-center justify-between gap-12 opacity-80 w-full mb-[50px]">
                <Image
                  alt="gtf logo"
                  src="/assets/logos/gtf-logo.png"
                  className="h-[50px] w-auto"
                  height={84}
                  width={163}
                  unoptimized
                />
                <Image
                  alt="global partner"
                  src="/assets/logos/global-partner.png"
                  height={60}
                  width={85}
                  className="h-[50px] w-auto"
                  unoptimized
                />
                <Image
                  alt="google partner"
                  src="/assets/logos/google-partner.png"
                  height={67}
                  width={95}
                  className="h-[50px] w-auto"
                  unoptimized
                />
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 relative py-8 px-[50px]">
            {/* <div className="absolute right-0 top-0 bottom-0 border-r border-neutral-800"></div> */}

            <div className="space-y-2 pb-8">
              <h4 className="uppercase font-semibold">Noida (Delhi NCR)</h4>
              <p className="text-sm leading-relaxed">
                3rd Floor, Plot No. D5-6, Sector 3, Noida, Uttar Pradesh 201301
              </p>
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black">
                  <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1.3.5 2.7.8 4.1.8.7 0 1.3.6 1.3 1.3v3.6c0 .7-.6 1.3-1.3 1.3C9.8 22 2 14.2 2 4.3 2 3.6 2.6 3 3.3 3h3.6c.7 0 1.3.6 1.3 1.3 0 1.4.3 2.8.8 4.1.2.4.1.9-.2 1.2l-2.2 2.2Z" />
                </svg>
                <span className="text-sm">(+91) 9953 91 7978</span>
              </div>
            </div>

            <div className="space-y-2 pb-8 border-t border-dashed border-neutral-300 pt-6">
              <h4 className="uppercase font-semibold">Noida (Delhi NCR)</h4>
              <p className="text-sm leading-relaxed">
                3rd Floor, Plot No. D5-6, Sector 3, Noida, Uttar Pradesh 201301
              </p>
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black">
                  <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1.3.5 2.7.8 4.1.8.7 0 1.3.6 1.3 1.3v3.6c0 .7-.6 1.3-1.3 1.3C9.8 22 2 14.2 2 4.3 2 3.6 2.6 3 3.3 3h3.6c.7 0 1.3.6 1.3 1.3 0 1.4.3 2.8.8 4.1.2.4.1.9-.2 1.2l-2.2 2.2Z" />
                </svg>
                <span className="text-sm">(+91) 9953 91 7978</span>
              </div>
            </div>

            <div className="space-y-2 pb-2 border-t border-dashed border-neutral-300 pt-6">
              <h4 className="uppercase font-semibold">Noida (Delhi NCR)</h4>
              <p className="text-sm leading-relaxed">
                3rd Floor, Plot No. D5-6, Sector 3, Noida, Uttar Pradesh 201301
              </p>
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black">
                  <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1.3.5 2.7.8 4.1.8.7 0 1.3.6 1.3 1.3v3.6c0 .7-.6 1.3-1.3 1.3C9.8 22 2 14.2 2 4.3 2 3.6 2.6 3 3.3 3h3.6c.7 0 1.3.6 1.3 1.3 0 1.4.3 2.8.8 4.1.2.4.1.9-.2 1.2l-2.2 2.2Z" />
                </svg>
                <span className="text-sm">(+91) 9953 91 7978</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-6">
        <div className="flex flex-col md:flex-row items-center md:items-baseline justify-between gap-4">
          <p className="text-sm uppercase tracking-wide">
            Privacy Policy | Disclaimer
          </p>
          <p className="text-sm uppercase tracking-wide">
            © 2025 GTF Technologies
          </p>
        </div>
      </footer>
    </section>
  );
}
