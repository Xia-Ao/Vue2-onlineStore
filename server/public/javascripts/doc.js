// function saveDoc (doc, res) {
//
// }

exports.saveDoc = function (doc, res) {
    // 保存操作
    doc.save((err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: 'success'
            });
        }
    });
};
