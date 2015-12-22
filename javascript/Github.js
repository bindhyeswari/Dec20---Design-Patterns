// code to create a module

var Github = (function () {

    function Github() {

    }

    function init(path) { // private
        // 'Github.oauth.authorize'

        // automated namespacing ...
        // loop over github and try to create the data ...
        var modules = path.split('.');
        console.log(modules);
        if (modules[0] === 'Github') modules.shift();
        console.log(modules);
        var parent = Github;
        while(modules.length > 0) { // ["oauth", "authorize"]
            var module = modules.shift();
            if (typeof parent[module] === 'undefined') { // oauth['authorize']
                parent[module] = {};
            }
            parent = parent[module];
        }
        console.dir(Github);
        return parent;
    } // namespace pattern

    Github.search = {
        repos: function (term, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', 'https://api.github.com/search/repositories?q=' + term);
            xhr.addEventListener('readystatechange', function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        callback(null, xhr.responseText);
                    } else {
                        callback(xhr);
                    }
                }
            });
            xhr.send();
        }
    };

    init('Github.oauth.authorize').get = function () {
        console.log('This is the authorize get function ... ');
    };

    init('Github.oauth.authorize').set = function () {
        console.log('This is the authorize set function ... ');
    };

    return Github;

})();