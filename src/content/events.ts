import findNextContact from "./findNextContact";

const onMessage = (message, sender, sendResponse) => {
  if (message === "findNextContact") findNextContact().then(sendResponse);
  return true;
};

export { onMessage };
