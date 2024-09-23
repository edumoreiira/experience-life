import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SampServer } from '../models/samp-server.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://sam.markski.ar/api/GetServerByIP?ip_addr=66.70.194.206:7777'

  getServerData(): Observable<SampServer> {
    return this.http.get<SampServer>(this.apiUrl)
  }

}
