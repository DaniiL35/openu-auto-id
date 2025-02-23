/**
 * Manages the popup UI for the OpenU Auto Login Chrome extension.
 * Displays the current status of the stored Student ID.
 * Provides options to fetch, update, or reset the ID.
 */

document.addEventListener("DOMContentLoaded", function () {
  let status = document.getElementById("status");
  let fetchButton = document.getElementById("fetchID");
  let resetButton = document.getElementById("resetID");
  const personalDataPage = "https://sheilta.apps.openu.ac.il/student360/Home/Details/";

  /**
   * Updates the popup UI to reflect the current Student ID status.
   */
  function updateStatus() {
    chrome.storage.sync.get("studentID", function (data) {
      status.innerText = data.studentID ? "ID saved ✅" : "No ID saved ❌";
    });
  }

  updateStatus();

  // Opens the personal data page in a hidden tab to fetch the Student ID
  fetchButton.addEventListener("click", function () {
    chrome.runtime.sendMessage({ action: "openPersonalDataPage", url: personalDataPage, useLeftmost: true });
  });

  // Resets the stored Student ID
  resetButton.addEventListener("click", function () {
    chrome.storage.sync.remove("studentID", function () {
      updateStatus();
    });
  });

  // Listens for a message from content.js to update the popup UI in real time
  chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "updatePopup") {
      updateStatus();
    }
  });
});
