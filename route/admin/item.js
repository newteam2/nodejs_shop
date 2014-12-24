var async = require('async');
var itemService = require('../../service/itemservice');
var formidable = require('formidable');

exports.addItem = function(req, res) {
    itemService.findClasses(function(result) {
        res.render('admin/add_item', {data:{classes:result, shop_id:req.params.id}});
    })
}

exports.enteradditem = function(req, res) {
    var shopId = req.params.id;
    itemService.findClasses(function(result) {
        res.render('admin/add_item', {data:{shop:{id:shopId}, classes:result}});
    });

}

exports.getSubAttributes = function(req, res) {
    var classId = req.query.class_id;
    itemService.findAttributesByClassId(classId, function(result) {
        res.status(200).json(result);
        res.end();
    });
}

exports.additem = function(req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = 'public/';
    var shopId = req.params.id;
    var obj = {};
    
    async.waterfall([
        function(cb) {
            form.on('field', function(name, value) {
                if(eval('obj.' + name)) {
                    var lastValue = eval('obj.' + name);
                    if(typeof(lastValue) == 'Array') {
                        lastValue.push(value);
                        eval('obj.' + name + '=lastValue');    
                    } else {
                        var arr = new Array(lastValue, value);
                        eval('obj.' + name + '=arr');    
                    }
                } else {
                    eval("obj." + name + "='" + value + "'");
                }
                
            });

            cb(null, obj);
        }], function(err, result) {
           form.parse(req, function(err, fields, files) {
            console.log(obj);
                // var subFactory = new itemSubFactory.getService(parseInt(fields.class_id));
                // if(subFactory) {
                //     var index = 1;
                //     var data = new Array();
                //     for(var index = 1; files.hasOwnProperty('pic' + index); index++) {
                //         var pic = eval('files.' + ('pic_' + index));
                //         var picName = pic.name.substring(pic.name.indexOf('.'));
                //         var picFullName = new Date().getTime() + '' + RandomUtil.getRandom(10000) + picName;
                //         fs.renameSync(pic.path, 'public/images/item/' + picFullName);
                //         var picUrl = 'images/item/' + picFullName;
                //         data.push(picUrl);
                //     }
                //     subFactory.save(fields, data, function(result) {
                //         var sign = '添加商品成功';
                //         if(!result) {
                //             sign = '操作失败';
                //         }
                //         req.flash('sign', sign);
                //         return res.redirect('/admin/shop/');
                //     });
                // }
            })
    })






    

}