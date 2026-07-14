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

try {
  const serverResponse = await fetch("http://localhost:3000/save-text", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: response.text,
    }),
  });

  const result = await serverResponse.json();

  if (!serverResponse.ok) {
    console.error(result.message);
  }
} catch (error) {
  console.error("Serverga yuborishda xatolik:", error);
}
});