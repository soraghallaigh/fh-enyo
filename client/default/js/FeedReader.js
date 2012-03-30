enyo.kind({
	name: "FeedReader",
	classes: "onyx enyo-unselectable",
	kind: enyo.Control,
	components: 
	[
		{
			kind: "onyx.Toolbar",
			classes: "main-toolbar",
			components: [
				{
					tag: "img",
					src: "img/feedhenry_logo_web_normal.png",
					style: "width: 25px; height: 25px"
				},
			    {
			    	content: "FeedHenry FeedReader", 
			    	style: "padding-right: 30px"
			    }
			]
		},
		{
			components: [
				{
					kind: "FeedList",
					name: "feedList",
					style: "z-index: 1000;"
				},
				{
					kind: "FeedContent",
					name: "content",
				}
			]
		},
		{
			kind: "onyx.Toolbar",
			classes: "nav-toolbar"
		}
	]
});
