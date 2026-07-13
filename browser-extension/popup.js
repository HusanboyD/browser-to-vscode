const copyButton = document.getElementById("copy-selected-button");
const statusMessage = document.getElementById("status-message");

copyButton.addEventListener("click", async () => {
  statusMessage.textContent = "Reading selected text...";

  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!activeTab?.id) {
    statusMessage.textContent = "Active tab not found.";
    return;
  }

  const response = await chrome.tabs.sendMessage(activeTab.id, {
    type: "GET_SELECTED_TEXT",
  });

  if (!response?.text) {
    statusMessage.textContent = "Please select some text first.";
    return;
  }

  statusMessage.textContent = response.text;
});