import { Calendar, MapPin, Search, Stars, Ticket, Users } from 'lucide-react';
import React from 'react';

const ClientFeatures = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="rounded-xl shadow-lg p-6 hover:shadow-xl border transition-transform duration-300 hover:scale-101">
                <div className="w-12 h-12 bg-[#45aaa2]/10 rounded-lg flex items-center justify-center mb-4">
                    <Search className="w-6 h-6 text-[#45aaa2]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 ">
                    Discover Events
                </h3>
                <p className="text-muted-foreground text-sm md:text-md">
                    Browse through a wide variety of events tailored to your interests and location
                </p>
            </div>

            <div className="rounded-xl shadow-lg p-6 hover:shadow-xl border transition-transform duration-300 hover:scale-101">
                <div className="w-12 h-12 bg-[#45aaa2]/10 rounded-lg flex items-center justify-center mb-4">
                    <Ticket className="w-6 h-6 text-[#45aaa2]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 ">
                    Join Events
                </h3>
                <p className="text-muted-foreground text-sm md:text-md">
                    Book your spot in exciting events with just a few clicks and secure payment
                </p>
            </div>

            <div className="rounded-xl shadow-lg p-6 hover:shadow-xl border transition-transform duration-300 hover:scale-101">
                <div className="w-12 h-12 bg-[#45aaa2]/10 rounded-lg flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-[#45aaa2]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 ">
                    Track Your Bookings
                </h3>
                <p className="text-muted-foreground text-sm md:text-md">
                    Manage all your event bookings in one place and never miss an event
                </p>
            </div>

            <div className="rounded-xl shadow-lg p-6 hover:shadow-xl border transition-transform duration-300 hover:scale-101">
                <div className="w-12 h-12 bg-[#45aaa2]/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-[#45aaa2]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 ">
                    Connect with People
                </h3>
                <p className="text-muted-foreground text-sm md:text-md">
                    Meet like-minded individuals and expand your network at events
                </p>
            </div>

            <div className="rounded-xl shadow-lg p-6 hover:shadow-xl border transition-transform duration-300 hover:scale-101">
                <div className="w-12 h-12 bg-[#45aaa2]/10 rounded-lg flex items-center justify-center mb-4">
                    <Stars className="w-6 h-6 text-[#45aaa2]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 ">
                    Rate & Review
                </h3>
                <p className="text-muted-foreground text-sm md:text-md">
                    Share your experience and help others make informed decisions
                </p>
            </div>

            <div className="rounded-xl shadow-lg p-6 hover:shadow-xl border transition-transform duration-300 hover:scale-101">
                <div className="w-12 h-12 bg-[#45aaa2]/10 rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-[#45aaa2]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 ">
                    Mind Like Events Suggestion
                </h3>
                <p className="text-muted-foreground text-sm md:text-md">
                    Get personalized event recommendations based on your preferences and past activities
                </p>
            </div>
        </div>
    );
};

export default ClientFeatures;