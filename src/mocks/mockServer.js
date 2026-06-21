// Lightweight development mock server that intercepts fetch calls
// and responds to /api/* endpoints with fake exercise data and SVG images.

const PAGE_SIZE = 10;

const bodyParts = [
  "legs",
  "arms",
  "back",
  "chest",
  "shoulders",
  "cardio",
  "core",
];

const targets = ["quads", "hamstrings", "biceps", "triceps", "lats", "pectorals", "delts", "abs", "glutes"];

const equipments = ["body weight", "dumbbell", "barbell", "machine", "kettlebell", "band"];

// Generate a deterministic set of fake exercises
const exercises = Array.from({ length: 30 }).map((_, i) => {
  const idx = i + 1;
  return {
    id: `ex${idx}`,
    name: `Exercise ${idx}`,
    bodyPart: bodyParts[i % bodyParts.length],
    target: targets[i % targets.length],
    equipment: equipments[i % equipments.length],
    // some endpoints in the original API include additional fields; include a couple
    gifUrl: `https://example.com/gif/ex${idx}.gif`,
    duration: 30 + (i % 5) * 15,
  };
});

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function svgBlobForExercise(ex) {
  const color = ["#f97316", "#06b6d4", "#ef4444", "#a78bfa", "#34d399"][ex.id.charCodeAt(2) % 5];
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'>
    <rect width='100%' height='100%' fill='${color}' />
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='20' fill='#111' font-family='Arial'>${ex.name}</text>
  </svg>`;

  return new Blob([svg], { type: "image/svg+xml" });
}

// Intercept fetch calls in development. Keep a reference to the original fetch.
if (typeof window !== "undefined" && !window.__mockServerInstalled) {
  window.__mockServerInstalled = true;
  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input, init) => {
    try {
      const urlStr = typeof input === "string" ? input : input?.url || "";
      // Only handle our API prefix
      if (!urlStr.startsWith("/api/")) return originalFetch(input, init);

      const url = new URL(urlStr, location.origin);
      const pathname = url.pathname;
      const offset = parseInt(url.searchParams.get("offset") || "0", 10) || 0;

      // List exercises (paginated)
      if (pathname === "/api/exercises") {
        const page = exercises.slice(offset, offset + PAGE_SIZE);
        return jsonResponse(page);
      }

      // Body part list
      if (pathname === "/api/exercises/bodyPartList") {
        const uniq = Array.from(new Set(exercises.map((e) => e.bodyPart)));
        return jsonResponse(uniq);
      }

      // Exercises by bodyPart (paginated)
      if (pathname.startsWith("/api/exercises/bodyPart/")) {
        const parts = pathname.split("/");
        const bp = decodeURIComponent(parts[parts.length - 1]);
        const filtered = exercises.filter((e) => e.bodyPart === bp);
        return jsonResponse(filtered.slice(offset, offset + PAGE_SIZE));
      }

      // Image endpoint: /api/image?exerciseId=ex1&resolution=180
      if (pathname === "/api/image") {
        const exerciseId = url.searchParams.get("exerciseId");
        const found = exercises.find((e) => e.id === exerciseId) || { name: "Exercise" };
        const blob = svgBlobForExercise(found);
        return new Response(blob, { status: 200, headers: { "Content-Type": "image/svg+xml" } });
      }

      // Fallback: not handled -> 404
      return new Response("Not found", { status: 404 });
    } catch (err) {
      // If anything goes wrong, fallback to real fetch for safety
      return originalFetch(input, init);
    }
  };
}

export { exercises };
