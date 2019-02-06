export function replaceWithAccount(accounts, account) {
  accounts.splice(accounts.findIndex(user => user.id === account.id), 1, account);
  return accounts.slice();
}
