import React from 'react';
import { Upload, Bell, LogOut, User } from 'lucide-react';
import ExperienceFlowLogo from '../../assets/experienceflow-logo.svg';

const Header = ({ 
  currentUser, 
  notifications, 
  onUploadClick, 
  onNotificationClick, 
  onLogout,
  showNotificationBadge 
}) => {
  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  return (
    <header className="bg-slate-800 border-b border-slate-700">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <img 
                src={ExperienceFlowLogo} 
                alt="ExperienceFlow" 
                className="w-10 h-10 rounded-xl"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">
                ExperienceFlow
              </h1>
              <p className="text-xs text-slate-400">Hospital Pharma Procurement</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onUploadClick}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-all"
            >
              <Upload className="w-4 h-4" />
              Upload Forecast
            </button>
            
            <button
              onClick={onNotificationClick}
              className="relative p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-slate-300" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>
            
            <div className="flex items-center gap-3 pl-3 border-l border-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-sm font-medium text-white">
                  {currentUser?.name || 'Admin'}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
