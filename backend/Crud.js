import React, { useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';


// Gets all recipes
export const getRecipes = () => {
    const ref = db.collection('newrecipes');
    ref.onSnapshot((QuerySnapshot) => {
        const recipes = [];
        QuerySnapshot.forEach((doc) => {
          let currentID = doc.id
          let appObj = { ...doc.data(), ['id']: currentID }
          recipes.push(appObj);
          console.log(doc.data())
          return recipes;
        });
    })
}

// Gets all forums
export const getForums = () => {
    const ref = db.collection('newForums');
    ref.onSnapshot((QuerySnapshot) => {
        const forums = [];
        QuerySnapshot.forEach((doc) => {
          let currentID = doc.id
          let appObj = { ...doc.data(), ['id']: currentID }
          forums.push(appObj);
          console.log(doc.data())
          return forums;
        });
    })
}


