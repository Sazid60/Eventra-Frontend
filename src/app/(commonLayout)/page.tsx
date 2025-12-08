
import { getLandingPageStats } from "@/services/home/homeServices";
import LandingPageBanner from "@/components/modules/Home/LandingPageBanner";
import { getMe } from "@/services/user/userProfile";

import Head from "next/head";
import ClientFeatures from "@/components/modules/Home/ClientFeatures";
import HostFeatures from "@/components/modules/Home/HostFeatures";
import Breadcrumb from "@/components/modules/Home/Breadcrumb";
import HomeEventCard from "@/components/modules/Home/HomeEventCard";

export default async function Home() {
  const statsData = await getLandingPageStats();
  const userInfo = await getMe();

  console.log(userInfo)

  return (
    <>
      <Head>
        <title>This is home page</title>
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

            {/* map and show home event cards */}

            <HomeEventCard />
          </div>



          {/* review marquee */}
          <div className="mt-6 lg:mt-10">
            <h1 className="text-2xl lg:text-3xl mb-4 uppercase font-semibold">
              Reviews
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground mb-6">
              Hear from our community of clients and hosts
            </p>
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
          {/* Contact Section */}
          <div className="mt-6 lg:mt-10">
            <h1 className="text-2xl lg:text-3xl mb-4 uppercase font-semibold">
              Contact Us
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground mb-6">
              Get in touch with us for any inquiries or support
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
