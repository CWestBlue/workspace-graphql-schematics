import { strings, Path, join, normalize } from '@angular-devkit/core';
import {
  Rule, SchematicContext, SchematicsException, Tree,
  apply, branchAndMerge, mergeWith, template, url, chain,
} from '@angular-devkit/schematics';
import { updateJsonInTree } from '../../utils';
import { dasherize } from '@angular-devkit/core/src/utils/strings';
// import { ISchemaOptions } from './schema';

export function updateAngularJson(options) {
  return updateJsonInTree('angular.json', json => {
    // const project = json.projects[options.name];
    const rootPath: Path = join(normalize('libs'), dasherize(options.name));
    const project = {
      root: rootPath,
      sourceRoot: join(rootPath, 'src'),
      projectType: 'library',
      prefix: 'playground-workspace',
      schematics: {},
      architect: <any>{}
    };
    json.projects[options.name] = project;

    return json;
    // const fixedProject = replaceAppNameWithPath()
  })
}

export function updateNx(options) {
  return updateJsonInTree('/nx.json', json => {
    return {
      ...json,
      projects: {
        ...json.projects,
        [options.name]: { tags: [] }
      }
    };
  })
}

export default function (schema: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (!schema.name) {
      throw new SchematicsException('Option (name) is required.');
    }

    const templateSource = apply(
      url('./files'),
      [
        template({
          ...strings,
          ...schema,
        }),
      ]
    );

    return chain([
      branchAndMerge(mergeWith(templateSource)),
      updateAngularJson(schema),
      updateNx(schema)
    ]);
  };
}
