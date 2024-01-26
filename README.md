# Cat as a Service Demo using Vite
This is a demo app project to integrate the [Cat as as Service](https://thecatapi.com/) API using Vite Framework. 


## Prerequisites
- NodeJS - >=18
- API key from https://thecatapi.com/signup 

## Technologies

These are the core technologies & libraries used in the project.
- Vite & React - Javascript library to handle the reactivity of the data
- React Context - Used as a state management
- Github Pages - To host the client app
- SASS - For styling
- Typescript - Static typing 
- React Router - for SPA routing capability

## Key Features
- Single page application that supports browser routing and bookmarking. Currently, there are 3 urls exposed
  - ``/`` - index file
  - ``/breeds/:breed_id`` - Listing of breed images
  - ``/breeds/:breed_id/:image_id`` - Breed image and profile
- Responsive and optimize for mobile view
- Powered by React

## Installation

```bash
# Clone this repository
$ git clone https://github.com/juvsqz/vite-cat-service-app-demo

# Go into the project folder
$ cd vite-cat-service-app-demo

# Install dependencies
$ npm install

# Setup local environment
$ cp env.example env.local # Place the api key to the variable

```


### To access online
Simply visit the <https://juvsqz.github.io/vite-cat-service-app-demo/> 

## Development

### Available Scripts

| Command        | Description                                                                                                                                                                                                                                                       |
| :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm install` | Install project dependencies                                                                                                                                                                                                                 |
| `npm run dev`   | Runs the project in development mode (HMR is enabled)                                                                                           |
| `npm run build`   | Builds the app for production to the `dist` folder.<br /> It correctly bundles React in production mode and optimizes the build for the best performance.<br/>The build is handled by the Vite Frameorm |
| `npm run deploy`   | Deploy the app in github page|

                                                                    
## Contact
If you want to contact me you can reach me at juvsqz@gmail.com


