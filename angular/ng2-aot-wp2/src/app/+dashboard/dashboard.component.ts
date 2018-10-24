import { Component } from '@angular/core';

@Component({
    template: `
        <main class="container">
            <router-outlet></router-outlet>
        </main>
    `
})
export class DashboardComponent {
    constructor() { }
}
