'use client';

import { useEffect, useState } from 'react';
import { X, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

type Notice = {
  id: string;
  title: string;
  content: string;
  fileUrl?: string | null;
  fileName?: string | null;
  endDate: string;
};

export default function NoticePopup() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch('/api/notices?active=true')
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Notice[]) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const dismissed = sessionStorage.getItem('notice-dismissed');
        const lastIds = dismissed ? dismissed.split(',') : [];
        const currentIds = data.map((n) => n.id).join(',');
        if (lastIds.join(',') === currentIds) return;
        setNotices(data);
        setOpen(true);
      })
      .catch(() => {});
  }, []);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem(
      'notice-dismissed',
      notices.map((n) => n.id).join(',')
    );
  };

  if (!open || notices.length === 0) return null;

  const notice = notices[index];
  const hasMany = notices.length > 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gradient-to-r from-amber-500 to-orange-500">
          <h2 className="text-lg font-semibold text-white truncate">
            {notice.title}
          </h2>
          <button
            onClick={close}
            className="text-white/90 hover:text-white p-1 rounded-lg hover:bg-white/10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {notice.content}
          </p>

          {notice.fileUrl && (
            <a
              href={notice.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100"
            >
              <FileText className="w-4 h-4" />
              {notice.fileName || 'View attachment'}
            </a>
          )}

          <p className="mt-5 text-xs text-gray-400">
            Available until {new Date(notice.endDate).toLocaleDateString()}
          </p>
        </div>

        {hasMany && (
          <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50">
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg disabled:opacity-40 hover:bg-white"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <span className="text-xs text-gray-500">
              {index + 1} / {notices.length}
            </span>
            <button
              onClick={() =>
                setIndex((i) => Math.min(notices.length - 1, i + 1))
              }
              disabled={index === notices.length - 1}
              className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg disabled:opacity-40 hover:bg-white"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
