import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
import { map } from 'rxjs/operators';
import { Spending } from '../models/spending.model';
import { SpendingService } from '../services/spending.service';
Drilldown(Highcharts);
@Component({
  selector: 'app-utilization',
  templateUrl: './utilization.component.html',
  styleUrls: ['./utilization.component.css'],
})
export class UtilizationComponent implements OnInit {
  public spendings: any[] = [];
  public options: any;

  constructor(private spendingService: SpendingService) {}

  ngOnInit() {
    this.getSpendings();
  }

  getSpendings(){
    this.spendingService.getSpendings().pipe(map((spending)=>{return spending.map((s)=>{return {name:s.item, y:s.price}})})).subscribe((spendings:[])=>{
      this.spendings = this.groupByName(spendings, 'name');
      this.prepareChart();
      this.drawChart();
    })
  }

  groupByName(spendings, prop) {
    let arr = []
    return spendings.reduce(function (acc, item) {
      let key = item[prop]
      if(!arr.includes(key)){
        arr.push(key);
        acc.push({name:key, y:item.y});
      } else {
        let a = acc.find((a)=>{return a.name === key});
        a.y = a.y + item.y
      }
      return acc
    }, [])
  }

  prepareChart(){
    this.options = {
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
          data: this.spendings
        },
      ],
    };
  }

  drawChart(){
    Highcharts.chart('container', this.options);
  }
}
