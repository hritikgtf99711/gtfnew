export default function EnquireForm() {
    return (
        <section className="enquire_section w-full px-[100px] flex items-center pb-[100px]">
            <form class="w-full grid grid-cols-1 md:grid-cols-2 gap-x-[80px] gap-y-[50px]">

                <div>
                    <label class="uppercase text-gray-800 text-lg font-semibold">Your Name</label>
                    <input
                        type="text"
                        placeholder="First and Last Name*"
                        class="w-full border-b border-black bg-transparent focus:outline-none placeholder-black mt-2 py-2"
                    />
                </div>

                <div>
                    <label class="uppercase text-gray-800 text-lg font-semibold">Your Phone Number</label>
                    <input
                        type="text"
                        placeholder="Your Phone-Number"
                        class="w-full border-b border-black bg-transparent focus:outline-none placeholder-black mt-2 py-2"
                    />
                </div>

                <div>
                    <label class="uppercase text-gray-800 text-lg font-semibold">Your Email</label>
                    <input
                        type="email"
                        placeholder="Your Email Address"
                        class="w-full border-b border-black bg-transparent focus:outline-none placeholder-black mt-2 py-2"
                    />
                </div>

                <div>
                    <label class="uppercase text-gray-800 text-lg font-semibold">Select Service</label>
                    <input
                        type="text"
                        placeholder="Services"
                        class="w-full border-b border-black bg-transparent focus:outline-none placeholder-black mt-2 py-2"
                    />
                </div>

                <div>
                    <label class="uppercase text-gray-800 text-lg font-semibold">Your Company</label>
                    <input
                        type="text"
                        placeholder="Your Company*"
                        class="w-full border-b border-black bg-transparent focus:outline-none placeholder-black mt-2 py-2"
                    />
                </div>

                <div>
                    <label class="uppercase text-gray-800 text-lg font-semibold">Your Message</label>
                    <input
                        type="text"
                        placeholder="Your Message*"
                        class="w-full border-b border-black bg-transparent focus:outline-none placeholder-black mt-2 py-2"
                    />
                </div>

                <div class="col-span-2 flex items-center mt-4">
                    <input type="checkbox" id="terms" class="mr-2 accent-black" />
                    <label for="terms" class="text-sm text-black">
                        I accept the terms and conditions Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </label>
                </div>

                <div class="col-span-2 flex justify-end mt-6">
                    <button
                        type="submit"
                        class="bg-black text-white px-8 py-2 uppercase tracking-wide font-bold hover:bg-gray-800 transition-all"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </section>
    )
}