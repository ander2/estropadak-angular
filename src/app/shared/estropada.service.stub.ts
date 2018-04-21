import { Observable } from 'rxjs/Observable';
import { estropada } from './estropada.fixture';

export class EstropadaServiceStub {

  getOne(id: number) {
    return Observable.of(estropada)
  }

  getList() {
    return Observable.of([{
      'data': '2017-07-01 19:00',
      'id': '415a90c7b50aea0ef54ee194e60016ac',
      'izena': 'VIII Bandera de Bilbao',
      'lekua': 'Bilbao',
      'liga': 'ACT',
      'sailkapena': [
        {
          'denbora': '20:08,04',
          'kalea': 1,
          'posizioa': 10,
          'postua': '',
          'puntuazioa': 3,
          'talde_id': '',
          'talde_izena': 'Ares',
          'tanda': 1,
          'tanda_postua': '4',
          'ziabogak': [
            '04:54',
            '09:56',
            '15:11'
          ]
        },
        {
          'denbora': '19:55,12',
          'kalea': 1,
          'posizioa': 7,
          'postua': '',
          'puntuazioa': 6,
          'talde_id': '',
          'talde_izena': 'Ondarroa Cikautxo',
          'tanda': 1,
          'tanda_postua': '2',
          'ziabogak': [
            '04:49',
            '09:46',
            '14:59'
          ]
        },
        {
          'denbora': '19:59,96',
          'kalea': 1,
          'posizioa': 8,
          'postua': '',
          'puntuazioa': 5,
          'talde_id': '',
          'talde_izena': 'San Pedro',
          'tanda': 1,
          'tanda_postua': '3',
          'ziabogak': [
            '04:52',
            '09:51',
            '15:07'
          ]
        },
        {
          'denbora': '19:53,30',
          'kalea': 1,
          'posizioa': 5,
          'postua': '',
          'puntuazioa': 8,
          'talde_id': '',
          'talde_izena': 'Zierbena Bahías Bizkaia',
          'tanda': 1,
          'tanda_postua': '1',
          'ziabogak': [
            '04:54',
            '09:51',
            '15:01'
          ]
        },
        {
          'denbora': '20:22,88',
          'kalea': 1,
          'posizioa': 11,
          'postua': '',
          'puntuazioa': 2,
          'talde_id': '',
          'talde_izena': 'Cabo',
          'tanda': 2,
          'tanda_postua': '3',
          'ziabogak': [
            '05:02',
            '10:05',
            '15:25'
          ]
        },
        {
          'denbora': '20:24,08',
          'kalea': 1,
          'posizioa': 12,
          'postua': '',
          'puntuazioa': 1,
          'talde_id': '',
          'talde_izena': 'Astillero',
          'tanda': 2,
          'tanda_postua': '4',
          'ziabogak': [
            '05:00',
            '10:02',
            '15:26'
          ]
        },
        {
          'denbora': '20:00,34',
          'kalea': 1,
          'posizioa': 9,
          'postua': '',
          'puntuazioa': 4,
          'talde_id': '',
          'talde_izena': 'Tirán Pereira',
          'tanda': 2,
          'tanda_postua': '2',
          'ziabogak': [
            '04:58',
            '09:54',
            '15:10'
          ]
        },
        {
          'denbora': '19:52,84',
          'kalea': 1,
          'posizioa': 4,
          'postua': '',
          'puntuazioa': 9,
          'talde_id': '',
          'talde_izena': 'Orio Babyauto',
          'tanda': 2,
          'tanda_postua': '1',
          'ziabogak': [
            '04:54',
            '09:49',
            '15:04'
          ]
        },
        {
          'denbora': '19:53,56',
          'kalea': 1,
          'posizioa': 6,
          'postua': '',
          'puntuazioa': 7,
          'talde_id': '',
          'talde_izena': 'San Juan Sumelec',
          'tanda': 3,
          'tanda_postua': '4',
          'ziabogak': [
            '04:53',
            '09:49',
            '15:03'
          ]
        },
        {
          'denbora': '19:39,00',
          'kalea': 1,
          'posizioa': 3,
          'postua': '',
          'puntuazioa': 10,
          'talde_id': '',
          'talde_izena': 'Kaiku Producha',
          'tanda': 3,
          'tanda_postua': '3',
          'ziabogak': [
            '04:49',
            '09:43',
            '14:53'
          ]
        },
        {
          'denbora': '19:28,30',
          'kalea': 1,
          'posizioa': 2,
          'postua': '',
          'puntuazioa': 11,
          'talde_id': '',
          'talde_izena': 'Hondarribia',
          'tanda': 3,
          'tanda_postua': '2',
          'ziabogak': [
            '04:47',
            '09:37',
            '14:44'
          ]
        },
        {
          'denbora': '19:25,70',
          'kalea': 1,
          'posizioa': 1,
          'postua': '',
          'puntuazioa': 12,
          'talde_id': '',
          'talde_izena': 'Urdaibai Avia',
          'tanda': 3,
          'tanda_postua': '1',
          'ziabogak': [
            '04:48',
            '09:34',
            '14:39'
          ]
        }
      ],
      'urla': 'http://www.euskolabelliga.com/resultados/ver.php?id=eu&r=1489952198'
      }
    ]);
  }
}



