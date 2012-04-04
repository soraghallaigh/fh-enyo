
//main app
enyo.kind({
	name: "FeedReader",
	id: "feed-reader",
	classes: "onyx enyo-unselectable",
	kind: enyo.Control,
	create: function() {
		this.inherited(arguments);

		//allow the page to stop loading before we get content
		setTimeout(function() {
			this.$.mainfeed.loadFeed("http://feedhenry.com/feed/");
		}.bind(this), 1000);
	},
	components: 
	[
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
		},
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
					name: "pageTitle",
					content: ""
				}

			]
		},
		{
			name: "pages",
			classes: "pages",
			components: [
				{
					name: "home",
					kind: "AppPage",
					active: true,
					title: "Main Feed",
					components: [
						{
							name: "mainfeed",
							kind: "FeedContent"
						}
					]
				},
				{
					kind: "AppPage",
					name: "rss",
					title: "Your Feeds",
					active: false,
					slideout: "right",
					components: [
						{
							kind: "FeedList",
							name: "list",
							style: "z-index: 1000;"
						},
						{
							kind: "FeedContent",
							name: "content",
							components: [
								{
									content: "drag tab to select a feed &rarr;",
									allowHtml: true,
									classes: "instruction"
								}
							],
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
							page: "home"
						},
						{
							src: "img/rss.png",
							ontap: "changePage",
							page: "rss"
						}
					]
				}
			]
		}
	],
	activePage: "",
	changePage: function(sender) {
		this.activePage && this.activePage.hide();
		this.activePage = this.$[sender.page].show();
		this.$.pageTitle.setContent(this.activePage.title);
	}
});
