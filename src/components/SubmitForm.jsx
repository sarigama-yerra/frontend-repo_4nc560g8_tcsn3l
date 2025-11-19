import { useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function SubmitForm({ onCreated }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "event",
    organization: "",
    city: "",
    mode: "online",
    is_paid: false,
    price: "",
    url: "",
    tags: "",
  });

  const change = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        price: form.price ? Number(form.price) : null,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        city: form.city || null,
      };
      const res = await fetch(`${API}/opportunities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      onCreated?.(data.id);
      setForm({
        title: "",
        description: "",
        category: "event",
        organization: "",
        city: "",
        mode: "online",
        is_paid: false,
        price: "",
        url: "",
        tags: "",
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className="input" placeholder="Title" value={form.title} onChange={(e) => change("title", e.target.value)} required />
        <input className="input" placeholder="Organization" value={form.organization} onChange={(e) => change("organization", e.target.value)} />
        <select className="input" value={form.category} onChange={(e) => change("category", e.target.value)}>
          <option value="hackathon">Hackathon</option>
          <option value="event">Event</option>
          <option value="course">Course</option>
          <option value="accelerator">Accelerator</option>
          <option value="incubator">Incubator</option>
          <option value="program">Program</option>
        </select>
        <select className="input" value={form.mode} onChange={(e) => change("mode", e.target.value)}>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="hybrid">Hybrid</option>
        </select>
        <input className="input" placeholder="City (optional)" value={form.city} onChange={(e) => change("city", e.target.value)} />
        <input className="input" placeholder="Official URL" value={form.url} onChange={(e) => change("url", e.target.value)} required />
        <input className="input" placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => change("tags", e.target.value)} />
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-blue-100 text-sm">
            <input type="checkbox" checked={form.is_paid} onChange={(e) => change("is_paid", e.target.checked)} />
            Paid
          </label>
          {form.is_paid && (
            <input className="input" type="number" min="0" step="0.01" placeholder="Price" value={form.price} onChange={(e) => change("price", e.target.value)} />
          )}
        </div>
      </div>
      <textarea className="input min-h-[100px]" placeholder="Short description" value={form.description} onChange={(e) => change("description", e.target.value)} required />
      <button disabled={loading} className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-60">{loading ? "Submitting..." : "Submit for review"}</button>
    </form>
  );
}
