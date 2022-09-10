import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})

export class DonationsComponent implements OnInit{

  donationValue: number = 50;
  donation: boolean = false;

  target: number = 250;
  dateTarget: string = '03-01-2023';
  targetComplete: boolean = false;
  targetIncompleteByDate: boolean = false;

  quantityError: boolean = false;

  get totalDonations() {
    return this.storage.getTotal();
  }

  get donorCount(){
    return this.storage.getDonor();
  }

  get remaining() {
    const diff = this.target - this.totalDonations;
    return diff < 0 ? 0 : diff;
  }

  get progress(){
    let percent = this.totalDonations / this.target * 100;
    percent = percent > 100 ? 100 : percent;
    return String(percent) + '%';
  }

  get Date() {
    const date = new Date(Date.now()).getTime();
    const dateTarget = new Date(this.dateTarget).getTime();
    const diff = (dateTarget - date)/(1000*60*60*24);
    return Math.trunc(diff)
  }

  constructor( private storage: StorageService) { }

  ngOnInit(): void {
    this.validateTargetComplete();
  }

  donate() {
    this.donation = false; //Reset to validate

    if (this.donationValue <= 0 || this.donationValue > 250) {
      this.quantityError = true;
      return;
    } else {
      this.quantityError = false;
    }

    this.storage.setDonation(this.donationValue);
    this.storage.setDonor();
    this.donation = true;
    this.validateTargetComplete();
  }

  validateTargetComplete() {
    if (this.totalDonations >= this.target) {
      this.targetComplete = true;
      this.openModal()
    } else if(this.Date == 0) {
      this.targetIncompleteByDate = true;
    }
  }

  openModal() {
    document.querySelector(".modal")!.classList.toggle("show-modal");
  }
}
