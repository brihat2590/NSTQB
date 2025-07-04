'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function ExamGuard() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<'pop' | 'route' | null>(null);
  const nextHref = useRef<string | null>(null);
  const hasPushedState = useRef(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    // Push a dummy history state to trap the back button
    if (!hasPushedState.current) {
      window.history.pushState(null, '', window.location.href);
      hasPushedState.current = true;
    }

    const handlePopState = (e: PopStateEvent) => {
      setPendingAction('pop');
      setShowModal(true);
      window.history.pushState(null, '', window.location.href); // trap back button
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    const originalPush = router.push;

    router.push = (href: string) => {
      nextHref.current = href;
      setPendingAction('route');
      setShowModal(true);
    };

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
      router.push = originalPush;
    };
  }, [router]);

  const confirmLeave = () => {
    window.removeEventListener('beforeunload', () => {});
    if (pendingAction === 'pop') {
      window.history.back();
    } else if (pendingAction === 'route' && nextHref.current) {
      router.push(nextHref.current);
    }
  };

  const cancelLeave = () => {
    setShowModal(false);
    setPendingAction(null);
    nextHref.current = null;
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">Leave Exam?</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to leave the exam? Your progress will be lost.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelLeave}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmLeave}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
