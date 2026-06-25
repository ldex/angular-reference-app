import { EnvironmentProviders, Service, inject, makeEnvironmentProviders } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { TitleStrategy, RouterStateSnapshot } from "@angular/router";

@Service()
export class AppTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);

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

