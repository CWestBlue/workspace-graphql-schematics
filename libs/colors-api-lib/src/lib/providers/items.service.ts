import { Injectable } from "@graphql-modules/di";

@Injectable()
export class ItemsService {
    public getItems = async () => {
        return new Promise((res, rej) => {
            res(['blue', 'black', 'purple', 'yellow'])
        });
    }
}