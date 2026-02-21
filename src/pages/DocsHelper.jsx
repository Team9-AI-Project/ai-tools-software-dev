export default function DocsHelper() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Documentation Helper</h1>
        <p className="mt-1 text-sm text-slate-600">
          This module demonstrates AI-assisted documentation workflow
          using ChatGPT and structured review guidelines.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <h2 className="text-sm font-semibold text-slate-900">
    System Architecture Overview
  </h2>

  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
    <li>Frontend: React + Vite</li>
    <li>Styling: Tailwind CSS</li>
    <li>Navigation: Client-side state routing</li>
    <li>AI Simulation: Client-side logic (no backend API)</li>
    <li>Workflow: User Input → Task Detection → Tool-based Response</li>
  </ul>
</div>

    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <h2 className="text-sm font-semibold text-slate-900">
    AI-Assisted Documentation Workflow
  </h2>

  <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
    <li>Developer defines the documentation goal.</li>
    <li>AI generates structured draft content.</li>
    <li>Developer reviews and refines the output.</li>
    <li>Final documentation is validated before commit.</li>
  </ol>
</div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">
          AI Usage Guidelines (Dos & Don'ts)
        </h2>

        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Use AI to draft README sections and documentation outlines.</li>
          <li>Always review AI output for technical accuracy.</li>
          <li>Never copy AI-generated code blindly.</li>
          <li>Validate edge cases and assumptions manually.</li>
          <li>Keep documentation clear, concise, and structured.</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">
          Example README Structure
        </h2>

        <pre className="mt-3 overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">
{`## Overview
This project demonstrates AI-assisted software development workflow.

## Setup
npm install
npm run dev

## Modules
- Dashboard
- AI Assistant
- Test Generator
- Docs Helper

## Contribution
Each member is responsible for a specific module.`}
        </pre>
      </div>
    </div>
  );
}