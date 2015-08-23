function classname () {
    var result = {},
        objects = {},
        resultString = "";

    function add (strings) {
        classname.each(strings.split(" "), function (string) {
            result[string] = !!string;
        });
    }

    classname.each([].slice.call(arguments), function (x) {
        switch (classname.getType(x)) {
        case "string":
        case "number":
            add(x);
            break;

        case "array":
            add(classname.apply(null, x));
            break;

        case "element":
            add(classname(x.className || ""));
            break;

        case "nodelist":
            add(classname.apply(null, [].slice.call(x)));
            break;

        case "jquery":
            add(classname.apply(null, x.get()));
            break;

        case "object":
            objects = classname.extend(objects, x);
            break;
        }
    });

    result = classname.extend(result, objects);

    classname.each(result, function (val, key) {
        if (val) {
            resultString += " " + key;
        }
    });

    return resultString.substr(1);
}

classname.setTo = function (elements) {
    var type = classname.getType(elements);

    if (type === "element") {
        elements = [elements];
    }

    if (type === "jquery") {
        elements = elements.get();
    }

    if (type === "nodelist") {
        elements = [].slice.call(elements);
    }

    return function () {
        var classNames = classname.apply(null, arguments);

        classname.each(elements, function (element) {
            element.className = classNames;
        });
    };
};

classname.each = function (arr, fn) {
    var type = classname.getType(arr);

    if (type === "array") {
        for (var i = 0; i < arr.length; i++) {
            fn(arr[i], i);
        }
    }

    if (type === "object") {
        for (var key in arr) {
            fn(arr[key], key);
        }
    }
};

classname.getType = function (x) {
    var type = Object.prototype.toString.call(x).slice(8, -1).toLowerCase();

    if (type === "object" && x.jquery) {
        return "jquery";
    }

    if (type.indexOf("element") > 1) {
        return "element";
    }

    return type;
};

classname.extend = function (obj1, obj2) {
    var result = {},
        objs = [obj1, obj2];

    classname.each(objs, function (obj) {
        classname.each(obj, function (val, key) {
            if (obj.hasOwnProperty(key)) {
                result[key] = val;
            }
        });
    });

    return result;
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = classname;
}
