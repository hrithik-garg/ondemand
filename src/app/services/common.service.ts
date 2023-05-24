import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CommonService {

    isUserVerified = new Subject<boolean>();
    selectedCommunity = new Subject<string>();
    isFindRideSelected = new Subject<boolean>();
    isProcessStarted = new Subject<boolean>();

    notify(res: any){        
        this.isUserVerified.next(res);
    }
    notifySelectedCommunity(res: any){        
        this.selectedCommunity.next(res);
    }
    notifyProcessStarted(res: any) {
        this.isFindRideSelected.next(res);
    }
    notifyIsProcessStarted(res: any) {
        this.isProcessStarted.next(res);
    }
}