import { Component, OnInit } from '@angular/core';
import { Spending } from '../models/spending.model';
import * as moment from 'moment';
import { TopicEnum } from '../enums/topic.enum';

@Component({
  selector: 'app-spendings',
  templateUrl: './spendings.component.html',
  styleUrls: ['./spendings.component.scss'],
})
export class SpendingsComponent implements OnInit {
  topic;
  constructor() {
    this.topic = TopicEnum 
  }
  isShowAddSpendPopup: boolean = false;

  spendings: Spending[] = [
    { item: 'Ball', count: 10, price: 300, uom: '₹', date: new Date() },
    { item: 'Bat', count: 10, price: 5, uom: '₹', date: new Date() },
    { item: 'Stump', count: 10, price: 6, uom: '₹', date: new Date() },
    { item: 'Grip', count: 5, price: 20, uom: '₹', date: new Date() },
    { item: 'Ball', count: 10, price: 300, uom: '₹', date: new Date() },
    { item: 'Bat', count: 10, price: 5, uom: '₹', date: new Date() },
    { item: 'Stump', count: 10, price: 6, uom: '₹', date: new Date() },
    { item: 'Grip', count: 5, price: 20, uom: '₹', date: new Date() },
    { item: 'Ball', count: 10, price: 300, uom: '₹', date: new Date() },
    { item: 'Bat', count: 10, price: 5, uom: '₹', date: new Date() },
    { item: 'Stump', count: 10, price: 6, uom: '₹', date: new Date() },
    { item: 'Grip', count: 5, price: 20, uom: '₹', date: new Date() },
  ];

  ngOnInit() {
    
  }

  formatDate(date: Date) {
    return moment(date).format('MMM, DD, YYYY');
  }
  showAddSpendPopup() {
    this.isShowAddSpendPopup = true;
  }

  closeAddSpendPopup() {
    this.isShowAddSpendPopup = false;
  }
}
