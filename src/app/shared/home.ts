import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [RouterLink],
    template: `
        <h2>Demo Project</h2>
        <div style="margin-bottom: 80px">
            Demos:
            <ul>
                <li><a routerLink="/errors" routerLinkActive="active">Testing errors</a></li>
                <li><a routerLink="/worker" routerLinkActive="active">Using Web Worker</a></li>
            </ul>
        </div>
    `
})
export class Home {
    constructor() { }

}