"use client";

import FAQItemComponent from "./FAQComponent";


export interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        id: "1",
        question: "How do I create an account?",
        answer: "Click on the 'Register' button on the homepage and fill in your details. Choose your role (Client or Host), verify your email, and you're ready to go! It takes just a few minutes to get started."
    },
    {
        id: "2",
        question: "What's the difference between a Client and a Host?",
        answer: "Clients discover and book events created by Hosts. Hosts create and manage events for clients to attend. You can switch between roles or be both at the same time!"
    },
    {
        id: "3",
        question: "How do I book an event?",
        answer: "Browse events in the 'All Events' section, select the event you're interested in, review the details, and click 'Book Event'. Complete the payment process and you'll receive a confirmation email."
    },
    {
        id: "4",
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, debit cards, and digital payment methods. Your payment information is securely processed and encrypted for your safety."
    },
    {
        id: "5",
        question: "Can I cancel my event booking?",
        answer: "Yes, you can cancel up to 48 hours before the event starts for a full refund. Cancellations within 48 hours may be subject to a cancellation fee. Check your booking details for specific terms."
    },
    {
        id: "6",
        question: "How do I create an event as a Host?",
        answer: "Go to your Host Dashboard, click 'Create Event', fill in event details (title, description, date, location, capacity, etc.), set your ticket price, and publish. Your event will be live immediately."
    },
    {
        id: "7",
        question: "Is there a fee for hosting events?",
        answer: "We charge a small service fee on each ticket sold (typically 5-10%). This helps us maintain the platform and provide customer support. No upfront costs for creating events."
    },
    {
        id: "8",
        question: "How do I contact support?",
        answer: "You can reach our support team through the 'Contact Us' section on the homepage, or email us at support@eventra.com. We typically respond within 24 hours."
    },
];



const FAQ = () => {
    return (
        <div className="space-y-2">
            <div className="rounded-md border border-border/50 bg-none p-6 md:p-8">
                <div className="space-y-1">
                    {faqs.map((faq) => (
                        <FAQItemComponent key={faq.id} item={faq} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
