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

          // Notify the popup to update immediately
          chrome.runtime.sendMessage({ action: "updatePopup" });

          setTimeout(() => window.close(), 500); // Close the tab after extracting the ID
        });
      }
    }
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
