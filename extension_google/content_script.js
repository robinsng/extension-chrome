const urlActuelle = window.location.href;

if (urlActuelle.includes("coinmarketcap.com")) {
  const urlElement = document.querySelector('a.chain-name[href*="/token/"]');
  if (urlElement && urlElement.href) {
    const adresseContrat = new URL(urlElement.href).pathname.split('/').pop();
    chrome.runtime.sendMessage({ adresseContrat: adresseContrat });
  } else {
    const assetNameElement = document.querySelector('[data-role="coin-name"]');
    const assetName = assetNameElement ? assetNameElement.title : "Asset non trouvé";
    chrome.runtime.sendMessage({ assetName: assetName });
  }
}
else if (/^https?:\/\/www\.coingecko\.com\/(?!(?:[a-z]{2,3}\/?)?$)/i.test(urlActuelle)) {
  const element = document.querySelector('span[data-content][data-action="click->application#copyToClipboard"]');
  if (element !== null && element!=='') {
    const adresseContrat = element.dataset.content
    if (!/0x1::[a-zA-Z_]+::[a-zA-Z_]+/.test(adresseContrat)) {
      chrome.runtime.sendMessage({ adresseContrat: adresseContrat });
    }
    else {
    const element = document.querySelector('div[data-view-component="true"].tw-font-bold.tw-text-gray-900');
    const assetName = element ? element.textContent.trim() : "Asset non trouvé";
    chrome.runtime.sendMessage({assetName: assetName})
    }
  } else {
    const element = document.querySelector('div[data-view-component="true"].tw-font-bold.tw-text-gray-900');
    const assetName = element ? element.textContent.trim() : "Asset non trouvé";
    chrome.runtime.sendMessage({assetName: assetName})
  } 
}
