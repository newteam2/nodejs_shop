var async = require('async');
var shopService = require('./shopservice');
var itemService = require('./itemservice');
var webService = require('./webservice');

exports.findAllShopsByUserIdAndGetItems = function(userId, shopId, param, page, callback) {
    if (shopId) {
        async.waterfall([
            function(cb) {
                // select shop items
                webService.itemList(shopId, param, page, function(result) {
                    cb(null, {
                        data: result
                    }); // return shop:shop, items:items
                })
            },
            function(data, cb) {
                // get userid can manage shops
                shopService.findAllShopsByUserId(userId, function(result) {
                    data.data.shops = result;
                    cb(null, data);
                });
            }
        ], function(err, result) {
            callback(result);
        })

    } else {
        // get userid can manage shops
        shopService.findAllShopsByUserId(userId, function(result) {
            callback({
                data: {
                    shops: result
                }
            });
        });
    }
}