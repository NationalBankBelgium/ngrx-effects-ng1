"use strict";

import {IModule} from "angular";
import * as angular from "angular";
import IProvideService = ng.auto.IProvideService;

import {Store, Dispatcher, State} from "@nationalbankbelgium/ngrx-store";
import {ngrxModuleName, ngrxStoreName, ngrxDispatcherName, ngrxStateName} from "@nationalbankbelgium/ngrx-store/ng1";
import {StateUpdates} from "../state-updates";

import {connectEffectsToStore} from "../effects";

import {
  ngrxEffectsModuleName,
  ngrxEffectsName,
  ngrxBootstrapEffectsName
} from "./constants";

import {BootstrapEffectsProviderImpl} from "./bootstrap-effects.provider";

export const ngrxEffectsNg1Module: IModule = angular.module(ngrxEffectsModuleName, [ngrxModuleName]);

ngrxEffectsNg1Module.provider(ngrxBootstrapEffectsName, BootstrapEffectsProviderImpl);

ngrxEffectsNg1Module.config(["$provide", ($provide: IProvideService) => {

  $provide.factory(ngrxEffectsName, [ngrxDispatcherName, ngrxStateName, (dispatcher: Dispatcher, state: State<any>) => {
    return new StateUpdates<any>(dispatcher, state);
  }]);
}]);

ngrxEffectsNg1Module.run([ngrxStoreName, ngrxBootstrapEffectsName, (store: Store<any>, effects: any[]) => {
  connectEffectsToStore(store, effects)();
}]);
