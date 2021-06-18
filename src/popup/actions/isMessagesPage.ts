export default function isMessagesPage(): Promise<boolean> {
  return new Promise((resolve) => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tab) => {
      resolve(tab[0].url.includes("https://www.linkedin.com/messaging"));
    });
  });
}
