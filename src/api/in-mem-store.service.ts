import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemStoreService implements InMemoryDbService {
    createDb(){
        let estropadak = [
            {
                id: 1,
                name: 'Zarautzko estropadak',
                liga: 'ACT'
            },
            { 
                id:2,
                name: 'Donostiako estropadak',
                liga: 'ARC1'
            }

        ]

        return {estropadak}
    }
}