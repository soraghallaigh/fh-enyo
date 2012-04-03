function validateURL(url) {
	var urlRegxp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	return urlRegxp.test(url);
}


//Slide out list containing a list of rss feeds
enyo.kind({
	name: "FeedList",
	kind: "onyx.Slideable", 
	value: 100, 
	max: 100, 
	unit: "%", 
	classes: "enyo-fit pullout",
	style: "width: 100%; background: #404040; left: auto; z-index: 1000", 
	defaultFeeds: [
		"http://www.engadget.com/rss.xml",
		"http://reddit.com/.rss",
		"http://feedhenry.com/feed/",
		"http://news.ycombinator.com/rss"
	],
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
							name: "feedInput"
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
			classes: "outer",
			kind: "onyx.Grabber", 
		},
		{
			classes: "inner",
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
			else {
				list.loadFeedList(list.defaultFeeds);
			}
		},function() {
			list.loadFeedList(list.defaultFeeds);
		});
	},
	loadFeedList: function(feedList) {
		for(var i = 0, il = feedList.length; i < il; i++) {
			this.addFeed(feedList[i], true);
		}
	},
	addFeed: function(value, noSave) {
		var feedInput = this.$.feedInput.hasNode();

		value = typeof value == "string" ? value : feedInput.value.trim();
		noSave = typeof noSave == "boolean" ? noSave : false;

		//check whether the control has been rendered before trying to blur it
		feedInput && feedInput.blur();

		//only add feeds if they are valid urls
		if(validateURL(value)) {
			//reset the input
			feedInput.value = "";

			//add the value to the list of feeds
			this.feedList.push(value);
			//the noSave flag is set if we are adding the feeds from local storage
			//so they are not duplicated
			!noSave && this.saveFeeds();

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
					//remove button
					{
						kind: "onyx.Icon", 
						src: "img/remove-button.png",
						ontap: "removeFeed"
					}
				]
			}).render();

			!this.$.feedList.rendered && this.$.feedList.render();
		}
		else {
			var errorDialog = feedReader.$.error;
			errorDialog.setContent("Not a valid URL");
			errorDialog.show();
		}
	},
	//save the list of feeds to local storage
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
		//load the feed in the main view
		feedReader.$.content.loadFeed(sender.link);

		this.$.feedList.render();

		//close the slideout
		this.animateToMax();
	},
	//click event for close the remove feed button
	removeFeed: function(sender, event) {
		event.srcEvent.stopPropagation();

		var feed = sender.container.link,
			feedList = this.feedList;

		//remove the feed from the list of fields
		feedList.splice(feedList.indexOf(feed), 1);
		//save the list to localstorage
		this.saveFeeds();
		//remove the list from the 
		sender.container.destroy();

	}
});