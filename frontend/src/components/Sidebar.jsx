import React from 'react';
import {
  LayoutDashboard,
  Bot,
  CheckSquare,
  Calendar,
  GraduationCap,
  FileText,
  Target,
  Settings,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Sidebar() {
  const { activeTab, setActiveTab, data, geminiInfo } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agent', label: 'AI Agent', icon: Bot, badge: 'Agent' },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, count: data?.tasks?.filter(t => !t.completed).length },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'academic', label: 'Academic', icon: GraduationCap },
    { id: 'documents', label: 'Documents', icon: FileText, count: data?.documents?.length },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="workspace-sidebar w-64 flex flex-col h-screen sticky top-0 transition-colors select-none z-40">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="sidebar-brand-name">MindMate</h2>
          <span className="sidebar-brand-caption">Your study companion</span>
        </div>
      </div>

      <div className="sidebar-section-label">Workspace</div>

      {/* Navigation List */}
      <nav className="sidebar-navigation flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`sidebar-nav-item w-full flex items-center justify-between ${
                isActive ? 'is-active' : ''
              }`}
            >
              <span className="sidebar-nav-label">
                <Icon className="w-[18px] h-[18px]" />
                <span>{item.label}</span>
              </span>
              <span className="sidebar-nav-meta">
                {item.badge && <span className="sidebar-agent-badge">{item.badge}</span>}
                {typeof item.count === 'number' && item.count > 0 && (
                  <span className="sidebar-count">{item.count}</span>
                )}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-note">
        <div className="sidebar-note-icon"><Sparkles className="w-4 h-4" /></div>
        <div>
          <strong>One step at a time</strong>
          <span>Small progress adds up.</span>
        </div>
      </div>

      {/* AI Status Badge */}
      <div className="sidebar-status">
        <span className={`sidebar-status-dot ${geminiInfo?.configured ? 'is-online' : 'is-offline'}`} />
        <span className="sidebar-status-name">Gemini AI</span>
        <span className="sidebar-status-value">
          {geminiInfo?.configured ? 'Active' : 'Offline / Rules'}
        </span>
      </div>
    </aside>
  );
}
