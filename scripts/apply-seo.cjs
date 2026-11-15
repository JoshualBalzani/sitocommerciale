const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const routeMap = {
  "index.html": "/",
  "riscaldamento.html": "/riscaldamento/",
  "climatizzazione.html": "/climatizzazione/",
  "ventilazione.html": "/ventilazione/",
  "termoidraulica.html": "/termoidraulica/",
  "privacy.html": "/privacy/",
  "note-legali.html": "/note-legali/",
  "grazie.html": "/grazie/",
  "termini-e-condizioni.html": "/note-legali/",
  "404.html": "/404.html",
};
function getConfig() {
  const config = JSON.parse(
    fs.readFileSync(path.join(root, ".seo/site-config.json"), "utf8"),
  );
  if (process.env.PAGES_SITE_URL) config.siteUrl = process.env.PAGES_SITE_URL;
  if (process.env.PAGES_GOOGLE_VERIFICATION !== undefined) config.googleSiteVerification = process.env.PAGES_GOOGLE_VERIFICATION;
  const site = new URL(config.siteUrl);
  if (
    site.protocol !== "https:" ||
    site.search ||
    site.hash || site.username || site.password
  )
    throw Error(
      "SEO siteUrl must be an HTTPS URL without query, fragment or credentials.",
    );
  config.siteUrl = site.origin + site.pathname.replace(/\/+$/, "");
  if (
    config.googleSiteVerification &&
    !/^[A-Za-z0-9_-]+$/.test(config.googleSiteVerification)
  )
    throw Error("Invalid Google verification token.");
  return config;
}
function applySeo() {
  const config = getConfig();
  const origin = config.siteUrl;
  const areas = JSON.parse(
    fs.readFileSync(path.join(root, ".seo/areas.json"), "utf8"),
  );
  const metadata = {
    "index.html": {
      title: "Rappresentanze termoidrauliche a Forlì | Clima Plus",
      description:
        "Commerciale Clima Plus: rappresentanze e forniture termoidrauliche a Forlì. Riscaldamento, climatizzazione, ventilazione e rubinetteria.",
    },
    "privacy.html": {
      title: "Privacy e cookie | Commerciale Clima Plus",
      description:
        "Informativa privacy e cookie di Commerciale Clima Plus: dati personali, modulo Web3Forms, hosting GitHub Pages, conservazione e diritti.",
    },
    "note-legali.html": {
      title: "Dati societari e note legali | Commerciale Clima Plus",
      description:
        "Sede legale a Forlì, codice fiscale, partita IVA, REA, capitale sociale e contatti ufficiali di Commerciale Clima Plus.",
    },
    "grazie.html": {
      title: "Conferma richiesta | Commerciale Clima Plus",
      description:
        "Informazioni sulla richiesta commerciale e contatti di Commerciale Clima Plus.",
    },
    "termini-e-condizioni.html": {
      title: "Informazioni sulle forniture | Commerciale Clima Plus",
      description:
        "Informazioni sulle richieste commerciali e sulle forniture di Commerciale Clima Plus.",
    },
    "404.html": {
      title: "Pagina non trovata | Commerciale Clima Plus",
      description:
        "La pagina richiesta non è disponibile. Consulta prodotti e contatti di Commerciale Clima Plus.",
    },
  };
  areas.forEach((area) => (metadata[area.file] = area));
  const business = {
    "@type": "LocalBusiness",
    "@id": origin + "/#azienda",
    name: "Commerciale Clima Plus",
    legalName: "COMMERCIALE CLIMA PLUS SRL",
    url: origin + "/",
    taxID: "04789550409",
    vatID: "IT04789550409",
    telephone: "+393496808840",
    email: "info@commercialeclimaplus.it",
    image: origin + "/logo-large.png",
    logo: {
      "@type": "ImageObject",
      url: origin + "/logo.png",
      width: 512,
      height: 512,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Viale Bologna 24",
      addressLocality: "Forlì",
      addressRegion: "FC",
      postalCode: "47121",
      addressCountry: "IT",
    },
    openingHoursSpecification: [
      ["08:30", "12:30"],
      ["14:00", "17:00"],
    ].map(([opens, closes]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens,
      closes,
    })),
  };
  const escape = (s) =>
    s
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;");
  for (const [file, meta] of Object.entries(metadata)) {
    let html = fs.readFileSync(path.join(root, file), "utf8");
    html = html
      .replace(
        /<meta\b(?=[^>]*(?:name="(?:description|robots|googlebot|google-site-verification|twitter:[^"]+)"|property="og:[^"]+"))[^>]*>\s*/g,
        "",
      )
      .replace(/<link\b(?=[^>]*rel="canonical")[^>]*>\s*/g, "")
      .replace(
        /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/g,
        "",
      );
    html = html.replace(
      /<title>[\s\S]*?<\/title>/,
      "<title>" + escape(meta.title) + "</title>",
    );
    const url = origin + routeMap[file];
    const noindex = [
      "grazie.html",
      "termini-e-condizioni.html",
      "404.html",
    ].includes(file);
    const webpage = {
      "@type": areas.some((a) => a.file === file)
        ? "CollectionPage"
        : "WebPage",
      "@id": url + "#pagina",
      url,
      name: meta.title,
      description: meta.description,
      inLanguage: "it-IT",
      isPartOf: { "@id": origin + "/#sito" },
      about: { "@id": origin + "/#azienda" },
    };
    const graph = [
      business,
      {
        "@type": "WebSite",
        "@id": origin + "/#sito",
        url: origin + "/",
        name: "Commerciale Clima Plus",
        inLanguage: "it-IT",
        publisher: { "@id": origin + "/#azienda" },
      },
      webpage,
    ];
    if (file !== "index.html" && !noindex) {
      graph.push({
        "@type": "BreadcrumbList",
        "@id": url + "#percorso",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: origin + "/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name:
              meta.name ||
              (/privacy/.test(file) ? "Privacy e cookie" : "Note legali"),
            item: url,
          },
        ],
      });
      webpage.breadcrumb = { "@id": url + "#percorso" };
    }
    const tags = `<meta name="description" content="${escape(meta.description)}"><meta name="robots" content="${noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}"><link rel="canonical" href="${url}"><meta property="og:site_name" content="Commerciale Clima Plus"><meta property="og:type" content="website"><meta property="og:locale" content="it_IT"><meta property="og:title" content="${escape(meta.title)}"><meta property="og:description" content="${escape(meta.description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${origin}/logo-large.png"><meta property="og:image:width" content="512"><meta property="og:image:height" content="512"><meta property="og:image:alt" content="Commerciale Clima Plus, rappresentanze e forniture termoidrauliche"><meta name="twitter:card" content="summary"><meta name="twitter:title" content="${escape(meta.title)}"><meta name="twitter:description" content="${escape(meta.description)}"><meta name="twitter:image" content="${origin}/logo-large.png">${file === "index.html" && config.googleSiteVerification ? '<meta name="google-site-verification" content="' + config.googleSiteVerification + '">' : ""}<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>`;
    html = html.replace("</head>", tags + "</head>");
    // Root-relative links remain correct inside directory URLs.
    html = html.replace(
      /\b(href|src)="(?!https?:|mailto:|tel:|#|\/|data:)([^"\s]+)"/g,
      (whole, attr, value) => {
        const match = value.match(/^([^?#]+)([?#].*)?$/);
        if (!match) return whole;
        const target = routeMap[match[1]];
        return (
          attr + '="' + (target || "/" + match[1]) + (match[2] || "") + '"'
        );
      },
    );
    fs.writeFileSync(path.join(root, file), html);
  }
  const urls = [
    "index.html",
    ...areas.map((a) => a.file),
    "privacy.html",
    "note-legali.html",
  ];
  fs.writeFileSync(
    path.join(root, "sitemap.xml"),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      urls
        .map(
          (file) => "  <url><loc>" + origin + routeMap[file] + "</loc></url>",
        )
        .join("\n") +
      "\n</urlset>\n",
  );
  fs.writeFileSync(
    path.join(root, "robots.txt"),
    "User-agent: *\nAllow: /\n\nSitemap: " + origin + "/sitemap.xml\n",
  );
  fs.writeFileSync(
    path.join(root, "_redirects"),
    Object.entries(routeMap)
      .filter(([file]) => file !== "404.html")
      .map(([file, route]) => "/" + file + " " + route + " 301!")
      .join("\n") + "\n",
  );
  console.log(
    "SEO prepared: 7 indexable pages, canonical URLs, structured data and sitemap. Search Console verification " +
      (config.googleSiteVerification ? "configured." : "not yet provided."),
  );
  return { routeMap, config };
}
module.exports = { applySeo, getConfig, routeMap };
if (require.main === module) applySeo();
