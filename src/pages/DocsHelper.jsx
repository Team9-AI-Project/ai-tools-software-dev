import { useState } from "react";

export default function DocsHelper() {
  const [docType, setDocType] = useState("README Section");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function generateMarkdown() {
    if (!input.trim()) {
      setError("Please enter some description first.");
      setOutput("");
      return;
    }

    setError("");

    if (docType === "README Section") {
      setOutput(`# ${input}

## Overview
This project demonstrates an AI-assisted software development workflow.

## Key Features
- AI Chat for assistance
- Test Generator module
- Docs Helper module
- Role-based access control

## Usage
Run the application using:
\`\`\`
npm install
npm run dev
\`\`\`
`);
    }

    if (docType === "Installation Steps") {
      setOutput(`# Installation Guide

## Requirements
- Node.js
- npm

## Setup Steps
1. Clone the repository
2. Run \`npm install\`
3. Start development server using \`npm run dev\`

## Notes
Ensure dependencies are properly installed before running.
`);
    }

    if (docType === "Architecture Overview") {
      setOutput(`# System Architecture

## Frontend
- React + Vite
- Tailwind CSS

## Navigation
- Shared AppLayout
- Role-based routing

## AI Simulation
- No backend API
- Rule-based output generation
`);
    }

    if (docType === "Component Documentation") {
      setOutput(`# Component: ${input}

## Purpose
This component is responsible for handling UI rendering and user interaction.

## Props
- title (string)
- onSubmit (function)

## Behavior
- Handles user input
- Updates state dynamically
- Triggers events on interaction
`);
    }
  }

  async function copyMarkdown() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Docs Helper</h1>
        <p className="text-sm text-slate-600">
          Generate README / architecture documentation text (UI prototype).
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <label className="text-sm font-semibold text-slate-900">
            Select document type
          </label>

          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 p-2"
          >
            <option>README Section</option>
            <option>Installation Steps</option>
            <option>Architecture Overview</option>
            <option>Component Documentation</option>
          </select>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to document..."
            className="mt-4 h-32 w-full rounded-xl border border-slate-200 bg-slate-50 p-3"
          />

          {error && (
            <div className="mt-2 text-sm text-red-600 font-semibold">
              {error}
            </div>
          )}

          <button
            onClick={generateMarkdown}
            className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-white"
          >
            Generate Markdown
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm relative">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold text-slate-900">
              Markdown Preview
            </h2>
            <button
              onClick={copyMarkdown}
              className="text-xs bg-slate-200 px-2 py-1 rounded"
            >
              Copy
            </button>
          </div>

          <pre className="mt-3 max-h-[300px] overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">
            {output || "// Generated markdown will appear here..."}
          </pre>
        </div>
      </div>
    </div>
  );
}