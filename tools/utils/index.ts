import { Rule, Tree, SchematicContext } from '@angular-devkit/schematics';
import * as fs from 'fs';
import * as pathLib from 'path';
import { ensureDirSync } from 'fs-extra';

export function writeToFile(filePath: string, str: string) {
    ensureDirSync(pathLib.dirname(filePath));
    fs.writeFileSync(filePath, str);
}
/**
 * This method is specifically for reading JSON files in a Tree
 * @param host The host tree
 * @param path The path to the JSON file
 * @returns The JSON data in the file.
 */
export function readJsonInTree<T = any>(host: Tree, path: string): T {
    if (!host.exists(path)) {
        throw new Error(`Cannot find ${path}`);
    }
    // tslint:disable-next-line:no-non-null-assertion
    const contents = host.read(path)!.toString('utf-8');
    try {
        return JSON.parse(contents);
    } catch (e) {
        throw new Error(`Cannot parse ${path}: ${e.message}`);
    }
}

/**
 * This method is specifically for updating JSON in a Tree
 * @param path Path of JSON file in the Tree
 * @param callback Manipulation of the JSON data
 * @returns A rule which updates a JSON file file in a Tree
 */
export function updateJsonInTree<T = any, O = T>(
    path: string,
    callback: (json: T, context: SchematicContext) => O
): Rule {
    return (host: Tree, context: SchematicContext): Tree => {
        if (!host.exists(path)) {
            host.create(path, serializeJson(callback({} as T, context)));
            return host;
        }
        host.overwrite(
            path,
            serializeJson(callback(readJsonInTree(host, path), context))
        );
        return host;
    };
}

/**
* This method is specifically for updating a JSON file using the filesystem
*
* @remarks
* If you are looking to update a JSON file in a tree, look for ./ast-utils#updateJsonInTree
* @param path Path of the JSON file on the filesystem
* @param callback Manipulation of the JSON data
*/
export function updateJsonFile(path: string, callback: (a: any) => any) {
    const json = readJsonFile(path);
    callback(json);
    writeJsonFile(path, json);
}

/**
* This method is specifically for reading a JSON file from the filesystem
*
* @remarks
* If you are looking to read a JSON file in a Tree, use ./ast-utils#readJsonInTree
* @param path Path of the JSON file on the filesystem
*/
export function readJsonFile<T = any>(path: string): T {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

export function writeJsonFile(path: string, json: any) {
    writeToFile(path, serializeJson(json));
}


export function serializeJson(json: any): string {
    return `${JSON.stringify(json, null, 2)}\n`;
}