

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
exports.getFeed = function(params) {
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
}
exports.feedCall = function(params, callback) {
  var feedParams = {          
    'link': 'http://www.feedhenry.com/feed',
    'list-max' : 10
  };
  console.log("in feedCall");
  $fh.feed(feedParams, function(err, feedResp) {
    callback(err, feedResp);
  });
};