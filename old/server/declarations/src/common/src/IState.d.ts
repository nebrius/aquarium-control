export interface IState {
    deviceId: string;
    currentTime: number;
    currentTemperature: number;
    currentState: 'day' | 'night' | 'off';
    currentMode: 'program' | 'override';
    nextTransitionTime: number;
    nextTransitionState: 'day' | 'night' | 'off';
}
