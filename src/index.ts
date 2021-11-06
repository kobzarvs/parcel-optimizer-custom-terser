import {Optimizer} from '@parcel/plugin';
import {
  CompressOptions,
  ECMA,
  FormatOptions,
  MangleOptions, ManglePropertiesOptions,
  minify,
  MinifyOptions,
  ParseOptions, SimpleIdentifierMangler,
  SourceMapOptions, WeightedIdentifierMangler,
} from 'terser';
import SourceMap from '@parcel/source-map';
import {Async, Blob, BundleGraph, BundleResult, NamedBundle, PluginLogger, PluginOptions} from '@parcel/types';
import {RawSourceMap} from 'source-map';


interface OptimizeArgs<ConfigType> {
  bundle: NamedBundle;
  bundleGraph: BundleGraph<NamedBundle>;
  contents: Blob;
  map: SourceMap | null | undefined;
  options: PluginOptions;
  logger: PluginLogger;
  config: ConfigType;
  getSourceMapReference: (map: SourceMap | null | undefined) => Async<string | null | undefined>;
}

export default new Optimizer({
  async optimize(args): Promise<BundleResult> {
    const {
      bundle,
      contents,
      map,
      logger,
    } = args;

    logger.info({message: `processing bundle '${bundle.name}'`});

    const minifyOptions: MinifyOptions = {
      compress: false, //boolean | CompressOptions;
      ecma: 2020,
      ie8: false,
      keep_classnames: undefined,
      keep_fnames: false,
      module: true,
      safari10: false,
      sourceMap: {
        includeSources: true,
        filename: bundle.name,
        url: bundle.name + '.map',
      },
      toplevel: true,
    };

    const result = await minify(contents as string, minifyOptions);
    // const result = await minify(contents as string, {sourceMap: true});

    const rawMap = JSON.parse(result.map as string) as RawSourceMap;
    console.log('result.map', typeof result.map, result.map);

    if (map) {
      const vlq = map.toVLQ();
      Object.assign(vlq, {
        mappings: rawMap.mappings,
        names: rawMap.names
      });
      map.addVLQMap(vlq);

      // let sourceMap;
      // if (rawMap) {
      //   sourceMap = SourceMap.generateEmptyMap({
      //     projectRoot: vlq.sourceRoot!,
      //     sourceName: bundle.name,
      //     sourceContent: rawMap.sourcesContent?.join('\n') || ''
      //   });
      //   sourceMap.addNames(rawMap.names);
      //   sourceMap.
      // }
    }

    return {
      map,
      contents: result.code as string,
    };
  },
});
