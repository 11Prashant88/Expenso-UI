import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
import { map } from 'rxjs/operators';
import { Expense } from '../models/expense.model';
import { ExpenseService } from '../services/expense.service';
Drilldown(Highcharts);
@Component({
  selector: 'app-utilization',
  templateUrl: './utilization.component.html',
  styleUrls: ['./utilization.component.css'],
})
export class UtilizationComponent implements OnInit {
  public expenses: any[] = [];
  public options: any;
  public loadingExpenses: boolean = false;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.getExpenses();
  }

  getExpenses(){
    this.loadingExpenses = true;
    this.expenseService.getExpenses().pipe(map((expenses)=>{return expenses.map((s)=>{return {name:s.item, y:s.price}})})).subscribe((expenses:[])=>{
      this.expenses = this.groupByName(expenses, 'name');
      this.prepareChart();
      this.drawChart();
      this.loadingExpenses = false;
    }, ()=>{
      this.loadingExpenses = false;
    })
  }

  groupByName(expenses, prop) {
    let arr = []
    return expenses.reduce(function (acc, item) {
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
          data: this.expenses
        },
      ],
    };
  }

  drawChart(){
    Highcharts.chart('container', this.options);
  }
}
