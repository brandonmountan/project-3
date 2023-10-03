var _a, _b;
import { __assign, __awaiter, __extends, __generator } from "tslib";
import * as React from "react";
import { TextEncoder, TextDecoder } from "util";
(_a = global.TextEncoder) !== null && _a !== void 0 ? _a : (global.TextEncoder = TextEncoder);
(_b = global.TextDecoder) !== null && _b !== void 0 ? _b : (global.TextDecoder = TextDecoder);
import { RenderInstance } from "./Render.js";
import { applyStackTrace, captureStackTrace } from "./traces.js";
var _stackTrace = Symbol();
export function profile(_a) {
    var Component = _a.Component, onRender = _a.onRender, _b = _a.snapshotDOM, snapshotDOM = _b === void 0 ? false : _b, initialSnapshot = _a.initialSnapshot;
    var currentRender;
    var nextRender;
    var resolveNextRender;
    var rejectNextRender;
    var snapshotRef = { current: initialSnapshot };
    var updateSnapshot = function (snap) {
        if (typeof snap === "function") {
            if (!initialSnapshot) {
                throw new Error("Cannot use a function to update the snapshot if no initial snapshot was provided.");
            }
            snapshotRef.current = snap(typeof snapshotRef.current === "object"
                ? __assign({}, snapshotRef.current) : snapshotRef.current);
        }
        else {
            snapshotRef.current = snap;
        }
    };
    var profilerOnRender = function (id, phase, actualDuration, baseDuration, startTime, commitTime) {
        var baseRender = {
            id: id,
            phase: phase,
            actualDuration: actualDuration,
            baseDuration: baseDuration,
            startTime: startTime,
            commitTime: commitTime,
            count: Profiled.renders.length + 1,
        };
        try {
            onRender === null || onRender === void 0 ? void 0 : onRender(__assign(__assign({}, baseRender), { updateSnapshot: updateSnapshot, snapshot: snapshotRef.current }));
            var snapshot = snapshotRef.current;
            var domSnapshot = snapshotDOM
                ? window.document.body.innerHTML
                : undefined;
            var render = new RenderInstance(baseRender, snapshot, domSnapshot);
            currentRender = render;
            Profiled.renders.push(render);
            resolveNextRender === null || resolveNextRender === void 0 ? void 0 : resolveNextRender(render);
        }
        catch (error) {
            Profiled.renders.push({
                phase: "snapshotError",
                count: Profiled.renders.length,
                error: error,
            });
            rejectNextRender === null || rejectNextRender === void 0 ? void 0 : rejectNextRender(error);
        }
        finally {
            nextRender = resolveNextRender = rejectNextRender = undefined;
        }
    };
    var iteratorPosition = 0;
    var Profiled = Object.assign(function (props) { return (React.createElement(React.Profiler, { id: "test", onRender: profilerOnRender },
        React.createElement(Component, __assign({}, props)))); }, {
        updateSnapshot: updateSnapshot,
    }, {
        renders: new Array(),
        currentRenderCount: function () {
            return Profiled.renders.length;
        },
        peekRender: function (options) {
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var render_1, render;
                var _a;
                return __generator(this, function (_b) {
                    if (iteratorPosition < Profiled.renders.length) {
                        render_1 = Profiled.renders[iteratorPosition];
                        if (render_1.phase === "snapshotError") {
                            throw render_1.error;
                        }
                        return [2, render_1];
                    }
                    render = Profiled.waitForNextRender(__assign((_a = {}, _a[_stackTrace] = captureStackTrace(Profiled.peekRender), _a), options));
                    return [2, render];
                });
            });
        },
        takeRender: function (options) {
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var error, e_1;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            error = undefined;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            return [4, Profiled.peekRender(__assign((_a = {}, _a[_stackTrace] = captureStackTrace(Profiled.takeRender), _a), options))];
                        case 2: return [2, _b.sent()];
                        case 3:
                            e_1 = _b.sent();
                            error = e_1;
                            throw e_1;
                        case 4:
                            if (!(error && error instanceof WaitForRenderTimeoutError)) {
                                iteratorPosition++;
                            }
                            return [7];
                        case 5: return [2];
                    }
                });
            });
        },
        getCurrentRender: function () {
            if (!currentRender) {
                throw new Error("Has not been rendered yet!");
            }
            return currentRender;
        },
        takeUntilRenderCount: function (count, optionsPerRender) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(Profiled.renders.length < count)) return [3, 2];
                            return [4, Profiled.takeRender(optionsPerRender)];
                        case 1:
                            _a.sent();
                            return [3, 0];
                        case 2: return [2];
                    }
                });
            });
        },
        waitForNextRender: function (_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.timeout, timeout = _c === void 0 ? 1000 : _c, _d = _stackTrace, _e = _b[_d], stackTrace = _e === void 0 ? captureStackTrace(Profiled.waitForNextRender) : _e;
            if (!nextRender) {
                nextRender = Promise.race([
                    new Promise(function (resolve, reject) {
                        resolveNextRender = resolve;
                        rejectNextRender = reject;
                    }),
                    new Promise(function (_, reject) {
                        return setTimeout(function () {
                            return reject(applyStackTrace(new WaitForRenderTimeoutError(), stackTrace));
                        }, timeout);
                    }),
                ]);
            }
            return nextRender;
        },
    });
    return Profiled;
}
var WaitForRenderTimeoutError = (function (_super) {
    __extends(WaitForRenderTimeoutError, _super);
    function WaitForRenderTimeoutError() {
        var _newTarget = this.constructor;
        var _this = _super.call(this, "Exceeded timeout waiting for next render.") || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return WaitForRenderTimeoutError;
}(Error));
export { WaitForRenderTimeoutError };
export function profileHook(renderCallback) {
    var returnValue;
    var Component = function (props) {
        ProfiledComponent.updateSnapshot(renderCallback(props));
        return null;
    };
    var ProfiledComponent = profile({
        Component: Component,
        onRender: function () { return returnValue; },
    });
    return Object.assign(function ProfiledHook(props) {
        return React.createElement(ProfiledComponent, __assign({}, props));
    }, {
        ProfiledComponent: ProfiledComponent,
    }, {
        renders: ProfiledComponent.renders,
        currentSnapshotCount: ProfiledComponent.currentRenderCount,
        peekSnapshot: function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, ProfiledComponent.peekRender(options)];
                        case 1: return [2, (_a.sent()).snapshot];
                    }
                });
            });
        },
        takeSnapshot: function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, ProfiledComponent.takeRender(options)];
                        case 1: return [2, (_a.sent()).snapshot];
                    }
                });
            });
        },
        getCurrentSnapshot: function () {
            return ProfiledComponent.getCurrentRender().snapshot;
        },
        takeUntilSnapshotCount: ProfiledComponent.takeUntilRenderCount,
        waitForNextSnapshot: function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, ProfiledComponent.waitForNextRender(options)];
                        case 1: return [2, (_a.sent()).snapshot];
                    }
                });
            });
        },
    });
}
//# sourceMappingURL=profile.js.map