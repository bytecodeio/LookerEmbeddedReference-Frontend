# Looker Embed Reference - Frontend 

 This application contains examples of embedding Looker.  It is a React application that uses the Looker [Embed SDK](https://docs.looker.com/reference/embed-sdk/embed-sdk-intro) and [Components](https://docs.looker.com/data-modeling/extension-framework/components). It requires running a [backend application](https://github.com/bytecodeio/LookerEmbeddedReference-Backend) to handle API calls safely.  These applications are tightly coupled.

## About Embedding Looker

### Basics
The frontend server (from this repository) serves a web site.  It relies on a [backend server](https://github.com/bytecodeio/LookerEmbeddedReference-Backend) to communicate securely with Looker.  When a user needs Looker content, the frontend server requests a [Signed SSO URL](https://docs.looker.com/reference/embedding/sso-embed) from the backend server.  This URL is then added to an iframe on the site. 

### Details
The frontend server will handle user authentication, navigation, and rendering everything except Looker content.  The frontend uses an iframe (inline frame element) to set space aside for Looker content.  Within the iframe, Looker renders and controls the content.  To investigate where these pieces are defined in the code, investigate these files:

* html entry point (*src/index.js*)
* menu (*src/App.js*)
* routing (*src/App.js*)
* dashboard embedding (*src/components/EmbedSDK*)

## Looker Setup

By default, Looker won't have the necessary dashboards to display embedded content.  We can add a dashboard and data from a public Looker block.

### Install Looker Data Block
1. Create a [GCP account](https://console.cloud.google.com/getting-started), if you don't already have one.
2. Create a connection to BigQuery, [create a new one](https://docs.looker.com/setup-and-management/database-config/google-bigquery) 
   - It can use any schema, even the public_datasets schema
   - You must [create a schema for derived tables](https://docs.looker.com/setup-and-management/database-config/google-bigquery#creating_a_temporary_dataset_for_persistent_derived_tables) in BigQuery
   - Enable Persistent Derived Tables when configuring the connection
3. [Install the Census Data Block](https://docs.looker.com/data-modeling/looker-blocks#data_blocks) via the marketplace in your looker instance
   - When prompted, choose to install using the BigQuery connection from step 2
   - If it is successfully installed, you can view the dashboard in Looker with the context `/embed/dashboards/data_block_acs_bigquery::acs_census_overview`

# Installation
Before using the frontend server, you'll need to install it.

## Prerequisites
* [Install git](https://git-scm.com/downloads)
* [Install node](https://nodejs.org/en/download/)
* [Install npm](https://docs.npmjs.com/cli/v7/configuring-npm/install)
* [Install yarn](https://classic.yarnpkg.com/lang/en/docs/install)

* Clone or download a copy of this repository to your local machine:
```
git clone git@github.com:bytecodeio/LookerEmbeddedReference-Frontend.git
```

* Navigate (cd) to the directory on your system.
* Install the dependencies with Yarn:
```
yarn install
```
  
## Environmental variables

These can be set in a .env file in the root project directory.  In production systems, they are often set in the environment directly using `export PBL_PORT=3001`, or similar OS-specific commands.

```
PBL_PORT=3001  # Note different port from backend 
API_HOST=http://localhost:3000
LOOKER_HOST=https://bytecodeef.looker.com
LOOKER_API_HOST=https://bytecodeef.looker.com:19999
LOOKERSDK_EMBED_HOST=https://example.looker.com   
```
For most installations, the LOOKER_HOST will be the same as the LOOKERSDK_EMBED_HOST variable. The LOOKER_API_HOST is usually the same, but with port 19999.

## Running Locally

Local hosting is recommended for learning and development.

### Start the dev server
```
yarn dev 
```

### Start the backend API server

Follow directions in [the backend repository readme](https://github.com/bytecodeio/LookerEmbeddedReference-Backend#installation) to install, compile and run it.

### Point a browser to:

[http://localhost:3001/embed-dashboard](http://localhost:3001/embed-dashboard)  
Change the port from 3001 if you set a different PBL_PORT

## Running in Google AppEngine

Instead of running this locally, use Google AppEngine to run it in the cloud.
Follow the directions in [the backend repository README](https://github.com/bytecodeio/LookerEmbeddedReference-Backend#google-appengine-installation)


### Other resources:

[Looker API & Embedded Ref ](https://docs.looker.com/reference/api-embedding-intro)
