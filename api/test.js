(function t(a) {
    var c = () => {
        console.log(a);
    }
    module.exports.c = function () {
        return c()
    }
})()