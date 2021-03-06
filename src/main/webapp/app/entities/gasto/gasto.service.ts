import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map, catchError } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGasto, IResumoGasto, MesAno } from 'app/shared/model/gasto.model';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';

type EntityResponseType = HttpResponse<IGasto>;
type EntityArrayResponseType = HttpResponse<IGasto[]>;

type EntityResponseTypeResumo = HttpResponse<IResumoGasto>;
type EntityResponseTypeMesAno = HttpResponse<MesAno[]>;

@Injectable({ providedIn: 'root' })
export class GastoService {
    public resourceUrl = SERVER_API_URL + 'api/gastos';
    public resourceUrlResumo = SERVER_API_URL + 'api/resumoConta';
    public resourceUrlMeses = SERVER_API_URL + 'api/gastoMesAno';
    public resourceUrlResumoTotal = SERVER_API_URL + 'api/resumoContaTotal';

    constructor(protected http: HttpClient) {}

    create(gasto: IGasto): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gasto);
        return this.http
            .post<IGasto>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(gasto: IGasto): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gasto);
        return this.http
            .put<IGasto>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IGasto>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGasto[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    resumoTotal(req?: any): Observable<EntityResponseTypeResumo> {
        const options = createRequestOption(req);
        return this.http
            .get<IResumoGasto>(this.resourceUrlResumoTotal, { params: options, observe: 'response' })
            .pipe(map((res: EntityResponseTypeResumo) => this.convertDateArrayFromServer2(res)));
    }

    resumo(req?: any): Observable<EntityResponseTypeResumo> {
        const options = createRequestOption(req);
        return this.http
            .get<IResumoGasto>(this.resourceUrlResumo, { params: options, observe: 'response' })
            .pipe(map((res: EntityResponseTypeResumo) => this.convertDateArrayFromServer2(res)));
    }

    findMesesAno(req?: any): Observable<EntityResponseTypeMesAno> {
        const options = createRequestOption(req);
        return this.http
            .get<MesAno[]>(this.resourceUrlMeses, { params: options, observe: 'response' })
            .pipe(map((res: EntityResponseTypeMesAno) => this.convertDateArrayFromServer3(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(gasto: IGasto): IGasto {
        const copy: IGasto = Object.assign({}, gasto, {
            dataVencimento:
                gasto.dataVencimento != null && gasto.dataVencimento.isValid() ? gasto.dataVencimento.format(DATE_FORMAT) : null,
            mesAno: gasto.mesAno != null && gasto.mesAno.isValid() ? gasto.mesAno.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dataVencimento = res.body.dataVencimento != null ? moment(res.body.dataVencimento) : null;
            res.body.mesAno = res.body.mesAno != null ? moment(res.body.mesAno) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((gasto: IGasto) => {
                gasto.dataVencimento = gasto.dataVencimento != null ? moment(gasto.dataVencimento) : null;
                gasto.mesAno = gasto.mesAno != null ? moment(gasto.mesAno) : null;
            });
        }
        return res;
    }

    protected convertDateArrayFromServer2(res: EntityResponseTypeResumo): EntityResponseTypeResumo {
        if (res.body) {
            // res.body.forEach((resumo: IResumoGasto) => {
            // gasto.dataVencimento = gasto.dataVencimento != null ? moment(gasto.dataVencimento) : null;
            // gasto.mesAno = gasto.mesAno != null ? moment(gasto.mesAno) : null;
            //  });
        }
        return res;
    }

    protected convertDateArrayFromServer3(res: EntityResponseTypeMesAno): EntityResponseTypeMesAno {
        if (res.body) {
            // res.body.forEach((resumo: IResumoGasto) => {
            // gasto.dataVencimento = gasto.dataVencimento != null ? moment(gasto.dataVencimento) : null;
            // gasto.mesAno = gasto.mesAno != null ? moment(gasto.mesAno) : null;
            //  });
        }
        return res;
    }
}
