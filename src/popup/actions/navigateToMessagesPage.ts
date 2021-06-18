export default function navigateToMessagesPage() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tab) => {
    chrome.tabs.update(tab[0].id, {
      url: "https://www.linkedin.com/messaging",
    });
  });
}
