enyo.kind({
	name: "FeedContent",
	kind: "enyo.Scroller",
	fit: true,
	classes: "feed-content",
	currentLink: "",
	addItem: function(feedItem) {
		this.addControl(new FeedItem(feedItem.author, feedItem.title, feedItem.description));
	},
	loadFeed: function(link) {
		feedReader.$.loading.show();

		//remove the old list of feeds
		this.destroyClientControls();

		this.currentLink = link;

		//send a request to the cloud for the rss feed
		$fh.act({
			act: "getFeed",
			req: {
				link: link,
				max: 100
			}
		}, 
		this.handleResponse.bind(this),
		this.handleError.bind(this));
	},
	handleError: function() {
		feedReader.$.loading.hide();
	},
	handleResponse: function(res) {
		var feedContent = this,
			list = res.list;

		//if the cloud hasn't gotten the rss feed
		//it will send back a response to say pending
		//if so we wait for a bit, then try again
		if(res.status && res.status == "pending") {
			setTimeout(function() {
				feedContent.loadFeed(this.currentLink);
			}, 500);
		}
		//if we got a list of feeds, display them
		else if(list) {
			for(var i = 0, il = list.length; i < il; i++) {
				feedContent.addItem(list[i].fields);
			}
			feedContent.render();
			feedReader.$.loading.hide();
		}
		else if(res.status && res.status == "error") {
			var errorDialog = feedReader.$.error;
			errorDialog.setContent(res.msg);
			errorDialog.show();
		}
	}

});
