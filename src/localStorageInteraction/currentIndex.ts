const getCurrentIndex = (): Promise<number> => {
  return new Promise((resolve) => {
    chrome.storage.local.get("index", ({ index }) => resolve(index));
  });
};

const initCurrentIndex = (): Promise<number> => {
  return new Promise(async (resolve) => {
    chrome.storage.local.get("index", ({ index }) => {
      if (!index) chrome.storage.local.set({ index: 0 }, () => resolve(0));
      resolve(index);
    });
  });
};

const incrementCurrentIndex = (): Promise<number> => {
  return new Promise(async (resolve) => {
    const newIndex = (await getCurrentIndex()) + 1;
    chrome.storage.local.set({ index: newIndex }, () => resolve(newIndex));
  });
};

const resetCurrentIndex = (): Promise<number> => {
  return new Promise(async (resolve) => {
    chrome.storage.local.set({ index: 0 }, () => resolve(0));
  });
};

export {
  getCurrentIndex,
  initCurrentIndex,
  incrementCurrentIndex,
  resetCurrentIndex,
};
