/*global chrome*/
import { getInitialImgaes, saveTimeFormat } from "./helpers";

chrome.runtime.onInstalled.addListener(() => {
    getInitialImgaes();
    saveTimeFormat("hh:mm A");
});
