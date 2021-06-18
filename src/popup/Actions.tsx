import { Button, Col, Row } from "antd";
import { DownloadOutlined, ReloadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import isMessagesPage from "./actions/isMessagesPage";
import navigateToMessagesPage from "./actions/navigateToMessagesPage";
import { actionsProps } from "./types";
import findNextContact from "./actions/findNextContact";
import {
  getCurrentIndex,
  resetCurrentIndex,
} from "../localStorageInteraction/currentIndex";
import {
  addToCurrentList,
  resetCurrentList,
} from "../localStorageInteraction/currentList";
import downloadCsv from "./actions/downloadCsv";

export default function Actions({
  selectedTagsState: [selectedTags, setSelectedTags],
  setCurrentIndex,
  currentMessageState: [currentMessage, setCurrentMessage],
}: actionsProps) {
  const [isMessagePage, setIsMessagePage] = useState(false);
  const [isCollecting, setIsCollecting] = useState(false);
  const [isFindingNextContact, setIsFindingNextContact] = useState(false);

  useEffect(() => {
    const findIsMessagePage = async () => {
      setIsMessagePage(await isMessagesPage());
    };

    const initiateCurrentIndex = async () => {
      setCurrentIndex(await getCurrentIndex());
    };

    findIsMessagePage();
    initiateCurrentIndex();
    setInterval(() => {
      findIsMessagePage();
      initiateCurrentIndex();
    }, 1000);
  }, []);

  const onClick = async () => {
    if (currentMessage) {
      addToCurrentList({ message: currentMessage, tags: selectedTags });
      setSelectedTags([]);
      setCurrentMessage("");
    }

    setIsFindingNextContact(true);
    const message = await findNextContact();
    setCurrentMessage(message);
    setIsFindingNextContact(false);
  };

  return (
    <div style={{ paddingBottom: 5 }}>
      <Row justify="space-around" style={{ paddingBottom: 3 }}>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={downloadCsv}
        >
          Download dataset
        </Button>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={() => {
            resetCurrentIndex();
            resetCurrentList();
          }}
        >
          Erase All Data
        </Button>
      </Row>

      <Row justify="space-around">
        <Button disabled={isMessagePage} onClick={navigateToMessagesPage}>
          Navigate to page
        </Button>
        <Button onClick={() => setIsCollecting(!isCollecting)}>
          {isCollecting ? "Stop" : "Start"} Collecting
        </Button>
        <Button
          disabled={!isCollecting || isFindingNextContact}
          onClick={onClick}
        >
          Next profile
        </Button>
      </Row>
    </div>
  );
}
