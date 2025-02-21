document.addEventListener("DOMContentLoaded", function () {
  let status = document.getElementById("status");
  let fetchButton = document.getElementById("fetchID");
  let resetButton = document.getElementById("resetID");
  const personalDataPage = "https://sheilta.apps.openu.ac.il/student360/Home/Details/";

  // Check if ID is saved
  function updateStatus() {
    chrome.storage.sync.get("studentID", function (data) {
      if (data.studentID) {
        status.innerText = "Student ID is saved";
      } else {
        status.innerText = "No Student ID saved.";
      }
    });
  }

  updateStatus();

  // When the user clicks "Fetch/Update ID"
  fetchButton.addEventListener("click", function () {
    chrome.runtime.sendMessage({ action: "openPersonalDataPage", url: personalDataPage });
  });

  // When the user clicks "Reset ID"
  resetButton.addEventListener("click", function () {
    chrome.storage.sync.remove("studentID", function () {
      updateStatus(); // Refresh the UI
    });
  });
});
