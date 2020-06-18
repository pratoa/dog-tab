/*global chrome*/
import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({
    accessKey: "3Z5nmpj96SkBih-eqsEFI5Cl_L1kiwkZFF6FpPen37E"
});

function getImages(keyword, page, numberOfPhotos, isCustom) {
    unsplash.search.photos(keyword, page, numberOfPhotos, { orientation: "landscape" })
    .then(toJson)
    .then(json => {
        if (json && json.results.length > 0) {
            console.log(json);
            console.log(json.results);
            //save
        }
    })
    .catch(err => {
        console.log(err);
    })
}

async function getInitialImgaes() {
    let shouldGet = await checkDogImages();
    console.log(shouldGet);
    if (!shouldGet) {
        var first30 = await unsplashSearch("dog", 1, 30);
        var second30 = await unsplashSearch("dog", 2, 30);
        saveImages(first30.concat(second30));
    }
}

async function unsplashSearch(keyword, page, perPage) {
    return new Promise(function(resolve, reject) {
        unsplash.search.photos(keyword, page, perPage, { orientation: "landscape" })
        .then(toJson)
        .then(json => {
            if (json && json.results.length > 0) {
                resolve(json.results);
            }
        })
        .catch(err => {
            console.log(err);
        })
    });
}

function saveImages(images) {
    var imagesToStore = [];
    images.forEach(function (image) {
        var img = new DogImage(image.urls.regular, image.user)
        imagesToStore.push(img);
    });

    if (imagesToStore.length > 0) {
        chrome.storage.local.set({'dogImages': imagesToStore}, function() {
            console.log('Setting DogImages to: ');
            console.log(imagesToStore);
        });
        chrome.storage.local.set({'dogCounter': 0}, function() {
            console.log('Setting DogCounter for the first time to: ' + 0);
        });
    }
}

async function checkDogImages() {
    return new Promise(function(resolve, reject) { 
            chrome.storage.local.get(["dogImages"], function(result) {
            resolve(result.hasOwnProperty("dogImages"));
        });
    });
}

class DogImage {
    constructor(url, user) {
        this.url = url;
        this.user = user;
    }
}

export { getInitialImgaes, getImages }