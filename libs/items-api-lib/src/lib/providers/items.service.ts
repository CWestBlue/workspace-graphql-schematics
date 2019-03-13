import { Injectable } from "@graphql-modules/di";
import fetch from 'node-fetch';

@Injectable()
export class ItemsService {
    public getItems = async () => {
        const returnItem = await fetch('https://vital-signs-api.herokuapp.com/items');
        return returnItem.json();
        // .then(res2 => res2.json())
        // console.log(res2.json());
        // console.log('hello');
        // return new Promise((res, rej) => {
        //     res([{ name: 'blue', type: 'color' }, { name: 'black', type: 'color' }, { name: 'purple', type: 'color' }, { name: 'yellow', type: 'color' }])
        // });
    }
}