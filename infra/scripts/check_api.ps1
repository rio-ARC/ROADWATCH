$ErrorActionPreference = "Stop"
Invoke-RestMethod http://localhost:8000/health
Invoke-RestMethod http://localhost:8000/complaints
Invoke-RestMethod -Method Post -ContentType "application/json" -Body '{"description":"large pothole near bus lane"}' http://localhost:8000/analysis
