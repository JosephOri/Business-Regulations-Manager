# מערכת הערכת רישוי עסקים מבוססת AI
מערכת זו נועדה לסייע לבעלי עסקים, בדגש על מסעדות, להבין את דרישות הרישוי הרלוונטיות לעסק שלהם. המשתמש מזין פרטים בסיסיים על העסק בשאלון דיגיטלי, והמערכת, באמצעות מודל שפה (LLM), מפיקה דוח מותאם אישית המסכם את הרגולציות החלות עליו בשפה פשוטה וברורה.

הפרויקט מבוסס על ארכיטקטורת monorepo המנוהלת על ידי pnpm workspace, ומדגים שילוב של פיתוח Web קלאסי עם טכנולוגיית Retrieval-Augmented Generation (RAG) כדי לספק תשובות מדויקות המבוססות על מסמך חוקים ספציפי.

# PNPM Workspace with React + Express (TypeScript)

A full-stack TypeScript application using pnpm workspaces with React frontend and Express backend.

## Project Structure

```
├── packages/
│   ├── frontend/          # React + Vite + TypeScript
│   └── backend/           # Express + TypeScript
├── package.json           # Root package.json with workspace config
├── pnpm-workspace.yaml    # PNPM workspace configuration
└── README.md
```

## Technologies Used

- **Frontend**: React + Vite + TypeScript
- **Backend**: Express + TypeScript
- **Package Manager**: PNPM with workspaces
- **Development**: Concurrently for running both servers

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PNPM (v8 or higher)

### Installation

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Install workspace dependencies:
   ```bash
   pnpm install -r
   ```

### Development

Start both frontend and backend in development mode:

```bash
pnpm dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

### Build

Build both frontend and backend:

```bash
pnpm build
```

### Production

Start both applications in production mode:

```bash
pnpm start
```

## env variables

create .env file in the root directory with the following variables:

DEEPSEEK_API_KEY=your_deepseek_api_key

## API Endpoints

POST /api/compliance/check

## TypeScript Configuration

Both frontend and backend are configured with strict TypeScript settings:

- **Frontend**: Uses Vite's TypeScript plugin with React JSX
- **Backend**: Uses ts-node for development and tsc for production builds

## Development Features

- Hot reload for both frontend and backend
- Type checking during development
- Source maps for debugging
- CORS enabled for frontend-backend communication
