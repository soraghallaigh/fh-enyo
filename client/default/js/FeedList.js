enyo.kind({
	name: "FeedList",
	kind: "onyx.Slideable", 
	value: 100, 
	max: 100, 
	unit: "%", 
	classes: "enyo-fit pullout",
	style: "width: 100%; background: #404040; left: auto;", 
	components: [
		{
			kind: "onyx.Toolbar",
			components: [
			 	{
					kind: "onyx.InputDecorator",
					components: [
						{
							kind: "onyx.Input", 
							placeholder: "RSS Feed",
							name: "feedLink"
						}
					]
				},
				{
					kind: "onyx.Button",
					content: "Add Feed",
					ontap: "addFeed"
				}
			]
		},	
		{
			kind: "enyo.Scroller",
			classes: "feed-list",
			name: "feedList"
		},
		{
			kind: "onyx.Grabber", 
		}
	],
	feedList: [],
	feedLinkItem: {
		kind: enyo.Control,
		ontap: "openFeed"
	},
	create: function() {
		this.inherited(arguments);
		var list = this;
		$fh.data({
			key: "feedList"
		}, function(res) {
			if(res.val) {
				list.loadFeedList(JSON.parse(res.val));
			}
		});
	},
	loadFeedList: function(feedList) {
		for(var i = 0, il = feedList.length; i < il; i++) {
			this.addFeed(feedList[i], true);
		}
	},
	addFeed: function(value, noSave) {
		value = typeof value == "string" ? value : this.$.feedLink.hasNode().value.trim();
		noSave = typeof noSave == "boolean" ? noSave : false;
		if(value) {
			this.$.feedLink.hasNode().value = "";
			this.feedList.push(value);

			this.createComponent(this.feedLinkItem, {
				container: this.$.feedList,
				content: value,
				link: value
			}).render();

			!noSave && $fh.data({
				act: "save",
				key: "feedList",
				val: JSON.stringify(this.feedList)
			});

			!this.$.feedList.rendered && this.$.feedList.render();
		}
	},
	active: null,
	openFeed: function(sender, event) {
		this.active && this.active.removeClass("active");

		this.active = sender;
		sender.addClass("active");
		feedReader.$.content.loadFeed(sender.link);
		this.$.feedList.render();
		this.animateToMax();
	}
});