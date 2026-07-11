// Xero integration seam. Not yet implemented.
// The transactions table already carries xero_pushed / xero_id and categories
// carry xero_account_code, so wiring this in later is additive: implement these
// methods, add an OAuth flow in main.js, and expose a "Sync to Xero" action.

class NotImplemented extends Error {
  constructor(what) {
    super(`Xero: ${what} is not implemented yet.`);
    this.code = 'XERO_NOT_IMPLEMENTED';
  }
}

function isConnected() { return false; }
async function connect()   { throw new NotImplemented('OAuth connect'); }
async function pullChartOfAccounts() { throw new NotImplemented('pullChartOfAccounts'); }
async function pullContacts()        { throw new NotImplemented('pullContacts'); }
async function pushTransaction()     { throw new NotImplemented('pushTransaction'); }

module.exports = { isConnected, connect, pullChartOfAccounts, pullContacts, pushTransaction };
