'use strict';

module.exports = function (app) {
	return function getSeach(req, res, next) {
		const params = {
		};

		app.API.query({role: 'search', cmd: 'query'}, params)
			.then(data => {
				send(null, data, req, res, next);
			})
			.catch(err => {
				send(err);
			});
	};
};
