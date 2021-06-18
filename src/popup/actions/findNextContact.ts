export default function findNextContact(): Promise<string> {
  return new Promise((resolve) => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tab) => {
      chrome.tabs.sendMessage(tab[0].id, "findNextContact", (response) => {
        console.log(response);
        resolve(response);
      });
    });
  });
}
