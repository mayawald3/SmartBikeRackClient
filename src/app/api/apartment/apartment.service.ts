import {Injectable} from '@angular/core'
import {HttpClient, HttpResponse} from '@angular/common/http'
import {finalize, map, Observable, tap} from 'rxjs'
import {Apartment} from './apartment'
import {ApartmentStore} from './apartment.store'

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  private baseUrl = "http://localhost:8080/api/apartment"

  constructor(private http: HttpClient,
              private apartmentStore: ApartmentStore) {
  }

  getAllApartments(): Observable<Apartment[]> {
    this.apartmentStore.setLoading(true)
    return this.http.get<Apartment[]>(`${this.baseUrl}`,
      {withCredentials: false, observe: 'response'})
      .pipe(
        map((response: HttpResponse<Apartment[]>) => response.body),
        tap((apartments) => {
          this.apartmentStore.set(apartments)
        }), finalize(() => this.apartmentStore.setLoading(false))
      )
  }
}
