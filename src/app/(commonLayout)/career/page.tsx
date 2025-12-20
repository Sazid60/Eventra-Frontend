import { Mail, Phone } from "lucide-react";


export const metadata = {
    title: "Careers at Eventra | Work With Us",
    description: "Discover career opportunities at Eventra. See our culture, open roles, and how to reach us.",
    keywords: ["eventra careers", "jobs", "work at eventra", "event platform jobs", "contact eventra"],
};


const openPositions = [
    {
        title: "Frontend Developer",
        type: "Remote | Full-time",
        desc: "Build beautiful, performant UIs with React, Next.js, and Tailwind CSS.",
    },
    {
        title: "Backend Developer",
        type: "Remote | Full-time",
        desc: "Design scalable APIs and services using Node.js and modern databases.",
    },
    {
        title: "UI/UX Designer",
        type: "Remote | Contract",
        desc: "Craft intuitive and visually stunning user experiences for web and mobile.",
    },
    {
        title: "Marketing Specialist",
        type: "Remote | Part-time",
        desc: "Grow our brand and reach through creative campaigns and community engagement.",
    },
];

const CareerPage = () => {
    return (
        <section className=" flex items-center justify-center pt-28 md:pt-32 px-4 ">
            <div className="max-w-7xl w-full mx-auto">
                <div className="mb-12 border-b pb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#3c8f88] mb-4">Work With Us</h1>
                    <p className="text-base md:text-md text-gray-700 dark:text-gray-200 ">
                        At Eventra, we believe in building a team that’s passionate, creative, and driven to make a difference in the world of events. We’re always looking for talented individuals who are eager to innovate, collaborate, and grow with us. Whether you’re a developer, designer, marketer, or someone who loves events, you’ll find a welcoming environment where your ideas matter and your work has real impact. Explore our open roles below and take the next step in your career journey with Eventra!
                    </p>
                </div>


                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-[#3c8f88] mb-8 text-center">Current Openings</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {openPositions.map((pos, idx) => (
                            <div key={pos.title} className="border rounded-2xl p-6 shadow flex flex-col gap-2">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-lg font-bold text-[#45aaa2]">{String(idx + 1).padStart(2, "0")}</span>
                                    <span className="font-semibold text-gray-900 dark:text-white text-lg">{pos.title}</span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">{pos.type}</span>
                                <span className="text-sm text-gray-700 dark:text-gray-300">{pos.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 flex flex-col items-center justify-center">
                    <div className="relative bg-white dark:bg-[#101c1b] rounded-2xl shadow-2xl p-10 flex flex-col items-center min-w-[280px] max-w-lg w-full border-2 border-dashed border-[#45aaa2]">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#3c8f88] rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-4 border-white dark:border-[#101c1b]">
                            <Mail className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-extrabold text-[#3c8f88] mb-4 mt-8 tracking-tight">Contact for Careers</h2>
                        <div className="flex flex-col gap-4 w-full items-center mt-2">
                            <div className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-200 bg-[#e0f7f4] dark:bg-[#183c38] px-5 py-3 rounded-xl w-full max-w-xs">
                                <Phone className="h-5 w-5 text-[#45aaa2]" />
                                <span className="font-semibold">Phone:</span>
                                <a href="tel:+8801234567890" className="text-[#45aaa2] hover:underline font-semibold ml-1">+880 1234-567890</a>
                            </div>
                            <div className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-200 bg-[#e0f7f4] dark:bg-[#183c38] px-5 py-3 rounded-xl w-full max-w-xs">
                                <Mail className="h-5 w-5 text-[#45aaa2]" />
                                <span className="font-semibold">Email:</span>
                                <a href="mailto:careers@eventra.com" className="text-[#45aaa2] hover:underline font-semibold ml-1">careers@eventra.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerPage;