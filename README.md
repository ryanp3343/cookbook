# CookBook

## Overview 

The CookBook app is intended to be a social media platform for chefs and at home cooks to share recipes and engage in public forums. Users may upload their own recipes and save other recipes to a favorites list. People can also create forums for any questions or techniques other people can implement when cooking their recipes. People may freely comment on other forums to provide instant feedback. While posting recipes, users may also upload images to showcase their final products and demonstrate what is expected.

## Technology 

Cookbook uses these to run as smoothly as possible 

* [Firebase](https://firebase.google.com/docs) - Backend 
* [React Native](https://reactnative.dev/docs/getting-started) - Frontend
* [Expo](https://docs.expo.dev/) - Hosting/Bundling

## Local Install

### Requirements 

Node.js and the Expo go app on any mobile device

### Env Setup

If you want to test this with your own personal firebase change the `.env.example` to `.env` and place your own api keys

    API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    AUTH_DOMAIN="xxxxxxxxxxxxxxxxxxxxxxxxxx"
    PROJECT_ID="xxxxxxxxxxxxxxxxxx"
    STORAGE_BUCKET="xxxxxxxxxxxxxxxxxxxxxxx"
    MESSAGING_SENDER_ID="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    APP_ID="xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

Other wise contact us for the api keys we use

### Install Dependacies Using Node

To download all dependancies needed for cookbook use this command in the command line

    npm install

Once npm has finished installing dependancies you can run this command in the command line 

    expo start

Running that command will open up your local host with the metro bundler. In the bundler 

![Metro Bundler](/markdown/images/metro.png)

Here you scan the QR code on your phone and it will open up the project in your Expo Go app. The connection may very computer to computer so change to Tunnel or Local if necessary.

## Hosted on Expo

### Requirements 

Expo go app on any mobile device

### Viewing the Application

Scan the QR code and it will open the project in the Expo Go app. Only works on android devices.

![Test QR code](/markdown/images/host.png)


## Project Members

[Joshua Popp](https://github.com/joshuapopp17) , [Ryan Puertas](https://github.com/ryanp3343), [Manpreet Saini](https://github.com/mksaini007) , [Andrew Phan](https://github.com/andrewphan23) , [Nicolas Vasquez](https://github.com/Nick-Vasquez-CSU) , [Steven Chiang](https://github.com/StevenChiang57) , [Dung Tran](https://github.com/Dungtran713)
