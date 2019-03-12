import { strings, join, Path, normalize } from '@angular-devkit/core';
import {
  Rule, SchematicContext, SchematicsException, Tree,
  apply, branchAndMerge, mergeWith, template, url, chain
} from '@angular-devkit/schematics';
import { updateJsonInTree } from '../../utils';
import { dasherize } from '@angular-devkit/core/src/utils/strings';
// import { ISchemaOptions } from './schema';

function updateNxJson(options: any): Rule {
  return updateJsonInTree(`/nx.json`, json => {
    return {
      ...json,
      projects: {
        ...json.projects,
        [options.name]: { tags: [] }
      }
    };
  });
}

function getBuildConfig(project: any, options: any) {
  const rootPath: Path = join(normalize('apps'), `${dasherize(options.name)}`);
  return {
    builder: '@nrwl/builders:node-build',
    options: {
      outputPath: join(normalize('dist'), rootPath),
      main: join(join(rootPath, 'src'), 'index.ts'),
      tsConfig: join(rootPath, 'tsconfig.app.json')
    },
    configurations: {
      production: {
        optimization: true,
        extractLicenses: true,
        inspect: false,
        fileReplacements: [
          {
            replace: join(join(rootPath, 'src'), 'environments/environment.ts'),
            with: join(join(rootPath, 'src'), 'environments/environment.prod.ts')
          }
        ],
        externalDependencies: 'none'
      }
    }
  };
}

function getServeConfig(options: any) {
  return {
    builder: '@nrwl/builders:node-execute',
    options: {
      buildTarget: `${options.name}:build`
    }
  };
}

function getLintConfig(project: any) {
  return {
    builder: '@angular-devkit/build-angular:tslint',
    options: {
      tsConfig: [join(project.root, 'tsconfig.app.json')],
      exclude: ['**/node_modules/**']
    }
  };
}

function updateAngularJson(options: any): Rule {
  return updateJsonInTree('angular.json', angularJson => {
    const rootPath: Path = join(normalize('apps'), `${dasherize(options.name)}`);
    const project = {
      root: rootPath,
      sourceRoot: join(rootPath, 'src'),
      projectType: 'application',
      prefix: options.name,
      schematics: {},
      architect: <any>{}
    };

    project.architect.build = getBuildConfig(project, options);
    project.architect.serve = getServeConfig(options);
    project.architect.lint = getLintConfig(project);
    angularJson.projects[options.name] = project;

    return angularJson;
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
      updateNxJson(schema)
    ])

    // return ;
  };
}
