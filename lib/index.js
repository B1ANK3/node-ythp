const MINIGET = require('miniget');
const fs = require('fs');
const utils = require('./utils');
const { parse } = require('node-html-parser');
const Miniget = require('miniget');

const YTHOMEPAGE = 'https://www.youtube.com';

const getHomePage = module.exports = async (options, url = YTHOMEPAGE) => {
    return getInitialVideos(options, url).then(i => {
        return i;
    })
}

const getInitialVideos = async (options, url) => {
    var items = [];

    const InitialData = await MINIGET(url, options).text()
        .then(html => { return parse(html, { script: true }) })
        .then(dom => { return dom.querySelector('body') })
        .then(body => { return body.querySelectorAll('script') })
        .then(scripts => {
            var json;
            scripts.map((v, i) => {
                if (v.text.includes(`window["ytInitialData"] = `)) {
                    var res = v.text.replace(`window["ytInitialData"] = `, '');
                    res = res.replace(`window["ytInitialPlayerResponse"] = null;`, '');
                    res = res.replace(`if (window.ytcsi) {window.ytcsi.tick("pdr", null, '');}`, '');
                    res = res.trim();
                    res = res.substring(0, res.length - 1);
                    json = res;
                }
            })
            return JSON.parse(json);
        })


    Promise.all(InitialData.contents.twoColumnBrowseResultsRenderer.tabs.map((content, i) => {
        Promise.all(content.tabRenderer.content.richGridRenderer.contents.map((value, index) => {
            if (value.richItemRenderer == undefined) return;
            if (value.richItemRenderer.content == undefined) return;
            if (value.richItemRenderer.content.videoRenderer == undefined) return;
            if (value.richItemRenderer.content.videoRenderer.title == undefined) return;
            if (value.richItemRenderer.content.videoRenderer.descriptionSnippet == undefined) return;
            if (value.richItemRenderer.content.videoRenderer.publishedTimeText == undefined) return;
            items.push({
                videoId: value.richItemRenderer.content.videoRenderer.videoId,
                thumbnails: value.richItemRenderer.content.videoRenderer.thumbnail.thumbnails,
                title: value.richItemRenderer.content.videoRenderer.title.runs[0].text,
                description: value.richItemRenderer.content.videoRenderer.descriptionSnippet.runs[0].text,
                publishedtime: value.richItemRenderer.content.videoRenderer.publishedTimeText.simpleText,
                duration: value.richItemRenderer.content.videoRenderer.lengthText.simpleText,
                viewCount: value.richItemRenderer.content.videoRenderer.viewCountText.simpleText,
                viewCountSimple: value.richItemRenderer.content.videoRenderer.shortViewCountText.simpleText,
                channel: {
                    name: value.richItemRenderer.content.videoRenderer.ownerText.runs[0].text,
                    channel_url: `https://www.youtube.com${value.richItemRenderer.content.videoRenderer.ownerText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
                    thumnail: value.richItemRenderer.content.videoRenderer.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail.thumbnails
                }
            })
        }))
    }))

    return items;
}

async function side() {
    const body = Miniget('https://www.youtube.com/watch?v=BHiWygziyso').pipe(fs.createWriteStream('./out.txt')).on('finish', () => console.log('done'))
}


// getHomePage().then(data => console.log(data))

side()