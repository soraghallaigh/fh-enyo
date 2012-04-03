enyo.kind({
	name: "FeedHighlights",
	kind: enyo.Control,
	loadHighlights: function(link) {
		$fh.act({
			act: "getFeedHighlights",
			req: {
				link: link
			}
		},
		this.handleResponse.bind(this),
		this.handleError.bind(this));
	},
	handleResponse: function(res) {
		this.createComponent({
			kind: enyo.Control,
			content: res.highlight,
			allowHtml: true
		}).render();
	},
	handleError: function() {

	}
});
