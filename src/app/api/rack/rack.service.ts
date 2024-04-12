import {Injectable} from '@angular/core'
import {HttpClient, HttpResponse} from '@angular/common/http'
import {finalize, map, Observable, tap} from 'rxjs'
import {Rack} from './rack'
import {RackQuery, RackStore} from './rack.store'

@Injectable({
  providedIn: 'root',
})
export class RackService {
  private baseUrl = "http://localhost:8080/api/rack"

  constructor(private http: HttpClient,
              private rackStore: RackStore,
              private rackQuery: RackQuery) {
  }

  getAllRacks(): Observable<Rack[]> {
    this.rackStore.setLoading(true)
    return this.http.get<Rack[]>(`${this.baseUrl}`,
      {withCredentials: false, observe: 'response'})
      .pipe(
        map((response: HttpResponse<Rack[]>) => response.body),
        tap((racks) => {
          this.rackStore.set(racks)
        }), finalize(() => this.rackStore.setLoading(false))
      )
  }

  updateRack(rackId: number, isOpen: boolean) {
    this.rackStore.setLoading(true)
    let existingRack = this.rackQuery.getEntity(rackId)
    let updatedRack = {
      id: existingRack.id,
      name: existingRack.name,
      is_open: isOpen,
      apartment_id: existingRack.apartment_id
    }
    return this.http.put<Rack>(`${this.baseUrl}/${rackId}`, updatedRack,
      {withCredentials: false, observe: 'response'})
      .pipe(
        map((response: HttpResponse<Rack>) => response.body),
        tap((rack) => {
          this.rackStore.upsert(rack.id, rack)
        }), finalize(() => this.rackStore.setLoading(false))
      )
  }
}
