import Breadcrumb from "@/components/modules/Home/Breadcrumb";
import ClientFeatures from "@/components/modules/Home/ClientFeatures";


const ClientDashboardPage = () => {
  return (
    <div className="min-h-screen">
      <div className="px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#45aaa2] mb-4">
            Welcome to Eventra
          </h1>
          <p className="text-lg md:text-xl  max-w-2xl mx-auto">
            Your gateway to discovering, joining, and experiencing amazing events
          </p>
        </div>

        <ClientFeatures />

        <Breadcrumb/>
      </div>
    </div>
  );
};

export default ClientDashboardPage;