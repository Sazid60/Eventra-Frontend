
import { getLandingPageStats, getLatestReviews, Review } from "@/services/home/homeServices";
import LandingPageBanner from "@/components/modules/Home/LandingPageBanner";
import { getMe } from "@/services/user/userProfile";
import Marquee from "react-fast-marquee";

import Head from "next/head";
import ClientFeatures from "@/components/modules/Home/ClientFeatures";
import HostFeatures from "@/components/modules/Home/HostFeatures";
import Breadcrumb from "@/components/modules/Home/Breadcrumb";
import HomeEvents from "@/components/modules/Home/HomeEvents";
import ReviewCard from "@/components/modules/Home/ReviewCard";
import ContactForm from "@/components/modules/Home/ContactForm";
import FAQ from "@/components/modules/Home/FAQ";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eventra - Discover & Book Amazing Events Near You",
  description: "Discover and book amazing events tailored to your interests. Join concerts, workshops, sports, festivals, and more with Eventra's seamless event management platform.",
  keywords: ["events", "activities", "concerts", "workshops", "festivals", "local events", "event booking", "community"],
  authors: [{ name: "Eventra Team" }],
};

export default async function Home() {
  const statsData = await getLandingPageStats();
  const userInfo = await getMe();
  const reviewsData = await getLatestReviews();

  return (
    <>
      <Head>
        <title>EVENTRA</title>
        <meta
          name="description"
          content="Discover and book amazing events tailored to your interests. Join concerts, workshops, sports, festivals, and more with Eventra's seamless event management platform."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LandingPageBanner
          stats={statsData.data}
          userRole={userInfo?.data?.role}
        />
        <div className="max-w-6xl mx-auto px-5 md:px-7">
          {/* client features */}
          <div className="mt-6 lg:mt-10">
            <h1 className="text-2xl lg:text-3xl mb-4 uppercase font-semibold">
              How It Works
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground mb-6">
              Explore the exclusive features designed for clients to enhance
            </p>

            <ClientFeatures />
          </div>

          {/* events */}
          <div className="mt-6 lg:mt-10">
            <h1 className="text-2xl lg:text-3xl mb-4 uppercase font-semibold">
              Recent Events
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground mb-6">
              Discover the latest events happening around you
            </p>
            <HomeEvents />
            <div className="flex justify-end">
              <Link href="/all-events" className="underline text-[#45aaa2]">See All Events</Link>
            </div>
          </div>



          {/* review marquee */}
          <div className="mt-6 lg:mt-10">
            <h1 className="text-2xl lg:text-3xl mb-4 uppercase font-semibold">
              Reviews
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground mb-6">
              Hear from our community of clients and hosts
            </p>

            {reviewsData?.success && reviewsData?.data?.length > 0 ? (
              <div className="relative overflow-hidden py-4">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-background to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-background to-transparent z-10" />

                <Marquee
                  gradient={false}
                  speed={40}
                  pauseOnHover={true}
                  className="py-4"
                >
                  {reviewsData.data.map((review: Review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </Marquee>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No reviews yet. Be the first to share your experience!</p>
              </div>
            )}
          </div>

          {/* host features */}
          <div className="mt-6 lg:mt-10">
            <h1 className="text-2xl lg:text-3xl mb-4 uppercase font-semibold">
              Host Features
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground mb-6">
              Explore the exclusive features designed for hosts to enhance
            </p>

            <HostFeatures />
          </div>

          {/* breadcrumb */}

          <Breadcrumb />

          {/* FAQ Section */}
          <div className="mt-6 lg:mt-10 mb-12">
            <h1 className="text-2xl lg:text-3xl mb-4 uppercase font-semibold">
              Frequently Asked Questions
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground mb-6">
              Find answers to common questions and concerns
            </p>

            <FAQ />
          </div>

          {/* Contact Section */}
          <div className="mt-6 lg:mt-10 mb-12">
            <h1 className="text-2xl lg:text-3xl mb-4 uppercase font-semibold">
              Contact Us
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground mb-6">
              Get in touch with us for any inquiries or support
            </p>

            <ContactForm />
          </div>
        </div>
      </main>
    </>
  );
}
