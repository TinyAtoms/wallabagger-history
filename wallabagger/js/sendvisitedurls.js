if (typeof (browser) === 'undefined' && typeof (chrome) === 'object') {
    browser = chrome;
}



async function SaveHistory(url, title, content){
    if (api.data.AutoTagHistory){
        // await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
        const options = {
            url: url,
            title: title,
            content: content
        }
        await api.SavePage(options)
        const articleID = await api.GetEntryByURL(url);
        if (articleID){
            api.SaveTags(articleID,api.data.HistoryTags.split(","))
        }
        
    }
}

// Event listener for when a new URL is visited
browser.history.onVisited.addListener(async historyItem => {
    if (api.data.EnableHistory){
        const domain = new URL(historyItem.url).hostname;
        if (!api.data.HistoryBlacklist.includes(domain)){
            SaveHistory(historyItem.url, false, historyItem.title, document.body.innerHTML);
        }
  
    }
    // TODO
    // url blacklist that are not allowed to be saved in the history
});
