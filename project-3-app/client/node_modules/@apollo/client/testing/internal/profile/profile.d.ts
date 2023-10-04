import * as React from "react";
import type { Render, BaseRender } from "./Render.js";
type ValidSnapshot = void | (object & {
    call?: never;
});
declare const _stackTrace: unique symbol;
export interface NextRenderOptions {
    timeout?: number;
    [_stackTrace]?: string;
}
export interface ProfiledComponent<Props, Snapshot> extends React.FC<Props>, ProfiledComponentFields<Props, Snapshot>, ProfiledComponenOnlyFields<Props, Snapshot> {
}
interface UpdateSnapshot<Snapshot> {
    (newSnapshot: Snapshot): void;
    (updateSnapshot: (lastSnapshot: Readonly<Snapshot>) => Snapshot): void;
}
interface ProfiledComponenOnlyFields<Props, Snapshot> {
    updateSnapshot: UpdateSnapshot<Snapshot>;
}
interface ProfiledComponentFields<Props, Snapshot> {
    renders: Array<Render<Snapshot> | {
        phase: "snapshotError";
        count: number;
        error: unknown;
    }>;
    peekRender(options?: NextRenderOptions): Promise<Render<Snapshot>>;
    takeRender(options?: NextRenderOptions): Promise<Render<Snapshot>>;
    currentRenderCount(): number;
    getCurrentRender(): Render<Snapshot>;
    takeUntilRenderCount(count: number, optionsPerRender?: NextRenderOptions): Promise<void>;
    waitForNextRender(options?: NextRenderOptions): Promise<Render<Snapshot>>;
}
export declare function profile<Snapshot extends ValidSnapshot = void, Props = Record<string, never>>({ Component, onRender, snapshotDOM, initialSnapshot, }: {
    Component: React.ComponentType<Props>;
    onRender?: (info: BaseRender & {
        snapshot: Snapshot;
        updateSnapshot: UpdateSnapshot<Snapshot>;
    }) => void;
    snapshotDOM?: boolean;
    initialSnapshot?: Snapshot;
}): ProfiledComponent<Props, Snapshot>;
export declare class WaitForRenderTimeoutError extends Error {
    constructor();
}
type StringReplaceRenderWithSnapshot<T extends string> = T extends `${infer Pre}Render${infer Post}` ? `${Pre}Snapshot${Post}` : T;
type ResultReplaceRenderWithSnapshot<T> = T extends (...args: infer Args) => Render<infer Snapshot> ? (...args: Args) => Snapshot : T extends (...args: infer Args) => Promise<Render<infer Snapshot>> ? (...args: Args) => Promise<Snapshot> : T;
type ProfiledHookFields<Props, ReturnValue> = ProfiledComponentFields<Props, ReturnValue> extends infer PC ? {
    [K in keyof PC as StringReplaceRenderWithSnapshot<K & string>]: ResultReplaceRenderWithSnapshot<PC[K]>;
} : never;
export interface ProfiledHook<Props, ReturnValue> extends React.FC<Props>, ProfiledHookFields<Props, ReturnValue> {
    ProfiledComponent: ProfiledComponent<Props, ReturnValue>;
}
export declare function profileHook<ReturnValue extends ValidSnapshot, Props>(renderCallback: (props: Props) => ReturnValue): ProfiledHook<Props, ReturnValue>;
export {};
//# sourceMappingURL=profile.d.ts.map