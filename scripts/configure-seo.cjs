const fs = require("node:fs");
const path = require("node:path");
const { applySeo, getConfig } = require("./apply-seo.cjs");
const root = path.resolve(__dirname, "..");
const args = process.argv.slice(2);
const config = getConfig();
for (let i = 0; i < args.length; i++) {
  const flag = args[i];
  const value = args[++i];
  if (!value) throw Error("Missing value for " + flag);
  if (flag === "--site-url") {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.search ||
      url.hash
    )
      throw Error("Use the final HTTPS URL, with any repository path and without parameters.");
    config.siteUrl = url.origin + url.pathname.replace(/\/+$/, "");
  } else if (flag === "--google-verification") {
    const token = value.match(/content=["']([^"']+)["']/)?.[1] || value;
    if (!/^[A-Za-z0-9_-]+$/.test(token))
      throw Error("Invalid verification token");
    config.googleSiteVerification = token;
  } else if (flag === "--verification-file") {
    const absolute = path.resolve(value);
    const name = path.basename(absolute);
    const text = fs.readFileSync(absolute, "utf8").trim();
    if (
      !/^google[a-zA-Z0-9]+\.html$/.test(name) ||
      text !== "google-site-verification: " + name
    )
      throw Error("Expected the unmodified Google verification HTML file.");
    fs.copyFileSync(absolute, path.join(root, name));
  } else throw Error("Unknown option " + flag);
}
fs.writeFileSync(
  path.join(root, ".seo/site-config.json"),
  JSON.stringify(config, null, 2) + "\n",
);
applySeo();
console.log(
  "Run node scripts/build-site.cjs and create a new publication ZIP.",
);
