enyo.kind({
	name: "FeedHighlights",
	kind: enyo.Scroller,
	components: [
		{
			classes: "heading",
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
			components: [
				{
					tag: "h1",
					classes: "title",
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
