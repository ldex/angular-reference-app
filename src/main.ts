/// <reference types="@angular/localize" />

import { bootstrapApplication, enableDebugTools } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { ApplicationRef } from '@angular/core';

bootstrapApplication(App, appConfig)
.then(moduleRef => {
	const applicationRef = moduleRef.injector.get(ApplicationRef);
	const componentRef = applicationRef.components[0];
	enableDebugTools(componentRef);
})
.catch((err) => console.error(err));
