import { Injectable } from "@graphql-modules/di";

@Injectable()
export class ItemsService {
    public getItems = async () => {
        return new Promise((res, rej) => {
            res([{ name: 'blue', type: 'color' }, { name: 'black', type: 'color' }, { name: 'purple', type: 'color' }, { name: 'yellow', type: 'color' }])
        });
    }
}