import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [RouterLink],
    template: `
        <h2>Demo Project</h2>
        <div style="margin-bottom: 80px">
            <a routerLink="/errors" routerLinkActive="active">Testing errors</a>
        </div>
    `
})
export class Home {
    constructor() { }

}