import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { API_BASE } from '@/lib/config';

type Registration = {
  _id: string;
  name: string;
  email: string;
  team: string;
  age: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: string;
};

const AdminRegistrations: React.FC = () => {
  const [items, setItems] = React.useState<Registration[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/registrations`);
      if (!res.ok) throw new Error(`Failed to load (${res.status})`);
      const data = (await res.json()) as Registration[];
      setItems(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id: string, status: Registration['status']) {
    try {
      const res = await fetch(`${API_BASE}/registrations/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error(`Failed to update (${res.status})`);
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Failed to update');
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this registration?')) return;
    try {
      const res = await fetch(`${API_BASE}/registrations/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Failed to delete (${res.status})`);
      setItems(prev => prev.filter(i => i._id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Failed to delete');
    }
  }

  return (
    <div className="min-h-screen pt-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <Card className="cyber-card overflow-hidden">
          <CardHeader>
            <h2 className="text-2xl font-bold">Registrations (Admin)</h2>
            <div className="text-sm text-muted-foreground">Approve or reject competition registrations</div>
          </CardHeader>
          <CardContent>
            {loading && <div className="py-6">Loading...</div>}
            {error && <div className="py-3 text-red-500">{error}</div>}
            {!loading && items.length === 0 && (
              <div className="py-6 text-muted-foreground">No registrations</div>
            )}

            {!loading && items.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-border">
                      <th className="py-2 pr-2">Name</th>
                      <th className="py-2 pr-2">Email</th>
                      <th className="py-2 pr-2">Team</th>
                      <th className="py-2 pr-2">Age</th>
                      <th className="py-2 pr-2">Status</th>
                      <th className="py-2 pr-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((r) => (
                      <tr key={r._id} className="border-b border-border/50">
                        <td className="py-2 pr-2">{r.name}</td>
                        <td className="py-2 pr-2">{r.email}</td>
                        <td className="py-2 pr-2">{r.team}</td>
                        <td className="py-2 pr-2">{r.age}</td>
                        <td className="py-2 pr-2 font-medium capitalize">{r.status}</td>
                        <td className="py-2 pr-2 space-x-2">
                          <Button size="sm" variant="outline" onClick={() => updateStatus(r._id, 'approved')} disabled={r.status==='approved'}>
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => updateStatus(r._id, 'rejected')} disabled={r.status==='rejected'}>
                            Reject
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => remove(r._id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-4">
              <Button variant="outline" onClick={load}>Refresh</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminRegistrations;
