enyo.kind({
	name: "FeedList",
	kind: "onyx.Slideable", 
	value: 90, 
	max: 90, 
	unit: "%", 
	classes: "enyo-fit", 
	style: "width: 500px; background: #404040; left: auto;", 
	components: [
		{
			kind: "onyx.InputDecorator",
			style: "margin: 5px",
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
		},
		{
			tag: "div",
			name: "feedlist"
		},
		{
			kind: "onyx.Grabber", 
			style: "position: absolute; bottom: 14px; left: 14px;"
		}
	],
	feedList: [],
	addFeed: function() {
		var value = this.$.feedLink.hasNode().value.trim();

		if(value) {
			this.feedList.push(value);
		}
	}
})