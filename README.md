# Similarity Search Sample Application
[![Build Status](https://travis-ci.org/watson-developer-cloud/similarity-search-nodejs.svg?branch=master)](http://travis-ci.org/watson-developer-cloud/similarity-search-nodejs)

This Node.js application demonstrates the Visual Recognition service's Similarity Search feature in a sample application.

To see a running instance of the application demo, [click here](http://similarity-search-demo.mybluemix.net/).

For more information about the Similarity Search, see the [detailed documentation](http://www.ibm.com/watson/developercloud/doc/visual-recognition/collections-tutorials.shtml).

# Deploying the application

If you want to experiment with modifying the application or use it as a basis for building your own application, you need to deploy it in your own environment. You can then explore the files, make changes, and see how those changes affect the running application. After making modifications, you can deploy your modified version of the application to the Bluemix cloud.

## Before you begin

* You must have a Bluemix account, and your account must have available space for at least 1 application and 1 service. To register for a Bluemix account, go to https://console.ng.bluemix.net/registration/. Your Bluemix console shows your available space.

* You must have the following prerequisites installed:
  * the [Node.js](http://nodejs.org/) runtime (including the npm package manager)
  * the [Cloud Foundry command-line client](https://github.com/cloudfoundry/cli#downloads)
  * A [Collection ID](https://www.ibm.com/watson/developercloud/visual-recognition/api/v3/#create_a_collection) created in the Visual Recognition service by uploading your own set of images.

## Getting the files

1. Use GitHub to clone the repository locally

## Setting up the Visual Recognition service

1. Make sure you have logged in to your Bluemix account using Cloud Foundry. For more information, see [The Cloud Foundry command-line interface](https://www.ibm.com/watson/developercloud/doc/common/getting-started-cf.html).

1. Create the Visual Recognition service in Bluemix. Note that you can only have one instance of Visual Recognition service free credentials per Bluemix org. If you can't create credentials, check and see if someone else with access to your org has already created them.

   ```bash
   cf create-service watson_vision_combined <service_plan> <service_instance>
   ```

   For example:

   ```bash
   cf create-service watson_vision_combined free similarity-search-test-service
   ```

1. Create a service key:

   ```bash
   cf create-service-key <service_instance> <service_key>
   ```

   For example:

   ```bash
   cf create-service-key similarity-search-test-service similarity-search-test-service-key1
   ```

## Configuring the application environment

1. Copy the `.env.example` file to a new `.env` file. Open this file in a text editor.

1. Retrieve the credentials from the service key:

   ```bash
   cf service-key <service_instance> <service_key>
   ```

   For example:

   ```bash
   cf service-key similarity-search-test-service similarity-search-test-service-key1
   ```

   The output from this command is a JSON object, as in this example:

   ```javascript
   {
     "api_key": "5cbc8d343edd2b9d545123405c89028da3d24592",
     "note": "It may take up to 5 minutes for this key to become active",
     "url": "https://gateway-a.watsonplatform.net/visual-recognition/api"
   }
   ```

1. In the JSON output, find the value the `api_key`. Paste the value (not including the quotation marks) into the `VISUAL_RECOGNITION_API_KEY` in the `.env` file:

   ```
   VISUAL_RECOGNITION_API_KEY=5cbc8d343edd2b9d545123405c89028da3d24592
   ```

   Leave the `.env` file open in your text editor.

1. On the next line in `.env` add `COLLECTION_ID=<your collection id>`

  You will need to [create a collection](http://www.ibm.com/watson/developercloud/visual-recognition/api/v3/#create_a_collection) of images in the Visual Recognition service and then upload images to that collection for the demo to work.

  Your `.env` file should now look like this:

  ```
  VISUAL_RECOGNITION_API_KEY=5cbc8d343edd2b9d545123405c89028da3d24592
  COLLECTION_ID=some_collection_id
  ```

1. Install the demo application package into the local Node.js runtime environment:

   ```bash
   npm install
   ```

1. Start the application:

    ```bash
    npm start
    ```

The application is now deployed and running on the local system. Go to `http://localhost:3000` in your browser to try it out.

----

## How To for New Developers

This application uses:

* React (15.3.1)
* Express (4.x)
* Browserify (13.x) + Babelify, Reactify, Uglifyify, Minifyify and Watchify
* Gulp
* `gulp-live-server` (which includes LiveReload for client-side js/css)
* SASS
* [ui-component library](https://watson-developer-cloud.github.io/ui-components/)

### Gulp tasks

1. `$ gulp js`: Generates `static/js/bundle.js` from `client/app.js` using Browserify.

2. `$ gulp css`: Generates `static/css/main.css` from `client/stylesheets/main.scss` using SASS.

3. `$ gulp serve`: Runs `js` and `css` tasks and subsequently starts the Express app (`server/index.js`) and installs watchers for front-end and backend file changes.


### Directory structure

```none
.
├── Procfile
├── README.md
├── client
│   ├── app.js            // React entry point
│   ├── components        // React components
│   │   └── index.jsx
│   ├── stylesheets       // SASS stylesheets
│   │   └── main.scss
├── gulpfile.js
├── manifest.yml
├── package.json
├── server
│   ├── routes.js         // Express routes
│   ├── index.js          // Express configuration
│   └── views
│       └── index.ejs
└── static
    ├── css
    │   └── main.css      // Generated by SASS
    └── js
        └── bundle.js     // Generated by Browserify
```

## Troubleshooting

* The main source of troubleshooting and recovery information is the Bluemix log. To view the log, run the following command:

  ```sh
  $ cf logs <application-name> --recent
  ```

* For more details about the Visual Recognition service, see the [documentation](http://www.ibm.com/watson/developercloud/doc/visual-recognition).

# License

  This sample code is licensed under Apache 2.0.
  Full license text is available in [LICENSE](LICENSE).

## Open Source @ IBM

  Find more open source projects on the
  [IBM Github Page](http://ibm.github.io/).
