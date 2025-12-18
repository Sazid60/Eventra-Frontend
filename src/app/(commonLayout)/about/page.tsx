export const metadata = {
    title: "About Eventra | Discover, Create, and Experience Events",
    description: "Learn about Eventra, our mission, vision, team, and why we are the best platform for discovering and managing events.",
    keywords: ["about eventra", "event platform", "event management", "team", "mission", "vision"],
};

const AboutPage = () => {
    return (
        <section className=" flex items-center justify-center pt-32 md:pt-32 px-4">
            <div className="max-w-7xl w-full mx-auto ">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#45aaa2] mb-4 drop-shadow-lg tracking-tight">Welcome to Eventra</h1>
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-6 ">
                        Your gateway to discovering, creating, and experiencing unforgettable events.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className=" border rounded-xl p-6 shadow">
                        <h2 className="text-2xl font-bold text-[#3c8f88] mb-2">Our Mission</h2>
                        <p className="text-base text-gray-700 dark:text-gray-300">
                            To connect people through events that inspire, educate, and build community. We make event discovery and management seamless, secure, and enjoyable for everyone.
                        </p>
                    </div>
                    <div className="border rounded-xl p-6 shadow">
                        <h2 className="text-2xl font-bold text-[#3c8f88] mb-2">Our Vision</h2>
                        <p className="text-base text-gray-700 dark:text-gray-300">
                            To be the leading platform for event experiences, empowering hosts and attendees to create memories and meaningful connections worldwide.
                        </p>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-[#3c8f88] mb-6 text-center">Why Choose Eventra?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex flex-col items-center border rounded-xl p-6 shadow">
                            <span className="text-3xl font-bold text-[#45aaa2] mb-2">01</span>
                            <div className="font-semibold text-gray-900 dark:text-white mb-1">Modern & Secure</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">User-friendly platform with top-notch security.</div>
                        </div>
                        <div className="flex flex-col items-center border rounded-xl p-6 shadow">
                            <span className="text-3xl font-bold text-[#45aaa2] mb-2">02</span>
                            <div className="font-semibold text-gray-900 dark:text-white mb-1">Real-Time Analytics</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">Track event performance and engagement live.</div>
                        </div>
                        <div className="flex flex-col items-center border rounded-xl p-6 shadow">
                            <span className="text-3xl font-bold text-[#45aaa2] mb-2">03</span>
                            <div className="font-semibold text-gray-900 dark:text-white mb-1">Vibrant Community</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">Connect with hosts and attendees worldwide.</div>
                        </div>
                        <div className="flex flex-col items-center border rounded-xl p-6 shadow">
                            <span className="text-3xl font-bold text-[#45aaa2] mb-2">04</span>
                            <div className="font-semibold text-gray-900 dark:text-white mb-1">Responsive Support</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">Get help and feedback whenever you need it.</div>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-[#3c8f88] mb-6 text-center">Meet the Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
                        <div className="flex flex-col items-center border rounded-xl p-6 shadow">
                            <div className="w-16 h-16 rounded-full bg-[#45aaa2]/30 flex items-center justify-center mb-2">
                                <span className="text-2xl font-bold text-[#45aaa2]">A</span>
                            </div>
                            <div className="font-semibold text-gray-900 dark:text-white">Ayesha Rahman</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Founder & CEO</div>
                        </div>
                        <div className="flex flex-col items-center border rounded-xl p-6 shadow">
                            <div className="w-16 h-16 rounded-full bg-[#45aaa2]/30 flex items-center justify-center mb-2">
                                <span className="text-2xl font-bold text-[#45aaa2]">S</span>
                            </div>
                            <div className="font-semibold text-gray-900 dark:text-white">Shuvo Islam</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Lead Developer</div>
                        </div>
                        <div className="flex flex-col items-center border rounded-xl p-6 shadow">
                            <div className="w-16 h-16 rounded-full bg-[#45aaa2]/30 flex items-center justify-center mb-2">
                                <span className="text-2xl font-bold text-[#45aaa2]">M</span>
                            </div>
                            <div className="font-semibold text-gray-900 dark:text-white">Mehedi Hasan</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">UI/UX Designer</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutPage;