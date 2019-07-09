import { of } from 'rxjs';

export class TaldeakServiceStub {
    getList(league?: string, year?: string) {
        return of(["Ares", "Arkote", "Astillero", "Cabo", "Camargo", "Castro", "Donostiarra", "Hondarribia", "Isuntza", "Itsasoko ama", "Kaiku", "Laredo", "Mecos", "Ondarroa", "Orio", "Pedre\u00f1a", "Portugalete", "Samertolameu", "San Juan", "San Pedro", "Tiran", "Trintxerpe", "Urdaibai", "Zarautz", "Zierbena", "Zumaia"]);
    }
}