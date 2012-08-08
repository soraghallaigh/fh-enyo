
exports.getFeed = function(params, cb) {
  var res = {
  	msg: "Invalid parameters",
		status: "error"
	};

	if(params.link && params.max) {
		$fh.feed({
			link: params.link,
			"list-max" : params.max
		}, function(err, res) {
      if(err) {
        return cb(err);
      }
  	  if(res.body.list && res.body.list.length === 0) {
  		  return cb({
				  status: "error",
				  msg: "Feed does not exist"
			  });
		  }
      return cb(null, res.body);
		});
	}
}