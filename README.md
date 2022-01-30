# rw-cli

rw-cli is npm cli package to install related dependancies of packages, providing webpack configuration snippet and also checking web vitals using google page insight.

## Installation

Use the package manager [npm](https://www.npmjs.com/package/@amitruls1/rw-cli) to install rw-cli.

```bash
npm install -g rw-cli
```

## How to install packages

You don't need to install all the packages by yourself, related packages will be installed automatically.

```bash
rw-cli -I react
```

This will install `react` `react-dom` `@babel/preset-react`.

## How to run web vitals test

Web vitals can be check via below command

```bash
rw-cli -V -D mobile -U https://facebook.com
```

and output will be printed as

```js
--------------------------------------------------------

Summary

URL:          m.facebook.com
Strategy:     mobile
Performance:  86

Field Data

Cumulative Layout Shift (CLS)              | 4ms
First Contentful Paint (FCP)               | 2.2s
First Input Delay (FID)                    | 29ms
Largest Contentful Paint (LCP)             | 4s

Lab Data

Cumulative Layout Shift                    | 0
First Contentful Paint                     | 2.9s
Largest Contentful Paint                   | 3.4s
Speed Index                                | 2.9s
Time to Interactive                        | 2.9s
Total Blocking Time                        | 0ms

Opportunities

No opportunities provided.


--------------------------------------------------------
```

## Supported Packages and related list

Currently supporting very few packages and their related dependancies along with snippet of webpack configuration.

```js
react => react, react-dom, @babel/preset-react
webpack => webpack, webpack-cli, webpack-dev-server
scss => css-loader, style-loader, sass-loader
css => css-loader, style-loader
babel => @babel/core, @babel/preset-env, babel-loader
```

## Commands

Commands list is given below

```js
--install OR -I
--vitals OR -V
--device OR -D
--url OR -U
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
