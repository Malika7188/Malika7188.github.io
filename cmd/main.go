package main

import (
	"fmt"
	"net/http"

	"portfolio/internals/routes"
)

func main() {
	mux := http.NewServeMux()
	routes.RegisterRoutes(mux)

	wrappedMux := routes.RouteChecker(mux)

	server := &http.Server{
		Addr:    ":8080",
		Handler: wrappedMux,
	}

	fmt.Println("server running @http://localhost:8080\n=====================================")
	err := server.ListenAndServe()
	if err != nil {
		fmt.Println("web error")
		return
	}
}
