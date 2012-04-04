enyo.kind({
	name: "AppPage",
	kind: onyx.Slideable,
	published: {
		active: false,
		slideout: "left",
		title: ""
	},
	classes: "page",
	unit: "%",
	draggable: false,
	create: function() {
		this.value = this.active ? this.getOffset() : 0;
		this.inherited(arguments);
	},
	show: function() {
		this.animateTo(0);
		return this;
	},
	hide: function() {
		this.animateTo(this.slideout === "left" ? -100 : 100);
		return this;
	},
	getOffset: function() {
		return this.slideout === "left" ? -100 : 100;
	}
});
