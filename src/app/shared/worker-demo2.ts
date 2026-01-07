import { isPlatformBrowser } from '@angular/common';
import { Component, computed, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  template: `
    <h2>Web Worker Lighthouse Demo</h2>
    <div style="margin-bottom: 80px;margin-top: 40px">
      <h3>
        {{ title() }}
      </h3>
    </div>
  `,
})
export class WorkerDemo2 {
  useWorker = signal(true); // Lighthouse requires the worker to be used to pass the audit

  result = signal('');
  isCalculating = signal(false);
  title = computed(() =>
    this.useWorker()
      ? 'Running 2s computation in the constructor (using a Web Worker)'
      : 'Running 2s computation in the constructor (blocking script)!'
  );
  private readonly platform = inject(PLATFORM_ID);

  constructor() {
    // This app is using SSR so we need to check the platform (workers are not supported on the server)
    if (isPlatformBrowser(this.platform)) {
      this.calculate();
    }
  }

  calculate() {
    this.result.set('');
    this.useWorker() ? this.runInWorker() : this.blockingScript(2000);
  }

  private blockingScript(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    this.isCalculating.set(true);
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
    this.result.set('Finished');
    this.isCalculating.set(false);
  }

  private runInWorker() {
    console.time('web worker duration.');
    this.isCalculating.set(true);
    const worker = new Worker(new URL('../core/compute.worker', import.meta.url), {
      type: 'module',
    });
    worker.onmessage = ({ data }) => {
      console.log(data);
      console.timeEnd('web worker duration.');
      this.result.set('Finished');
    this.isCalculating.set(false);
    };
    worker.postMessage(2000); // trigger the work inside the worker
  }
}
