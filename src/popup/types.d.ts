import React from "react";

type messageDataset = {
  message: string;
  tags: string[];
};

type setCurrentIndex = React.Dispatch<React.SetStateAction<number>>;

type currentMessageState = [
  string,
  React.Dispatch<React.SetStateAction<string>>
];

type selectedTagsState = [
  string[],
  React.Dispatch<React.SetStateAction<string[]>>
];

type selectedTagsStateProps = {
  selectedTagsState: selectedTagsState;
};

type actionsProps = {
  selectedTagsState: selectedTagsState;
  setCurrentIndex: setCurrentIndex;
  currentMessageState: currentMessageState;
};

export { messageDataset, selectedTagsStateProps, actionsProps };
