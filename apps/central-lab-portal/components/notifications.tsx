"use client";

import { useState } from "react";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  UserPlus,
  FileText,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

// Notification types
export type NotificationType =
  | "success"
  | "warning"
  | "info"
  | "user"
  | "document"
  | "shipment";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: Date;
  userName: string;
  isRead: boolean;
}

// Dummy notification data
const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Sample Analysis Completed",
    description: "Lab test results are now available for review",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    userName: "Dr. Sarah Chen",
    isRead: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Quality Control Alert",
    description: "Temperature deviation detected in storage unit B-12",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    userName: "System Alert",
    isRead: false,
  },
  {
    id: "3",
    type: "user",
    title: "New Team Member Added",
    description: "John Smith has been added to your research team",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    userName: "Admin",
    isRead: true,
  },
  {
    id: "4",
    type: "document",
    title: "Report Submitted",
    description: "Monthly compliance report has been submitted for approval",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    userName: "Maria Garcia",
    isRead: false,
  },
  {
    id: "5",
    type: "shipment",
    title: "Sample Shipment Arrived",
    description: "Batch #2024-0156 has been received and logged",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    userName: "Logistics Team",
    isRead: true,
  },
  {
    id: "6",
    type: "info",
    title: "System Maintenance Scheduled",
    description: "Planned maintenance window: Saturday 2:00 AM - 6:00 AM",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    userName: "IT Department",
    isRead: true,
  },
];

// Icon mapping for notification types
const notificationIcons: Record<NotificationType, React.ElementType> = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
  user: UserPlus,
  document: FileText,
  shipment: Package,
};

// Color mapping for notification types
const notificationColors: Record<NotificationType, string> = {
  success: "text-green-600 dark:text-green-400",
  warning: "text-amber-600 dark:text-amber-400",
  info: "text-blue-600 dark:text-blue-400",
  user: "text-purple-600 dark:text-purple-400",
  document: "text-indigo-600 dark:text-indigo-400",
  shipment: "text-cyan-600 dark:text-cyan-400",
};

export function Notifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true })),
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="font-semibold text-base">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-12 w-12 text-muted-foreground/50 mb-2" />
              <p className="text-base text-muted-foreground">
                No notifications yet
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => {
                const Icon = notificationIcons[notification.type];
                const iconColor = notificationColors[notification.type];

                return (
                  <button
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={cn(
                      "w-full px-4 py-3 text-left transition-colors hover:bg-muted/50",
                      !notification.isRead && "bg-muted/30",
                    )}
                  >
                    <div className="flex gap-3">
                      <div className={cn("mt-0.5 flex-shrink-0", iconColor)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <p
                          className={cn(
                            "text-base leading-tight",
                            !notification.isRead && "font-semibold",
                          )}
                        >
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground leading-tight line-clamp-2">
                          {notification.description}
                        </p>
                        <p className="text-sm text-muted-foreground/80 leading-tight">
                          {formatDistanceToNow(notification.timestamp, {
                            addSuffix: true,
                          })}{" "}
                          • {notification.userName}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <div className="flex-shrink-0 mt-1">
                          <div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        {notifications.length > 0 && (
          <div className="border-t p-2">
            <Button
              variant="ghost"
              className="w-full text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              View all notifications
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
