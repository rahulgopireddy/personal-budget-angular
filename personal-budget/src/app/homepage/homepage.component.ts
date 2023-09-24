import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApidataService } from '../apidata.service';
import * as d3 from 'd3';
@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit {
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;
  public dataSource: any = {
    labels: [],
    datasets: [
      {
        label: 'My First Dataset',
        data: [],
        backgroundColor: [],
        hoverOffset: 4,
      },
    ],
  };
  private statusFlag = false;
  constructor(private http: HttpClient, private apiService: ApidataService) {}

  ngAfterViewInit(): void {
    if (!this.statusFlag) {
      this.apiService.data$.subscribe((res: any) => {
        for (var i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;
          this.dataSource.datasets[0].backgroundColor[i] =
            res.myBudget[i].colorCode;
        }

        this.statusFlag = true;
        this.createChart();
        this.createD3Chart(res.dy_data);
      });
    }

    this.apiService.getBudgetData();
  }

  createD3Chart(data: any) {
    console.log(data);
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3
      .pie<any>()
      .sort(null)
      .value((d) => d.value);

    const path: any = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const label = d3
      .arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);
    const arc = svg
      .selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arc
      .append('path')
      .attr('d', path)
      .attr('fill', (d) => color(d.data.label));

    arc
      .append('text')
      .attr('transform', (d: any) => `translate(${label.centroid(d)})`)
      .attr('dy', '0.35em')
      .text((d) => d.data.label);
  }
  createChart() {
    var ctx: any = document.getElementById('myChart');
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource,
    });
  }
}
