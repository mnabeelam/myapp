"use client";

import { useState } from "react";
import type { Machine, MachineFormData } from "@/lib/types";
import { SectionHeader, StatusBadge } from "../ui";
import { Plus, Power, RefreshCw, Trash2, Wifi } from "lucide-react";

const emptyForm: MachineFormData = {
  hostname: "",
  ip: "",
  mac: "",
  os: "linux",
  role: "workstation",
  tags: "",
  subnet: "192.168.1.0/24",
};

interface Props {
  machines: Machine[];
  onMachinesChange: (machines: Machine[]) => void | Promise<void>;
  onAction: (action: string, target: string, details: string) => void;
  maxMachines?: number;
}

export function MachinesTab({ machines, onMachinesChange, onAction, maxMachines }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<MachineFormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onMachinesChange(
        machines.map((m) =>
          m.id === editingId
            ? {
                ...m,
                ...form,
                tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
              }
            : m
        )
      );
      onAction("machine_edit", form.hostname, "Updated inventory record");
    } else {
      if (maxMachines && machines.length >= maxMachines) {
        alert(`Machine limit reached (${maxMachines}). Upgrade your license to add more.`);
        return;
      }
      const newMachine: Machine = {
        id: Date.now().toString(),
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        status: "unknown",
        latencyMs: null,
        lastChecked: "Never",
      };
      onMachinesChange([...machines, newMachine]);
      onAction("machine_add", form.hostname, "Added to inventory");
    }
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (m: Machine) => {
    setForm({
      hostname: m.hostname,
      ip: m.ip,
      mac: m.mac,
      os: m.os,
      role: m.role,
      tags: m.tags.join(", "),
      subnet: m.subnet,
    });
    setEditingId(m.id);
    setShowForm(true);
  };

  const handleDelete = (m: Machine) => {
    if (confirm(`Remove ${m.hostname} from inventory?`)) {
      onMachinesChange(machines.filter((x) => x.id !== m.id));
      onAction("machine_delete", m.hostname, "Removed from inventory");
    }
  };

  const handleWoL = (m: Machine) => {
    onAction("wol", m.hostname, "Wake-on-LAN magic packet sent");
    alert(`WoL packet sent to ${m.hostname} (${m.mac})`);
  };

  const handleShutdown = (m: Machine) => {
    if (confirm(`Shut down ${m.hostname}? This requires confirmation.`)) {
      onAction("shutdown", m.hostname, `Graceful shutdown via ${m.os === "windows" ? "WinRM" : "SSH"}`);
      onMachinesChange(
        machines.map((x) =>
          x.id === m.id ? { ...x, status: "down" as const, latencyMs: null } : x
        )
      );
    }
  };

  return (
    <div>
      <SectionHeader
        title="Machine Inventory"
        description="Manage lab machines, monitor ping status, and run power actions."
        action={
          <div className="flex gap-2">
            <button className="btn-secondary flex items-center gap-1.5 text-xs">
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
            <button
              className="btn-primary flex items-center gap-1.5 text-xs"
              onClick={() => {
                setForm(emptyForm);
                setEditingId(null);
                setShowForm(true);
              }}
            >
              <Plus className="h-3.5 w-3.5" /> Add Machine
            </button>
          </div>
        }
      />

      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-5 space-y-4">
          <h3 className="font-medium">
            {editingId ? "Edit Machine" : "Add New Machine"}
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="label-field">
                Hostname <span className="text-red-400">*</span>
              </label>
              <input
                required
                className="input-field"
                placeholder="lab-pc-01"
                value={form.hostname}
                onChange={(e) => setForm({ ...form, hostname: e.target.value })}
              />
            </div>
            <div>
              <label className="label-field">
                IP Address <span className="text-red-400">*</span>
              </label>
              <input
                required
                className="input-field font-mono"
                placeholder="192.168.1.10"
                pattern="^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"
                value={form.ip}
                onChange={(e) => setForm({ ...form, ip: e.target.value })}
              />
            </div>
            <div>
              <label className="label-field">MAC Address</label>
              <input
                className="input-field font-mono"
                placeholder="AA:BB:CC:DD:EE:01"
                value={form.mac}
                onChange={(e) => setForm({ ...form, mac: e.target.value })}
              />
            </div>
            <div>
              <label className="label-field">
                OS <span className="text-red-400">*</span>
              </label>
              <select
                required
                className="input-field"
                value={form.os}
                onChange={(e) =>
                  setForm({ ...form, os: e.target.value as MachineFormData["os"] })
                }
              >
                <option value="linux">Linux</option>
                <option value="windows">Windows</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="label-field">
                Role <span className="text-red-400">*</span>
              </label>
              <select
                required
                className="input-field"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="workstation">Workstation</option>
                <option value="server">Server</option>
                <option value="proxy">Proxy</option>
                <option value="router">Router</option>
              </select>
            </div>
            <div>
              <label className="label-field">
                Subnet <span className="text-red-400">*</span>
              </label>
              <input
                required
                className="input-field font-mono"
                placeholder="192.168.1.0/24"
                value={form.subnet}
                onChange={(e) => setForm({ ...form, subnet: e.target.value })}
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <label className="label-field">Tags (comma-separated)</label>
              <input
                className="input-field"
                placeholder="lab-a, dev, testing"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn-primary text-sm">
              {editingId ? "Save Changes" : "Add Machine"}
            </button>
            <button
              type="button"
              className="btn-secondary text-sm"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto table-3d">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a3548] bg-surface-raised text-left text-xs uppercase tracking-wide text-[#8b9cb3]">
              <th className="px-4 py-3">Hostname</th>
              <th className="px-4 py-3">IP</th>
              <th className="px-4 py-3">OS</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Latency</th>
              <th className="px-4 py-3">Tags</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {machines.map((m) => (
              <tr
                key={m.id}
                className="border-b border-[#2a3548]/50 transition hover:bg-surface-raised/50"
              >
                <td className="px-4 py-3 font-medium">{m.hostname}</td>
                <td className="px-4 py-3 font-mono text-xs text-[#8b9cb3]">{m.ip}</td>
                <td className="px-4 py-3 capitalize text-[#8b9cb3]">{m.os}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={m.status} />
                </td>
                <td className="px-4 py-3 font-mono text-xs">
                  {m.latencyMs !== null ? `${m.latencyMs}ms` : "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {m.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-accent-muted px-1.5 py-0.5 text-xs text-accent"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button
                      title="Wake-on-LAN"
                      className="rounded p-1.5 text-green-400 hover:bg-green-500/10"
                      onClick={() => handleWoL(m)}
                    >
                      <Wifi className="h-3.5 w-3.5" />
                    </button>
                    <button
                      title="Shutdown"
                      className="rounded p-1.5 text-red-400 hover:bg-red-500/10"
                      onClick={() => handleShutdown(m)}
                    >
                      <Power className="h-3.5 w-3.5" />
                    </button>
                    <button
                      title="Edit"
                      className="rounded p-1.5 text-[#8b9cb3] hover:bg-surface-overlay"
                      onClick={() => startEdit(m)}
                    >
                      ✎
                    </button>
                    <button
                      title="Delete"
                      className="rounded p-1.5 text-red-400 hover:bg-red-500/10"
                      onClick={() => handleDelete(m)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-[#5a6a82]">
        Last checked: 30 seconds ago · Ping interval: 30s
        {maxMachines && (
          <> · Limit: {machines.length}/{maxMachines} machines</>
        )}
      </p>
    </div>
  );
}
