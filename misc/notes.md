# Notes for Okta Gatsby
* Make sure you have the latest version of gatsby-cli

`$ npm i -g gatsby-cli`

(**note** I install with homebrew (mac) with `$ brew install gatsby-cli`)

* Update with `$ brew update gatsby-cli`

## See directory structure
* The `-I` excludes the `node_modules` folder

`$ tree -I node_modules`

![tree command](https://i.imgur.com/f8mD5V0.png)

## Start up gatsby app
`$ npm start`

* That will gall `$ npm run develop` and that will call `$ gatsby develop`
* This magic is done in the `package.json` "scrpts" section

`package.json`

```
// MORE CODE

  "scripts": {
    "build": "gatsby build",
    "develop": "gatsby develop",
    "format": "prettier --write \"**/*.{js,jsx,json,md}\"",
    "start": "npm run develop",
    "serve": "gatsby serve",
    "clean": "gatsby clean",
    "test": "echo \"Write tests! -> https://gatsby.dev/unit-testing\" && exit 1"
  },

// MORE CODE
```

## Troubleshoot gatsby steps
* Remove `package-lock.json` and/or `yarn.lock`
* `$ gatsby clean`
* `$ rm -rf node-modules`
* `$ npm i` (install dependencies again with package manager of your choice)
* `$ npm start`

### Hello world!
* Gatsby should be up and running - not very exciting yet

### Install netlify-cms and it's gatsby plugin
`$ npm i netlify-cms-app@2.11.20 gatsby-plugin-netlify-cms@4.1.40`

* In `gatsby-config.js`, register the Netlify CMS plugin:

```
module.exports = {
  plugins: [`gatsby-plugin-netlify-cms`],
}
```

`static/admin/config.yml`

```
backend:
  name: test-repo
  
media_folder: static/assets
public_folder: assets
  
collections:
  - name: blog
    label: Blog
    folder: blog
    create: true
    fields:
      - { name: path, label: Path }
      - { name: date, label: Date, widget: datetime }
      - { name: title, label: Title }
      - { name: body, label: Body, widget: markdown }
```

* Restart your app using `Ctrl+C` and `$ npm start`
* You’ll now be able to edit content at `http://localhost:8000/admin/`

## Add eslint Instructions
`https://github.com/mongkuen/gatsby-plugin-eslint`

`.eslintrc` (root of project)

```
{
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 8,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "impliedStrict": true,
      "classes": true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "jquery": true,
    "jest": true
  },
  "rules": {
    "no-debugger": 0,
    "no-unused-vars": [
      1,
      {
        "argsIgnorePattern": "res|next|^err"
      }
    ],
    "arrow-body-style": [
      2,
      "as-needed"
    ],
    "no-unused-expressions": [
      2,
      {
        "allowTaggedTemplates": true
      }
    ],
    "no-param-reassign": [
      2,
      {
        "props": false
      }
    ],
    "no-console": 0,
    "import/prefer-default-export": 0,
    "import": 0,
    "func-names": 0,
    "space-before-function-paren": 0,
    "comma-dangle": 0,
    "max-len": 0,
    "import/extensions": 0,
    "no-underscore-dangle": 0,
    "consistent-return": 0,
    "react/display-name": 1,
    "react/react-in-jsx-scope": 0,
    "react/prefer-stateless-function": 0,
    "react/forbid-prop-types": 0,
    "react/no-unescaped-entities": 0,
    "jsx-a11y/accessible-emoji": 0,
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    "radix": 0,
    "no-shadow": [
      2,
      {
        "hoist": "all",
        "allow": [
          "resolve",
          "reject",
          "done",
          "next",
          "err",
          "error"
        ]
      }
    ],
    "quotes": [
      2,
      "single",
      {
        "avoidEscape": true,
        "allowTemplateLiterals": true
      }
    ],
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "es5",
        "singleQuote": true,
        "printWidth": 120
      }
    ],
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": [
      "warn",
      {
        "aspects": [
          "invalidHref"
        ]
      }
    ]
  },
  "plugins": [
    "prettier"
  ]
}
```

