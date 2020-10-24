const axios = require('axios').default;
const { parse } = require('node-html-parser');
const utils = require('./utils');
const YTHOMEPAGE = ['https://www.youtube.com'];
function ythp() {
    return new Promise(function (resolve) {
        ythp.initialHTML()
            .then((html) => { return ythp.parseHTML(html); })
            .then((scripts) => {
            scripts.forEach((element, Index) => {
                if (element.text.includes(`window["ytInitialData"] = `)) {
                    const window = utils.windowParse(element.text);
                    var videos = ythp.reconfigWindow(window);
                    resolve(videos);
                }
            });
        });
    });
}
ythp.initialHTML = () => {
    return new Promise(function (resolve, reject) {
        axios.get(YTHOMEPAGE[0])
            .then((response) => {
            if (response.status === 200) {
                resolve(response.data);
            }
            else if (response.status === 400) {
                reject(400);
            }
        })
            .catch((error) => {
            throw new Error(error.message);
        });
    });
};
ythp.initialData = () => {
    return new Promise(function (resolve) {
        ythp.initialHTML()
            .then((html) => { return ythp.parseHTML(html); })
            .then((scripts) => {
            scripts.forEach((element, Index) => {
                if (element.text.includes(`window["ytInitialData"] = `)) {
                    resolve(utils.windowParse(element.text));
                }
            });
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
                descrition: fast.descriptionSnippet.runs[0].text,
                duration: fast.lengthText == undefined ? '0' : fast.lengthText.simpleText,
                isLive: fast.upcomingEventData,
                view_count: fast.viewCountText.simpleText,
                short_view_count_text: fast.shortViewCountText.simpleText,
                author: {
                    name: fast.ownerText.runs[0].text,
                    channel_url: fast.ownerText.runs[0].navigationEndpoint == undefined ? `https://www.youtube.com` : `https://www.youtube.com${fast.ownerText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
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
    delete window.header;
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
ythp.parseHTML = (html) => {
    var DOM = parse(html, { script: true });
    return DOM.querySelectorAll('script');
};
module.exports = ythp;
