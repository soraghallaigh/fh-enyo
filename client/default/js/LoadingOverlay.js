enyo.kind({
	name: "LoadingOverlay",
	kind: "onyx.FloatingLayer",
	classes: "loading-overlay",
	components: [
		{
			tag: "img",
			classes: "enyo-rotating-image",
			src: "/img/spinner-large.png"
		}
	]
})