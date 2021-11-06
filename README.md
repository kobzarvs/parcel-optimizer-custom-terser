# parcel-optimizer-custom-terser

## default minify options

```typescript
const minifyOptions: MinifyOptions = {
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
        url: bundle.name + '.map',
      },
      toplevel: true,
    };
```

## .parcelrc example
```
{
    "extends": ["@parcel/config-default"],
    "optimizers": {
        "*.js": [
            "parcel-optimizer-custom-terser"
        ]
    }
}
```
