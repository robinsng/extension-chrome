const urlElement = document.querySelector('a.chain-name[href*="/token/"]');
if (urlElement && urlElement.href) {
  const adresseContrat = new URL(urlElement.href).pathname.split('/').pop();
  chrome.runtime.sendMessage({ adresseContrat: adresseContrat });
} else {
  const assetNameElement = document.querySelector('[data-role="coin-name"]');
  const assetName = assetNameElement ? assetNameElement.title : "Asset non trouvé";
  chrome.runtime.sendMessage({ assetName: assetName });
}
