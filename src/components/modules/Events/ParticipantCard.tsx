// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"
// import Image from "next/image";
// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Phone } from "lucide-react";
// import { ApiParticipantInfo } from "@/types/event.interface";



// type Props = {
//     participant: ApiParticipantInfo;
// };

// export default function ParticipantCard({ participant }: Props) {
//     const client = participant.client || ({} as any);

//     return (
//         <Card className="p-0">
//             <CardContent className="flex justify-between items-center px-0">
//                 <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
//                     <Image src={client.profilePhoto || '/images/avatar-placeholder.png'} alt={client.name || 'Client'} width={48} height={48} className="object-cover" />
//                 </div>
//                 <div className="flex-1">
//                     <div className="flex items-center justify-between">
//                         <div className="text-sm font-semibold">{client.name || 'Participant'}</div>
//                         <button className="text-sm text-[#45aaa2] flex items-center gap-1"><Phone className="w-4 h-4" /> Call</button>
//                     </div>
//                     <div className="mt-2 text-[6px] text-muted-foreground">
//                         {(client.interests || []).slice(0, 3).map((t: string) => <span key={t} className="mr-2 text-orange-700">#{t}</span>)}
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }
