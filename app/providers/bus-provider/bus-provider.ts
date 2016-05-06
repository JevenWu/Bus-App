import {Injectable} from 'angular2/core';
import {Http, RequestOptionsArgs, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'; //import all the Observable operators, such as map
import {BPosition} from './bus';

/*
  Generated class for the BusDataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BusProvider {
  data: any = null;

  constructor(public http: Http) { }

  private handleError(error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error('in handleError' + errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  getBusPositionFromWeb() {
    console.log('in getBusLocation');
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('build/data/bus-location.json')
        .map(res => res.json())
        .catch(this.handleError)
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          console.log('get data.json!!!!!!!' + JSON.stringify(data));
          resolve(this.data);
        },

        error => {
          console.log('error in getting busLocation' + error);
        });
    });
  }

  setBusPositionToWeb(bPosition: BPosition) {
    console.log('in setBusLocation ' + JSON.stringify(bPosition));
    var postOptions: RequestOptionsArgs = {
      headers: new Headers({'Content-Type': 'application/json'})
    };

    this.http.post('http://localhost:3000/api/bus/location', JSON.stringify(bPosition), postOptions)
      .map(res => res.json())
      .catch(this.handleError)
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data = data;
        console.log('get data.json!!!!!!!' + JSON.stringify(data));
      },
      error => {
        console.log('error in getting busLocation' + error);
      });
  }
}

