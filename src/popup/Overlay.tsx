import { Card, Typography } from "antd";
import React, { useEffect, useState } from "react";
import Actions from "./Actions";
import { getCurrentList } from "../localStorageInteraction/currentList";
import "./Overlay.scss";
import Tags from "./Tags";

export default function Overlay() {
  const [collectedMessages, setcollectedMessages] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("");

  const selectedTagsState = useState<string[]>([]);

  useEffect(() => {
    const getCollectedMessages = async () => {
      setcollectedMessages((await getCurrentList()).length);
    };
    getCollectedMessages();
    setInterval(() => getCollectedMessages(), 1000);
  }, []);

  return (
    <>
      <p id="text">
        Messages collected: {collectedMessages} | Current Index: {currentIndex}
      </p>
      <Actions
        selectedTagsState={selectedTagsState}
        setCurrentIndex={setCurrentIndex}
        currentMessageState={[currentMessage, setCurrentMessage]}
      />
      <Tags selectedTagsState={selectedTagsState} />
      <p id="text">{currentMessage}</p>
    </>
  );
}
