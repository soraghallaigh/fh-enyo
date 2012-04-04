
//main app
enyo.kind({
	name: "FeedReader",
	id: "feed-reader",
	classes: "onyx enyo-unselectable",
	kind: enyo.Control,
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
				},
				{
					tag: "img",
					src: "img/enyo-logo.png",
					style: "width: 80px; height: 26px; float: right"
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
					slideout: "right",
					components: [
						{
							kind: "FeedContent",
							name: "content",
							components: [
								{
									content: "drag tab to add/select a feed &rarr;",
									allowHtml: true,
									classes: "instruction"
								}
							],
						},
						{
							kind: "FeedList",
							name: "list",
							style: "z-index: 1000;"
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
	activePage: null,
	create: function() {
		this.inherited(arguments);

		this.setActivePage(this.$.home);

		//allow the page to stop loading before we get content
		setTimeout(function() {
			this.$.mainfeed.loadFeed("http://feedhenry.com/feed/");
		}.bind(this), 1000);
	},
	setActivePage: function(page) {
		this.activePage && this.activePage.hide();
		this.activePage = page.show();
		this.$.pageTitle.setContent(page.title);
	},
	changePage: function(sender) {
		this.setActivePage(this.$[sender.page]);
	}
});
