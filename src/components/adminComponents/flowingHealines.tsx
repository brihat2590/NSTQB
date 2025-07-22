"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner"; // ✅ Sonner toast
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Plus, Edit3, Trash2, ExternalLink, Megaphone, Sparkles, Globe } from "lucide-react";

type Announcement = {
  id: string;
  text: string;
  type: string;
  icon: string;
  href: string;
};

export default function FlowingAdminPage() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [form, setForm] = useState<Announcement>({ text: "", type: "", icon: "", href: "", id: "" });
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/headlines");
      const data = await res.json();
      setItems(data);
    } catch (error: any) {
      toast.error("Failed to load announcements");
      console.error("Failed to load announcements:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    const method = form.id ? "PUT" : "POST";
    const url = form.id ? `/api/headlines/${form.id}` : `/api/headlines`;

    try {
      await fetch(url, {
        method,
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });

      toast.success(form.id ? "Announcement updated!" : "Announcement created!");
      setForm({ text: "", type: "", icon: "", href: "", id: "" });
      setOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error("Failed to save announcement");
      console.error("Failed to save announcement:", error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/headlines/${id}`, { method: "DELETE" });
      toast.success("Announcement deleted");
      fetchData();
    } catch (error: any) {
      toast.error("Failed to delete announcement");
      console.error("Failed to delete announcement:", error.message);
    }
  };

  const openForEdit = (item: Announcement) => {
    setForm(item);
    setOpen(true);
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-xl">
            <Megaphone className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Headlines Control Center
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create, manage, and optimize your flowing announcements with style and precision
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Active Announcements</h2>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {items.length} items
            </span>
          </div>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => setForm({ text: "", type: "", icon: "", href: "", id: "" })}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <DialogHeader className="pb-6">
                <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center">
                  {form.id ? <Edit3 className="w-6 h-6 mr-2 text-blue-600" /> : <Plus className="w-6 h-6 mr-2 text-green-600" />}
                  {form.id ? "Edit" : "Create"} Announcement
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Announcement Text</label>
                  <Input 
                    placeholder="Enter your announcement text..." 
                    value={form.text} 
                    onChange={(e) => setForm({ ...form, text: e.target.value })}
                    className="h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Type</label>
                  <Input 
                    placeholder="urgent, info, success, warning..." 
                    value={form.type} 
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Icon</label>
                  <Input 
                    placeholder="Calendar, BookOpen, Bell, etc..." 
                    value={form.icon} 
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Link (Optional)</label>
                  <Input 
                    placeholder="https://example.com or /internal-link" 
                    value={form.href} 
                    onChange={(e) => setForm({ ...form, href: e.target.value })}
                    className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <DialogFooter className="pt-6">
                <Button 
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  {form.id ? "Update" : "Create"} Announcement
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-8">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Megaphone className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">No announcements yet</h3>
              <p className="text-gray-500 text-lg">Create your first announcement to get started</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div 
                key={item.id} 
                className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {item.icon ? item.icon.charAt(0) : "📢"}
                      </div>
                      <div className="flex-1">
                        <p className="text-xl font-semibold text-gray-800 leading-relaxed mb-3">
                          {item.text}
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getTypeColor(item.type)}`}>
                            {item.type || 'general'}
                          </span>
                          {item.icon && (
                            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200">
                              {item.icon}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {item.href && (
                      <div className="ml-16">
                        <a 
                          href={item.href} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors group"
                        >
                          <Globe className="w-4 h-4" />
                          <span className="underline decoration-2 underline-offset-2">{item.href}</span>
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => openForEdit(item)}
                      className="bg-white/80 hover:bg-blue-50 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700 px-6 py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline"
                      size="lg"
                      onClick={() => handleDelete(item.id)}
                      className="bg-white/80 hover:bg-red-50 border-gray-200 hover:border-red-300 text-gray-700 hover:text-red-700 px-6 py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-center mt-20 pt-12 border-t border-gray-200/50">
          <p className="text-gray-500 text-lg">
            Managing {items.length} announcement{items.length !== 1 ? 's' : ''} with style ✨
          </p>
        </div>
      </div>
    </div>
  );
}
