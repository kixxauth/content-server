'use strict';

module.exports = function (app) {
	return function getConfigsPresenter(req, res, next) {
		const data = {
			type: 'config',
			features: _.get(req, 'identity.organization.features'),
			views: _.get(req, 'identity.device.views')
		};

		// Override org feature ads with device
		if (_.has(req, 'identity.device.features.ads')) {
			_.set(data, 'features.ads',
				_.merge({},
					_.get(req, 'identity.organization.features.ads'),
					_.get(req, 'identity.device.features.ads')
				)
			);
		}

		if (_.has(req, 'identity.device.features.metrics')) {
			_.set(data, 'features.metrics',
				_.merge({},
					_.get(req, 'identity.organization.features.metrics'),
					_.get(req, 'identity.device.features.metrics')
				)
			);
		}

		if (req.params.version === 'v1') {
			_.set(data, 'ads.vast', _.get(req, 'data.features.ads.url'));
			_.set(data, 'view', _.get(req, 'data.views.homepage'));

			HACKS.AttachOldRokuAdUrl(req, res); // eslint-disable-line
		}

		return send(null, data, req, res, next);
	};
};
