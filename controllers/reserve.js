module.exports = function(router){
    router.post('/reserve', function (req, res) {
       res.status(200).json({hola : "test"});
    });
    return router;
};