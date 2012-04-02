enyo.kind({
	kind: enyo.Control,
	name: "AppPage",
	tools: [
		{
			kind: "Animator", 
			onStep: "animatorStep", 
			onEnd: "animatorComplete"
		}
	],
	published: {
		axis: "h",
		value: 0,
		unit: "px",
		min: 0,
		max: 0,
		accelerated: "auto",
		overMoving: true,
		draggable: true
	},
	initComponents: function() {
		this.createComponents(this.tools);
		this.inherited(arguments);
	},
	setPage: function(pageIndex) {

	},
	animateTo: function(inValue) {
		this.play(this.value, inValue);
	},
	play: function(inStart, inEnd) {
		this.$.animator.play({
			startValue: inStart,
			endValue: inEnd,
			node: this.hasNode()
		});
	},
	animatorStep: function(inSender) {
		this.setValue(inSender.value);
		return true;
	},
	animatorComplete: function(inSender) {
		this.doAnimateFinish(inSender);
		return true;
	}
});