# ARCHITECTURE

[User on Browser] <--> [React Frontend (index.html)] <br>
|
| (HTTP API Call: /api/check-compliance)
V
[Node.js/Express Backend]
|
| 1. Receives user data (size, seats, etc.)
| 2. Creates a query string
| 3. Searches for relevant rules in `processed_data.json`
| 4. Constructs a detailed prompt
V
[Gemini AI API]
|
| 5. Receives prompt, generates report
V
[Node.js/Express Backend]
|
| 6. Sends report back to Frontend
V
[React Frontend] --> Displays report & allows PDF download