export class SailkapenaServiceStub {

  getOne(liga, year) {
    return Observable.of({
      "Tiran": {
        "position": 7,
        "points": 93,
        "best": 2,
        "wins": 0,
        "cumulative": [
          4,
          15,
          18,
          23,
          32,
          34,
          39,
          41,
          49,
          56,
          62,
          64,
          66,
          73,
          79,
          83,
          88,
          93
        ],
        "worst": 11,
        "positions": [
          9,
          2,
          10,
          8,
          4,
          11,
          8,
          11,
          5,
          6,
          7,
          11,
          11,
          6,
          7,
          9,
          8,
          8
        ]
      },
      "Astillero": {
        "position": 12,
        "points": 34,
        "best": 6,
        "wins": 0,
        "cumulative": [
          1,
          2,
          3,
          4,
          8,
          15,
          18,
          19,
          20,
          22,
          24,
          25,
          30,
          31,
          32,
          34
        ],
        "worst": 12,
        "positions": [
          12,
          12,
          12,
          12,
          9,
          6,
          10,
          12,
          12,
          11,
          11,
          12,
          8,
          12,
          12,
          11
        ]
      },
      "Hondarribia": {
        "position": 2,
        "points": 196,
        "best": 1,
        "wins": 6,
        "cumulative": [
          11,
          20,
          32,
          42,
          53,
          63,
          73,
          85,
          97,
          108,
          119,
          130,
          140,
          152,
          164,
          175,
          187,
          196
        ],
        "worst": 4,
        "positions": [
          2,
          4,
          1,
          3,
          2,
          3,
          3,
          1,
          1,
          2,
          2,
          2,
          3,
          1,
          1,
          2,
          1,
          4
        ]
      },
      "San Pedro": {
        "position": 9,
        "points": 74,
        "best": 6,
        "wins": 0,
        "cumulative": [
          5,
          9,
          16,
          22,
          28,
          31,
          33,
          38,
          44,
          47,
          50,
          56,
          62,
          66,
          69,
          74
        ],
        "worst": 11,
        "positions": [
          8,
          9,
          6,
          7,
          7,
          10,
          11,
          8,
          7,
          10,
          10,
          7,
          7,
          9,
          10,
          8
        ]
      },
      "Urdaibai": {
        "position": 1,
        "points": 201,
        "best": 1,
        "wins": 7,
        "cumulative": [
          12,
          22,
          33,
          44,
          56,
          67,
          78,
          89,
          99,
          111,
          123,
          135,
          146,
          156,
          166,
          178,
          189,
          201
        ],
        "worst": 3,
        "positions": [
          1,
          3,
          2,
          2,
          1,
          2,
          2,
          2,
          3,
          1,
          1,
          1,
          2,
          3,
          3,
          1,
          2,
          1
        ]
      },
      "Ondarroa": {
        "position": 8,
        "points": 90,
        "best": 4,
        "wins": 0,
        "cumulative": [
          6,
          9,
          15,
          24,
          29,
          33,
          37,
          44,
          48,
          53,
          58,
          62,
          65,
          68,
          73,
          76,
          83,
          90
        ],
        "worst": 10,
        "positions": [
          7,
          10,
          7,
          4,
          8,
          9,
          9,
          6,
          9,
          8,
          8,
          9,
          10,
          10,
          8,
          10,
          6,
          6
        ]
      },
      "Kaiku": {
        "position": 4,
        "points": 153,
        "best": 3,
        "wins": 0,
        "cumulative": [
          10,
          18,
          27,
          34,
          41,
          46,
          55,
          63,
          72,
          81,
          90,
          98,
          106,
          115,
          124,
          134,
          143,
          153
        ],
        "worst": 8,
        "positions": [
          3,
          5,
          4,
          6,
          6,
          8,
          4,
          5,
          4,
          4,
          4,
          5,
          5,
          4,
          4,
          3,
          4,
          3
        ]
      },
      "Zierbena": {
        "position": 5,
        "points": 127,
        "best": 1,
        "wins": 1,
        "cumulative": [
          8,
          10,
          20,
          22,
          25,
          37,
          43,
          53,
          58,
          68,
          76,
          85,
          94,
          96,
          104,
          113,
          119,
          127
        ],
        "worst": 11,
        "positions": [
          5,
          11,
          3,
          11,
          10,
          1,
          7,
          3,
          8,
          3,
          5,
          4,
          4,
          11,
          5,
          4,
          7,
          5
        ]
      },
      "Ares": {
        "position": 11,
        "points": 49,
        "best": 7,
        "wins": 0,
        "cumulative": [
          3,
          9,
          13,
          16,
          18,
          24,
          25,
          28,
          30,
          31,
          32,
          37,
          41,
          46,
          48,
          49
        ],
        "worst": 12,
        "positions": [
          10,
          7,
          9,
          10,
          11,
          7,
          12,
          10,
          11,
          12,
          12,
          8,
          9,
          8,
          11,
          12
        ]
      },
      "San Juan": {
        "position": 6,
        "points": 114,
        "best": 5,
        "wins": 0,
        "cumulative": [
          7,
          12,
          14,
          22,
          30,
          31,
          39,
          43,
          50,
          56,
          63,
          70,
          77,
          85,
          92,
          100,
          108,
          114
        ],
        "worst": 12,
        "positions": [
          6,
          8,
          11,
          5,
          5,
          12,
          5,
          9,
          6,
          7,
          6,
          6,
          6,
          5,
          6,
          5,
          5,
          7
        ]
      },
      "Orio": {
        "position": 3,
        "points": 181,
        "best": 1,
        "wins": 4,
        "cumulative": [
          9,
          21,
          29,
          41,
          51,
          59,
          71,
          80,
          91,
          99,
          109,
          119,
          131,
          142,
          153,
          160,
          170,
          181
        ],
        "worst": 6,
        "positions": [
          4,
          1,
          5,
          1,
          3,
          5,
          1,
          4,
          2,
          5,
          3,
          3,
          1,
          2,
          2,
          6,
          3,
          2
        ]
      },
      "Cabo": {
        "position": 10,
        "points": 71,
        "best": 4,
        "wins": 0,
        "cumulative": [
          2,
          9,
          14,
          18,
          18,
          27,
          34,
          40,
          43,
          47,
          51,
          54,
          55,
          61,
          65,
          71
        ],
        "worst": 12,
        "positions": [
          11,
          6,
          8,
          9,
          12,
          4,
          6,
          7,
          10,
          9,
          9,
          10,
          12,
          7,
          9,
          7
        ]
      }
    });
  }
}

