# Step 13 — 3D Reporting

Interactive 3D visualizations for network topology, latency, and capacity at scale.

---

## 13.1 Report Types

| Report | 3D Representation | Data Source |
|--------|-------------------|-------------|
| **Network Topology** | Nodes = machines, edges = subnets/VLANs | Inventory + discovery |
| **Latency Heatmap** | Node height/color = avg latency | TimescaleDB ping_metrics |
| **Uptime Globe** | Spherical layout by site; glow = status | Machine status aggregate |
| **Traffic Flow** | Animated particles along edges | Proxy/gateway metrics |
| **Capacity Planning** | Bar columns = CPU/memory per host | SNMP / agent metrics |

---

## 13.2 Technology

```
Three.js (WebGL)
    └── @react-three/fiber (React integration)
            └── @react-three/drei (OrbitControls, Text, Line, Html tooltips)
```

**Route:** `/dashboard/reports` or `/reports/3d`

---

## 13.3 Topology 3D Scene

```
                    [proxy-01]
                        │
           ┌────────────┼────────────┐
           │            │            │
      [lab-pc-01]  [lab-pc-02]  [lab-pc-03]
           │            │            │
           └────────────┴────────────┘
                    [gateway]
```

### Visual encoding

| Property | Visual |
|----------|--------|
| Status UP | Green emissive glow |
| Status DOWN | Red pulse animation |
| High latency | Taller node + orange color |
| Subnet | Grouped on Z-plane layers |
| Role server | Larger cube; workstation = smaller |

### Interaction

- **Orbit** — mouse drag to rotate
- **Zoom** — scroll wheel
- **Click node** — side panel with machine details
- **Filter** — by tag, subnet, status
- **Time slider** — replay historical states

---

## 13.4 API for 3D Reports

```
GET /api/v1/reports/topology-3d?tenantId=
```

Response:

```json
{
  "nodes": [
    { "id": "1", "label": "lab-pc-01", "x": 0, "y": 1, "z": 0,
      "status": "up", "latencyMs": 2, "color": "#34d399" }
  ],
  "edges": [
    { "from": "1", "to": "gw", "type": "gateway" }
  ],
  "meta": { "generatedAt": "...", "machineCount": 42 }
}
```

```
GET /api/v1/reports/latency-series?machineId=&range=24h
```

Returns time-series for sparkline overlay on 3D nodes.

---

## 13.5 Performance at Scale

| Machines | Strategy |
|----------|----------|
| < 200 | Render all nodes in WebGL |
| 200–2000 | Level-of-detail (LOD); cluster distant subnets |
| 2000+ | Octree culling; server-side pre-aggregation |
| 10k+ | 2D map fallback + 3D for selected subnet only |

**Web Workers:** Layout computation off main thread.

**InstancedMesh:** Single draw call for identical node geometry.

---

## 13.6 UI Integration

New dashboard tab: **Reports 3D**

```
┌──────────────────────────────────────────────────────────┐
│  [Overview] [Machines] ... [Reports 3D]                  │
├──────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────┐  ┌──────────────────┐  │
│  │                             │  │ Node Details     │  │
│  │     3D WebGL Canvas         │  │ lab-pc-01        │  │
│  │     (orbit, zoom, click)    │  │ Status: UP       │  │
│  │                             │  │ Latency: 2ms     │  │
│  └─────────────────────────────┘  └──────────────────┘  │
│  [Topology] [Latency] [Uptime]     Time: ────●──── 24h  │
└──────────────────────────────────────────────────────────┘
```

---

## 13.7 Export

- **PNG/SVG** screenshot of 3D view
- **PDF report** — topology + metrics summary (headless render)
- **JSON** raw data for external BI tools

---

**Previous:** [12-security-model.md](./12-security-model.md)  
**Next:** [14-build-roadmap.md](./14-build-roadmap.md)
