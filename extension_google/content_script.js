const assetElement = document.querySelector('[data-role="coin-name"]');
let assetName = assetElement ? assetElement.getAttribute('title') : null;

if (assetName) {
  // Remplace les espaces par des tirets
  assetName = assetName.replace(/\s+/g, '-');
  
  // Supprime "Token" si le nom de l'asset se termine par "Token"
  if (assetName.endsWith('-Token')) {
    assetName = assetName.substring(0, assetName.length - '-Token'.length);
  }

  chrome.runtime.sendMessage({ assetName: assetName });
}
