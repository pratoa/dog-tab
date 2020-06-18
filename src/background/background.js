/*global chrome*/
import { getInitialImgaes } from "./helpers";

chrome.runtime.onInstalled.addListener(() => {
    // console.log('onInstalled...');
    // create alarm after extension is installed / upgraded
    // chrome.alarms.create('refresh', { periodInMinutes: 1 });

    // getImages("dog", 1, 30, false);
    // getImages("dog", 2, 30, false);

    getInitialImgaes();
});
