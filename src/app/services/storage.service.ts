import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor() { }

  setDonation(value: number) {
    let donation = this.getTotal() + value;
    localStorage.setItem('donations', String(donation));
  }

  getTotal(){
    return Number(localStorage.getItem('donations'))
  }

  setDonor(){
    let donor = this.getDonor() + 1;
    localStorage.setItem('donor', String(donor));
  }

  getDonor(){
    return Number(localStorage.getItem('donor'))
  }

}
