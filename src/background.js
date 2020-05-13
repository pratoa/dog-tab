import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({
    accessKey: "3Z5nmpj96SkBih-eqsEFI5Cl_L1kiwkZFF6FpPen37E"
});

chrome.runtime.onInstalled.addListener(() => {
    console.log('onInstalled...');
    // create alarm after extension is installed / upgraded
    chrome.alarms.create('refresh', { periodInMinutes: 1 });

    unsplash.search.photos("dogs", 1, 30, { orientation: "landscape" })
        .then(toJson)
        .then(json => {
            console.log(json);
    });
});
  
chrome.alarms.onAlarm.addListener((alarm) => {
    console.log(alarm.name); // refresh
    helloWorld();
});
  
function helloWorld() {
    console.log("Hello, world!");

    unsplash.search.photos("dogs", 1, 30, { orientation: "landscape" })
        .then(toJson)
        .then(json => {
            console.log(json);
    });
}