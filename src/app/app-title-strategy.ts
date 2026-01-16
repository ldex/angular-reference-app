import { EnvironmentProviders, Injectable, makeEnvironmentProviders } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { TitleStrategy, RouterStateSnapshot } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AppTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }
  override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`Angular Store | ${title}`);
    }
  }
}

export function provideAppTitleStrategy(): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: TitleStrategy, useClass: AppTitleStrategy }]);
}

