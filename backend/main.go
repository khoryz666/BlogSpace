package main

import (
	"encoding/json"
	"log"
	"net/http"
)

// healthResponse is the JSON structure returned by /api/health.
// Having a type makes it easy to extend later.
type healthResponse struct {
	Status string `json:"status"`
}

// handleHealth is a basic handler to test that the server is running.
// URL: GET /api/health
func handleHealth(w http.ResponseWriter, r *http.Request) {
	// Only allow GET for now.
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	resp := healthResponse{Status: "ok"}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		log.Println("error encoding health response:", err)
	}
}

func main() {
	// In the future, we'll add:
	// - /api/posts?lang=en
	// - /api/posts/{lang}/{slug}
	// For now, we only set up /api/health.

	mux := http.NewServeMux()
	mux.HandleFunc("/api/health", handleHealth)

	addr := ":8080"

	log.Println("Starting BlogSpace backend on", addr)
	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatal("server error:", err)
	}
}