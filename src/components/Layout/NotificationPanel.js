import React from 'react';
import { X, AlertTriangle, Package, Clock, TrendingUp, Bell, CheckCircle } from 'lucide-react';

const NotificationPanel = ({ isOpen, notifications, onClose, onMarkAsRead, onNavigate }) => {
  if (!isOpen) return null;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'stockout': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'low_stock': return <Package className="w-5 h-5 text-yellow-400" />;
      case 'expiry': return <Clock className="w-5 h-5 text-orange-400" />;
      case 'otif': return <TrendingUp className="w-5 h-5 text-blue-400" />;
      case 'forecast': return <TrendingUp className="w-5 h-5 text-purple-400" />;
      default: return <Bell className="w-5 h-5 text-slate-400" />;
    }
  };

  const getNotificationBg = (type, read) => {
    if (read) return 'bg-slate-800/50';
    switch (type) {
      case 'stockout': return 'bg-red-500/10 border-l-2 border-red-500';
      case 'low_stock': return 'bg-yellow-500/10 border-l-2 border-yellow-500';
      case 'expiry': return 'bg-orange-500/10 border-l-2 border-orange-500';
      case 'otif': return 'bg-blue-500/10 border-l-2 border-blue-500';
      case 'forecast': return 'bg-purple-500/10 border-l-2 border-purple-500';
      default: return 'bg-slate-700/50';
    }
  };

  const groupedNotifications = {
    stockout: notifications.filter(n => n.type === 'stockout'),
    low_stock: notifications.filter(n => n.type === 'low_stock'),
    expiry: notifications.filter(n => n.type === 'expiry'),
    otif: notifications.filter(n => n.type === 'otif'),
    forecast: notifications.filter(n => n.type === 'forecast')
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-96 bg-slate-800 border-l border-slate-700 z-50 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-slate-300" />
            <h2 className="text-lg font-semibold text-white">Notifications</h2>
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
              {notifications.filter(n => !n.read).length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {Object.entries(groupedNotifications).map(([type, notifs]) => {
            if (notifs.length === 0) return null;
            
            const typeLabels = {
              stockout: 'Stockouts',
              low_stock: 'Low Stock',
              expiry: 'Expiry Alerts',
              otif: 'OTIF Issues',
              forecast: 'Forecast Deviations'
            };

            return (
              <div key={type} className="border-b border-slate-700">
                <div className="px-4 py-2 bg-slate-700/50">
                  <span className="text-sm font-medium text-slate-300">{typeLabels[type]}</span>
                </div>
                {notifs.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-slate-700/50 cursor-pointer transition-colors ${getNotificationBg(notification.type, notification.read)}`}
                    onClick={() => {
                      if (onMarkAsRead) onMarkAsRead(notification.id);
                      if (onNavigate) onNavigate(notification);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm">{notification.title}</p>
                        <p className="text-slate-400 text-sm mt-1">{notification.message}</p>
                        <p className="text-slate-500 text-xs mt-2">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-700">
          <button className="w-full py-2 text-center text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
            View All Notifications
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;
