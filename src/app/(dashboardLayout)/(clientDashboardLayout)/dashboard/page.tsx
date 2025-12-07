import { Calendar, Users, Ticket, Search, Star, MapPin } from "lucide-react";
import Link from "next/link";

const ClientDashboardPage = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#45aaa2] mb-4">
            Welcome to Eventra
          </h1>
          <p className="text-lg md:text-xl  max-w-2xl mx-auto">
            Your gateway to discovering, joining, and experiencing amazing events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className=" rounded-xl shadow-lg p-6 hover:shadow-xl  border">
            <div className="w-12 h-12 bg-[#45aaa2]/10 rounded-lg flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-[#45aaa2]"/>
            </div>
            <h3 className="text-xl font-semibold mb-2 ">
              Discover Events
            </h3>
            <p className="">
              Browse through a wide variety of events tailored to your interests and location
            </p>
          </div>

          <div className="rounded-xl shadow-lg p-6 hover:shadow-xl  border">
            <div className="w-12 h-12 bg-[#45aaa2]/10 rounded-lg flex items-center justify-center mb-4">
              <Ticket className="w-6 h-6 text-[#45aaa2]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 ">
              Join Events
            </h3>
            <p className="">
              Book your spot in exciting events with just a few clicks and secure payment
            </p>
          </div>

          <div className="rounded-xl shadow-lg p-6 hover:shadow-xl  border">
            <div className="w-12 h-12 bg-[#45aaa2]/10 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-[#45aaa2]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 ">
              Track Your Bookings
            </h3>
            <p className="">
              Manage all your event bookings in one place and never miss an event
            </p>
          </div>

          <div className="rounded-xl shadow-lg p-6 hover:shadow-xl  border">
            <div className="w-12 h-12 bg-[#45aaa2]/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-[#45aaa2]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 ">
              Connect with People
            </h3>
            <p className="">
              Meet like-minded individuals and expand your network at events
            </p>
          </div>

          <div className="rounded-xl shadow-lg p-6 hover:shadow-xl  border">
            <div className="w-12 h-12 bg-[#45aaa2]/10 rounded-lg flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-[#45aaa2]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 ">
              Rate & Review
            </h3>
            <p className="">
              Share your experience and help others make informed decisions
            </p>
          </div>

          <div className="rounded-xl shadow-lg p-6 hover:shadow-xl  border">
            <div className="w-12 h-12 bg-[#45aaa2]/10 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-[#45aaa2]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 ">
              Explore Locations
            </h3>
            <p className="">
              Find events near you or discover experiences in new cities
            </p>
          </div>
        </div>

        <div className="rounded-2xl  p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Explore amazing events happening around you and make unforgettable memories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/all-events"
              className=" bg-[#45aaa2]  px-8 py-3 rounded-lg font-semibold hover:bg-[#3c8f88] transition-colors"
            >
              Browse Events
            </Link>
            <Link
              href="/dashboard/my-events"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              My Bookings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboardPage;