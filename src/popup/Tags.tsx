import { Row, Select } from "antd";
import React from "react";
import { selectedTagsStateProps } from "./types";

const options = [
  { label: "Interested", value: "interested" },
  { label: "Not Interested", value: "notInterested" },
  { label: "Come back later", value: "comeBackLater" },
  { label: "No the right Person", value: "notTheRightPerson" },
  { label: "Specific Role", value: "specificRole" },
];

export default function Tags({
  selectedTagsState: [selectedTags, setSelectedTags],
}: selectedTagsStateProps) {
  function handleChange(value: string[]) {
    setSelectedTags(value);
    console.log(selectedTags);
  }

  return (
    <Row justify="center" style={{ paddingTop: 20 }}>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "80%" }}
        placeholder="Please select"
        options={options}
        onChange={handleChange}
        // disabled={true}
        value={selectedTags}
      />
    </Row>
  );
}
