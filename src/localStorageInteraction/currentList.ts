import { messageDataset } from "../popup/types";

const getCurrentList = (): Promise<messageDataset[]> => {
  return new Promise((resolve) =>
    // chrome.runtime.sendMessage("getCurrentList", (list) => resolve(list))
    chrome.storage.local.get("list", ({ list }: { list: messageDataset[] }) =>
      resolve(list)
    )
  );
};

const initCurrentList = (): Promise<""> => {
  return new Promise(async (resolve) => {
    chrome.storage.local.get("list", (list) => {
      if (!list.list) chrome.storage.local.set({ list: [] }, () => resolve(""));
      resolve("");
    });
  });
};

const addToCurrentList = (
  dataset: messageDataset
): Promise<messageDataset[]> => {
  return new Promise(async (resolve) => {
    const newList = [...(await getCurrentList()), dataset];
    chrome.storage.local.set({ list: newList }, () => resolve(newList));
  });
};

const resetCurrentList = (): Promise<messageDataset[]> => {
  return new Promise(async (resolve) => {
    chrome.storage.local.set({ list: [] }, () => resolve([]));
  });
};

export { addToCurrentList, getCurrentList, initCurrentList, resetCurrentList };
