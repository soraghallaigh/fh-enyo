
exports.getFeed = function(params) {
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
  	  if(res.list && res.list.length === 0) {
  		  return cb({
				  status: "error",
				  msg: "Feed does not exist"
			  });
		  }
      return cb(null, res);
      
		});
	}
}