// tslint:disable-next-line:no-var-requires
require('dotenv').config({
    silent: true
});
import 'reflect-metadata';
// tslint:disable-next-line:no-unused-expression
import { ColorsApiModule } from './app';
import { bootstrap } from './server';
// tslint:disable-next-line:no-console
console.log('Ready for launch. 3... 2... 1... 🚀 ');
bootstrap(ColorsApiModule)
