# Harry Potter Letter Generator

A magical React app that generates customizable Hogwarts acceptance letters with multiple styles. Users can select between different letter designs — currently **Claude's Hogwarts Letter** and **Mistral's Envelope** — from a main admin panel.

---

## Features

- **Multiple letter styles**: Choose from different Hogwarts letter designs (`claude`, `mistral`).
- **Admin panel**: Central UI to configure and select which letter to generate.
- **URL routing** for letter type selection.
- **Customizable recipient names** via URL parameters.
- **Interactive and animated letter experience** (opening envelopes, full-screen letters).
- Responsive and visually immersive magical theme.

---

## Project Structure

- `/claude/HogwartsLetter.js` — Claude's Hogwarts letter React component with animated envelope and parchment letter.
- `/mistral/Envelope.js` — Another letter/envelope style by Mistral.
- `/AdminPanel.js` — Main configuration UI to select letter type and manage settings.
- `/App.js` — Main app with React Router, routes to admin panel or letter styles.

---

## Installation and Setup

1. Clone the repo.
2. Install dependencies:
   ```bash
   npm install
   ```
   Sart the development server:
   ```bash
   npm start
   ```
3. Open your browser at http://localhost:3000/admin to open the Admin Panel.

Usage
Admin Panel
Visit /admin to open the main configuration panel.

Select which letter style you want to generate (claude or mistral).

You can configure recipient name and other settings here (future enhancements).

Viewing Letters
After selecting a letter type, navigate to /claude or /mistral to see the respective Hogwarts letter experience.

You can also customize recipient name via URL query parameters:
 /claude?firstName=Hermione&lastName=Granger

Clicking the envelope opens the letter with animations and the full letter content.