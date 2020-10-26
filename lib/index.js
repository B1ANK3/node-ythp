const axios = require('axios').default;
const YTHOMEPAGE = `https://www.youtube.com`;
const BEGIN = ` window["ytInitialData"] = `;
const END = `;\n`;
const ythp = () => {
    return new Promise(function (resolve, reject) {
        ythp.initialHTML()
            .then((html) => { return ythp.between(html); })
            .then((json) => {
            try {
                var ndata = JSON.parse(json);
                resolve(ythp.reconfigWindow(ndata));
            }
            catch (error) {
                reject(error);
            }
        });
    });
};
ythp.initialHTML = () => {
    return new Promise(function (resolve, reject) {
        axios.get(YTHOMEPAGE, { headers: { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36' } })
            .then((response) => {
            if (response.status === 200) {
                resolve(response.data);
            }
            else if (response.status === 400) {
                reject(400);
            }
        })
            .catch((error) => {
            throw new Error(error);
        });
    });
};
ythp.initialData = () => {
    return new Promise(function (resolve, reject) {
        ythp.initialHTML()
            .then((html) => { return ythp.between(html); })
            .then((json) => {
            try {
                resolve(JSON.parse(json));
            }
            catch (error) {
                reject(error);
            }
        });
    });
};
ythp.reconfigWindow = (window) => {
    const videoType = {
        exposed: (rich) => {
            var fast = rich.richItemRenderer.content.videoRenderer;
            return {
                id: fast.videoId,
                thumbnails: fast.thumbnail,
                title: fast.title.runs[0].text,
                description: fast.descriptionSnippet ? fast.descriptionSnippet.runs[0].text : '',
                duration: fast.lengthText ? fast.lengthText.simpleText : '-1',
                isLive: fast.upcomingEventData,
                view_count: fast.viewCountText.simpleText,
                short_view_count_text: fast.shortViewCountText.simpleText,
                author: {
                    name: fast.ownerText.runs[0].text,
                    channel_url: fast.ownerText.runs[0].navigationEndpoint ? `https://www.youtube.com${fast.ownerText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url}` : `https://www.youtube.com`,
                    avatar: fast.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail
                }
            };
        },
        contained: (rich) => {
            var finished = [];
            if (rich.richSectionRenderer.content.richShelfRenderer) {
                rich.richSectionRenderer.content.richShelfRenderer.contents.forEach((value, index) => {
                    finished.push(videoType.exposed(value));
                });
            }
            return finished;
        }
    };
    delete window.trackingParams;
    delete window.topbar;
    var videos = {
        recommended: [],
        ads: [],
        misc: []
    };
    window.contents.twoColumnBrowseResultsRenderer.tabs.forEach((value, index) => {
        value.tabRenderer.content.richGridRenderer.contents.forEach((value1, index1) => {
            if (value1.richItemRenderer) {
                videos.recommended.push(videoType.exposed(value1));
            }
            else if (value1.richSectionRenderer) {
                videoType.contained(value1).forEach((value2, index2) => {
                    videos.ads.push(value2);
                });
            }
            else if (value1.hasOwnProperty('continuationItemRenderer')) {
            }
        });
    });
    return videos;
};
ythp.between = (haystack) => {
    haystack = haystack.slice(haystack.indexOf(BEGIN) + BEGIN.length, haystack.indexOf(END, haystack.indexOf(BEGIN)));
    return haystack;
};
module.exports = ythp;
