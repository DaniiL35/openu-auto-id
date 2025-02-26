chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openPersonalDataPage") {
    chrome.tabs.create({ url: request.url, active: true }, function (tab) {
      if (chrome.runtime.lastError) {
        console.error("Error opening tab:", chrome.runtime.lastError);
        return;
      }

      // Store the tab ID to reference it later
      let personalPageTabId = tab.id;

      // Listen for a message from content.js confirming successful ID extraction
      function messageListener(response) {
        if (response.action === "idSaved" && response.status === "success") {
          console.log("Student ID saved successfully. Closing tab...");

          chrome.tabs.remove(personalPageTabId, function () {
            if (chrome.runtime.lastError) {
              console.warn("Error closing tab:", chrome.runtime.lastError);
            }
          });

          // Remove the listener once ID is saved and tab is closed
          chrome.runtime.onMessage.removeListener(messageListener);
        }
      }

      chrome.runtime.onMessage.addListener(messageListener);
    });
  }
});
