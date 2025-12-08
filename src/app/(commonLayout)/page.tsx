
import { getLandingPageStats } from "@/services/home/homeServices";
import LandingPageBanner from "@/components/modules/Home/LandingPageBanner";
import { getMe } from "@/services/user/userProfile";

import Head from "next/head";

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
      </main>
    </>
  );
}
