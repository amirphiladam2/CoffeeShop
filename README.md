# BrewHaven - AI Coffee Recommendations

An AI-powered coffee recommendation application built with React, TypeScript, Vite, and Supabase. Chat with Venessa at BrewHaven to discover your perfect coffee match based on your preferences and mood.

## Features

- 🤖 **AI-Powered Recommendations**: Chat with an AI barista to get personalized coffee suggestions
- 🔐 **Authentication**: Secure user authentication with Supabase
- 👤 **User Profiles**: View your profile and chat history
- 🛡️ **Admin Dashboard**: Manage coffee items and view statistics (admin only)
- 💬 **Chat History**: Save and view your conversation history
- 🎨 **Modern UI**: Beautiful, responsive interface built with shadcn/ui and Tailwind CSS

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Radix UI, Tailwind CSS
- **Backend**: Supabase (Authentication, Database, Edge Functions)
- **State Management**: React Context API, TanStack Query
- **Routing**: React Router v6

## How can I edit this code?

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Set up environment variables
# Create a .env file in the root directory with your Supabase credentials:
# VITE_SUPABASE_URL=your_supabase_project_url
# VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key


# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.


## What technologies are used for this project?

This project is built with:

- **Vite**: Fast build tool and dev server
- **TypeScript**: Type-safe JavaScript
- **React 18**: Modern React with hooks
- **shadcn-ui**: High-quality component library
- **Tailwind CSS**: Utility-first CSS framework
- **Supabase**: Backend as a service (Auth, Database, Edge Functions)
- **TanStack Query**: Powerful data synchronization for React
- **React Router**: Declarative routing for React

## How can I deploy this project?

You can deploy this project to any hosting platform that supports Node.js applications:

- **Vercel**: Connect your GitHub repo and deploy
- **Netlify**: Connect your GitHub repo and deploy
- **Railway**: Deploy from GitHub
- **Any Node.js hosting**: Build with `npm run build` and serve the `dist` folder
