enyo.kind({
	name: "FeedHighlights",
	kind: enyo.Scroller,
	components: [
		{
			classes: "heading",
			tag: "h1",
			content: "Highlights"
		}
	],
	loadHighlights: function(link) {
		feedReader.$.loading.show();
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
		var highlight = res.highlight.fields;
		feedReader.$.loading.hide();

		this.createComponent({

			kind: enyo.Control,
			content: res.highlight,
			classes: "highlight",
			components: [
				{
					classes: "title",
					tag: "h2",
					allowHtml: true,
					content: highlight.title
				},
				{
					classes: "description",
					allowHtml: true,
					content: highlight.description					
				}
			]
		}).render();
	},
	handleError: function() {
		feedReader.$.loading.hide();
	}
});
