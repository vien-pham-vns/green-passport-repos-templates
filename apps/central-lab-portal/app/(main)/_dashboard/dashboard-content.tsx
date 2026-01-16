// "use client";

// import { useRouter } from "next/navigation";
// import { FileText, User as UserIcon, LogOut } from "lucide-react";

// import { Card, CardContent } from "@/components/ui/card";
// import { User } from "@/types/user";
// import { logout } from "@/app/actions/auth";

// interface DashboardContentProps {
//   user: User;
// }

// /**
//  * Get time-based greeting
//  * Morning: 5:00 - 11:59
//  * Afternoon: 12:00 - 16:59
//  * Evening: 17:00 - 20:59
//  * Night: 21:00 - 4:59
//  */
// function getGreeting(): string {
//   const hour = new Date().getHours();

//   if (hour >= 5 && hour < 12) {
//     return "Good Morning";
//   } else if (hour >= 12 && hour < 17) {
//     return "Good Afternoon";
//   } else if (hour >= 17 && hour < 21) {
//     return "Good Evening";
//   } else {
//     return "Good Night";
//   }
// }

// /**
//  * Get user display name
//  * Priority: name > firstName + lastName > firstName > email
//  */
// function getUserDisplayName(user: User): string {
//   if (user.name) {
//     return user.name;
//   }

//   if (user.firstName && user.lastName) {
//     return `${user.firstName} ${user.lastName}`;
//   }

//   if (user.firstName) {
//     return user.firstName;
//   }

//   return user.email || "Guest";
// }

// export function DashboardContent({ user }: DashboardContentProps) {
//   const router = useRouter();
//   const greeting = getGreeting();
//   const displayName = getUserDisplayName(user);

//   const handleLogout = async () => {
//     await logout();
//   };

//   const actionButtons = [
//     {
//       id: "applications",
//       title: "Applications",
//       description: "View and manage applications",
//       icon: FileText,
//       onClick: () => router.push("/applications"),
//       color: "text-blue-600",
//       bgColor: "bg-blue-50 hover:bg-blue-100",
//     },
//     {
//       id: "profile",
//       title: "Profile",
//       description: "View and edit your profile",
//       icon: UserIcon,
//       onClick: () => router.push("/profile"),
//       color: "text-green-600",
//       bgColor: "bg-green-50 hover:bg-green-100",
//     },
//     {
//       id: "logout",
//       title: "Logout",
//       description: "Sign out of your account",
//       icon: LogOut,
//       onClick: handleLogout,
//       color: "text-red-600",
//       bgColor: "bg-red-50 hover:bg-red-100",
//     },
//   ];

//   return (
//     <div className="flex min-h-[calc(100vh-200px)] items-center justify-center p-6">
//       <div className="w-full max-w-4xl space-y-12">
//         {/* Greeting Section */}
//         <div className="text-center space-y-2">
//           <h1 className="text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl">
//             {greeting}
//           </h1>
//           <p className="text-3xl text-muted-foreground sm:text-4xl">
//             {displayName}
//           </p>
//         </div>

//         {/* Action Buttons Section */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {actionButtons.map((button) => {
//             const Icon = button.icon;
//             return (
//               <Card
//                 key={button.id}
//                 className="group cursor-pointer transition-all hover:shadow-lg"
//                 onClick={button.onClick}
//               >
//                 <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
//                   <div
//                     className={`flex h-20 w-20 items-center justify-center rounded-full ${button.bgColor} transition-colors`}
//                   >
//                     <Icon className={`h-10 w-10 ${button.color}`} />
//                   </div>
//                   <div className="text-center space-y-1">
//                     <h3 className="text-lg font-semibold">{button.title}</h3>
//                     <p className="text-sm text-muted-foreground">
//                       {button.description}
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
