import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  template: `
    <h2>Web Worker Demo</h2>
    <div style="margin-bottom: 80px;margin-top: 40px">
      <p><input type="checkbox" [(ngModel)]="useWorker" /> Use worker ?</p>
      <button (click)="calculate()">{{ buttonText() }}</button>
      <h3>{{ result() }}</h3>
    </div>
  `,
})
export class WorkerDemo {
  useWorker = signal(true);
  result = signal('');
  buttonText = computed(() =>
    this.useWorker()
      ? 'Running 2s computation within a Web Worker...'
      : 'Running 2s computation as blocking script!'
  );

  constructor() {
    effect(() => {
      console.log('useWorker changed:', this.useWorker());
      this.result.set('');
    });
  }

  calculate() {
    this.useWorker() ? this.runInWorker() : this.blockingScript(2000);
  }

  private blockingScript(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
    this.result.set('Finished');
  }

  private runInWorker() {
    console.time('web worker duration');
    const worker = new Worker(new URL('../core/compute.worker', import.meta.url), {
      type: 'module',
    });
    worker.onmessage = ({ data }) => {
      console.log(data);
      console.timeEnd('web worker duration');
      this.result.set('Finished');
    };
    worker.postMessage(2000); // trigger the work inside the worker
  }
}
