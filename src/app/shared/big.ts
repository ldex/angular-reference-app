import { Component } from '@angular/core';

@Component({
  selector: 'big-component',
  imports: [],
  template: `
    <div style="border: solid 2px black; padding: 10px; border-radius: 8px;background-color: #e0e0e0">
      <h2>This is a big component</h2>
      <div style="margin-bottom: 80px;margin-top: 40px">
        It is managing tons of stuff (charts, dashboard, ...)
      </div>
    </div>
  `,
})
export class BigDemo {}
