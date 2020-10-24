# ythp
Get Youtube Home Page videos without API key

## API

* `ythp()` - Get youtube videos from home page. Videos are gotten as if the user is not logged in to youtube so recommendations are general and not specific. 
Only 20 videos are recieved plus ads and news stories.

* `ythp.initialHTML()` - Uses axios to get the youtube home page. Default URL: https://www.youtube.com . Returns all the html of the page.

* `ythp.parseHTML()` - Uses [node-html-parser][] to get a `Virtual Dom' (the dom does not run any code on the site). Returns all the script tags where youtubes initial videos are held.

* `ythp.initailData()` - Gets Html with `ythp.initalHTML()` and uses `ythp.parseHTML()` to get all script tags. The script tags are then looped through to find `window['ytinitalData']`
where all the initial videos are. Returns Promise of Youtubes initialData (json). No parsing of videos is done in this function.

* `ythp.reconfigureWindow()` - Main parsing function of ythp. Deletes unnecessary data (Tracking params, buttons and headers) and parses out videos into an `Object`. 
Returns all videos in Promise.
`videos = {
  recommended: [],
  ads: [],
  misc:[]
}`

