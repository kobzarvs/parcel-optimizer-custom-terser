import {Optimizer as $vvVPr$Optimizer} from "@parcel/plugin";
import {minify as $vvVPr$minify} from "terser";



var $1ca8635c70afe39a$export$2e2bcd8739ae039 = new $vvVPr$Optimizer({
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
        const result = await $vvVPr$minify(contents, minifyOptions);
        const rawMap = JSON.parse(result.map);
        if (map) {
            const vlq = map.toVLQ();
            Object.assign(vlq, {
                mappings: rawMap.mappings,
                names: rawMap.names
            });
            map.addVLQMap(vlq);
        }
        return {
            map: map,
            contents: result.code
        };
    }
});


export {$1ca8635c70afe39a$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=index.es.js.map
