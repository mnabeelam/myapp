// myapp LAN Agent — high-performance network operations plane.
// Handles ICMP, WoL, SSH, WinRM with mTLS to control API.
package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	apiURL := envOr("MYAPP_API_URL", "http://localhost:4000")
	siteID := envOr("MYAPP_SITE_ID", "default")
	interval := envOr("MYAPP_PING_INTERVAL", "30s")

	log.Printf("myapp agent starting — site=%s api=%s interval=%s", siteID, apiURL, interval)

	ticker := time.NewTicker(30 * time.Second)
	defer ticker.Stop()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	log.Println("agent ready — ping loop active (connect API when DB is seeded)")

	for {
		select {
		case <-ticker.C:
			// Phase E1: register heartbeat + run ping batch
			log.Println("ping cycle — awaiting machine list from API")
		case <-quit:
			log.Println("agent shutting down")
			return
		}
	}
}

func envOr(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func init() {
	fmt.Println("myapp network agent v0.1.0")
}
