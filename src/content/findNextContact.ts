import {
  getCurrentIndex,
  incrementCurrentIndex,
} from "../localStorageInteraction/currentIndex";
import { getCurrentList } from "../localStorageInteraction/currentList";

const findNextMessage = async () => {
  let message = "";
  const currentList = await getCurrentList();

  while (!message || currentList.find((item) => item.message == message)) {
    const usersList = getUsersList();
    const currentIndex = await getCurrentIndex();

    const currentUser = usersList.children[currentIndex];
    const scrollBy = currentUser.scrollHeight;

    if (currentIndex) usersList.scrollBy({ top: scrollBy });

    //Inmail or Sponsored
    if (getElementByClassName(currentUser, "msg-conversation-card__pill")) {
      await incrementCurrentIndex();
      continue;
    }

    const clickableUserRegion = getElementByTagName(
      currentUser,
      "a"
    ) as HTMLElement;

    await sleep(500);
    if (clickableUserRegion) {
      clickableUserRegion.click();
      await sleep(500);
      message = await getFirstReply();
    }

    await incrementCurrentIndex();

    // if (currentIndex % 10 === 0 && !currentIndex) scrollToTheBottom();
  }

  return message;
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const getFirstReply = async (): Promise<string> => {
  await scrollToTheTop();
  const messagesList = getMessagesList();

  if (!messagesList.children[2]) return "";

  const reply = getElementByTagName(messagesList.children[2], "p");

  if (!reply) return "";

  return reply.textContent.replace(/(\r\n|\n|\r)/gm, "");
};

const scrollToTheTop = async () => {
  const messagesListBox = getMessagesList().parentElement;
  messagesListBox.scrollBy({ top: -5000 });
  await sleep(500);
};

// const scrollToTheBottom = async () => {
//   getUsersList().scrollBy({ top: 500 });
// };

const getMessagesList = () => {
  const thread = getElementByClassName(getMessagingContainer(), "msg-thread");
  return getElementByTagName(thread, "ul");
};

const getUsersList = () => {
  const usersContainer = getElementByClassName(
    getMessagingContainer(),
    "msg-conversations-container"
  );
  return getElementByTagName(usersContainer, "ul");
};

const getMessagingContainer = () => {
  return getElementByClassName(document, "msg-messaging-container");
};

const getElementByClassName = (
  element: Document | Element,
  className: string
) => {
  return element.getElementsByClassName(className)[0];
};

const getElementByTagName = (element: Document | Element, tagName: string) => {
  return element.getElementsByTagName(tagName)[0];
};

export default findNextMessage;
