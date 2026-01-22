"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogTitle, 
  DialogHeader, 
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Megaphone, 
  Globe, 
  X,
  ChevronRight
} from "lucide-react";

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
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/headlines/${id}`, { method: "DELETE" });
      toast.success("Announcement deleted");
      fetchData();
    } catch (error: any) {
      toast.error("Failed to delete announcement");
    }
  };

  const openForEdit = (item: Announcement) => {
    setForm(item);
    setOpen(true);
  };

  const getTypeStyles = (type: string) => {
    switch (type.toLowerCase()) {
      case 'urgent': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'info': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'success': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'warning': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-zinc-50 text-zinc-600 border-zinc-100';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <Megaphone className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">Communication</span>
            </div>
            <h1 className="text-4xl font-semibold text-zinc-900 tracking-tight">
              Headlines Control
            </h1>
            <p className="text-zinc-500 mt-2 text-lg">
              Manage your flowing announcements and website alerts.
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => setForm({ text: "", type: "", icon: "", href: "", id: "" })}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-6 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                <span className="font-semibold">Add Announcement</span>
              </Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-lg bg-white border-zinc-100 rounded-[2rem] p-0 overflow-hidden shadow-2xl">
              <DialogHeader className="px-8 pt-8 pb-4">
                <DialogTitle className="text-2xl font-semibold text-zinc-900 flex items-center gap-3">
                  {form.id ? <Edit3 className="w-6 h-6 text-indigo-600" /> : <Plus className="w-6 h-6 text-indigo-600" />}
                  {form.id ? "Edit Item" : "New Item"}
                </DialogTitle>
              </DialogHeader>

              <div className="px-8 py-4 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-zinc-700 ml-1">Message Content</label>
                  <Input 
                    placeholder="E.g. Registration closes this Friday!" 
                    value={form.text} 
                    onChange={(e) => setForm({ ...form, text: e.target.value })}
                    className="rounded-xl border-zinc-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 h-12"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-zinc-700 ml-1">Type</label>
                        <Input 
                            placeholder="urgent, info, success..." 
                            value={form.type} 
                            onChange={(e) => setForm({ ...form, type: e.target.value })}
                            className="rounded-xl border-zinc-200 focus:ring-4 focus:ring-indigo-500/10 h-12"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-zinc-700 ml-1">Icon Name</label>
                        <Input 
                            placeholder="Bell, Alert, Info..." 
                            value={form.icon} 
                            onChange={(e) => setForm({ ...form, icon: e.target.value })}
                            className="rounded-xl border-zinc-200 focus:ring-4 focus:ring-indigo-500/10 h-12"
                        />
                    </div>
                </div>

                <div className="space-y-1.5 pb-4">
                  <label className="text-sm font-semibold text-zinc-700 ml-1">Redirect URL</label>
                  <Input 
                    placeholder="https://..." 
                    value={form.href} 
                    onChange={(e) => setForm({ ...form, href: e.target.value })}
                    className="rounded-xl border-zinc-200 focus:ring-4 focus:ring-indigo-500/10 h-12"
                  />
                </div>
              </div>

              <DialogFooter className="bg-zinc-50 px-8 py-6">
                <Button 
                  onClick={handleSave}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 rounded-xl font-semibold shadow-lg shadow-indigo-100 transition-all active:scale-95"
                >
                  {form.id ? "Save Changes" : "Publish Announcement"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* List Section */}
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="border-2 border-dashed border-zinc-100 rounded-[2rem] py-20 text-center">
              <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Megaphone className="w-8 h-8 text-zinc-300" />
              </div>
              <p className="text-zinc-500 font-medium">No announcements found.</p>
            </div>
          ) : (
            items.map((item) => (
              <div 
                key={item.id} 
                className="group bg-white border border-zinc-100 p-6 rounded-[1.5rem] hover:border-transparent hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-5 flex-1 w-full">
                    <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-zinc-200">
                      {item.icon ? <span className="text-xs uppercase font-bold">{item.icon.slice(0, 2)}</span> : <Megaphone size={20} />}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="font-semibold text-zinc-900 leading-snug">
                        {item.text}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-md border ${getTypeStyles(item.type)}`}>
                          {item.type || 'general'}
                        </span>
                        {item.href && (
                          <div className="flex items-center gap-1.5 text-zinc-400 text-sm italic">
                            <Globe size={12} />
                            <span className="truncate max-w-[150px]">{item.href}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                    <button 
                      onClick={() => openForEdit(item)}
                      className="p-3 rounded-xl text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all active:scale-90"
                      title="Edit"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-3 rounded-xl text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-90"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="hidden sm:block ml-2 text-zinc-200">
                        <ChevronRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-12 text-center">
            <p className="text-zinc-400 text-sm font-medium">
              You are currently managing {items.length} active headline{items.length !== 1 ? 's' : ''}
            </p>
        </div>
      </div>
    </div>
  );
}