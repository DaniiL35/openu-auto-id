(async function () {
  const idSelector = "#p_mis_student";
  const personalDataPage = "https://sheilta.apps.openu.ac.il/student360/Home/Details/";

  function fillID(studentID) {
    const idField = document.querySelector(idSelector);
    if (idField) idField.value = studentID;
  }

  function extractIDFromPersonalPage() {
    const idLabel = [...document.querySelectorAll("dt")].find(el => el.innerText.includes("מספר זהות"));
    if (idLabel) {
      const studentID = idLabel.nextElementSibling?.innerText.trim();
      if (studentID) {
        chrome.storage.sync.set({ studentID }, () => {
          console.log("Extracted & Saved Student ID:", studentID);
          chrome.runtime.sendMessage({ action: "closeTab" });
        });
      }
    }
  }

  if (window.location.href.includes(personalDataPage)) {
    extractIDFromPersonalPage();
  }

  chrome.storage.sync.get("studentID", (data) => {
    if (data.studentID) {
      fillID(data.studentID);
    }
  });
})();
