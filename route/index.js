var Shop = require('../lib/shop');

function index(req, res) {
    var shopId = req.query.shop_id;
    if(shopId) {
        Shop.find({where: {
            id:shopId
        }}).success(function(result) {
            res.render('index', {data:{'shop':result.dataValues}});
        });

    }
}

module.exports = index;

