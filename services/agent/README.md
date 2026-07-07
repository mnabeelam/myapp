# myapp LAN Agent

Go-based network operations agent for high-throughput ping, WoL, and remote commands.

## Build

```bash
cd services/agent
go build -o myapp-agent ./cmd/agent
```

## Run

```bash
MYAPP_API_URL=http://localhost:4000 MYAPP_SITE_ID=lab-1 ./myapp-agent
```

## Capabilities (roadmap)

| Phase | Feature |
|-------|---------|
| E1 | Heartbeat + ICMP ping |
| E2 | WoL, SSH shutdown, WinRM |
| E4 | mTLS, SNMP, multi-VLAN |
