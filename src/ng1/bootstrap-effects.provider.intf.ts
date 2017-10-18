"use strict";

import {IServiceProvider} from "angular";

export interface BootstrapEffectsProvider extends IServiceProvider {
  runEffects(...effects: any[]): void;
}
