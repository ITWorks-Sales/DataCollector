import * as React from "react";
import * as ReactDOM from "react-dom";
import Overlay from "./Overlay";
import {
  getCurrentList,
  initCurrentList,
} from "../localStorageInteraction/currentList";
import { initCurrentIndex } from "../localStorageInteraction/currentIndex";

const init = async () => {
  await initCurrentIndex();
  await initCurrentList();
  console.log(await getCurrentList());
  ReactDOM.render(<Overlay />, document.getElementById("popup"));
};

init();
