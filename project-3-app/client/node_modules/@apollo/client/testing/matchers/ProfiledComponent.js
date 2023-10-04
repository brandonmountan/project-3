import { __assign, __awaiter, __generator } from "tslib";
import { WaitForRenderTimeoutError } from "../internal/index.js";
export var toRerender = function (_profiled, options) {
    return __awaiter(this, void 0, void 0, function () {
        var profiled, hint, pass, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    profiled = "ProfiledComponent" in _profiled
                        ? _profiled.ProfiledComponent
                        : _profiled;
                    hint = this.utils.matcherHint("toRerender");
                    pass = true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, profiled.peekRender(__assign({ timeout: 100 }, options))];
                case 2:
                    _a.sent();
                    return [3, 4];
                case 3:
                    e_1 = _a.sent();
                    if (e_1 instanceof WaitForRenderTimeoutError) {
                        pass = false;
                    }
                    else {
                        throw e_1;
                    }
                    return [3, 4];
                case 4: return [2, {
                        pass: pass,
                        message: function () {
                            return (hint +
                                " Expected component to".concat(pass ? " not" : "", " rerender, ") +
                                "but it did".concat(pass ? "" : " not", "."));
                        },
                    }];
            }
        });
    });
};
var failed = {};
export var toRenderExactlyTimes = function (_profiled, times, optionsPerRender) {
    return __awaiter(this, void 0, void 0, function () {
        var profiled, options, hint, pass, e_2, e_3, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    profiled = "ProfiledComponent" in _profiled ? _profiled.ProfiledComponent : _profiled;
                    options = __assign({ timeout: 100 }, optionsPerRender);
                    hint = this.utils.matcherHint("toRenderExactlyTimes");
                    pass = true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 11, , 12]);
                    if (profiled.currentRenderCount() > times) {
                        throw failed;
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, , 7]);
                    _a.label = 3;
                case 3:
                    if (!(profiled.currentRenderCount() < times)) return [3, 5];
                    return [4, profiled.waitForNextRender(options)];
                case 4:
                    _a.sent();
                    return [3, 3];
                case 5: return [3, 7];
                case 6:
                    e_2 = _a.sent();
                    throw e_2 instanceof WaitForRenderTimeoutError ? failed : e_2;
                case 7:
                    _a.trys.push([7, 9, , 10]);
                    return [4, profiled.waitForNextRender(options)];
                case 8:
                    _a.sent();
                    return [3, 10];
                case 9:
                    e_3 = _a.sent();
                    if (!(e_3 instanceof WaitForRenderTimeoutError)) {
                        throw e_3;
                    }
                    return [3, 10];
                case 10: return [3, 12];
                case 11:
                    e_4 = _a.sent();
                    if (e_4 === failed) {
                        pass = false;
                    }
                    else {
                        throw e_4;
                    }
                    return [3, 12];
                case 12: return [2, {
                        pass: pass,
                        message: function () {
                            return (hint +
                                " Expected component to".concat(pass ? " not" : "", " render exactly ").concat(times, ".") +
                                " It rendered ".concat(profiled.currentRenderCount(), " times."));
                        },
                    }];
            }
        });
    });
};
//# sourceMappingURL=ProfiledComponent.js.map