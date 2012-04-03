
//main app
enyo.kind({
	name: "FeedReader",
	id: "feed-reader",
	classes: "onyx enyo-unselectable",
	kind: enyo.Control,
	create: function() {
		this.inherited(arguments);


	},
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
			name: "pages",
			kind: "onyx.Slideable",
			classes: "pages",
			value: 0, 
			max: 100, 
			unit: "%",
			draggable: false,
			components: [
				{
					name: "home",
					kind: "FeedHighlights",
					classes: "page",
					components:[
						
					]
				},
				{
					name: "rss",
					classes: "page",
					style: "left: 50%",
					components: [
						{
							kind: "FeedList",
							name: "list",
							style: "z-index: 1000;"
						},
						{
							kind: "FeedContent",
							name: "content",
						}
					]
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
							ontap: "changePage",
							page: 0
						},
						{
							src: "img/rss.png",
							ontap: "changePage",
							page: 1
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
	changePage: function(sender) {
		this.$.pages.animateTo(-sender.page * 50);
	}
});
