import Logo from '@/assets/icon/Logo';
import Link from 'next/link';
import { Linkedin, MessageCircle, Phone } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="">
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="flex justify-center mb-5">
          <Logo />
        </div>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-sm text-zinc-300">
          Connect with locals for events, meetups, and activities - discover nearby gatherings, create your own experiences, and find people who share your interests. Build new friendships, explore your city, and be part of a growing community that brings people together.
        </p>


        {/* Navigation Links */}
        <ul className="flex justify-center gap-6 mt-6 text-sm">
          <li><Link href="/" className="text-zinc-300 hover:text-[#00ffea]">Home</Link></li>
          <li><Link href="/all-events" className="text-zinc-300 hover:text-[#00ffea]">Explore Events</Link></li>
        </ul>

        {/* Social icons (lucide-react) */}
        <div className="flex justify-center gap-6 mt-6">
          <a
            href="https://www.linkedin.com/in/shahnawaz-sazid/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="linkedin"
            className="text-zinc-300 hover:text-[#45aaa2] transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://wa.me/+8801639768727"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="whatsapp message"
            className="text-zinc-300 hover:text-[#45aaa2] transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <a
            href="tel:+8801639768727"
            aria-label="phone call"
            className="text-zinc-300 hover:text-[#45aaa2] transition-colors"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>

        {/* Divider and bottom */}
        <div className="mt-8">
          <hr className="border-zinc-700" />
        </div>

        <div className="mt-4 text-sm text-zinc-400">
          &copy; {new Date().getFullYear()} <span className="text-[#00ffea]">Events & Activities Inc.</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}