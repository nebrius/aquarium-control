"use strict";
/*
Copyright (C) 2013-2017 Bryan Hughes <bryan@nebri.us>

Aquarium Control is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Aquarium Control is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Aquarium Control.  If not, see <http://www.gnu.org/licenses/>.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const db_1 = require("./db");
class State extends events_1.EventEmitter {
    async init() {
        console.debug('[State]: initializing module');
        this._state = await db_1.getState();
        console.debug('[State]: module initalized');
    }
    getState() {
        console.debug('[State]: getting state');
        if (!this._state) {
            throw new Error('Internal Error: this._state is undefined');
        }
        return this._state;
    }
    setCurrentState(newState) {
        console.debug('[State]: setting current lighting state');
        if (!this._state) {
            throw new Error('Internal Error: this._state is undefined');
        }
        if (this._state.currentState === newState) {
            return;
        }
        this._state.currentState = newState;
        this._handleStateChange();
    }
    setCurrentMode(newMode) {
        console.debug('[State]: setting current mode');
        if (!this._state) {
            throw new Error('Internal Error: this._state is undefined');
        }
        if (this._state.currentMode === newMode) {
            return;
        }
        this._state.currentMode = newMode;
        this._handleStateChange();
    }
    setNextTransitionTime(date) {
        console.debug('[State]: setting next transition time');
        if (!this._state) {
            throw new Error('Internal Error: this._state is undefined');
        }
        this._state.nextTransitionTime = date.getTime();
        this._handleStateChange();
    }
    setNextTransitionState(newTransitionState) {
        console.debug('[State]: setting next transition state');
        if (!this._state) {
            throw new Error('Internal Error: this._state is undefined');
        }
        this._state.nextTransitionState = newTransitionState;
        this._handleStateChange();
    }
    setCurrentTemperature(newTemperature) {
        console.debug('[State]: setting current temperature');
        if (!this._state) {
            throw new Error('Internal Error: this._state is undefined');
        }
        this._state.currentTemperature = newTemperature;
        this._handleStateChange();
    }
    async _handleStateChange() {
        if (!this._state) {
            throw new Error('Internal Error: this._state is undefined');
        }
        await db_1.updateState(this._state);
        this.emit('change-state', this._state);
    }
}
exports.state = new State();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTs7QUFFRixtQ0FBc0M7QUFFdEMsNkJBQTZDO0FBRTdDLE1BQU0sS0FBTSxTQUFRLHFCQUFZO0lBSXZCLEtBQUssQ0FBQyxJQUFJO1FBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxhQUFRLEVBQUUsQ0FBQztRQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1NBQzdEO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxlQUFlLENBQUMsUUFBaUM7UUFDdEQsT0FBTyxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztTQUM3RDtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEtBQUssUUFBUSxFQUFFO1lBQ3pDLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQztRQUNwQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU0sY0FBYyxDQUFDLE9BQStCO1FBQ25ELE9BQU8sQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7U0FDN0Q7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxLQUFLLE9BQU8sRUFBRTtZQUN2QyxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFDbEMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVNLHFCQUFxQixDQUFDLElBQVU7UUFDckMsT0FBTyxDQUFDLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztTQUM3RDtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFTSxzQkFBc0IsQ0FBQyxrQkFBMkM7UUFDdkUsT0FBTyxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztTQUM3RDtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUM7UUFDckQsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVNLHFCQUFxQixDQUFDLGNBQXNCO1FBQ2pELE9BQU8sQ0FBQyxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7U0FDN0Q7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixHQUFHLGNBQWMsQ0FBQztRQUNoRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU8sS0FBSyxDQUFDLGtCQUFrQjtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7U0FDN0Q7UUFDRCxNQUFNLGdCQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBQ0Y7QUFFWSxRQUFBLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDIn0=