if (typeof (browser) === 'undefined' && typeof (chrome) === 'object') {
    browser = chrome;
}

function isBlacklisted(url) {
    // google.com or *.google.com => ["com", "google"] or ["com", "google", "*"]
    var domains = api.data.HistoryBlacklist.map(domain => domain.split(".").reverse());
    // www.google.com => ["com", "google", "www"]
    var spliturl = url.split(".").reverse();
    if (spliturl[spliturl.length - 1] === "www") {
        spliturl.pop();
    }
    for (splitdomain of domains) {
        if (splitdomain[splitdomain.length - 1] === "*") {
            // return true if every piece until * matches url
            splitdomain.pop();
            if (splitdomain.every((element, index) => element === spliturl[index])) {
                return true;
            }
        }
        else {
            if (spliturl.length === splitdomain.length && spliturl.every((element, index) => element === splitdomain[index])) {
                return true;
            }
        }
    }
    return false;
}

async function SaveHistory(url, title, content) {
    const options = {
        url: url,
        title: title
    }
    if (api.IsSiteToFetchLocally(url)) {
        options.content = content;
    }
    if (api.data.AutoTagHistory) {
        options.tags = api.data.HistoryTags;
    }
    await api.SavePage(options)
}

// Event listener for when a new URL is visited
browser.history.onVisited.addListener(async historyItem => {
    if (api.data.EnableHistory) {
        const hostname = new URL(historyItem.url).hostname;
        if (!isBlacklisted(hostname)) {
            SaveHistory(historyItem.url, false, historyItem.title, document.body.innerHTML);
        }
    }
});
