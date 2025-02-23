chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openPersonalDataPage") {
    chrome.tabs.create({ url: request.url, active: false }, function (tab) {
      if (chrome.runtime.lastError) {
        console.error("Error opening tab:", chrome.runtime.lastError);
        return;
      }

      // Close the tab after extracting ID
      setTimeout(() => {
        chrome.tabs.get(tab.id, function (tabInfo) {
          if (chrome.runtime.lastError) {
            console.warn("Tab already closed or doesn't exist:", chrome.runtime.lastError);
            return;
          }
          if (tabInfo) {
            chrome.tabs.remove(tab.id, function () {
              if (chrome.runtime.lastError) {
                console.warn("Error closing tab:", chrome.runtime.lastError);
              }
            });
          }
        });
      }, 1000);
    });
  }
});
