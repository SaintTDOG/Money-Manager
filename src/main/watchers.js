const chokidar = require('chokidar');
const path = require('node:path');

const watchers = new Map();

function watch({ id, folder, patterns, onFile }) {
  if (watchers.has(id)) {
    watchers.get(id).close();
    watchers.delete(id);
  }
  if (!folder) return;
  const w = chokidar.watch(folder, {
    persistent: true,
    ignoreInitial: false,
    awaitWriteFinish: { stabilityThreshold: 800, pollInterval: 200 },
    depth: 2,
  });
  const matches = (p) => patterns.some((ext) => p.toLowerCase().endsWith(ext));
  w.on('add', (p) => { if (matches(p)) onFile(p).catch((e) => console.error(`[watch:${id}]`, e)); });
  w.on('change', (p) => { if (matches(p)) onFile(p).catch((e) => console.error(`[watch:${id}]`, e)); });
  w.on('error', (err) => console.error(`[watch:${id}] error`, err));
  watchers.set(id, w);
}

function stopAll() {
  for (const w of watchers.values()) w.close();
  watchers.clear();
}

module.exports = { watch, stopAll };
