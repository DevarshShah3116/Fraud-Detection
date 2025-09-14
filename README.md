# Sentinel Guard - Real-Time Fraud Detection

Sentinel Guard is a full-stack application designed to detect and prevent digital fraud in real-time across multiple channels, including SMS, email, voice, and video calls. It analyzes content for scam patterns, deepfake indicators, and coercive language to provide instant alerts and guidance to users.

## Tech Stack

  - **Frontend:** React 18, React Router 6, TypeScript, Vite, TailwindCSS 3
  - **Backend:** Express.js, TypeScript
  - **UI Components:** Radix UI, Lucide React icons
  - **Testing:** Vitest

## Key Features

  - **Multi-Channel Analysis:** Scans SMS, email, voice transcripts, and video calls for fraudulent indicators.
  - **Real-Time Alerts:** Provides immediate notifications with clear, actionable advice to help users avoid scams.
  - **NLP-Powered Text Analysis:** Detects coercion, urgency, and known scam phrases in text-based communications.
  - **Voice Spoofing Detection:** Flags suspicious caller IDs and analyzes call transcripts for threatening language.
  - **Deepfake Detection:** Identifies potential video manipulation by analyzing blink rates and lip-sync cues.
  - **Live Monitoring Dashboard:** A live feed that displays and categorizes potential fraud events as they are detected.
  - **Incident Reporting:** Allows users to review past incidents with detailed analysis and severity categorization.
  - **Educational Resources:** Provides information to help users learn about common scam tactics and how to protect themselves.

## Project Structure

```
client/                   # React SPA frontend
├── pages/                # Route components (Index.tsx = home)
├── components/ui/        # Pre-built UI component library
├── App.tsx               # App entry point and with SPA routing setup
└── global.css            # TailwindCSS 3 theming and global styles

server/                   # Express API backend
├── index.ts              # Main server setup (express config + routes)
└── routes/               # API handlers

shared/                   # Types used by both client & server
└── api.ts                # Example of how to share api interfaces
```

## Development Commands

| Command        | Description                                  |
| -------------- | -------------------------------------------- |
| `pnpm dev`     | Start the development server (client + server) |
| `pnpm build`   | Create a production build                      |
| `pnpm start`   | Start the production server                  |
| `pnpm typecheck` | Run TypeScript validation                    |
| `pnpm test`    | Run Vitest tests                             |

## API Endpoints

  - `GET /api/ping`: A simple endpoint to check if the server is running.
  - `GET /api/demo`: A demonstration endpoint.
  - `GET /api/fraud/samples`: Retrieves sample data for fraud analysis.
  - `POST /api/fraud/analyze`: Analyzes a single piece of content for fraud.
  - `POST /api/fraud/analyze-batch`: Analyzes a batch of content for fraud.
  - `GET /api/fraud/incidents`: Retrieves a list of all detected incidents.
  - `POST /api/fraud/report-scam`: Allows users to report a scam.

## Deployment

The application can be deployed to the cloud using either Netlify or Vercel through their respective MCP integrations.

## License

This project is licensed under the MIT License.

