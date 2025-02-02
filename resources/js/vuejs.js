window.__VueCRUD = require('vue').default;
import vSelect from "vue-select"
__VueCRUD.component('v-select', vSelect)

// register modules
const modules = require.context("./modules", true, /\.js$/i);
modules.keys().map(key => __VueCRUD.mixin(modules(key).default));

// Register components
const vues = require.context("./components", true, /\.vue$/i);
vues.keys().map(key =>
    __VueCRUD.component(
        key
            .split("/")
            .pop()
            .split(".")[0]
            .replace(/\.?([A-Z])/g, function (x, y) {
                return "-" + y.toLowerCase();
            })
            .replace(/^-/, "")
            .replace("-component", ""),
        vues(key).default
    )
);

const vuejsModules = [];

document.getElementsByClassName('crud-vuesjs').forEach(element => {
    vuejsModules.push(new __VueCRUD({
        el: element
    }));
});


__VueCRUD.filter('str_limit', function (value, size) {
    if (!value) return '';
    value = value.toString();
    if (value.length <= size) {
        return value;
    }
    return value.substr(0, size) + '...';
});
