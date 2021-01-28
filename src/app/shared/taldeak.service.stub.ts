import { of } from 'rxjs';

export class TaldeakServiceStub {
    getList(league?: string, year?: string) {
        const taldeak = [
            {
                "name": "Isuntza",
                "alt_names": [
                    "Grafilur Isuntza SuperBM",
                    "ISUNTZA",
                    "ISUNTZA A.E.",
                    "Isuntza AE",
                    "LEKITTARRA-BM",
                    "LEKITTARRA-ELECNOR-BM",
                    "Lekittarra - BM",
                    "Lekittarra BM",
                    "Lekittarra-BM",
                    "SUPER BM ISUNTZA",
                    "SUPER BM ISUNTZA GRAFILUR",
                    "Super BM Isuntza Grafilur",
                    "Isuntza",
                    "ISUNTZA-ELECNOR-CIKAUTXO",
                    "LEKITTARRA ELECNOR",
                    "LEKITTARRA-ELECNOR"
                ]
            },
            {
                "name": "Zierbena",
                "alt_names": [
                    "ZIERBANA BAHIAS DE BIZKAIA",
                    "ZIERBANA A.E.",
                    "ZIERBENA",
                    "ZIERBENA BAHIAS DE BIZKAIA",
                    "Zierbena Bah\u00edas Bizkaia",
                    "ZIERBENA BAH\u00cdAS BIZKAIA",
                    "ZIERBENA BAIHAS DE BIZKAIA",
                    "ZIRBENA BAHIAS DE BIZKAIA",
                    "Zierbena",
                    "Zierbena AE",
                    "Zierbena - BBGE",
                    "Zierbena Bah\u00edas De Bizkaia",
                    "Zierbena Bah\u00edas de Bizkaia"
                ]
            },
            {
                "name": "Hondarribia",
                "alt_names": [
                    "HONDARRBIA PASQUIER",
                    "HONDARRIBIA",
                    "HONDARRIBIA PASQUIER",
                    "HONDARRIBIA PASQUIER ",
                    "Hondarribia",
                    "Hondarribia - Orsa",
                    "Hondarribia A.E.",
                    "Hondarribia AE",
                    "HONDARRIBIA A.E. \"B\"",
                    "HONDARRIBIA ORSA",
                    "Hondarribia Orsa",
                    "NT2 HONDARRIBIA",
                    "NT2 Hondarribia",
                    "GO fit Hondarribia",
                    "Go Fit Hondarribia",
                    "Hondarribia BERTAKO Igogailuak",
                    "GO FIT HONDARRIBIA",
                    "GO FIT-HONDARRIBIA",
                    "HONDARRIBIA BERTAKO IGOGAILUAK"
                ]
            },
            {
                "name": "Donostiarra",
                "alt_names": [
                    "DONOSTIARRA",
                    "DONOSTIARRA B",
                    "DONOSTIARRA MOYUA",
                    "Donostiarra",
                    "Donostiarra (B)",
                    "Donostiarra B",
                    "Kaiarriba",
                    "DONOSTIARRA AMENABAR",
                    "DONOSTIARRA - AMENABAR",
                    "DONOSTIARRA LACTURALE"
                ]
            },
            {
                "name": "Kaiku",
                "alt_names": [
                    "KAIKU",
                    "KAIKU A.E.",
                    "KAIKU PRODUCHA",
                    "KAIKU-PRODUCHA",
                    "Kaiku Ambilamp",
                    "KAIKU AMBILAMP",
                    "Kaiku Producha",
                    "Kaiku",
                    "KAIKU VUSA"
                ]
            },
            {
                "name": "Ondarroa",
                "alt_names": [
                    "OMDARROA AE",
                    "ONDARROA",
                    "ONDARROA A.E.",
                    "ONDARROA AE",
                    "Ondarroa",
                    "Ondarroa A.E.",
                    "Ondarroa AE",
                    "Ondarroa Cikautxo",
                    "ONDARROA CIKAUTXO"
                ]
            },
            {
                "name": "Itsasoko ama",
                "alt_names": [
                    "ITSASOKO AMA",
                    "Itsasoko Ama",
                    "SANTURTZI",
                    "SANTURTZI AE",
                    "SANTURTZI A.E.",
                    "Santurtzi AE",
                    "SANTURTZI-IBERDROLA",
                    "Santurtzi - Iberdrola",
                    "Santurtzi Iberdrola",
                    "Itsasoko ama",
                    "SANTURTZI IBERDROLA",
                    "SANTURTZI TRANSPORTES Y GRUAS AGUADO"
                ]
            },
            {
                "name": "Zarautz",
                "alt_names": [
                    "ZARAUTZ",
                    "ZARAUTZ-NAVASCAL",
                    "Zarautz",
                    "Zarautz - Inmobiliaria Orio",
                    "Zarautz A.E.",
                    "Zarautz Inmob. Orio",
                    "Zarautz-Inmobiliaria Orio",
                    "ZARAUTZ-BABYAUTO",
                    "ZARAUTZ  - BABYAUTO",
                    "ZARAUTZ BABYAUTO"
                ]
            },
            {
                "name": "Cabo",
                "alt_names": [
                    "Cabo",
                    "Cabo da Cruz",
                    "CABO"
                ]
            },
            {
                "name": "Orio",
                "alt_names": [
                    "C.R.O. ORIO",
                    "C.R.O. ORIO A.E.",
                    "Grupo Eibar Orio",
                    "ORIO ECANIA BVL",
                    "ORIO-BABYAUTO",
                    "Orio",
                    "Orio Amenabar",
                    "Orio - Ecania B.V. Laguardia",
                    "Orio - Grupo Eibar",
                    "Orio Babyauto",
                    "ORIO BABYAUTO",
                    "ORIO",
                    "ORIO ARRAUNKETA ELKARTEA"
                ]
            },
            {
                "name": "Urdaibai",
                "alt_names": [
                    "Urdaibai Avia",
                    "Urdaibai Umpro Avia",
                    "URDAIBAI UMPRO AVIA",
                    "Urdaibai",
                    "URDAIBAI AVIA",
                    "BERMEO URDAIBAI AVIA"
                ]
            },
            {
                "name": "Ares",
                "alt_names": [
                    "Ares",
                    "ARES",
                    "CR ARES"
                ]
            }
        ];
         
        return of(taldeak);
    }
}