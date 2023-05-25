import { Component, OnInit } from '@angular/core';
import { TopicEnum } from '../enums/topic.enum';
import { Contribution } from '../models/contribution.model';

@Component({
  selector: 'app-contributions',
  templateUrl: './contributions.component.html',
  styleUrls: ['./contributions.component.scss'],
})
export class ContributionsComponent implements OnInit {
  topic
  constructor() {
    this.topic = TopicEnum
  }

  contributions: Contribution[];

  isShowContributinSpendPopup: boolean = false;

  ngOnInit() {
    this.contributions = [
      { name: 'Prashant', id: 'abc', amount: 1000, uom: '₹' },
      { name: 'Prashant', id: 'abc', amount: 1000, uom: '₹' },
      { name: 'Prashant', id: 'abc', amount: 1000, uom: '₹' },
      { name: 'Prashant', id: 'abc', amount: 1000, uom: '₹' },
      { name: 'Prashant', id: 'abc', amount: 1000, uom: '₹' },
      { name: 'Prashant', id: 'abc', amount: 1000, uom: '₹' },
      { name: 'Prashant', id: 'abc', amount: 1000, uom: '₹' },
      { name: 'Prashant', id: 'abc', amount: 1000, uom: '₹' },
      { name: 'Prashant', id: 'abc', amount: 1000, uom: '₹' },
      { name: 'Prashant', id: 'abc', amount: 1000, uom: '₹' },
      { name: 'Prashant', id: 'abc', amount: 1000, uom: '₹' },
      { name: 'Prashant', id: 'abc', amount: 1000, uom: '₹' },
      { name: 'Prashant', id: 'abc', amount: 1000, uom: '₹' },
      { name: 'Prashant', id: 'abc', amount: 1000, uom: '₹' },
      { name: 'Prashant', id: 'abc', amount: 1000, uom: '₹' },
      { name: 'Prashant', id: 'abc', amount: 1000, uom: '₹' },
    ];
  }

  showAddContributionSpendPopup() {
    this.isShowContributinSpendPopup = true;
  }

  closeAddContributionSpendPopup() {
    this.isShowContributinSpendPopup = false;
  }
}
