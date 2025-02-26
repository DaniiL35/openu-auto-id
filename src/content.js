/**
 * Automatically fills the Student ID field in the Open University login form.
 * Extracts the Student ID from the personal data page and stores it securely.
 */
(async function () {
  const idSelector = "#p_mis_student";
  const personalDataPage = "https://sheilta.apps.openu.ac.il/student360/Home/Details/";

  /**
   * Fills the Student ID field in the login form.
   * @param {string} studentID - The extracted Student ID.
   */
  function fillID(studentID) {
    let idField = document.querySelector(idSelector);
    if (idField) idField.value = studentID;
  }

  /**
   * Extracts the Student ID from the personal data page.
   * Saves it to Chrome storage and notifies the popup to update.
   */
  function extractIDFromPersonalPage() {
    let idLabel = [...document.querySelectorAll("dt")].find(el => el.innerText.includes("מספר זהות"));
    if (idLabel) {
      let studentID = idLabel.nextElementSibling?.innerText.trim();
      if (studentID) {
        chrome.storage.sync.set({ "studentID": studentID }, function () {
          console.log("Extracted & Saved Student ID:", studentID);

          // Notify the popup to update
          chrome.runtime.sendMessage({ action: "updatePopup" });

          // Verify if the ID was saved before closing the tab
          chrome.storage.sync.get("studentID", function (data) {
            if (data.studentID === studentID) {
              // Send success message to background.js
              chrome.runtime.sendMessage({ action: "idSaved", status: "success" });
            } else {
              console.error("Failed to save ID. Keeping tab open for manual check.");
            }
          });
        });
      } else {
        console.warn("No student ID found on the page.");
      }
    }
  }

// Run extraction only on the personal data page
  if (window.location.href.includes("https://sheilta.apps.openu.ac.il/student360/Home/Details/")) {
    setTimeout(extractIDFromPersonalPage, 1500); // Delayed extraction to ensure page loads completely
  }


  // If on the personal data page, extract and store the Student ID
  if (window.location.href.includes(personalDataPage)) {
    extractIDFromPersonalPage();
  }

  // If on the login page, retrieve the stored Student ID and auto-fill the form
  chrome.storage.sync.get("studentID", function (data) {
    if (data.studentID) {
      fillID(data.studentID);
    }
  });
})();
