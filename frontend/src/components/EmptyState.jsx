import React from 'react';
import { FolderOpen } from 'lucide-react';

export default function EmptyState({
  icon: Icon = FolderOpen,
  title = 'No items found',
  description = 'Get started by creating your first entry.',
  actionText,
  onAction,
}) {
  return (
    <div className="empty-state flex flex-col items-center justify-center p-8 text-center premium-card/60 /40 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 my-4">
      <div className="w-14 h-14 rounded-xl bg-brand-50 dark:bg-brand-950/60 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4 shadow-sm">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-4">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 dark:bg-brand-600 dark:hover:bg-brand-500 text-white shadow-sm transition-all rounded-xl transition shadow-sm hover:shadow active:scale-95"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
