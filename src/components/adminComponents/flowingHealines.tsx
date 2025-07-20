"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

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
      toast.error("Failed to load announcements: " + error.message);
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

      toast.success(form.id ? "Announcement updated successfully" : "Announcement added successfully");

      setForm({ text: "", type: "", icon: "", href: "", id: "" });
      setOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error("Failed to save announcement: " + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/headlines/${id}`, { method: "DELETE" });
      toast.success("Announcement deleted successfully");
      fetchData();
    } catch (error: any) {
      toast.error("Failed to delete announcement: " + error.message);
    }
  };

  const openForEdit = (item: Announcement) => {
    setForm(item);
    setOpen(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold ">📢 Manage the flowing headlines</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setForm({ text: "", type: "", icon: "", href: "", id: "" })}>
              + New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{form.id ? "Edit" : "New"} Announcement</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <Input placeholder="Text" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
              <Input placeholder="Type (urgent/info/...)" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
              <Input placeholder="Icon (Calendar, BookOpen, etc)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
              <Input placeholder="Href (/link or http)" value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} />
            </div>
            <DialogFooter>
              <Button onClick={handleSave}>{form.id ? "Update" : "Add"} Announcement</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg flex justify-between items-start bg-gray-50 shadow-sm hover:shadow-md transition">
            <div>
              <p className="text-lg font-medium">{item.text}</p>
              <p className="text-sm text-gray-500">{item.type} • {item.icon}</p>
              {item.href && (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                  {item.href}
                </a>
              )}
            </div>
            <div className="space-x-2 mt-1">
              <Button variant="outline" size="sm" onClick={() => openForEdit(item)}>Edit</Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
