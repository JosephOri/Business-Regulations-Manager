# ARCHITECTURE

[User on Browser] <--> [React Frontend (index.html)] <br>
    |<br>
    | (HTTP API Call: /api/check-compliance)<br>
    V<br>
[Node.js/Express Backend]<br>
    |<br>
    | 1. Receives user data (size, seats, etc.)<br>
    | 2. Creates a query string<br>
    | 3. Searches for relevant rules in `processed_data.json`<br>
    | 4. Constructs a detailed prompt<br>
    V<br>
[Gemini AI API]<br>
    |<br>
    | 5. Receives prompt, generates report<br>
    V<br>
[Node.js/Express Backend]<br>
    |<br>
    | 6. Sends report back to Frontend<br>
    V<br>
[React Frontend] --> Displays report & allows PDF download
