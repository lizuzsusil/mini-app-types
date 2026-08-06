export interface NavigationTarget {
  app: string;
  route: string;
  params?: Record<string, string>;
  replace?: boolean;
}

export interface NavigationState {
  current: string;
  history: string[];
}

export interface NavigationRouterResult {
  consumed: boolean;
}

export interface NavigationRouterSkdModule {
  back(consumed?:boolean) : Promise<NavigationRouterResult>
  push(consumed?:boolean) : Promise<NavigationRouterResult>
}


export interface NavigationSdkModule {
  navigate(target: NavigationTarget): Promise<void>;
  getCurrent(): Promise<NavigationState>;
  router: NavigationRouterSkdModule
}
