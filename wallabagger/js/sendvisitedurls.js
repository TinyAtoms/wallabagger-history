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
        console.log("TagHistory: " + articleID);
        if (articleID){
            api.SaveTags(articleID,["history"])
        }
        
    }
}

// Event listener for when a new URL is visited
browser.history.onVisited.addListener(async historyItem => {
    if (api.data.EnableHistory){
        SaveHistory(historyItem.url, false, historyItem.title, document.body.innerHTML);
    }
    // TODO
    // figure out how to save the tag field form the options page
    // url blacklist that are not allowed to be saved in the history

});
