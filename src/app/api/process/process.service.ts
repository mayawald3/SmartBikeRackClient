import {Injectable} from '@angular/core'
import {HttpClient, HttpResponse} from '@angular/common/http'
import {map, Observable, tap} from 'rxjs'
import {ProcessStore} from './process.store'
import {Process} from './process'

@Injectable({
  providedIn: 'root',
})
export class ProcessService {

  private baseUrl = "http://localhost:8080/api/process";

  constructor(private http: HttpClient,
              private processStore: ProcessStore) { }

  getAllProcesses(): Observable<Process[]> {
    return this.http.get<Process[]>(`${this.baseUrl}`,
      {withCredentials: false, observe: 'response'})
      .pipe(
        map((response: HttpResponse<Process[]>) => response.body),
        tap((processes) => {
          this.processStore.set(processes)
        })
      )
  }

  createProcess(process: Process): Observable<Process> {
    return this.http.post<Process>(`${this.baseUrl}`, process,
      {withCredentials: false, observe: 'response'})
      .pipe(
        map((response: HttpResponse<Process>) => response.body),
        tap((process) =>
          this.processStore.add(process)
        ))
  }

  updateProcess(process: Process): Observable<Process> {
    return this.http.put<Process>(`${this.baseUrl}/${process.id}`, process,
      {withCredentials: false, observe: 'response'})
      .pipe(
        map((response: HttpResponse<Process>) => response.body),
        tap((process) =>
          this.processStore.upsert(process.id, process)
        ))
  }
}
