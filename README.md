## SP Sushi App

Utilizing the API's from Google Maps and Foursquare this application helps users to find the best japanese restaurants in São Paulo. It gathers data about the restaurants from the foursquare API and displays them as a filterable list of _temaki_ markers on a map from Google Maps. It also converts the rating number from Foursquare into a 5 star rating using RateYo.

![SP Sushi Screenshot](https://krystalcampioni.github.io/SP-Sushi/images/sp-sushi-screenshot.png)


>This app was built for the Neighborhood Map project of the Udacity Front-end Nanodegree.

#### Running the project

1. Make sure to have [node](https://nodejs.org) installed in your machine
2. Clone the project
3. Inside the project folder run `npm install` on the terminal
4. Run `gulp` on the terminal
5. Open [http://localhost:1111/](http://localhost:1111/) on the browser

#### Additional Info

This project was built using [Gulp](http://gulpjs.com/) to concat and minify the JS, HTML and CSS files and compress image files. The files for production are output to the `Docs` folder.

Other tools used:
- [KnockoutJS](http://knockoutjs.com/)
- [Bourbon](bourbon.io)
- [Neat](http://neat.bourbon.io/)
- [RateYo](http://rateyo.fundoocode.ninja/)
