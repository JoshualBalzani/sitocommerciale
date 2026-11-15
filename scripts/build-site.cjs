const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const directory = process.env.SITE_BUILD_DIRECTORY || "dist";
if (!/^dist(?:-[a-z0-9-]+)?$/.test(directory)) throw Error("Invalid build directory");
const output = path.join(root, directory);
const { routeMap } = require("./apply-seo.cjs").applySeo();
// Build only public assets: internal notes and tools are never published.
const files = JSON.parse(fs.readFileSync(path.join(__dirname, "public-files.json"), "utf8"));
if (process.env.HOSTING_TARGET !== "github-pages") files.push("_headers", "_redirects");
fs.mkdirSync(output, { recursive: true });
for (const name of files) {
  fs.mkdirSync(path.dirname(path.join(output, name)), { recursive: true });
  fs.copyFileSync(path.join(root, name), path.join(output, name));
}
for (const [file, route] of Object.entries(routeMap)) {
  if (
    file === "index.html" ||
    file === "termini-e-condizioni.html" ||
    file === "404.html"
  )
    continue;
  const directory = path.join(output, route.slice(1));
  fs.mkdirSync(directory, { recursive: true });
  fs.copyFileSync(path.join(root, file), path.join(directory, "index.html"));
}
for (const name of fs
  .readdirSync(root)
  .filter((name) => /^google[a-zA-Z0-9]+\.html$/.test(name))) {
  const text = fs.readFileSync(path.join(root, name), "utf8").trim();
  if (text !== "google-site-verification: " + name)
    throw Error("Invalid Google verification file: " + name);
  fs.copyFileSync(path.join(root, name), path.join(output, name));
}
console.log(`Static site ready: ${files.length} files in ${directory}/`);
