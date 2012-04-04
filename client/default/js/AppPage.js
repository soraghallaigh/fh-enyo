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
		this.inherited(arguments);
		this.setValue(this.active ? 0 : 4 * this.getOffset());
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
