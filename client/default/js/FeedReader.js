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
			defaultKind: "onyx.IconButton",
			classes: "nav-toolbar",
			components: [
				{
					kind: "Group", 
					noDom: true, 
					defaultKind: "onyx.IconButton", 
					components: [
						{
							active: true,
							src: "img/home.png",
							ontap: "changePage"
						},
						{
							src: "img/rss.png",
							ontap: "changePage"
						}
					]
				}
			]
		},
		{
			name: "error",
			kind: "onyx.Popup",
			centered: true,
			floating: true,
			classes: "big",
			content: ""
		},
		{
			name: "loading",
			kind: "onyx.Popup",
			centered: true,
			floating: true,
			classes: "loading",
			components: [
				{
					tag: "div",
					classes: "enyo-rotating-image enyo-spinner-large"
				}
			]
		}
	],
	changePage: function() {
		console.log("change page");
	}
});
