/*global chrome*/
import getImages from "./helpers";

chrome.runtime.onInstalled.addListener(() => {
    // console.log('onInstalled...');
    // create alarm after extension is installed / upgraded
    // chrome.alarms.create('refresh', { periodInMinutes: 1 });

    getImages()
});
  
function helloWorld() {
    console.log("Hello, world!");
}