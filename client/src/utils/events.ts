// eslint-disable-next-line import/named
import {PayloadAction} from '@reduxjs/toolkit';

export interface EventHandlingState<TypesSet> {
  events: EventsWithStack<TypesSet>;
}

export interface Event<TypesSet> {
  type: TypesSet;
  payload?: any;
}

export interface EventsWithStack<TypesSet> {
  currEvent?: Event<TypesSet>;
  backStack: Event<TypesSet>[];
}

export const constructEventHandlingReducers = <TypesSet>() => ({
  postEvent: (state: EventHandlingState<TypesSet>, action: PayloadAction<Event<TypesSet>>) => {
    if (state.events.currEvent === undefined) {
      state.events.currEvent = action.payload;
    } else {
      state.events.backStack.push(action.payload);
    }
  },
  handleCurrentEvent: (state: EventHandlingState<TypesSet>) => {
    if (state.events.backStack.length === 0) {
      state.events.currEvent = undefined;
    } else {
      state.events.currEvent = state.events.backStack.shift();
    }
  },
});

export const eventsInitialState = {backStack: []};
