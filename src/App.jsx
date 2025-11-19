import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import OpportunityCard from "./components/OpportunityCard";
import SubmitForm from "./components/SubmitForm";
import ProfileForm from "./components/ProfileForm";

const API = import.meta.env.VITE_BACKEND_URL || "";

function Browse() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await fetch(`${API}/opportunities`);
      const data = await res.json();
      setItems(data);
      setLoading(false);
    };
    load();
  }, []);

  const verify = async (id) => {
    await fetch(`${API}/opportunities/${id}/verify`, { method: "POST" });
    const res = await fetch(`${API}/opportunities?published_only=false`);
    const data = await res.json();
    setItems(data);
  };

  return (
    <div className="space-y-4">
      {loading && <div className="text-blue-200">Loading opportunities...</div>}
      {!loading && items.length === 0 && (
        <div className="text-blue-200">No opportunities yet. Add one from Submit tab.</div>
      )}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((it) => (
            <OpportunityCard key={it.id} item={it} onVerify={verify} />)
          )}
        </div>
      )}
    </div>
  );
}

function Recommend() {
  const [email, setEmail] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRec = async () => {
    setLoading(true);
    const res = await fetch(`${API}/recommendations/${encodeURIComponent(email)}`);
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input className="input" placeholder="Enter your profile email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={fetchRec} className="px-3 py-2 rounded-md bg-blue-500 text-white">Get recommendations</button>
      </div>
      {loading && <div className="text-blue-200">Loading recommendations...</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((it) => (
          <OpportunityCard key={it.id} item={it} />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [tab, setTab] = useState("browse");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-50">
      <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_10%_10%,rgba(37,99,235,0.15),transparent_40%),radial-gradient(600px_circle_at_90%_20%,rgba(56,189,248,0.12),transparent_40%)]" />
      <div className="relative max-w-6xl mx-auto px-6 py-8">
        <Navbar current={tab} onChange={setTab} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {tab === "browse" && <Browse />}
            {tab === "submit" && <SubmitForm onCreated={() => setTab("browse")} />}
            {tab === "recommend" && <Recommend />}
          </div>
          <div className="lg:col-span-1 space-y-6">
            {tab === "profile" && <ProfileForm />}
            {tab === "browse" && (
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <h3 className="text-white font-semibold mb-2">How Dalilah works</h3>
                <ul className="text-sm text-blue-200 list-disc pl-5 space-y-1">
                  <li>Everything is human-curated and verified.</li>
                  <li>Only high-value opportunities in Saudi region.</li>
                  <li>Personalized recommendations based on your profile.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
