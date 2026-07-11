let store = null;

async function init() {
  const { default: Store } = await import('electron-store');
  store = new Store({
    name: 'pip-settings',
    defaults: {
      apiKey: process.env.ANTHROPIC_API_KEY || '',
      csvDropFolder: '',
      receiptsFolder: '',
      abn: '',
      businessName: '',
      personaName: 'Pip',
      proactiveTips: true,
      blobPosition: { x: 40, y: 40 },
    },
  });
  return store;
}

function get(key) {
  if (!store) throw new Error('Settings not initialised');
  return store.get(key);
}

function set(key, value) {
  if (!store) throw new Error('Settings not initialised');
  store.set(key, value);
}

function all() {
  if (!store) throw new Error('Settings not initialised');
  return store.store;
}

module.exports = { init, get, set, all };
