enyo.kind({
	name: "FeedReader",
	classes: "onyx enyo-unselectable",
	kind: enyo.Control,
	components: 
	[
		{
			kind: "onyx.Toolbar",
			components: [
				{
					tag: "img",
					src: "img/feedhenry_logo_web_normal.png",
					style: "width: 25px; height: 25px"
				},
			    {
			    	content: "Feedhenry FeedReader", 
			    	style: "padding-right: 30px"
			    }
			]
		},
		{
			components: 
			[
				{
					kind: "FeedList"
				}
			]
		}
	]
});
