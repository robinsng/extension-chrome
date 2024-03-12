chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.assetName) {
    const newUrl = `https://mobula.io/asset/${message.assetName}`;
    chrome.tabs.update(sender.tab.id, {url: newUrl});
  }
});
