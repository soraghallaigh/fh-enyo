enyo.kind({
	name: "FeedItem",
	kind: "enyo.Control",
	classes: "feed-item",
	components: [
		{
			classes: "title",
			name: "title",
			ontap: "toggleContent"
		},
		{
			name: "content",
			allowHtml: true,
			classes: "content"
		},
		{
			name: "author"
		}
	],
	open: false,
	constructor: function(author, title, content) {
		this.author = author;
		this.title = title;
		this.content = content;
		this.inherited(arguments);
	},
	create: function() {
		this.inherited(arguments);

		var title = this.$.title,
			content = this.$.content;

		title.setContent(this.title);
		content.setContent(this.content);

	},
	toggleContent: function() {
		this.open = !this.open;

		if(this.open) {
			this.$.content.addClass("open");
		}
		else {
			this.$.content.removeClass("open");
		}
	},
	setActive: function() {
		this.addClass("active");
	},
	setInactive: function() {
		this.removeClass("active");
	}
});
