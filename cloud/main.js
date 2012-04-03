

function getFeed(params) {
	var res = {
		msg: "Invalid parameters",
		status: "error"
	};

	if(params.link && params.max) {
		res = $fh.feed({
			link: params.link,
			"list-max" : params.max
		});

		if(res.list && res.list.length === 0) {
			res = {
				status: "error",
				msg: "Feed does not exist"
			};
		}
	}

	return res;
};

function getFeedHighlights(params) {
	var res = getFeed(params);

	if(res.status !== "error" && res.status !== "pending") {
		res = {
			highlight: res.list[0]
		};
	}

	return res;
};
