import * as youtubeSearch from "youtube-search";


export const getVideo = (keyword, pageToken, maxResults) => {
    var opts = {
        maxResults: maxResults,
        pageToken: pageToken,
        type: "video",
        key: "AIzaSyCRmbQBCQYb5xYJFS-TBD5hY640AD1ij5A"
    };
    return youtubeSearch(keyword, opts);
}
