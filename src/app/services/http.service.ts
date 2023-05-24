import { Injectable } from '@angular/core';
import {
    HttpHeaders,
    HttpParams,
    HttpClient,
    HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { HeaderInterface, ParamsInterface } from '../models/http-header.model';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    private _baseUrl: string = environment.API_ENDPOINT;
    private _headers = new HttpHeaders();
    private _params = new HttpParams();

    private httpOptions: any = {};

    constructor(
        private httpClient: HttpClient,
        private loaderService: LoaderService
    ) {
        this.getCommonHeaders();
    }

    /**
     * Function to return common headers
     * @return headers Objecthttps://87.201.44.16/api
     */
    getCommonHeaders() {
        this._headers = this._headers.set('Content-Type', 'application/json');
    }

    /**
     * Function to Add Custom Headers and return it
     * @param headerArr Array<Object>
     * @return headers Object
     */
    setAdditionalHeaders(headerArr?: Array<HeaderInterface>) {
        if (headerArr) {
            headerArr.forEach((headerObj) => {
                let key = headerObj['key'];
                let value = headerObj['value'];
                this._headers = this._headers.set(key, value);
            });
        }
    }

    /**
     * Function to Add Custom Headers and return it
     * @param paramsArr Array<Object>
     * @return params
     */
    generateParams(paramsArr: ParamsInterface[]) {
        paramsArr.forEach((paramObj) => {
            let key = paramObj['key'];
            let value = paramObj['value'];
            let param: any = {};
            param[key] = value;
            this._params = this._params.appendAll(param);
        });
    }

    /**
     * Method to call get request api
     * @param url url of the api
     * @param paramsArr Array of parameters need to call the api
     * @param headerArr additional header array
     * @param isFile whether requesting for a file
     */
    getRequest(
        url: string,
        paramsArr?: ParamsInterface[],
        headerArr?: Array<HeaderInterface>,
        isFile?: boolean
    ): Observable<any> {
        this.loaderService.show();
        this.setAdditionalHeaders(headerArr);
        if (paramsArr) {
            this.generateParams(paramsArr);
        }
        this.httpOptions = {
            headers: this._headers,
            params: this._params!,
        };
        if (isFile) {
            this.httpOptions['responseType'] = 'blob';
        }

        return this.httpClient
            .get(`${this._baseUrl}/${url}`, this.httpOptions)
            .pipe(
                tap({
                    next: (event) => {
                        this.loaderService?.hide();
                    },
                    error: (err) => {
                        this.loaderService?.hide();
                    },
                })
            );
    }

    /**
     * Method to call the post request api
     * @param url url of the api
     * @param body request body
     * @param params parameter need to call api
     * @param headerArr additional header need to call api
     */
    postRequest(
        url: string,
        body?: any,
        params?: HttpParams,
        header?: HttpHeaders,
        headerArr?: Array<HeaderInterface>,
        isFile?: boolean,
        setResponseText?: boolean
    ): Observable<any> {
        this.loaderService.show();
        this.setAdditionalHeaders(headerArr);
        this.httpOptions = {
            headers: this._headers,
            params: params!,
        };
        if (setResponseText) {
            let response = { observe: 'response', responseType: 'text' };
            this.httpOptions = { ...this.httpOptions, ...response };
        }
        return this.httpClient
            .post(`${this._baseUrl}/${url}`, body, this.httpOptions)
            .pipe(
                tap({
                    next: (event) => {
                        this.loaderService.hide();
                    },
                    error: (err) => {
                        this.loaderService.hide();
                    },
                })
            );
    }

    /**
     * Method to call get request api
     * @param url url of the api
     * @param params parameter need to call the api
     * @param headerArr additional header arrray
     */
    deleteRequest(
        url: string,
        params?: HttpParams,
        headerArr?: Array<HeaderInterface>
    ): Observable<any> {
        this.loaderService.show();
        this.setAdditionalHeaders(headerArr);
        this.httpOptions = {
            headers: this._headers,
            params: params!,
        };
        return this.httpClient
            .delete(`${this._baseUrl}/${url}`, this.httpOptions)
            .pipe(
                tap({
                    next: (event) => {
                        this.loaderService?.hide();
                    },
                    error: (err) => {
                        this.loaderService?.hide();
                    },
                })
            );
    }

    /**
     * Method to call the post request api
     * @param url url of the api
     * @param body request body
     * @param params parameter need to call api
     * @param headerArr additional header need to call api
     */
    putRequest(
        url: string,
        body: Object,
        params?: HttpParams,
        headerArr?: Array<HeaderInterface>
    ): Observable<any> {
        this.loaderService.show();
        this.setAdditionalHeaders(headerArr);
        this.httpOptions = {
            headers: this._headers,
            params: params!,
        };
        return this.httpClient
            .put(`${this._baseUrl}/${url}`, body, this.httpOptions)
            .pipe(
                tap({
                    next: (event) => {
                        this.loaderService?.hide();
                    },
                    error: (err) => {
                        this.loaderService?.hide();
                    },
                })
            );
    }
}