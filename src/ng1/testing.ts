"use strict";

import {Action} from "@nationalbankbelgium/ngrx-store";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {filter} from "rxjs/operator/filter";
import {StateUpdate} from "../state-updates";

export class MockStateUpdates<S> extends ReplaySubject<StateUpdate<S | undefined>> {
  public constructor() {
    super();
  }

  public send(state: S, action: Action): void {
    this.next({state, action});
  }

  public sendAction(action: Action): void {
    this.next({state: <any>undefined, action});
  }

  public sendState(state: S): void {
    this.next({state, action: {type: "MOCK"}});
  }

  public whenAction(...actionTypes: string[]): Observable<StateUpdate<S>> {
    return filter.call(this, ({action}: StateUpdate<S>) => actionTypes.indexOf(action.type) > -1);
  }
}