export class UrteakServiceStub {
  getOne() {
    return Observable.of(2017)
  }

  getList() {
    return Observable.of({
      'act': [2017, 2016, 2015],
      'arc1': [2017, 2016, 2015],
      'arc2': [2017, 2016, 2015],
    })
  }
}

export class EmaitzakServiceStub {

  getList(league, year) {
    return Observable.of([
      {
        "data": "2017-07-01 19:00",
        "id": "415a90c7b50aea0ef54ee194e60016ac",
        "izena": "VIII Bandera de Bilbao",
        "lekua": "Bilbao",
        "liga": "ACT",
        "sailkapena": [
          {
            "denbora": "20:08,04",
            "kalea": 1,
            "posizioa": 10,
            "postua": "",
            "puntuazioa": 3,
            "talde_id": "",
            "talde_izena": "Ares",
            "tanda": 1,
            "tanda_postua": "4",
            "ziabogak": [
              "04:54",
              "09:56",
              "15:11"
            ]
          },
          {
            "denbora": "19:55,12",
            "kalea": 1,
            "posizioa": 7,
            "postua": "",
            "puntuazioa": 6,
            "talde_id": "",
            "talde_izena": "Ondarroa Cikautxo",
            "tanda": 1,
            "tanda_postua": "2",
            "ziabogak": [
              "04:49",
              "09:46",
              "14:59"
            ]
          },
          {
            "denbora": "19:59,96",
            "kalea": 1,
            "posizioa": 8,
            "postua": "",
            "puntuazioa": 5,
            "talde_id": "",
            "talde_izena": "San Pedro",
            "tanda": 1,
            "tanda_postua": "3",
            "ziabogak": [
              "04:52",
              "09:51",
              "15:07"
            ]
          },
          {
            "denbora": "19:53,30",
            "kalea": 1,
            "posizioa": 5,
            "postua": "",
            "puntuazioa": 8,
            "talde_id": "",
            "talde_izena": "Zierbena Bah\u00edas Bizkaia",
            "tanda": 1,
            "tanda_postua": "1",
            "ziabogak": [
              "04:54",
              "09:51",
              "15:01"
            ]
          },
          {
            "denbora": "20:22,88",
            "kalea": 1,
            "posizioa": 11,
            "postua": "",
            "puntuazioa": 2,
            "talde_id": "",
            "talde_izena": "Cabo",
            "tanda": 2,
            "tanda_postua": "3",
            "ziabogak": [
              "05:02",
              "10:05",
              "15:25"
            ]
          },
          {
            "denbora": "20:24,08",
            "kalea": 1,
            "posizioa": 12,
            "postua": "",
            "puntuazioa": 1,
            "talde_id": "",
            "talde_izena": "Astillero",
            "tanda": 2,
            "tanda_postua": "4",
            "ziabogak": [
              "05:00",
              "10:02",
              "15:26"
            ]
          },
          {
            "denbora": "20:00,34",
            "kalea": 1,
            "posizioa": 9,
            "postua": "",
            "puntuazioa": 4,
            "talde_id": "",
            "talde_izena": "Tir\u00e1n Pereira",
            "tanda": 2,
            "tanda_postua": "2",
            "ziabogak": [
              "04:58",
              "09:54",
              "15:10"
            ]
          },
          {
            "denbora": "19:52,84",
            "kalea": 1,
            "posizioa": 4,
            "postua": "",
            "puntuazioa": 9,
            "talde_id": "",
            "talde_izena": "Orio Babyauto",
            "tanda": 2,
            "tanda_postua": "1",
            "ziabogak": [
              "04:54",
              "09:49",
              "15:04"
            ]
          },
          {
            "denbora": "19:53,56",
            "kalea": 1,
            "posizioa": 6,
            "postua": "",
            "puntuazioa": 7,
            "talde_id": "",
            "talde_izena": "San Juan Sumelec",
            "tanda": 3,
            "tanda_postua": "4",
            "ziabogak": [
              "04:53",
              "09:49",
              "15:03"
            ]
          },
          {
            "denbora": "19:39,00",
            "kalea": 1,
            "posizioa": 3,
            "postua": "",
            "puntuazioa": 10,
            "talde_id": "",
            "talde_izena": "Kaiku Producha",
            "tanda": 3,
            "tanda_postua": "3",
            "ziabogak": [
              "04:49",
              "09:43",
              "14:53"
            ]
          },
          {
            "denbora": "19:28,30",
            "kalea": 1,
            "posizioa": 2,
            "postua": "",
            "puntuazioa": 11,
            "talde_id": "",
            "talde_izena": "Hondarribia",
            "tanda": 3,
            "tanda_postua": "2",
            "ziabogak": [
              "04:47",
              "09:37",
              "14:44"
            ]
          },
          {
            "denbora": "19:25,70",
            "kalea": 1,
            "posizioa": 1,
            "postua": "",
            "puntuazioa": 12,
            "talde_id": "",
            "talde_izena": "Urdaibai Avia",
            "tanda": 3,
            "tanda_postua": "1",
            "ziabogak": [
              "04:48",
              "09:34",
              "14:39"
            ]
          }
        ],
        "urla": "http://www.euskolabelliga.com/resultados/ver.php?id=eu&r=1489952198"
      },
      {
        "data": "2017-07-02 12:00",
        "id": "415a90c7b50aea0ef54ee194e6002126",
        "izena": "XVI Bandera Ayuntamiento de Sestao",
        "lekua": "Portugalete",
        "liga": "ACT",
        "sailkapena": [
          {
            "denbora": "19:37,16",
            "kalea": 1,
            "posizioa": 2,
            "postua": "",
            "puntuazioa": 11,
            "talde_id": "",
            "talde_izena": "Tir\u00e1n Pereira",
            "tanda": 1,
            "tanda_postua": "1",
            "ziabogak": [
              "04:24",
              "09:41",
              "14:27"
            ]
          },
          {
            "denbora": "20:00,00",
            "kalea": 2,
            "posizioa": 7,
            "postua": "",
            "puntuazioa": 6,
            "talde_id": "",
            "talde_izena": "Ares",
            "tanda": 1,
            "tanda_postua": "3",
            "ziabogak": [
              "04:27",
              "09:52",
              "14:41"
            ]
          },
          {
            "denbora": "20:12,72",
            "kalea": 3,
            "posizioa": 12,
            "postua": "",
            "puntuazioa": 1,
            "talde_id": "",
            "talde_izena": "Astillero",
            "tanda": 1,
            "tanda_postua": "4",
            "ziabogak": [
              "04:29",
              "10:01",
              "14:52"
            ]
          },
          {
            "denbora": "19:57,68",
            "kalea": 4,
            "posizioa": 6,
            "postua": "",
            "puntuazioa": 7,
            "talde_id": "",
            "talde_izena": "Cabo",
            "tanda": 1,
            "tanda_postua": "2",
            "ziabogak": [
              "04:30",
              "09:53",
              "14:45"
            ]
          },
          {
            "denbora": "20:11,60",
            "kalea": 1,
            "posizioa": 11,
            "postua": "",
            "puntuazioa": 2,
            "talde_id": "",
            "talde_izena": "Zierbena Bah\u00edas Bizkaia",
            "tanda": 2,
            "tanda_postua": "4",
            "ziabogak": [
              "04:31",
              "09:58",
              "14:50"
            ]
          },
          {
            "denbora": "20:00,46",
            "kalea": 2,
            "posizioa": 8,
            "postua": "",
            "puntuazioa": 5,
            "talde_id": "",
            "talde_izena": "San Juan Sumelec",
            "tanda": 2,
            "tanda_postua": "1",
            "ziabogak": [
              "04:27",
              "09:48",
              "14:35"
            ]
          },
          {
            "denbora": "20:09,76",
            "kalea": 3,
            "posizioa": 10,
            "postua": "",
            "puntuazioa": 3,
            "talde_id": "",
            "talde_izena": "Ondarroa Cikautxo",
            "tanda": 2,
            "tanda_postua": "3",
            "ziabogak": [
              "04:27",
              "09:55",
              "14:45"
            ]
          },
          {
            "denbora": "20:05,74",
            "kalea": 4,
            "posizioa": 9,
            "postua": "",
            "puntuazioa": 4,
            "talde_id": "",
            "talde_izena": "San Pedro",
            "tanda": 2,
            "tanda_postua": "2",
            "ziabogak": [
              "04:28",
              "09:53",
              "14:44"
            ]
          },
          {
            "denbora": "19:51,20",
            "kalea": 1,
            "posizioa": 5,
            "postua": "",
            "puntuazioa": 8,
            "talde_id": "",
            "talde_izena": "Kaiku Producha",
            "tanda": 3,
            "tanda_postua": "4",
            "ziabogak": [
              "04:27",
              "09:47",
              "14:36"
            ]
          },
          {
            "denbora": "19:40,96",
            "kalea": 2,
            "posizioa": 4,
            "postua": "",
            "puntuazioa": 9,
            "talde_id": "",
            "talde_izena": "Hondarribia",
            "tanda": 3,
            "tanda_postua": "3",
            "ziabogak": [
              "04:24",
              "09:42",
              "14:29"
            ]
          },
          {
            "denbora": "19:39,38",
            "kalea": 3,
            "posizioa": 3,
            "postua": "",
            "puntuazioa": 10,
            "talde_id": "",
            "talde_izena": "Urdaibai Avia",
            "tanda": 3,
            "tanda_postua": "2",
            "ziabogak": [
              "04:22",
              "09:42",
              "14:29"
            ]
          },
          {
            "denbora": "19:32,20",
            "kalea": 4,
            "posizioa": 1,
            "postua": "",
            "puntuazioa": 12,
            "talde_id": "",
            "talde_izena": "Orio Babyauto",
            "tanda": 3,
            "tanda_postua": "1",
            "ziabogak": [
              "04:25",
              "09:39",
              "14:23"
            ]
          }
        ],
        "urla": "http://www.euskolabelliga.com/resultados/ver.php?id=eu&r=1489952608"
      },
      {
        "data": "2017-07-08 17:30",
        "id": "415a90c7b50aea0ef54ee194e600264c",
        "izena": "Orioko XXVII. Estropadak - V. Orio Kanpina Bandera",
        "lekua": "Orio - Gipuzkoa",
        "liga": "ACT",
        "sailkapena": [
          {
            "denbora": "20:10,76",
            "kalea": 1,
            "posizioa": 12,
            "postua": "",
            "puntuazioa": 1,
            "talde_id": "",
            "talde_izena": "Astillero",
            "tanda": 1,
            "tanda_postua": "4",
            "ziabogak": [
              "04:45",
              "09:55",
              "15:03"
            ]
          },
          {
            "denbora": "19:53,02",
            "kalea": 1,
            "posizioa": 7,
            "postua": "",
            "puntuazioa": 6,
            "talde_id": "",
            "talde_izena": "Ondarroa Cikautxo",
            "tanda": 1,
            "tanda_postua": "2",
            "ziabogak": [
              "04:39",
              "09:45",
              "14:49"
            ]
          },
          {
            "denbora": "19:51,12",
            "kalea": 1,
            "posizioa": 6,
            "postua": "",
            "puntuazioa": 7,
            "talde_id": "",
            "talde_izena": "San Pedro",
            "tanda": 1,
            "tanda_postua": "1",
            "ziabogak": [
              "04:39",
              "09:45",
              "14:49"
            ]
          },
          {
            "denbora": "19:58,02",
            "kalea": 1,
            "posizioa": 9,
            "postua": "",
            "puntuazioa": 4,
            "talde_id": "",
            "talde_izena": "Ares",
            "tanda": 1,
            "tanda_postua": "3",
            "ziabogak": [
              "04:45",
              "09:51",
              "14:57"
            ]
          },
          {
            "denbora": "19:53,42",
            "kalea": 1,
            "posizioa": 8,
            "postua": "",
            "puntuazioa": 5,
            "talde_id": "",
            "talde_izena": "Cabo",
            "tanda": 2,
            "tanda_postua": "2",
            "ziabogak": [
              "04:47",
              "09:50",
              "14:58"
            ]
          },
          {
            "denbora": "19:39,04",
            "kalea": 1,
            "posizioa": 3,
            "postua": "",
            "puntuazioa": 10,
            "talde_id": "",
            "talde_izena": "Zierbena Bah\u00edas Bizkaia",
            "tanda": 2,
            "tanda_postua": "1",
            "ziabogak": [
              "04:41",
              "09:41",
              "14:46"
            ]
          },
          {
            "denbora": "20:04,30",
            "kalea": 1,
            "posizioa": 11,
            "postua": "",
            "puntuazioa": 2,
            "talde_id": "",
            "talde_izena": "San Juan Sumelec",
            "tanda": 2,
            "tanda_postua": "4",
            "ziabogak": [
              "04:48",
              "09:54",
              "15:08"
            ]
          },
          {
            "denbora": "19:59,68",
            "kalea": 1,
            "posizioa": 10,
            "postua": "",
            "puntuazioa": 3,
            "talde_id": "",
            "talde_izena": "Tir\u00e1n Pereira",
            "tanda": 2,
            "tanda_postua": "3",
            "ziabogak": [
              "04:51",
              "09:56",
              "15:10"
            ]
          },
          {
            "denbora": "19:44,12",
            "kalea": 1,
            "posizioa": 4,
            "postua": "",
            "puntuazioa": 9,
            "talde_id": "",
            "talde_izena": "Kaiku Producha",
            "tanda": 3,
            "tanda_postua": "3",
            "ziabogak": [
              "04:50",
              "09:46",
              "14:55"
            ]
          },
          {
            "denbora": "19:31,76",
            "kalea": 1,
            "posizioa": 1,
            "postua": "",
            "puntuazioa": 12,
            "talde_id": "",
            "talde_izena": "Hondarribia",
            "tanda": 3,
            "tanda_postua": "1",
            "ziabogak": [
              "04:47",
              "09:39",
              "14:47"
            ]
          },
          {
            "denbora": "19:49,56",
            "kalea": 1,
            "posizioa": 5,
            "postua": "",
            "puntuazioa": 8,
            "talde_id": "",
            "talde_izena": "Orio Babyauto",
            "tanda": 3,
            "tanda_postua": "4",
            "ziabogak": [
              "04:51",
              "09:46",
              "14:58"
            ]
          },
          {
            "denbora": "19:35,10",
            "kalea": 1,
            "posizioa": 2,
            "postua": "",
            "puntuazioa": 11,
            "talde_id": "",
            "talde_izena": "Urdaibai Avia",
            "tanda": 3,
            "tanda_postua": "2",
            "ziabogak": [
              "04:48",
              "09:42",
              "14:49"
            ]
          }
        ],
        "urla": "http://www.euskolabelliga.com/resultados/ver.php?id=eu&r=1489953292"
      }
  ]);
  }
}