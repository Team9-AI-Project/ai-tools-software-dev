import { useMemo, useState } from "react";

function buildTests(codeText, framework) {
  const t = codeText.toLowerCase();

  // very simple "detector" for demo
  const looksLikeReact =
    t.includes("export default") || t.includes("function") || t.includes("return (") || t.includes("jsx");
  const looksLikeLogin = t.includes("login") || t.includes("password") || t.includes("email");
  const looksLikeAddFn = t.includes("function add") || t.includes("const add") || t.includes("add(");

  // framework templates
  const isVitest = framework.startsWith("Vitest");
  const runnerImport = isVitest
    ? `import { describe, it, expect } from "vitest";`
    : `describe("unit tests", () => {\n  test("example", () => {\n    expect(true).toBe(true);\n  });\n});`;

  // If user pasted the small add(a,b) function
  if (looksLikeAddFn) {
    return isVitest
      ? `${runnerImport}

function add(a, b) {
  return a + b;
}

describe("add()", () => {
  it("adds two positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("handles negative numbers", () => {
    expect(add(-2, 3)).toBe(1);
  });

  it("handles zero", () => {
    expect(add(0, 10)).toBe(10);
  });
});
`
      : `// Jest example (demo)

function add(a, b) {
  return a + b;
}

describe("add()", () => {
  test("adds two positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("handles negative numbers", () => {
    expect(add(-2, 3)).toBe(1);
  });

  test("handles zero", () => {
    expect(add(0, 10)).toBe(10);
  });
});
`;
  }

  // React-ish component demo output
  if (looksLikeReact) {
    const componentName = looksLikeLogin ? "Login" : "Component";

    return isVitest
      ? `import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ${componentName} from "./${componentName}";

describe("${componentName}", () => {
  it("renders without crashing", () => {
    render(<${componentName} />);
    expect(screen.getByText(/${componentName}/i)).toBeTruthy();
  });

  it("shows key UI elements", () => {
    render(<${componentName} />);
    // Replace with real selectors/text in your component
    expect(true).toBe(true);
  });

  it("handles edge cases", () => {
    render(<${componentName} />);
    // Add a realistic edge case here
    expect(true).toBe(true);
  });
});
`
      : `import { render, screen } from "@testing-library/react";
import ${componentName} from "./${componentName}";

describe("${componentName}", () => {
  test("renders without crashing", () => {
    render(<${componentName} />);
    // Replace with real text from your UI
    expect(true).toBe(true);
  });

  test("shows key UI elements", () => {
    render(<${componentName} />);
    expect(true).toBe(true);
  });

  test("handles edge cases", () => {
    render(<${componentName} />);
    expect(true).toBe(true);
  });
});
`;
  }

  // fallback
  return isVitest
    ? `${runnerImport}

describe("Generated tests (demo)", () => {
  it("needs real component code to generate accurate tests", () => {
    expect(true).toBe(true);
  });
});
`
    : `// Generated tests (demo)
describe("Generated tests", () => {
  test("needs real component code to generate accurate tests", () => {
    expect(true).toBe(true);
  });
});
`;
}

export default function TestGenerator() {
  const [code, setCode] = useState("");
  const [framework, setFramework] = useState("Jest + React Testing Library");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const coverage = useMemo(() => {
    if (!output) return 0;
    // fake coverage calculation for demo
    if (output.includes("add()")) return 70;
    if (output.includes("render(")) return 75;
    return 60;
  }, [output]);

  const plan = useMemo(() => {
    if (!output) return ["✅ renders correctly", "✅ handles edge cases", "✅ validates inputs", "✅ tests error states"];
    if (output.includes("add()"))
      return ["✅ adds numbers", "✅ handles negatives", "✅ handles zero", "✅ basic unit coverage"];
    if (output.includes("render("))
      return ["✅ render test", "✅ UI elements", "✅ edge cases", "✅ interaction placeholder"];
    return ["✅ baseline tests", "✅ edge cases", "✅ placeholders to edit", "✅ demo-ready output"];
  }, [output]);

  function onGenerate() {
    const trimmed = code.trim();
    if (!trimmed) {
      setError("Please paste some code first (demo needs input).");
      setOutput("");
      return;
    }
    setError("");
    const generated = buildTests(trimmed, framework);
    setOutput(generated);
  }

  async function onCopy() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      // fallback: do nothing (demo)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Test Generator</h1>
        <p className="mt-1 text-sm text-slate-600">
          Paste component code and generate test cases (UI prototype with simulated AI output).
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Paste your component code</div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-3 h-48 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-slate-400"
            placeholder={`Example:
function add(a, b) {
  return a + b;
}`}
          />

          {error ? <div className="mt-2 text-sm font-semibold text-red-600">{error}</div> : null}

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <select
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
            >
              <option>Jest + React Testing Library</option>
              <option>Vitest + Testing Library</option>
            </select>

            <button
              onClick={onGenerate}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Generate Tests
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Coverage Goal</div>
          <div className="mt-3 text-3xl font-bold text-slate-900">{coverage}%</div>
          <div className="mt-3 h-3 w-full rounded-full bg-slate-100">
            <div className="h-3 rounded-full bg-slate-900" style={{ width: `${coverage}%` }} />
          </div>

          <div className="mt-5 text-sm font-semibold text-slate-900">Test Plan</div>
          <ul className="mt-2 space-y-2 text-sm text-slate-700">
            {plan.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-900">AI Generated Test File</div>
          <button
            onClick={onCopy}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Copy
          </button>
        </div>

        <pre className="mt-3 min-h-[120px] overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">
          {output || "// Click “Generate Tests” to produce a demo test file…"}
        </pre>
      </div>
    </div>
  );
}