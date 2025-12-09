

import Image from "next/image";
import { Star } from "lucide-react";
import { Review } from "@/services/home/homeServices";

interface ReviewCardProps {
    review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`h-4 w-4 ${index < rating
                    ? "fill-orange-400 text-orange-400"
                    : "fill-gray-300 text-gray-300"
                    }`}
            />
        ));
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="mx-3 min-w-[320px] max-w-[380px] h-full">
            <div className="relative rounded-md p-6 shadow-lg border  hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                {/* Decorative gradient corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#2ed8ca]/20 to-transparent rounded-bl-full" />

                {/* Header: Client Info */}
                <div className="flex items-start gap-4 mb-4 relative z-10">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#45aaa2]/30 shrink-0">
                        <Image
                            src={review.client.profilePhoto}
                            alt={review.client.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">
                            {review.client.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {formatDate(review.createdAt)}
                        </p>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-3">
                    {renderStars(review.rating)}
                </div>

                {/* Comment */}
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 line-clamp-2 flex-1 min-h-10 mt-4 ">
                    &ldquo;{review.comment.length > 70 ? `${review.comment.slice(0, 70)}...` : review.comment}&rdquo;
                </p>

                {/* Event Info */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 mt-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#45aaa2]" />
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 truncate">
                            Event: <span className="text-[#45aaa2] font-semibold">{review.event.title}</span>
                        </p>
                    </div>
                </div>

                {/* Quote decoration */}
                <div className="absolute bottom-4 right-4 text-[#45aaa2]/10 text-6xl font-serif">
                    &rdquo;
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;