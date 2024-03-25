import {Lock} from './lock-status.enum'
import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LockStatusService {
  private baseUrl = "http://localhost:8080/api/lockStatus";
  private lockStatus = Lock.UNLOCKED

  constructor(private http: HttpClient) { }

  getLockStatus(): Lock {
    return this.lockStatus
    // return this.http.get<string>(`${this.baseUrl}/user`)
  }

  updateLockStatus(newStatus: Lock) {
    this.lockStatus = newStatus
    // return this.http.post<Lock>(`${this.baseUrl}`, newStatus)
  }
}
