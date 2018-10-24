import { Component, ViewChild, ElementRef } from '@angular/core';
import { Continent, continents } from './continents';

@Component({
    templateUrl: './dashboard-chart.component.html',
    styleUrls: ['./dashboard-chart.component.css'],
})
export class DashboardChartComponent {
    @ViewChild('kaplanPie') kaplanPie: ElementRef;

    continents: Continent[];
    population: number;
    selectedContinent: string;
    total: number;
    populationPercentage: number;
    pie: any;

    constructor() {
        this.continents = continents;
        this.population = this.continents[0].population;
        this.selectedContinent = this.continents[0].denomination;
        this.total = 158;
        this.setPopulationPercentage(this.population, this.total);
    }

    ngAfterViewInit() {
        this.pie = this.kaplanPie.nativeElement;
        this.setPieStroke();
    }

    setPieStroke() {
        this.pie.style.strokeDasharray = this.populationPercentage + ' ' + this.total;
    }

    setPopulationPercentage(population: number, total: number) {
        this.populationPercentage = ((population * total) / 100);
    }

    setContinent(continent: Continent) {
        this.population = continent.population;
        this.selectedContinent = continent.denomination;
        this.setPopulationPercentage(this.population, this.total);
        this.setPieStroke();
    }

    isSelected(continent: Continent) {
        return continent.denomination === this.selectedContinent;
    }
}
