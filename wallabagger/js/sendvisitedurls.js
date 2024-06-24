// import savePageToWallabag from "background.js"


if (typeof (browser) === 'undefined' && typeof (chrome) === 'object') {
    browser = chrome;
}

// Event listener for when a new URL is visited
browser.history.onVisited.addListener(async historyItem => {
    const url = historyItem.url;
    const title = historyItem.title;
    // consider wrapping this in a domcontentloaded event listener
    // to ensure the page has loaded before we try to save it
    const content = document.body.innerHTML;
    // Call the function to save the page to Wallabag and await its completion
    savePageToWallabag(url, false, title, content);
    console.log("URL saved to Wallabag: " + url);
});
