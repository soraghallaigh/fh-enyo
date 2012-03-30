

function getFeed(params) {
	var res = {
		msg: "Invalid parameters"
	};

	if(params.link && params.max) {
		res = $fh.feed({
			'link': params.link,
			'list-max' : params.max
		});

		if(res.list.length === 0) {
			res = {
				msg: "Feed does not exist"
			}
		}
	}

	return res;
);
