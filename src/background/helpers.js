/*global chrome*/
import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({
    accessKey: "3Z5nmpj96SkBih-eqsEFI5Cl_L1kiwkZFF6FpPen37E"
});

export default function getImages() {
    unsplash.search.photos("dog", 1, 30, { orientation: "landscape" })
    .then(toJson)
    .then(json => {
        if (json && json.results.length > 0) {
            console.log(json.results);
            saveImagesToStorage(json.results);
        }
    })
    .catch(err => {
        console.log(err);
    });
}

function saveImagesToStorage(data) {
    var imagesToStore = [];
    data.forEach(function (image) {
        var img = new DogImage(image.urls.regular, image.user)
        imagesToStore.push(img);
    });

    if (imagesToStore.length > 0) {
        chrome.storage.local.set({'dogImages': imagesToStore}, function() {
            console.log('Setting DogImages to: ' + imagesToStore.toString());
        });

        chrome.storage.local.set({'dogCounter': 0}, function() {
            console.log('Setting DogCounter for the first time to: ' + 0);
        });
    }
}

class DogImage {
    constructor(url, user) {
        this.url = url;
        this.user = user;
    }
}