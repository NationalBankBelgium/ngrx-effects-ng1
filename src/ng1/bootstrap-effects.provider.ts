"use strict";

import {flatten} from "../util";

import {BootstrapEffectsProvider} from "./bootstrap-effects.provider.intf";
import IProvideService = ng.auto.IProvideService;

/**
 * Class that mimics the multiprovider of Angular 2.
 */
export class BootstrapEffectsProviderImpl implements BootstrapEffectsProvider {
  public $provide: IProvideService;
  public effects: string[];

  public static $inject: string[] = ["$provide"];

  public constructor($provide: IProvideService) {
    this.$provide = $provide;
    this.effects = [];
    this.$get.$inject = [];
  }

  public $get(...effects: any[]): any[] {
    return effects;
  }

  public runEffects(...effects: any[]): void {
    flatten(effects).map((effect: any) => {
      const effectName: string = this.getEffectName(effect);
      if (this.effects.indexOf(effectName) >= 0) {
        let message: string = "Another class with the injection name '" + effectName + "' has already been provided.";
        message += "\nEvery Effects class should have a unique injection name due to the limitations of the Angular1 DI system ";
        message += "(dependencies with the same names would clash, thus overriding each other).";
        throw new Error("ngrx-effects-ng1:" + message);
      }
      this.$provide.service(effectName, effect);
      (<string[]>this.$get.$inject).push(effectName);
      this.effects.push(effectName);
    });
  }

  private getEffectName(effect: any): string {
    // by default the constructor name will be taken
    let effectName: string = effect.name;
    // take the ng1InjectionName if defined
    if (effect.ng1InjectionName) {
      effectName = effect.ng1InjectionName;
    }

    return effectName;
  }
}
