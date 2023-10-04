import { Component, OnInit } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { SUBMIT_TYPE } from '../enums/submit-type.enum';
import { Birthday } from '../models/birthday.model';
import { BirthdayService } from '../services/birthday.service';
import * as moment from 'moment';
import * as _ from 'lodash'
import { TopicEnum } from '../enums/topic.enum';
import { CONFIRMATION_TYPES } from '../enums/confirmation-types.enum';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.scss']
})
export class BirthdaysComponent implements OnInit {

  topic;
  public submitType = { ...SUBMIT_TYPE }
  public editId: string;
  public mode: string = 'add';
  private deleteId: string;
  isShowBirthdayPopup: boolean = false;
  birthdays: { [key: string]: Birthday[] }[] = [];
  allBirthdays: Birthday[] = [];
  public loadingBirthdays: boolean = false;
  public showdeleteBirthdayPopup: boolean = false;
  public confirmationTypes = { ...CONFIRMATION_TYPES };
  public isAuthenticated: boolean = false;
  toastContainer: ToastContainerDirective;
  constructor(private birthdayService: BirthdayService,
    private toastr: ToastrService, private authService: AuthService) {
    this.topic = TopicEnum
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authService.getIsAuth().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    })
    this.toastr.overlayContainer = this.toastContainer;
    this.getBirthdays();
  }

  showAddBirthdayPopup(id?: string) {
    this.editId = id;
    this.mode = this.editId ? this.submitType.EDIT : this.submitType.SUBMIT;
    this.isShowBirthdayPopup = true;
  }

  monthlyBirthdays(bdate: { [s: string]: Birthday }) {
    return bdate[Object.keys(bdate)[0]]
  }

  closeAddBirthdayPopup() {
    this.isShowBirthdayPopup = false;
  }

  getBirthdays() {
    this.birthdays = [];
    this.loadingBirthdays = true;
    this.birthdayService.getBirthdays().subscribe((birthdays: Birthday[]) => {
      this.allBirthdays = birthdays;
      birthdays = _.groupBy(birthdays, ({ dob }) => new Date(dob).getMonth()+1);

      // Object.keys(birthdays).forEach((month)=>{
      //   birthdays[month] = _.groupBy(birthdays[month], ({dob})=> moment(dob).format('DD'));
      // })
      Object.keys(birthdays).forEach((k) => {
        let obj = {}
        obj[k] = birthdays[k]
        obj[k] = obj[k].sort((a, b) => {
          if ((new Date(a.dob).getDate()) > (new Date(b.dob).getDate())) {
            return 1;
          } else if ((new Date(a.dob).getDate()) < (new Date(b.dob).getDate())) {
            return -1;
          } else {
            return 0;
          }
        })
        this.birthdays.push(obj)
      })
      this.loadingBirthdays = false;
    }, () => {
      this.loadingBirthdays = false;
    })
  }

  addBirthday(birthday: Birthday) {
    this.birthdayService.creating = true;
    this.birthdayService.addBirthday(birthday).subscribe((birthday: Birthday) => {
      this.birthdays = [];
      this.allBirthdays = [...this.allBirthdays, birthday];
      let birthdays = this.allBirthdays;
      birthdays = _.groupBy(this.allBirthdays, ({ dob }) => new Date(dob).getMonth()+1);
      Object.keys(birthdays).forEach((k) => {
        let obj = {}
        obj[k] = birthdays[k]
        obj[k] = obj[k].sort((a, b) => {
          if ((new Date(a.dob).getDate()) > (new Date(b.dob).getDate())) {
            return 1;
          } else if ((new Date(a.dob).getDate()) < (new Date(b.dob).getDate())) {
            return -1;
          } else {
            return 0;
          }
        })
        this.birthdays.push(obj)
      })
      this.closeAddBirthdayPopup()
      this.birthdayService.creating = false;
      this.toastr.success(`Birthday added : ${birthday.name}`, 'Success');
    }, (err) => {
      this.birthdayService.creating = false;
    })
  }

  editBirthday(data: { id: string, birthday: Birthday }) {
    this.birthdayService.creating = true;
    this.birthdayService.editBirthday(data).subscribe((birthday: Birthday) => {
      console.log('')
      this.birthdays = [];
      const cont = this.allBirthdays.findIndex((c) => { return c.id === data.id })
      if (cont != -1) {
        this.allBirthdays[cont] = birthday;
      }
      let birthdays = this.allBirthdays;
      birthdays = _.groupBy(this.allBirthdays, ({ dob }) => new Date(dob).getMonth()+1);
      Object.keys(birthdays).forEach((k) => {
        let obj = {}
        obj[k] = birthdays[k]
        obj[k] = obj[k].sort((a, b) => {
          if ((new Date(a.dob).getDate()) > (new Date(b.dob).getDate())) {
            return 1;
          } else if ((new Date(a.dob).getDate()) < (new Date(b.dob).getDate())) {
            return -1;
          } else {
            return 0;
          }
        })
        this.birthdays.push(obj)
      })
      this.closeAddBirthdayPopup()
      this.birthdayService.creating = false;
      this.toastr.success(`Birthday edited : ${birthday.name}`, 'Success');
    }, (err) => {
      this.birthdayService.creating = false;
    })
  }

  get loaderColor(): string {
    if (localStorage.getItem('application-theme') === 'app-light') {
      return 'pink';
    } else {
      return '#02c7c7'
    }
  }

  getMonthHeader(bdate: { [s: string]: Birthday[] }) {
    return this.getMonth(Object.keys(bdate)[0]);
  }

  getMonth(monthNumber: string){
    let month = '';
    switch(monthNumber){
      case '1':
        month = 'Jan'
        break;
      case '2':
        month = 'Feb'
        break;
      case '3':
        month = 'Mar'
        break;
      case '4':
        month = 'Apr'
        break;
      case '5':
        month = 'May'
        break;
      case '6':
        month = 'Jun'
        break;
      case '7':
        month = 'Jul'
        break;
      case '8':
        month = 'Aug'
        break;
      case '9':
        month = 'Sep'
        break;
      case '10':
        month = 'Oct'
        break;
      case '11':
        month = 'Nov'
        break;
      case '12':
        month = 'Dec'
        break;
      default:
        break;
    }

    return month;

  }

  deleteBirthday(id: string) {
    this.deleteId = id;
    this.showdeleteBirthdayPopup = true;
  }

  confirmDeletion() {
    this.showdeleteBirthdayPopup = false;
    this.birthdayService.deleteBirthday(this.deleteId).subscribe((res) => {
      this.getBirthdays();
    });
  }

  closeDeleteBirthdayPopup() {
    this.showdeleteBirthdayPopup = false;
  }
}
