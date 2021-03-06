import * as youtubeSearch from "youtube-search";

async function getVideo(keyword, pageToken, maxResults) {
    var opts = {
        maxResults: maxResults,
        pageToken: pageToken,
        type: "video",
        key: "AIzaSyCRmbQBCQYb5xYJFS-TBD5hY640AD1ij5A"
    };
    let a =  await youtubeSearch(keyword, opts);
    return a
}

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
    if (request.action == "search") {
        var { keyword, pageToken, maxResults } = request.payload
        let _sendResponse = sendResponse
        getVideo(keyword, pageToken, maxResults).then(res => {
            _sendResponse({res: res})
        })
        return true
    }
    
});