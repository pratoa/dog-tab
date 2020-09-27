/*global chrome*/
import { getInitialImgaes } from "./helpers";

chrome.runtime.onInstalled.addListener(() => {
    getInitialImgaes();
});
