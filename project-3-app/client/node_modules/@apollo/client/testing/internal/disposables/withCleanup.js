import { __assign } from "tslib";
export function withCleanup(item, cleanup) {
    var _a;
    return __assign(__assign({}, item), (_a = {}, _a[Symbol.dispose] = function () {
        cleanup(item);
        if (Symbol.dispose in item) {
            item[Symbol.dispose]();
        }
    }, _a));
}
//# sourceMappingURL=withCleanup.js.map