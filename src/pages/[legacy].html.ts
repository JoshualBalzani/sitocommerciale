import type { APIRoute, GetStaticPaths } from 'astro';
import { policy, siteUrl } from '../data/site';
const routes: Record<string,string> = { riscaldamento:'/riscaldamento/', climatizzazione:'/climatizzazione/', ventilazione:'/ventilazione/', termoidraulica:'/termoidraulica/', privacy:'/privacy/', 'note-legali':'/note-legali/', grazie:'/grazie/', 'termini-e-condizioni':'/note-legali/' };
export const getStaticPaths: GetStaticPaths = () => Object.entries(routes).map(([legacy,route])=>({params:{legacy},props:{route}}));
export const GET: APIRoute = ({ props }) => {
  const route: unknown = props['route']; if (typeof route !== 'string') throw new Error('Missing legacy route');
  const target = `${siteUrl}${route}`;
  return new Response(`<!doctype html><html lang="it"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="${policy}"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Pagina trasferita | Commerciale Clima Plus</title><meta name="robots" content="noindex, follow"><link rel="canonical" href="${target}"><meta http-equiv="refresh" content="1;url=${target}"><script src="/legacy-route.js" defer></script></head><body><main><h1>Pagina trasferita</h1><p><a href="${route}">Apri la pagina aggiornata</a>.</p></main></body></html>`, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
};
