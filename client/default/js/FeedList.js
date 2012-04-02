function validateURL(url) {
	var urlRegxp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	return urlRegxp.test(url);
}

enyo.kind({
	name: "FeedList",
	kind: "onyx.Slideable", 
	value: 100, 
	max: 100, 
	unit: "%", 
	classes: "enyo-fit pullout",
	style: "width: 100%; background: #404040; left: auto; z-index: 1000", 
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
	active: null,
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

		this.$.feedLink.hasNode() && this.$.feedLink.hasNode().blur();


		if(validateURL(value)) {
			this.$.feedLink.hasNode().value = "";
			this.feedList.push(value);

			this.createComponent({
				kind: enyo.Control,
				ontap: "openFeed",
				container: this.$.feedList,
				link: value,
				classes: "item",
				components:[
					{
						content: value,
						classes: "link"
					},
					{
						kind: "onyx.Icon", 
						src: "img/remove-button.png",
						ontap: "removeFeed"
					}
				]
			}).render();

			!noSave && this.saveFeeds();

			!this.$.feedList.rendered && this.$.feedList.render();
		}
		else {
			feedReader.$.error.setContent("Not a valid URL");
			feedReader.$.error.show();
		}
	},
	saveFeeds: function() {
		$fh.data({
			act: "save",
			key: "feedList",
			val: JSON.stringify(this.feedList)
		});
	},
	openFeed: function(sender, event) {
		this.active && this.active.removeClass("active");

		this.active = sender;
		sender.addClass("active");
		feedReader.$.content.loadFeed(sender.link);
		this.$.feedList.render();
		this.animateToMax();
	},
	removeFeed: function(sender, event) {
		var feed = sender.container.link,
			feedList = this.feedList;

		feedList.splice(feedList.indexOf(feed), 1);
		this.saveFeeds();

		sender.container.destroy();

		event.srcEvent.stopPropagation();
	}
});