enyo.kind({
	name: "FeedItem",
	kind: "enyo.Control",
	classes: "feed-item",
	components: [
		{
			classes: "title",
			name: "title",
			ontap: "toggleDescription",
			ontouchstart: "setActive",
			ontouchend: "setInactive",
		},
		{
			name: "description",
			allowHtml: true,
			classes: "description"
		},
		{
			name: "author"
		}
	],
	open: false,
	constructor: function(author, title, description) {
		this.author = author;
		this.title = title;
		this.description = description;

		this.inherited(arguments);
	},
	create: function(author, title, description) {
		this.inherited(arguments);

		this.$.title.setContent(this.title);
		this.$.description.setContent(this.description);
		//this.$.author.setContent(this.author);

	},
	toggleDescription: function() {
		this.open = !this.open;

		if(this.open) {
			this.$.description.addClass("open");
		}
		else {
			this.$.description.removeClass("open");
		}
	},
	setActive: function() {
		this.addClass("active");
	},
	setInactive: function() {
		this.removeClass("active");
	}
});
