/// <reference types="node" />
import { EventEmitter } from 'events';
import { IState } from './common/common';
declare class State extends EventEmitter {
    private _state;
    init(): Promise<void>;
    getState(): IState;
    setCurrentState(newState: 'day' | 'night' | 'off'): void;
    setCurrentMode(newMode: 'program' | 'override'): void;
    setNextTransitionTime(date: Date): void;
    setNextTransitionState(newTransitionState: 'day' | 'night' | 'off'): void;
    setCurrentTemperature(newTemperature: number): void;
    private _handleStateChange;
}
export declare const state: State;
export {};
