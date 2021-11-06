var $1dqRE$parcelplugin = require("@parcel/plugin");
var $1dqRE$terser = require("terser");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $8a59b0e901fa9274$export$2e2bcd8739ae039);


var $8a59b0e901fa9274$export$2e2bcd8739ae039 = new $1dqRE$parcelplugin.Optimizer({
    async optimize (args) {
        const { bundle: bundle , contents: contents , map: map , logger: logger ,  } = args;
        logger.info({
            message: `processing bundle '${bundle.name}'`
        });
        const minifyOptions = {
            compress: false,
            ecma: 2020,
            ie8: false,
            keep_classnames: undefined,
            keep_fnames: false,
            module: true,
            safari10: false,
            sourceMap: {
                includeSources: true,
                filename: bundle.name,
                url: bundle.name + '.map'
            },
            toplevel: true
        };
        const result = await $1dqRE$terser.minify(contents, minifyOptions);
        // const result = await minify(contents as string, {sourceMap: true});
        const rawMap = JSON.parse(result.map);
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
            map: map,
            contents: result.code
        };
    }
});


//# sourceMappingURL=index.js.map
