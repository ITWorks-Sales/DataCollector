import { onMessage } from "./events";

chrome.runtime.onMessage.addListener(onMessage);
