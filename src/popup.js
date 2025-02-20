document.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("status");
  const fetchButton = document.getElementById("fetchID");
  const personalDataPage = "https://sheilta.apps.openu.ac.il/student360/Home/Details/";

  chrome.storage.sync.get("studentID", (data) => {
    status.innerText = data.studentID ? `Saved Student ID: ${data.studentID}` : "No Student ID saved.";
  });

  fetchButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "openPersonalDataPage", url: personalDataPage });
  });
});