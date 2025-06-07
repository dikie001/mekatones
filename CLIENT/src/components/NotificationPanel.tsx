// NOTIFICATION PANEL - Updated with matching dark gradient theme
import React, { useState } from "react";
import { Bell, X, Check, AlertCircle, Info, Star } from "lucide-react";
import { LockBodyScroll } from "../hooks/LockScroll";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "star";
  time: string;
  unread: boolean;
}

interface Props {
  openNotif: boolean;
  setOpenNotif: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NotificationPanelProps {
  notifications?: Notification[];
}

interface CombinedProps extends Props, NotificationPanelProps {}

const NotificationPanel: React.FC<CombinedProps> = ({
  openNotif,
  setOpenNotif,
  notifications = [
    {
      id: "1",
      title: "Welcome!",
      message: "Thanks for checking out this notification panel",
      type: "star",
      time: "2 min ago",
      unread: true,
    },
    {
      id: "2",
      title: "System Update",
      message: "Your system has been updated",
      type: "success",
      time: "1 hour ago",
      unread: false,
    },
  ],
}) => {
  const [notificationList, setNotificationList] =
    useState<Notification[]>(notifications);

  const markAsRead = (id: string) => {
    setNotificationList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <Check className="w-4 h-4" />;
      case "warning":
        return <AlertCircle className="w-4 h-4" />;
      case "star":
        return <Star className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "star":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  return (
    <div className=" relative">
      {/* Notification Panel */}
      {openNotif && (
        <>
          {/* Mobile backdrop */}
          <div
            className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 md:hidden"
            onClick={() => setOpenNotif((prev) => !prev)}
          />

          {/* Panel */}
          <div
            className={`
            fixed md:absolute   z-57
            md:top-full md:right-10  md:mt-18
            inset-x-4 top-20 md:inset-x-auto
            md:w-96 w-auto
            bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 
            text-white  rounded-xl shadow-2xl shadow-black/40
            border border-white/10 backdrop-blur-sm
            transform transition-all duration-300 ease-out
            ${openNotif ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          `}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-slate-600/20 rounded-t-xl">
              <h3 className="font-semibold text-white">Notifications</h3>
              <button
                onClick={() => setOpenNotif(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-all duration-300"
              >
                <X className="w-5 h-5 hover:rotate-90 transition-transform duration-300 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notificationList.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  <Bell className="w-12 h-12 mx-auto mb-3 text-slate-500" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                notificationList.map((notification) => (
                  <div
                    key={notification.id}
                    className={`
                      p-4 border-b border-white/5 last:border-b-0 hover:bg-white/5 cursor-pointer transition-colors
                      ${notification.unread ? "bg-purple-500/10" : "bg-transparent"}
                    `}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`
                        p-2 rounded-full border
                        ${getTypeStyles(notification.type)}
                      `}
                      >
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`
                            text-sm font-semibold underline truncate
                            ${
                              notification.unread
                                ? "text-white "
                                : "text-slate-300"
                            }
                          `}
                          >
                            {notification.title}
                          </h4>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-purple-500 rounded-full ml-2 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-slate-200 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-slate-400 mt-2">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notificationList.length > 0 && (
              <div className="p-3 border-t border-white/10 bg-purple-600/10 rounded-b-xl">
                <button className="w-full text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors">
                  View All Notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationPanel;
