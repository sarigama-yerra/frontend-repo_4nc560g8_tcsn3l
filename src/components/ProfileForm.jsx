import { useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function ProfileForm({ onSaved }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    experience_level: "student",
    interests: "hackathon, accelerator, fintech",
    goals: "",
  });

  const change = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const save = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        interests: form.interests
          ? form.interests.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
        location: form.location || null,
      };
      const res = await fetch(`${API}/profiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      onSaved?.(data.id, form.email);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={save} className="space-y-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className="input" placeholder="Full name" value={form.name} onChange={(e) => change("name", e.target.value)} required />
        <input className="input" placeholder="Email" value={form.email} onChange={(e) => change("email", e.target.value)} required />
        <input className="input" placeholder="City (optional)" value={form.location} onChange={(e) => change("location", e.target.value)} />
        <select className="input" value={form.experience_level} onChange={(e) => change("experience_level", e.target.value)}>
          <option value="student">Student</option>
          <option value="junior">Junior</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
          <option value="founder">Founder</option>
        </select>
        <input className="input sm:col-span-2" placeholder="Interests (comma separated)" value={form.interests} onChange={(e) => change("interests", e.target.value)} />
      </div>
      <textarea className="input min-h-[100px]" placeholder="Your goals (optional)" value={form.goals} onChange={(e) => change("goals", e.target.value)} />
      <button disabled={loading} className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-60">{loading ? "Saving..." : "Save profile"}</button>
    </form>
  );
}
