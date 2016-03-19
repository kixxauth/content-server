module.exports = function (app) {
	var express = app.API.express;

	express.get(pattern(1, '/status'));
	express.get(pattern(1, '/config'));
	express.get(pattern(1, '/search'));

	express.get(
		pattern(
			1,
			'/:entityType(videoCollections|views)/:entityId/relationships/:relationship'
		)
	);

	express.get(
		pattern(
			1,
			'/:entityType(videoCollections|views)/:entityId/:relationship'
		)
	);

	express.get(
		pattern(
			1,
			'/:entityType(liveStreams|videos|videoCollections|promotions|queries|views)'
		)
	);

	express.get(
		pattern(
			1,
			'/:entityType(liveStreams|videos|videoCollections|promotions|queries|views)/:entityId'
		)
	);

	express.post(pattern(1, '/events'));

	function pattern(version, path) {
		return `/:version(v${version})${path}\.:ext?`;
	}
};
