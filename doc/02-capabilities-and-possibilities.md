# Step 2 — Capabilities & Possibilities

What the LabOps platform can do, grouped by functional area.

---

## 2.1 Machine Health & Reachability

| Capability | How It Works |
|------------|--------------|
| **Ping / ICMP** | Periodic checks from a central agent; latency, packet loss, uptime % |
| **TCP port checks** | HTTP, SSH, RDP, custom services |
| **SNMP** | CPU, memory, disk, interface stats (if devices support it) |
| **Agent-based metrics** | Lightweight agent on each machine for richer data (processes, logs) |
| **Heartbeat** | Machines report in even when ICMP is blocked |

### Use Cases

- Dashboard showing which lab PCs are online
- Alert when a machine has been down for more than 5 minutes
- Latency trends over time for performance baselines
- Port checks to verify services (not just host reachability)

---

## 2.2 Power Management

| Capability | How It Works |
|------------|--------------|
| **Wake-on-LAN (WoL)** | Magic packet to MAC address (same subnet or relay) |
| **Graceful shutdown** | SSH / WinRM / agent command |
| **Hard power off** | IPMI, iDRAC, iLO, Redfish, smart PDU |
| **Scheduled power** | Cron-style on/off for lab schedules |

### Use Cases

- Wake lab machines before a class or demo session
- Shut down unused machines overnight to save power
- Emergency hard power-off via BMC when OS is unresponsive
- Scheduled lab hours (auto wake 8 AM, shutdown 6 PM)

---

## 2.3 Proxy Server Control

| Capability | How It Works |
|------------|--------------|
| **Status** | Health checks on proxy ports (HTTP/SOCKS) |
| **Config push** | Deploy Squid, nginx, HAProxy, 3proxy configs |
| **Rule management** | ACLs, upstreams, allow/deny lists |
| **Failover** | Switch primary/backup proxy automatically |

### Use Cases

- See if proxy-01 is responding before routing traffic
- Push updated ACL rules without manual SSH
- Restart proxy after config change with approval workflow
- Automatic failover when primary proxy fails health check

---

## 2.4 Gateway & Routing

| Capability | How It Works |
|------------|--------------|
| **Default gateway change** | SSH/WinRM scripts, DHCP reservation, or router API |
| **Static route add/remove** | `ip route` / `route` / router CLI |
| **DNS override** | Local resolver or `/etc/resolv.conf` / Windows DNS |
| **Multi-homing** | Policy-based routing for lab VLANs |

### Use Cases

- Switch a lab VLAN to use a different internet gateway
- Add temporary static route for testing
- Override DNS for malware analysis or filtered lab
- Route specific subnets through a proxy gateway

---

## 2.5 Enterprise-Style Extras (Local Scope)

| Feature | Description |
|---------|-------------|
| **Inventory** | Hostname, IP, MAC, OS, role, location, owner |
| **RBAC** | Admin / operator / viewer roles |
| **Audit log** | Who shut down what, when |
| **Alerting** | Email, Slack, webhook on down/slow/high latency |
| **Topology map** | VLANs, subnets, dependencies |
| **Runbooks** | One-click "reset lab 3" workflows |
| **Config drift** | Compare live vs expected state |

---

## Capability Matrix (by Phase)

| Capability | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Phase 5 |
|------------|---------|---------|---------|---------|---------|
| Ping monitor | ✓ | | | | |
| Inventory | ✓ | | | | |
| WoL | | ✓ | | | |
| Shutdown | | ✓ | | | |
| Proxy status | | | ✓ | | |
| Proxy restart | | | ✓ | | |
| Gateway change | | | | ✓ | |
| SNMP / agents | | | | | ✓ |
| Topology / runbooks | | | | | ✓ |

---

**Previous:** [Step 1 — Overview](./01-overview.md)  
**Next:** [Step 3 — Architecture](./03-architecture.md)
