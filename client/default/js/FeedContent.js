enyo.kind({
	name: "FeedContent",
	kind: "enyo.Scroller",
	fit: true,
	classes: "feed-content",
	components: [

	],
	addItem: function(feedItem) {
		this.addControl(new FeedItem(feedItem.author, feedItem.title, feedItem.description));
		this.render();
	},
	loadFeed: function(link) {
		var content = this;

		this.destroyClientControls();

		function handleResponse(res) {
			var list = res.list;

			if(res.status && res.status === "pending") {
				setTimeout(function() {
					load();
				}, 500);
			}
			else if(list) {
				for(var i = 0, il = list.length; i < il; i++) {
					content.addItem(list[i].fields);
				}
				content.render();
				feedReader.$.loading.hide();
			}
			else if(res.status && res.status == "error") {
				feedReader.$.error.setContent(res.msg);
				feedReader.$.error.show();
			}
		}
		function handleError() {
			feedReader.$.loading.hide();
		}

		function load() {
			feedReader.$.loading.show();

			$fh.act({
				act: "getFeed",
				req: {
					link: link,
					max: 100
				}
			}, 
			handleResponse,
			handleError);
		}

		load();
	}
});
