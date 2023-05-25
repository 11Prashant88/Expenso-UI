import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
@Component({
  selector: 'app-utilization',
  templateUrl: './utilization.component.html',
  styleUrls: ['./utilization.component.css'],
})
export class UtilizationComponent implements OnInit {
  public options: any = {
    colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
      return {
        radialGradient: {
          cx: 0.5,
          cy: 0.3,
          r: 0.7,
        },
        stops: [
          [0, color],
          [1, Highcharts.color(color).brighten(-0.3).get('rgb')], // darken
        ],
      };
    }),
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'Funds Utilization',
      align: 'center',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '₹',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: 'Spent',
        colorByPoint: true,
        data: [
          {
            name: 'Bat',
            y: 10000,
            drilldown: 'Bat-drillown',
          },
          {
            name: 'Ball',
            y: 300,
          },
          {
            name: 'Stump',
            y: 2000,
          },
          {
            name: 'Grip',
            y: 1000,
          },
          {
            name: 'Other',
            y: 500,
          },
        ],
      },
    ],
  };

  constructor() {}

  ngOnInit() {
    Highcharts.chart('container', this.options);
  }
}
