"use client";
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  LogOut, 
  FileText, 
  PenTool, 
  ShieldCheck, 
  HelpCircle, 
  CalendarDays 
} from 'lucide-react'; // npm install lucide-react

const AdminDashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/sign-in');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="bg-white border-b border-zinc-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl font-semibold text-zinc-900 tracking-tight">
                NSTQB <span className="text-zinc-400 font-normal">Admin</span>
              </h1>
            </div>
            
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-semibold text-zinc-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 flex items-center gap-2 active:scale-95"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-zinc-900">Dashboard</h2>
          <p className="text-zinc-500 mt-1">Select a module below to manage your platform content.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Page Admin */}
          <DashboardCard 
            title="Page Admin"
            description="Manage website's dynamic pages, SEO, and static content."
            icon={<FileText className="h-7 w-7" />}
            onClick={() => router.push('/page-admin')}
            accentColor="text-blue-600 bg-blue-50"
          />

          {/* Blog Admin */}
          <DashboardCard 
            title="Blog Admin"
            description="Write, edit, and organize articles or news updates."
            icon={<PenTool className="h-7 w-7" />}
            onClick={() => router.push('/blog-admin')}
            accentColor="text-amber-600 bg-amber-50"
          />

          {/* Events Admin */}
          <DashboardCard 
            title="Events Admin"
            description="Schedule conferences, webinars, and live event registrations."
            icon={<CalendarDays className="h-7 w-7" />}
            onClick={() => router.push('/events-admin')}
            accentColor="text-purple-600 bg-purple-50"
          />

          {/* Exam Registration */}
          <DashboardCard 
            title="Exam Registrations"
            description="Verify student payments and approve pending applications."
            icon={<ShieldCheck className="h-7 w-7" />}
            onClick={() => router.push('/registration-admin')}
            accentColor="text-emerald-600 bg-emerald-50"
          />

          {/* Exam Question Admin */}
          <DashboardCard 
            title="Question Bank"
            description="Update exam questions, categories, and answer choices."
            icon={<HelpCircle className="h-7 w-7" />}
            onClick={() => router.push('/exam-admin')}
            accentColor="text-rose-600 bg-rose-50"
          />
        </div>
      </main>
    </div>
  );
};

// Sub-component for Cards
interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  accentColor: string;
}

const DashboardCard = ({ title, description, icon, onClick, accentColor }: DashboardCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="group bg-white p-8 rounded-3xl border border-zinc-100 hover:border-transparent hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer relative overflow-hidden"
    >
      <div className="flex flex-col h-full">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${accentColor}`}>
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold text-zinc-900 mb-2">
          {title}
        </h3>
        
        <p className="text-zinc-500 text-sm leading-relaxed mb-8">
          {description}
        </p>

        <div className="mt-auto flex items-center text-sm font-semibold text-zinc-900 group-hover:translate-x-1 transition-transform">
          Manage Section
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;