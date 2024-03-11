chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url && changeInfo.url.includes('/currencies/')) {
    const index = changeInfo.url.indexOf('/currencies/');
    if (index !== -1) {
      const extractedStr = changeInfo.url.substring(index + '/currencies/'.length);
      const newUrl = `https://mobula.io/asset/${extractedStr}`;
      chrome.tabs.update(tabId, {url: newUrl});
    }
  }
});