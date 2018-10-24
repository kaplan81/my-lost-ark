import { Component } from '@angular/core';
import { Continent, continents } from './continents';

@Component({
    templateUrl: './dashboard-table.component.html',
    styleUrls: ['./dashboard-table.component.css']
})
export class DashboarTableComponent {
    continents: Continent[];

    constructor() {
        this.continents = continents;
    }
}