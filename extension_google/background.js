chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.adresseContrat) {
    const apiUrl = `https://api.mobula.io/api/1/search?input=${message.adresseContrat}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data && data.data && data.data.length > 0 && data.data[0].name) {
          const assetName = data.data[0].name.replace(/\s+/g, '-');
          const mobulaUrl = `https://mobula.io/asset/${assetName}`;
          chrome.tabs.update(sender.tab.id, { url: mobulaUrl });
        } else {
          throw new Error("Nom de l'asset non trouvé dans la réponse de l'API.");
        }
      })
      .catch(error => {
        console.error("Erreur lors de la requête à l'API Mobula:", error);
        // Gestion des erreurs ou exécution du plan B si nécessaire
      });
  } else if (message.assetName) {
    const assetNameFormatted = message.assetName.replace(/\s+/g, '-');
    const mobulaUrl = `https://mobula.io/asset/${assetNameFormatted}`;
    chrome.tabs.update(sender.tab.id, { url: mobulaUrl });
  }
});
