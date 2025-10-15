import React, { useState, useMemo, useEffect } from 'react';
import { Search, Clock, ChefHat, Heart, Star, X, Filter, Users, Utensils } from 'lucide-react';

// Recipe Database
const RECIPES = [
  {
    id: 1,
    name: "Classic Pasta Carbonara",
    ingredients: ["pasta", "eggs", "bacon", "parmesan cheese", "black pepper", "salt"],
    instructions: [
      "Bring a large pot of salted water to boil and cook pasta according to package directions",
      "While pasta cooks, fry bacon until crispy, then set aside",
      "In a bowl, whisk eggs with grated parmesan and black pepper",
      "Drain pasta, reserving 1 cup pasta water",
      "Toss hot pasta with bacon, then remove from heat",
      "Quickly stir in egg mixture, adding pasta water to create creamy sauce",
      "Serve immediately with extra parmesan"
    ],
    cookingTime: 25,
    difficulty: "medium",
    cuisine: "Italian",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 520, protein: "24g", carbs: "58g", fat: "20g" },
    servings: 4,
    image: "🍝"
  },
  {
    id: 2,
    name: "Vegetable Stir Fry",
    ingredients: ["broccoli", "bell pepper", "carrot", "soy sauce", "garlic", "ginger", "sesame oil", "rice"],
    instructions: [
      "Cook rice according to package instructions",
      "Chop all vegetables into bite-sized pieces",
      "Heat sesame oil in a wok or large pan over high heat",
      "Add minced garlic and ginger, stir for 30 seconds",
      "Add carrots first, stir-fry for 2 minutes",
      "Add bell peppers and broccoli, continue stir-frying for 3-4 minutes",
      "Add soy sauce, toss everything together",
      "Serve hot over rice"
    ],
    cookingTime: 20,
    difficulty: "easy",
    cuisine: "Asian",
    dietary: ["vegetarian", "vegan"],
    nutrition: { calories: 280, protein: "8g", carbs: "48g", fat: "8g" },
    servings: 3,
    image: "🥦"
  },
  {
    id: 3,
    name: "Chicken Caesar Salad",
    ingredients: ["chicken breast", "romaine lettuce", "parmesan cheese", "croutons", "caesar dressing", "lemon", "olive oil"],
    instructions: [
      "Season chicken breast with salt and pepper",
      "Heat olive oil in a pan and cook chicken 6-7 minutes per side until cooked through",
      "Let chicken rest for 5 minutes, then slice",
      "Chop romaine lettuce and place in a large bowl",
      "Add croutons and shaved parmesan",
      "Drizzle with caesar dressing and toss well",
      "Top with sliced chicken and extra parmesan",
      "Squeeze lemon juice over the top before serving"
    ],
    cookingTime: 25,
    difficulty: "easy",
    cuisine: "American",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 420, protein: "35g", carbs: "18g", fat: "24g" },
    servings: 2,
    image: "🥗"
  },
  {
    id: 4,
    name: "Margherita Pizza",
    ingredients: ["pizza dough", "tomato sauce", "mozzarella cheese", "fresh basil", "olive oil", "garlic"],
    instructions: [
      "Preheat oven to 475°F (245°C)",
      "Roll out pizza dough on a floured surface",
      "Transfer to a pizza pan or baking sheet",
      "Spread tomato sauce evenly, leaving a small border",
      "Tear mozzarella and distribute over sauce",
      "Drizzle with olive oil and add minced garlic",
      "Bake for 12-15 minutes until crust is golden and cheese bubbles",
      "Remove from oven, top with fresh basil leaves"
    ],
    cookingTime: 30,
    difficulty: "medium",
    cuisine: "Italian",
    dietary: ["vegetarian"],
    nutrition: { calories: 680, protein: "28g", carbs: "82g", fat: "26g" },
    servings: 2,
    image: "🍕"
  },
  {
    id: 5,
    name: "Beef Tacos",
    ingredients: ["ground beef", "taco shells", "lettuce", "tomato", "cheese", "sour cream", "taco seasoning", "onion"],
    instructions: [
      "Brown ground beef in a large skillet over medium-high heat",
      "Drain excess fat, add taco seasoning and water according to package",
      "Simmer for 5 minutes until sauce thickens",
      "While beef cooks, chop lettuce, tomato, and onion",
      "Warm taco shells according to package directions",
      "Fill shells with seasoned beef",
      "Top with lettuce, tomato, cheese, onion, and sour cream",
      "Serve immediately"
    ],
    cookingTime: 20,
    difficulty: "easy",
    cuisine: "Mexican",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 450, protein: "26g", carbs: "38g", fat: "22g" },
    servings: 4,
    image: "🌮"
  },
  {
    id: 6,
    name: "Greek Salad",
    ingredients: ["cucumber", "tomato", "red onion", "feta cheese", "olives", "olive oil", "lemon", "oregano"],
    instructions: [
      "Chop cucumber, tomatoes, and red onion into bite-sized pieces",
      "Place vegetables in a large bowl",
      "Add olives and crumbled feta cheese",
      "In a small bowl, whisk olive oil, lemon juice, and oregano",
      "Pour dressing over salad and toss gently",
      "Let sit for 10 minutes for flavors to meld",
      "Serve chilled or at room temperature"
    ],
    cookingTime: 15,
    difficulty: "easy",
    cuisine: "Greek",
    dietary: ["vegetarian", "gluten-free"],
    nutrition: { calories: 220, protein: "8g", carbs: "14g", fat: "16g" },
    servings: 4,
    image: "🥗"
  },
  {
    id: 7,
    name: "Chicken Curry",
    ingredients: ["chicken", "curry powder", "coconut milk", "onion", "garlic", "ginger", "tomato", "rice", "cilantro"],
    instructions: [
      "Cut chicken into bite-sized pieces",
      "Sauté diced onion, garlic, and ginger in oil until soft",
      "Add curry powder and cook for 1 minute until fragrant",
      "Add chicken pieces and brown on all sides",
      "Add diced tomatoes and coconut milk",
      "Simmer for 20 minutes until chicken is cooked through",
      "Season with salt and pepper to taste",
      "Serve over rice, garnished with fresh cilantro"
    ],
    cookingTime: 40,
    difficulty: "medium",
    cuisine: "Indian",
    dietary: ["non-vegetarian", "gluten-free"],
    nutrition: { calories: 480, protein: "32g", carbs: "42g", fat: "18g" },
    servings: 4,
    image: "🍛"
  },
  {
    id: 8,
    name: "Mushroom Risotto",
    ingredients: ["arborio rice", "mushrooms", "vegetable broth", "white wine", "parmesan cheese", "butter", "onion", "garlic"],
    instructions: [
      "Heat vegetable broth in a pot and keep warm",
      "Sauté sliced mushrooms until golden, set aside",
      "In the same pan, cook diced onion and garlic until soft",
      "Add arborio rice and stir for 2 minutes",
      "Add white wine and stir until absorbed",
      "Add broth one ladle at a time, stirring constantly",
      "Continue until rice is creamy and al dente (about 20 minutes)",
      "Stir in mushrooms, butter, and parmesan before serving"
    ],
    cookingTime: 35,
    difficulty: "hard",
    cuisine: "Italian",
    dietary: ["vegetarian", "gluten-free"],
    nutrition: { calories: 420, protein: "12g", carbs: "64g", fat: "14g" },
    servings: 4,
    image: "🍚"
  },
  {
    id: 9,
    name: "Fish Tacos",
    ingredients: ["white fish", "tortillas", "cabbage", "lime", "cilantro", "sour cream", "avocado", "paprika"],
    instructions: [
      "Season fish with paprika, salt, and pepper",
      "Pan-fry or grill fish for 3-4 minutes per side",
      "Flake fish into chunks",
      "Shred cabbage finely",
      "Warm tortillas in a dry pan",
      "Slice avocado",
      "Assemble tacos with fish, cabbage, avocado",
      "Top with sour cream, cilantro, and a squeeze of lime"
    ],
    cookingTime: 20,
    difficulty: "easy",
    cuisine: "Mexican",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 380, protein: "28g", carbs: "36g", fat: "14g" },
    servings: 3,
    image: "🐟"
  },
  {
    id: 10,
    name: "Caprese Salad",
    ingredients: ["tomato", "mozzarella cheese", "fresh basil", "olive oil", "balsamic vinegar", "salt", "black pepper"],
    instructions: [
      "Slice tomatoes and mozzarella into 1/4 inch thick rounds",
      "Arrange alternating slices of tomato and mozzarella on a plate",
      "Tuck fresh basil leaves between slices",
      "Drizzle generously with olive oil",
      "Drizzle with balsamic vinegar",
      "Sprinkle with salt and freshly ground black pepper",
      "Let sit for 5 minutes before serving to allow flavors to meld"
    ],
    cookingTime: 10,
    difficulty: "easy",
    cuisine: "Italian",
    dietary: ["vegetarian", "gluten-free"],
    nutrition: { calories: 280, protein: "16g", carbs: "8g", fat: "22g" },
    servings: 2,
    image: "🍅"
  },
  {
    id: 11,
    name: "Pad Thai",
    ingredients: ["rice noodles", "shrimp", "eggs", "bean sprouts", "peanuts", "lime", "fish sauce", "garlic", "tofu"],
    instructions: [
      "Soak rice noodles in warm water for 30 minutes, then drain",
      "Mix fish sauce, lime juice, and sugar for sauce",
      "Heat oil in a wok, scramble eggs and set aside",
      "Stir-fry garlic, add shrimp and tofu until cooked",
      "Add noodles and sauce, toss everything together",
      "Add bean sprouts and cook for 1 minute",
      "Mix in scrambled eggs",
      "Serve topped with crushed peanuts and lime wedges"
    ],
    cookingTime: 30,
    difficulty: "medium",
    cuisine: "Thai",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 520, protein: "28g", carbs: "68g", fat: "16g" },
    servings: 3,
    image: "🍜"
  },
  {
    id: 12,
    name: "Vegetarian Chili",
    ingredients: ["kidney beans", "black beans", "tomato", "bell pepper", "onion", "garlic", "chili powder", "cumin", "corn"],
    instructions: [
      "Dice onion, bell pepper, and tomatoes",
      "Sauté onion and garlic in oil until soft",
      "Add bell pepper and cook for 5 minutes",
      "Add chili powder and cumin, stir for 1 minute",
      "Add tomatoes, beans, and corn",
      "Add water or vegetable broth to desired consistency",
      "Simmer for 30 minutes, stirring occasionally",
      "Season with salt and pepper, serve with toppings of choice"
    ],
    cookingTime: 45,
    difficulty: "easy",
    cuisine: "American",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    nutrition: { calories: 320, protein: "18g", carbs: "58g", fat: "4g" },
    servings: 6,
    image: "🌶️"
  },
  {
    id: 13,
    name: "Salmon Teriyaki",
    ingredients: ["salmon", "soy sauce", "honey", "ginger", "garlic", "rice", "sesame seeds", "green onion"],
    instructions: [
      "Mix soy sauce, honey, minced ginger, and garlic for teriyaki sauce",
      "Marinate salmon in half the sauce for 15 minutes",
      "Cook rice according to package instructions",
      "Heat oil in a pan over medium-high heat",
      "Cook salmon skin-side down for 4 minutes",
      "Flip and cook for another 3 minutes",
      "Pour remaining sauce over salmon and let it glaze",
      "Serve over rice, garnished with sesame seeds and green onion"
    ],
    cookingTime: 30,
    difficulty: "medium",
    cuisine: "Japanese",
    dietary: ["non-vegetarian", "gluten-free-option"],
    nutrition: { calories: 480, protein: "38g", carbs: "52g", fat: "14g" },
    servings: 2,
    image: "🐟"
  },
  {
    id: 14,
    name: "Spinach and Feta Quiche",
    ingredients: ["eggs", "spinach", "feta cheese", "pie crust", "milk", "onion", "garlic", "nutmeg"],
    instructions: [
      "Preheat oven to 375°F (190°C)",
      "Sauté onion and garlic until soft, add spinach until wilted",
      "In a bowl, whisk eggs with milk and nutmeg",
      "Press pie crust into a pie dish",
      "Spread spinach mixture over crust, top with crumbled feta",
      "Pour egg mixture over everything",
      "Bake for 35-40 minutes until center is set and top is golden",
      "Let cool for 10 minutes before slicing"
    ],
    cookingTime: 50,
    difficulty: "medium",
    cuisine: "French",
    dietary: ["vegetarian"],
    nutrition: { calories: 380, protein: "16g", carbs: "28g", fat: "24g" },
    servings: 6,
    image: "🥧"
  },
  {
    id: 15,
    name: "BBQ Chicken Wings",
    ingredients: ["chicken wings", "bbq sauce", "honey", "garlic powder", "paprika", "salt", "black pepper"],
    instructions: [
      "Preheat oven to 400°F (200°C)",
      "Pat chicken wings dry with paper towels",
      "Season wings with salt, pepper, garlic powder, and paprika",
      "Place wings on a baking sheet lined with parchment paper",
      "Bake for 25 minutes, flip, and bake another 25 minutes",
      "Mix BBQ sauce with honey",
      "Brush wings with sauce mixture",
      "Bake for final 10 minutes until sticky and caramelized"
    ],
    cookingTime: 60,
    difficulty: "easy",
    cuisine: "American",
    dietary: ["non-vegetarian", "gluten-free-option"],
    nutrition: { calories: 480, protein: "32g", carbs: "24g", fat: "28g" },
    servings: 4,
    image: "🍗"
  },
  {
    id: 16,
    name: "Lentil Soup",
    ingredients: ["lentils", "carrot", "celery", "onion", "garlic", "vegetable broth", "tomato", "cumin", "bay leaf"],
    instructions: [
      "Dice carrot, celery, and onion",
      "Sauté vegetables in oil until soft",
      "Add minced garlic and cumin, cook for 1 minute",
      "Add lentils, diced tomatoes, and vegetable broth",
      "Add bay leaf",
      "Bring to boil, then reduce heat and simmer for 30 minutes",
      "Remove bay leaf, season with salt and pepper",
      "Serve hot with crusty bread"
    ],
    cookingTime: 45,
    difficulty: "easy",
    cuisine: "Mediterranean",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    nutrition: { calories: 280, protein: "16g", carbs: "48g", fat: "4g" },
    servings: 6,
    image: "🍲"
  },
  {
    id: 17,
    name: "Shrimp Scampi",
    ingredients: ["shrimp", "pasta", "butter", "garlic", "white wine", "lemon", "parsley", "red pepper flakes"],
    instructions: [
      "Cook pasta according to package directions, reserve 1 cup pasta water",
      "Peel and devein shrimp, pat dry",
      "Melt butter in a large pan over medium heat",
      "Add minced garlic and red pepper flakes, cook for 1 minute",
      "Add shrimp and cook until pink (2-3 minutes per side)",
      "Remove shrimp, add white wine and lemon juice to pan",
      "Add pasta and toss with sauce, adding pasta water to thin if needed",
      "Return shrimp to pan, toss, and garnish with fresh parsley"
    ],
    cookingTime: 25,
    difficulty: "medium",
    cuisine: "Italian",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 520, protein: "32g", carbs: "54g", fat: "18g" },
    servings: 4,
    image: "🍤"
  },
  {
    id: 18,
    name: "Vegetable Soup",
    ingredients: ["carrot", "celery", "onion", "potato", "tomato", "vegetable broth", "green beans", "corn", "garlic"],
    instructions: [
      "Dice all vegetables into small, uniform pieces",
      "Heat oil in a large pot and sauté onion until translucent",
      "Add carrots, celery, and garlic, cook for 5 minutes",
      "Add potatoes, tomatoes, and vegetable broth",
      "Bring to boil, then reduce heat and simmer for 15 minutes",
      "Add green beans and corn, simmer for another 10 minutes",
      "Season with salt, pepper, and herbs of choice",
      "Serve hot with crusty bread"
    ],
    cookingTime: 40,
    difficulty: "easy",
    cuisine: "American",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    nutrition: { calories: 180, protein: "6g", carbs: "38g", fat: "2g" },
    servings: 6,
    image: "🥕"
  },
  {
    id: 19,
    name: "Beef Stir Fry",
    ingredients: ["beef", "broccoli", "bell pepper", "soy sauce", "ginger", "garlic", "cornstarch", "rice", "sesame oil"],
    instructions: [
      "Slice beef thinly against the grain, toss with cornstarch",
      "Cook rice according to package instructions",
      "Heat sesame oil in a wok over high heat",
      "Stir-fry beef until browned, remove and set aside",
      "Add more oil, stir-fry ginger and garlic for 30 seconds",
      "Add broccoli and bell pepper, stir-fry for 3-4 minutes",
      "Return beef to wok, add soy sauce",
      "Toss everything together and serve over rice"
    ],
    cookingTime: 25,
    difficulty: "medium",
    cuisine: "Asian",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 460, protein: "32g", carbs: "48g", fat: "14g" },
    servings: 4,
    image: "🥩"
  },
  {
    id: 20,
    name: "Chocolate Chip Cookies",
    ingredients: ["flour", "butter", "sugar", "brown sugar", "eggs", "chocolate chips", "vanilla extract", "baking soda", "salt"],
    instructions: [
      "Preheat oven to 375°F (190°C)",
      "Cream together softened butter, sugar, and brown sugar",
      "Beat in eggs and vanilla extract",
      "In separate bowl, mix flour, baking soda, and salt",
      "Gradually mix dry ingredients into wet ingredients",
      "Fold in chocolate chips",
      "Drop spoonfuls of dough onto baking sheet",
      "Bake for 10-12 minutes until edges are golden",
      "Cool on baking sheet for 5 minutes, then transfer to wire rack"
    ],
    cookingTime: 25,
    difficulty: "easy",
    cuisine: "American",
    dietary: ["vegetarian"],
    nutrition: { calories: 180, protein: "2g", carbs: "24g", fat: "9g" },
    servings: 24,
    image: "🍪"
  },
  {
    id: 21,
    name: "Chicken Fried Rice",
    ingredients: ["rice", "chicken", "eggs", "peas", "carrot", "soy sauce", "garlic", "green onion", "sesame oil"],
    instructions: [
      "Cook rice and let it cool (day-old rice works best)",
      "Dice chicken into small pieces",
      "Scramble eggs in a wok, remove and set aside",
      "Stir-fry chicken until cooked through, remove and set aside",
      "Add diced carrots and peas, stir-fry for 2 minutes",
      "Add cold rice, break up any clumps",
      "Add chicken and eggs back to wok",
      "Add soy sauce and sesame oil, toss everything together",
      "Garnish with chopped green onions before serving"
    ],
    cookingTime: 20,
    difficulty: "easy",
    cuisine: "Asian",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 420, protein: "24g", carbs: "56g", fat: "12g" },
    servings: 4,
    image: "🍚"
  },
  {
    id: 22,
    name: "Tomato Basil Pasta",
    ingredients: ["pasta", "tomato", "fresh basil", "garlic", "olive oil", "parmesan cheese", "salt", "black pepper"],
    instructions: [
      "Cook pasta in salted boiling water until al dente",
      "While pasta cooks, dice fresh tomatoes",
      "Heat olive oil in a pan, add minced garlic",
      "Add tomatoes and cook until they start to break down",
      "Drain pasta, reserving 1/2 cup pasta water",
      "Add pasta to tomato mixture",
      "Tear fresh basil leaves and add to pasta",
      "Toss with parmesan, adding pasta water if needed",
      "Season with salt and pepper, serve immediately"
    ],
    cookingTime: 20,
    difficulty: "easy",
    cuisine: "Italian",
    dietary: ["vegetarian"],
    nutrition: { calories: 380, protein: "14g", carbs: "62g", fat: "10g" },
    servings: 4,
    image: "🍝"
  },
  {
    id: 22,
    name: "Tomato Basil Pasta",
    ingredients: ["pasta", "tomato", "fresh basil", "garlic", "olive oil", "parmesan cheese", "salt", "black pepper"],
    instructions: [
      "Cook pasta in salted boiling water until al dente",
      "While pasta cooks, dice fresh tomatoes",
      "Heat olive oil in a pan, add minced garlic",
      "Add tomatoes and cook until they start to break down",
      "Drain pasta, reserving 1/2 cup pasta water",
      "Add pasta to tomato mixture",
      "Tear fresh basil leaves and add to pasta",
      "Toss with parmesan, adding pasta water if needed",
      "Season with salt and pepper, serve immediately"
    ],
    cookingTime: 20,
    difficulty: "easy",
    cuisine: "Italian",
    dietary: ["vegetarian"],
    nutrition: { calories: 380, protein: "14g", carbs: "62g", fat: "10g" },
    servings: 4,
    image: "🍝"
  },
  {
    id: 23,
    name: "Beef Burgers",
    ingredients: ["ground beef", "burger buns", "lettuce", "tomato", "onion", "cheese", "ketchup", "mustard", "pickles"],
    instructions: [
      "Form ground beef into patties, season with salt and pepper",
      "Heat grill or pan to medium-high heat",
      "Cook patties for 4-5 minutes per side",
      "Add cheese in last minute of cooking if desired",
      "Toast burger buns lightly",
      "Assemble burgers with lettuce, tomato, onion, pickles",
      "Add ketchup and mustard to taste",
      "Serve immediately with fries or chips"
    ],
    cookingTime: 20,
    difficulty: "easy",
    cuisine: "American",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 580, protein: "32g", carbs: "42g", fat: "30g" },
    servings: 4,
    image: "🍔"
  },
  {
    id: 24,
    name: "Pancakes",
    ingredients: ["flour", "milk", "eggs", "butter", "sugar", "baking powder", "salt", "vanilla extract", "maple syrup"],
    instructions: [
      "Mix flour, sugar, baking powder, and salt in a bowl",
      "In another bowl, whisk milk, eggs, melted butter, and vanilla",
      "Pour wet ingredients into dry, mix until just combined",
      "Heat a griddle or pan over medium heat",
      "Pour 1/4 cup batter for each pancake",
      "Cook until bubbles form on surface, then flip",
      "Cook another 1-2 minutes until golden",
      "Serve hot with butter and maple syrup"
    ],
    cookingTime: 20,
    difficulty: "easy",
    cuisine: "American",
    dietary: ["vegetarian"],
    nutrition: { calories: 320, protein: "10g", carbs: "48g", fat: "10g" },
    servings: 4,
    image: "🥞"
  },
  {
    id: 25,
    name: "French Onion Soup",
    ingredients: ["onion", "beef broth", "white wine", "butter", "flour", "bread", "gruyere cheese", "thyme", "bay leaf"],
    instructions: [
      "Slice onions thinly",
      "Melt butter in a large pot, add onions",
      "Cook onions slowly for 30-40 minutes until caramelized",
      "Sprinkle flour over onions, stir for 1 minute",
      "Add white wine, scrape bottom of pot",
      "Add beef broth, thyme, and bay leaf",
      "Simmer for 20 minutes",
      "Toast bread, top soup with bread and gruyere, broil until melted"
    ],
    cookingTime: 70,
    difficulty: "medium",
    cuisine: "French",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 380, protein: "18g", carbs: "38g", fat: "18g" },
    servings: 4,
    image: "🍜"
  },
  {
    id: 26,
    name: "Guacamole",
    ingredients: ["avocado", "lime", "tomato", "onion", "cilantro", "jalapeño", "salt", "garlic"],
    instructions: [
      "Cut avocados in half, remove pit and scoop out flesh",
      "Mash avocado in a bowl to desired consistency",
      "Add lime juice immediately to prevent browning",
      "Dice tomato, onion, and jalapeño finely",
      "Add vegetables to mashed avocado",
      "Add minced garlic and chopped cilantro",
      "Season with salt to taste",
      "Mix well and serve with tortilla chips"
    ],
    cookingTime: 10,
    difficulty: "easy",
    cuisine: "Mexican",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    nutrition: { calories: 180, protein: "2g", carbs: "12g", fat: "16g" },
    servings: 4,
    image: "🥑"
  },
  {
    id: 27,
    name: "Lasagna",
    ingredients: ["lasagna noodles", "ground beef", "ricotta cheese", "mozzarella cheese", "parmesan cheese", "tomato sauce", "onion", "garlic", "oregano"],
    instructions: [
      "Preheat oven to 375°F (190°C)",
      "Brown ground beef with onion and garlic, add tomato sauce",
      "Cook lasagna noodles according to package",
      "Mix ricotta with egg and half the mozzarella",
      "Layer sauce, noodles, ricotta mixture in baking dish",
      "Repeat layers, ending with sauce",
      "Top with remaining mozzarella and parmesan",
      "Cover with foil, bake 25 minutes, uncover and bake 25 more"
    ],
    cookingTime: 90,
    difficulty: "hard",
    cuisine: "Italian",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 520, protein: "32g", carbs: "48g", fat: "22g" },
    servings: 8,
    image: "🍝"
  },
  {
    id: 28,
    name: "Chicken Noodle Soup",
    ingredients: ["chicken breast", "egg noodles", "carrot", "celery", "onion", "chicken broth", "garlic", "parsley", "bay leaf"],
    instructions: [
      "Dice chicken, carrot, celery, and onion",
      "Sauté onion, celery, and carrot in oil until soft",
      "Add minced garlic, cook 1 minute",
      "Add chicken broth and bay leaf, bring to boil",
      "Add chicken pieces, simmer 10 minutes",
      "Add egg noodles, cook until tender",
      "Remove bay leaf, season with salt and pepper",
      "Garnish with fresh parsley before serving"
    ],
    cookingTime: 35,
    difficulty: "easy",
    cuisine: "American",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 280, protein: "22g", carbs: "32g", fat: "6g" },
    servings: 6,
    image: "🍜"
  },
  {
    id: 29,
    name: "Hummus",
    ingredients: ["chickpeas", "tahini", "lemon", "garlic", "olive oil", "cumin", "salt", "paprika"],
    instructions: [
      "Drain and rinse chickpeas, reserve some liquid",
      "Add chickpeas, tahini, lemon juice, and garlic to food processor",
      "Blend until smooth",
      "Add olive oil while blending",
      "Add reserved chickpea liquid to reach desired consistency",
      "Season with cumin and salt",
      "Transfer to serving bowl",
      "Drizzle with olive oil and sprinkle paprika on top"
    ],
    cookingTime: 10,
    difficulty: "easy",
    cuisine: "Mediterranean",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    nutrition: { calories: 220, protein: "8g", carbs: "24g", fat: "12g" },
    servings: 6,
    image: "🥙"
  },
  {
    id: 30,
    name: "Pork Chops",
    ingredients: ["pork chops", "olive oil", "garlic", "rosemary", "thyme", "butter", "salt", "black pepper"],
    instructions: [
      "Season pork chops generously with salt and pepper",
      "Heat olive oil in a large skillet over medium-high heat",
      "Sear pork chops 4-5 minutes per side",
      "Add butter, minced garlic, rosemary, and thyme",
      "Baste pork chops with herb butter",
      "Reduce heat, cook until internal temp reaches 145°F",
      "Let rest 5 minutes before serving",
      "Spoon pan juices over chops"
    ],
    cookingTime: 25,
    difficulty: "medium",
    cuisine: "American",
    dietary: ["non-vegetarian", "gluten-free"],
    nutrition: { calories: 420, protein: "38g", carbs: "2g", fat: "28g" },
    servings: 4,
    image: "🥩"
  },
  {
    id: 31,
    name: "Banana Bread",
    ingredients: ["banana", "flour", "sugar", "butter", "eggs", "baking soda", "salt", "vanilla extract", "walnuts"],
    instructions: [
      "Preheat oven to 350°F (175°C), grease loaf pan",
      "Mash ripe bananas in a bowl",
      "Mix melted butter with mashed bananas",
      "Stir in sugar, eggs, and vanilla",
      "In separate bowl, mix flour, baking soda, and salt",
      "Fold dry ingredients into banana mixture",
      "Add chopped walnuts if desired",
      "Pour into loaf pan, bake 60 minutes until toothpick comes out clean"
    ],
    cookingTime: 75,
    difficulty: "easy",
    cuisine: "American",
    dietary: ["vegetarian"],
    nutrition: { calories: 280, protein: "5g", carbs: "42g", fat: "11g" },
    servings: 10,
    image: "🍌"
  },
  {
    id: 32,
    name: "Falafel",
    ingredients: ["chickpeas", "onion", "garlic", "parsley", "cilantro", "cumin", "coriander", "flour", "baking powder"],
    instructions: [
      "Soak dried chickpeas overnight, drain well",
      "Add chickpeas, onion, garlic, herbs, and spices to food processor",
      "Pulse until mixture is coarse but holds together",
      "Mix in flour and baking powder",
      "Refrigerate mixture 1 hour",
      "Form into small balls or patties",
      "Deep fry in oil at 350°F until golden brown",
      "Serve in pita with tahini sauce and vegetables"
    ],
    cookingTime: 30,
    difficulty: "medium",
    cuisine: "Mediterranean",
    dietary: ["vegetarian", "vegan"],
    nutrition: { calories: 320, protein: "14g", carbs: "48g", fat: "10g" },
    servings: 4,
    image: "🧆"
  },
  {
    id: 33,
    name: "Quesadillas",
    ingredients: ["tortillas", "cheese", "chicken", "bell pepper", "onion", "sour cream", "salsa", "olive oil"],
    instructions: [
      "Dice cooked chicken, bell pepper, and onion",
      "Sauté vegetables until soft",
      "Heat a large pan over medium heat",
      "Place tortilla in pan, sprinkle cheese on half",
      "Add chicken and vegetables on cheese side",
      "Fold tortilla in half",
      "Cook 2-3 minutes per side until golden and cheese melts",
      "Cut into wedges, serve with sour cream and salsa"
    ],
    cookingTime: 15,
    difficulty: "easy",
    cuisine: "Mexican",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 420, protein: "26g", carbs: "38g", fat: "18g" },
    servings: 2,
    image: "🌯"
  },
  {
    id: 34,
    name: "Coleslaw",
    ingredients: ["cabbage", "carrot", "mayonnaise", "vinegar", "sugar", "salt", "black pepper", "celery seed"],
    instructions: [
      "Shred cabbage and carrots finely",
      "Place in large bowl",
      "In small bowl, mix mayonnaise, vinegar, and sugar",
      "Add salt, pepper, and celery seed to dressing",
      "Pour dressing over cabbage mixture",
      "Toss well to coat evenly",
      "Refrigerate at least 1 hour before serving",
      "Toss again before serving"
    ],
    cookingTime: 15,
    difficulty: "easy",
    cuisine: "American",
    dietary: ["vegetarian", "gluten-free"],
    nutrition: { calories: 180, protein: "2g", carbs: "16g", fat: "12g" },
    servings: 6,
    image: "🥬"
  },
  {
    id: 35,
    name: "Minestrone Soup",
    ingredients: ["kidney beans", "pasta", "tomato", "carrot", "celery", "onion", "garlic", "vegetable broth", "spinach", "oregano"],
    instructions: [
      "Dice carrot, celery, and onion",
      "Sauté vegetables in oil until soft",
      "Add minced garlic and oregano",
      "Add diced tomatoes and vegetable broth",
      "Bring to boil, add pasta and kidney beans",
      "Simmer 10 minutes until pasta is tender",
      "Stir in fresh spinach until wilted",
      "Season with salt and pepper, serve with parmesan"
    ],
    cookingTime: 40,
    difficulty: "easy",
    cuisine: "Italian",
    dietary: ["vegetarian", "vegan-option"],
    nutrition: { calories: 240, protein: "12g", carbs: "44g", fat: "3g" },
    servings: 6,
    image: "🍲"
  },
  {
    id: 36,
    name: "Tuna Salad",
    ingredients: ["tuna", "mayonnaise", "celery", "onion", "lemon", "salt", "black pepper", "lettuce"],
    instructions: [
      "Drain canned tuna well",
      "Flake tuna into a bowl",
      "Dice celery and onion finely",
      "Add vegetables to tuna",
      "Mix in mayonnaise and lemon juice",
      "Season with salt and pepper",
      "Chill in refrigerator 30 minutes",
      "Serve on lettuce, bread, or crackers"
    ],
    cookingTime: 10,
    difficulty: "easy",
    cuisine: "American",
    dietary: ["non-vegetarian", "gluten-free"],
    nutrition: { calories: 280, protein: "24g", carbs: "4g", fat: "18g" },
    servings: 3,
    image: "🥗"
  },
  {
    id: 37,
    name: "Spaghetti Bolognese",
    ingredients: ["spaghetti", "ground beef", "tomato sauce", "onion", "garlic", "carrot", "celery", "red wine", "oregano"],
    instructions: [
      "Dice onion, carrot, celery, and garlic finely",
      "Sauté vegetables in oil until soft",
      "Add ground beef, cook until browned",
      "Add red wine, simmer until reduced",
      "Add tomato sauce and oregano",
      "Simmer sauce 30 minutes, stirring occasionally",
      "Cook spaghetti according to package",
      "Serve sauce over spaghetti with parmesan"
    ],
    cookingTime: 50,
    difficulty: "medium",
    cuisine: "Italian",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 520, protein: "28g", carbs: "64g", fat: "16g" },
    servings: 4,
    image: "🍝"
  },
  {
    id: 38,
    name: "Grilled Cheese Sandwich",
    ingredients: ["bread", "cheese", "butter"],
    instructions: [
      "Heat a pan over medium heat",
      "Butter one side of each bread slice",
      "Place one slice butter-side down in pan",
      "Add cheese slices on top",
      "Top with second bread slice, butter-side up",
      "Cook 3-4 minutes until golden brown",
      "Flip and cook other side until golden",
      "Cut in half and serve hot"
    ],
    cookingTime: 10,
    difficulty: "easy",
    cuisine: "American",
    dietary: ["vegetarian"],
    nutrition: { calories: 380, protein: "16g", carbs: "32g", fat: "22g" },
    servings: 1,
    image: "🥪"
  },
  {
    id: 39,
    name: "Chicken Alfredo",
    ingredients: ["fettuccine", "chicken breast", "heavy cream", "butter", "parmesan cheese", "garlic", "salt", "black pepper"],
    instructions: [
      "Cook fettuccine according to package directions",
      "Season and cook chicken in butter until golden",
      "Slice chicken and set aside",
      "In same pan, melt more butter and add minced garlic",
      "Add heavy cream, bring to simmer",
      "Stir in parmesan until smooth",
      "Add cooked pasta and toss to coat",
      "Top with sliced chicken and serve"
    ],
    cookingTime: 30,
    difficulty: "medium",
    cuisine: "Italian",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 680, protein: "38g", carbs: "58g", fat: "32g" },
    servings: 4,
    image: "🍝"
  },
  {
    id: 40,
    name: "Potato Salad",
    ingredients: ["potato", "mayonnaise", "mustard", "celery", "onion", "eggs", "pickles", "salt", "black pepper"],
    instructions: [
      "Boil potatoes until tender, about 15 minutes",
      "Hard boil eggs, cool and chop",
      "Dice potatoes into bite-sized pieces",
      "Dice celery, onion, and pickles finely",
      "Mix mayonnaise and mustard in large bowl",
      "Add potatoes, eggs, and vegetables",
      "Season with salt and pepper",
      "Chill at least 2 hours before serving"
    ],
    cookingTime: 30,
    difficulty: "easy",
    cuisine: "American",
    dietary: ["vegetarian", "gluten-free"],
    nutrition: { calories: 320, protein: "8g", carbs: "38g", fat: "16g" },
    servings: 6,
    image: "🥔"
  },
  {
    id: 41,
    name: "Enchiladas",
    ingredients: ["tortillas", "chicken", "enchilada sauce", "cheese", "onion", "sour cream", "black beans", "corn"],
    instructions: [
      "Preheat oven to 375°F (190°C)",
      "Shred cooked chicken and mix with beans and corn",
      "Dip tortillas in enchilada sauce",
      "Fill tortillas with chicken mixture and cheese",
      "Roll up and place seam-side down in baking dish",
      "Pour remaining sauce over enchiladas",
      "Top with more cheese",
      "Bake 25 minutes, serve with sour cream"
    ],
    cookingTime: 45,
    difficulty: "medium",
    cuisine: "Mexican",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 480, protein: "32g", carbs: "48g", fat: "18g" },
    servings: 4,
    image: "🌯"
  },
  {
    id: 42,
    name: "Meatballs",
    ingredients: ["ground beef", "breadcrumbs", "eggs", "parmesan cheese", "garlic", "parsley", "tomato sauce", "oregano"],
    instructions: [
      "Mix ground beef, breadcrumbs, egg, parmesan, garlic, and parsley",
      "Season with salt and pepper",
      "Form into golf ball-sized meatballs",
      "Brown meatballs in oil on all sides",
      "Add tomato sauce and oregano to pan",
      "Simmer meatballs in sauce 20 minutes",
      "Serve over pasta or in sandwiches",
      "Garnish with extra parmesan"
    ],
    cookingTime: 40,
    difficulty: "medium",
    cuisine: "Italian",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 380, protein: "28g", carbs: "18g", fat: "22g" },
    servings: 4,
    image: "🍝"
  },
  {
    id: 43,
    name: "Stuffed Bell Peppers",
    ingredients: ["bell pepper", "ground beef", "rice", "tomato sauce", "onion", "garlic", "cheese", "oregano"],
    instructions: [
      "Preheat oven to 375°F (190°C)",
      "Cut tops off peppers, remove seeds",
      "Cook rice according to package",
      "Brown ground beef with onion and garlic",
      "Mix beef, rice, and half the tomato sauce",
      "Stuff peppers with mixture",
      "Place in baking dish, pour remaining sauce over",
      "Top with cheese, bake 30 minutes"
    ],
    cookingTime: 55,
    difficulty: "medium",
    cuisine: "American",
    dietary: ["non-vegetarian", "gluten-free"],
    nutrition: { calories: 420, protein: "28g", carbs: "42g", fat: "16g" },
    servings: 4,
    image: "🫑"
  },
  {
    id: 44,
    name: "Chicken Parmesan",
    ingredients: ["chicken breast", "breadcrumbs", "parmesan cheese", "mozzarella cheese", "eggs", "tomato sauce", "flour", "basil"],
    instructions: [
      "Pound chicken breasts thin",
      "Set up breading station: flour, beaten eggs, breadcrumbs with parmesan",
      "Bread chicken by coating in flour, egg, then breadcrumbs",
      "Fry in oil until golden brown on both sides",
      "Transfer to baking dish, top with tomato sauce",
      "Add mozzarella cheese on top",
      "Bake at 375°F until cheese melts",
      "Garnish with fresh basil and serve with pasta"
    ],
    cookingTime: 40,
    difficulty: "medium",
    cuisine: "Italian",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 520, protein: "42g", carbs: "38g", fat: "22g" },
    servings: 4,
    image: "🍗"
  },
  {
    id: 45,
    name: "Ramen",
    ingredients: ["ramen noodles", "chicken broth", "soy sauce", "eggs", "green onion", "ginger", "garlic", "sesame oil", "corn"],
    instructions: [
      "Bring chicken broth to boil with ginger and garlic",
      "Add soy sauce and sesame oil",
      "Soft boil eggs for 7 minutes, peel and halve",
      "Cook ramen noodles according to package",
      "Divide noodles into bowls",
      "Ladle hot broth over noodles",
      "Top with eggs, sliced green onion, and corn",
      "Serve immediately while hot"
    ],
    cookingTime: 20,
    difficulty: "easy",
    cuisine: "Japanese",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 420, protein: "18g", carbs: "62g", fat: "12g" },
    servings: 2,
    image: "🍜"
  },
  {
    id: 46,
    name: "Apple Pie",
    ingredients: ["apples", "flour", "butter", "sugar", "cinnamon", "nutmeg", "lemon", "eggs", "salt"],
    instructions: [
      "Preheat oven to 425°F (220°C)",
      "Make pie crust with flour, butter, salt, and cold water",
      "Peel and slice apples thinly",
      "Toss apples with sugar, cinnamon, nutmeg, and lemon juice",
      "Roll out bottom crust and place in pie dish",
      "Fill with apple mixture",
      "Cover with top crust, seal edges and cut vents",
      "Brush with egg wash, bake 45 minutes until golden"
    ],
    cookingTime: 75,
    difficulty: "hard",
    cuisine: "American",
    dietary: ["vegetarian"],
    nutrition: { calories: 420, protein: "4g", carbs: "62g", fat: "18g" },
    servings: 8,
    image: "🥧"
  },
  {
    id: 47,
    name: "Baked Salmon",
    ingredients: ["salmon", "lemon", "olive oil", "garlic", "dill", "salt", "black pepper"],
    instructions: [
      "Preheat oven to 400°F (200°C)",
      "Place salmon fillets on lined baking sheet",
      "Drizzle with olive oil",
      "Season with minced garlic, salt, and pepper",
      "Top with fresh dill and lemon slices",
      "Bake 12-15 minutes until fish flakes easily",
      "Let rest 2 minutes",
      "Serve with additional lemon wedges"
    ],
    cookingTime: 20,
    difficulty: "easy",
    cuisine: "American",
    dietary: ["non-vegetarian", "gluten-free"],
    nutrition: { calories: 380, protein: "34g", carbs: "2g", fat: "26g" },
    servings: 4,
    image: "🐟"
  },
  {
    id: 48,
    name: "Nachos",
    ingredients: ["tortilla chips", "cheese", "ground beef", "jalapeño", "sour cream", "salsa", "black beans", "corn", "guacamole"],
    instructions: [
      "Preheat oven to 375°F (190°C)",
      "Brown ground beef with taco seasoning",
      "Spread tortilla chips on baking sheet",
      "Layer with beef, beans, corn, and cheese",
      "Add sliced jalapeños",
      "Bake 10 minutes until cheese melts",
      "Remove from oven",
      "Top with sour cream, salsa, and guacamole before serving"
    ],
    cookingTime: 20,
    difficulty: "easy",
    cuisine: "Mexican",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 580, protein: "24g", carbs: "52g", fat: "32g" },
    servings: 4,
    image: "🧀"
  },
  {
    id: 49,
    name: "Tiramisu",
    ingredients: ["mascarpone cheese", "eggs", "sugar", "coffee", "ladyfinger cookies", "cocoa powder", "vanilla extract"],
    instructions: [
      "Brew strong coffee and let cool",
      "Separate eggs, beat yolks with sugar until thick",
      "Fold mascarpone into yolk mixture",
      "Beat egg whites to stiff peaks, fold into mascarpone",
      "Quickly dip ladyfingers in coffee",
      "Layer dipped cookies in dish",
      "Spread half mascarpone mixture over cookies",
      "Repeat layers, dust with cocoa powder, refrigerate 4 hours"
    ],
    cookingTime: 30,
    difficulty: "medium",
    cuisine: "Italian",
    dietary: ["vegetarian"],
    nutrition: { calories: 380, protein: "10g", carbs: "38g", fat: "22g" },
    servings: 8,
    image: "🍰"
  },
  {
    id: 50,
    name: "Chicken Tacos",
    ingredients: ["chicken breast", "taco shells", "lettuce", "tomato", "cheese", "sour cream", "taco seasoning", "avocado", "lime"],
    instructions: [
      "Dice chicken breast into small pieces",
      "Cook chicken with taco seasoning until done",
      "Warm taco shells according to package",
      "Shred lettuce and dice tomato",
      "Slice avocado",
      "Fill shells with seasoned chicken",
      "Top with lettuce, tomato, cheese, avocado",
      "Add sour cream and squeeze lime juice over"
    ],
    cookingTime: 20,
    difficulty: "easy",
    cuisine: "Mexican",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 420, protein: "28g", carbs: "36g", fat: "18g" },
    servings: 4,
    image: "🌮"
  },
  {
    id: 51,
    name: "Mashed Potatoes",
    ingredients: ["potato", "butter", "milk", "sour cream", "salt", "black pepper", "garlic", "chives"],
    instructions: [
      "Peel and cube potatoes",
      "Boil in salted water until tender, about 15 minutes",
      "Drain well and return to pot",
      "Add butter, milk, and sour cream",
      "Mash until smooth and creamy",
      "Add minced garlic if desired",
      "Season with salt and pepper",
      "Garnish with chopped chives before serving"
    ],
    cookingTime: 25,
    difficulty: "easy",
    cuisine: "American",
    dietary: ["vegetarian", "gluten-free"],
    nutrition: { calories: 280, protein: "6g", carbs: "42g", fat: "12g" },
    servings: 6,
    image: "🥔"
  },
  {
    id: 52,
    name: "French Toast",
    ingredients: ["bread", "eggs", "milk", "cinnamon", "vanilla extract", "butter", "maple syrup", "sugar"],
    instructions: [
      "Whisk eggs, milk, cinnamon, vanilla, and a pinch of sugar",
      "Heat butter in a large pan over medium heat",
      "Dip bread slices in egg mixture, coating both sides",
      "Place in pan and cook 2-3 minutes per side until golden",
      "Repeat with remaining bread",
      "Serve hot with butter and maple syrup",
      "Optional: dust with powdered sugar",
      "Serve immediately while warm"
    ],
    cookingTime: 15,
    difficulty: "easy",
    cuisine: "American",
    dietary: ["vegetarian"],
    nutrition: { calories: 320, protein: "12g", carbs: "44g", fat: "12g" },
    servings: 4,
    image: "🍞"
  },
  {
    id: 53,
    name: "Pho",
    ingredients: ["rice noodles", "beef broth", "beef", "ginger", "onion", "star anise", "cinnamon", "fish sauce", "bean sprouts", "basil", "lime"],
    instructions: [
      "Char ginger and onion until slightly blackened",
      "Simmer beef broth with ginger, onion, star anise, and cinnamon for 1 hour",
      "Strain broth, return to pot",
      "Add fish sauce to taste",
      "Cook rice noodles according to package",
      "Slice raw beef paper-thin",
      "Place noodles in bowls, top with raw beef",
      "Ladle boiling broth over to cook beef, serve with bean sprouts, basil, and lime"
    ],
    cookingTime: 90,
    difficulty: "hard",
    cuisine: "Vietnamese",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 480, protein: "32g", carbs: "68g", fat: "10g" },
    servings: 4,
    image: "🍜"
  },
  {
    id: 54,
    name: "Brownies",
    ingredients: ["chocolate", "butter", "sugar", "eggs", "flour", "cocoa powder", "vanilla extract", "salt"],
    instructions: [
      "Preheat oven to 350°F (175°C), grease baking pan",
      "Melt chocolate and butter together",
      "Stir in sugar until well combined",
      "Beat in eggs one at a time",
      "Add vanilla extract",
      "Mix in flour, cocoa powder, and salt",
      "Pour into prepared pan",
      "Bake 25-30 minutes, cool before cutting"
    ],
    cookingTime: 40,
    difficulty: "easy",
    cuisine: "American",
    dietary: ["vegetarian"],
    nutrition: { calories: 280, protein: "4g", carbs: "36g", fat: "14g" },
    servings: 12,
    image: "🍫"
  },
  {
    id: 55,
    name: "Cobb Salad",
    ingredients: ["lettuce", "chicken breast", "bacon", "eggs", "avocado", "tomato", "blue cheese", "ranch dressing"],
    instructions: [
      "Cook and dice chicken breast",
      "Cook bacon until crispy, crumble",
      "Hard boil eggs, cool and chop",
      "Chop lettuce and place in large bowl",
      "Dice avocado and tomato",
      "Arrange chicken, bacon, eggs, avocado, tomato in rows on lettuce",
      "Crumble blue cheese over top",
      "Serve with ranch dressing on the side"
    ],
    cookingTime: 25,
    difficulty: "easy",
    cuisine: "American",
    dietary: ["non-vegetarian", "gluten-free"],
    nutrition: { calories: 520, protein: "38g", carbs: "12g", fat: "36g" },
    servings: 2,
    image: "🥗"
  },
  {
    id: 56,
    name: "Jambalaya",
    ingredients: ["rice", "chicken", "sausage", "shrimp", "bell pepper", "celery", "onion", "tomato", "cajun seasoning", "chicken broth"],
    instructions: [
      "Dice chicken and slice sausage",
      "Brown chicken and sausage in large pot",
      "Add diced bell pepper, celery, and onion",
      "Sauté until vegetables soften",
      "Add cajun seasoning and rice, stir to coat",
      "Add diced tomatoes and chicken broth",
      "Bring to boil, reduce heat and simmer 20 minutes",
      "Add shrimp last 5 minutes, cook until pink"
    ],
    cookingTime: 50,
    difficulty: "medium",
    cuisine: "Cajun",
    dietary: ["non-vegetarian", "gluten-free"],
    nutrition: { calories: 520, protein: "36g", carbs: "58g", fat: "16g" },
    servings: 6,
    image: "🍚"
  },
  {
    id: 57,
    name: "Spinach Artichoke Dip",
    ingredients: ["spinach", "artichoke hearts", "cream cheese", "sour cream", "mayonnaise", "parmesan cheese", "mozzarella cheese", "garlic"],
    instructions: [
      "Preheat oven to 375°F (190°C)",
      "Thaw and drain frozen spinach, squeeze out excess water",
      "Chop artichoke hearts",
      "Mix cream cheese, sour cream, and mayonnaise",
      "Stir in spinach, artichokes, and minced garlic",
      "Add half the parmesan and mozzarella",
      "Transfer to baking dish, top with remaining cheese",
      "Bake 25 minutes until bubbly, serve with chips or bread"
    ],
    cookingTime: 35,
    difficulty: "easy",
    cuisine: "American",
    dietary: ["vegetarian", "gluten-free"],
    nutrition: { calories: 320, protein: "12g", carbs: "8g", fat: "28g" },
    servings: 8,
    image: "🥬"
  },
  {
    id: 58,
    name: "Chicken Fajitas",
    ingredients: ["chicken breast", "bell pepper", "onion", "tortillas", "lime", "cumin", "chili powder", "garlic", "sour cream", "cheese"],
    instructions: [
      "Slice chicken into strips",
      "Marinate chicken with lime juice, cumin, chili powder, and garlic",
      "Slice bell peppers and onion into strips",
      "Heat oil in large skillet over high heat",
      "Cook chicken until browned and cooked through",
      "Remove chicken, add peppers and onions to pan",
      "Cook vegetables until tender-crisp",
      "Serve chicken and vegetables in warm tortillas with toppings"
    ],
    cookingTime: 25,
    difficulty: "easy",
    cuisine: "Mexican",
    dietary: ["non-vegetarian"],
    nutrition: { calories: 450, protein: "32g", carbs: "42g", fat: "16g" },
    servings: 4,
    image: "🌮"
  },
  {
    id: 59,
    name: "Chocolate Mousse",
    ingredients: ["chocolate", "heavy cream", "eggs", "sugar", "vanilla extract", "salt"],
    instructions: [
      "Melt chocolate and let cool slightly",
      "Separate eggs",
      "Whip egg whites with half the sugar to stiff peaks",
      "In another bowl, whip heavy cream to soft peaks",
      "Beat egg yolks with remaining sugar and vanilla",
      "Fold melted chocolate into yolk mixture",
      "Gently fold in whipped cream, then egg whites",
      "Refrigerate at least 2 hours before serving"
    ],
    cookingTime: 20,
    difficulty: "medium",
    cuisine: "French",
    dietary: ["vegetarian", "gluten-free"],
    nutrition: { calories: 380, protein: "6g", carbs: "32g", fat: "28g" },
    servings: 6,
    image: "🍫"
  },
  {
    id: 60,
    name: "Roasted Vegetables",
    ingredients: ["carrot", "broccoli", "bell pepper", "zucchini", "olive oil", "garlic", "thyme", "salt", "black pepper"],
    instructions: [
      "Preheat oven to 425°F (220°C)",
      "Chop all vegetables into similar-sized pieces",
      "Place vegetables on large baking sheet",
      "Drizzle with olive oil",
      "Add minced garlic and thyme",
      "Season with salt and pepper, toss to coat",
      "Spread in single layer",
      "Roast 25-30 minutes, stirring halfway, until tender and caramelized"
    ],
    cookingTime: 35,
    difficulty: "easy",
    cuisine: "American",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    nutrition: { calories: 140, protein: "4g", carbs: "18g", fat: "8g" },
    servings: 4,
    image: "🥕"
  }
];


const COMMON_INGREDIENTS = [
  "pasta", "rice", "chicken", "beef", "fish", "shrimp", "eggs", "milk", "butter",
  "cheese", "tomato", "onion", "garlic", "carrot", "bell pepper", "broccoli",
  "lettuce", "spinach", "mushrooms", "potato", "olive oil", "soy sauce",
  "salt", "black pepper", "flour", "sugar", "basil", "parsley", "lemon", "lime",
  "bacon", "parmesan cheese", "mozzarella cheese", "feta cheese", "blue cheese",
  "cream cheese", "sour cream", "mayonnaise", "heavy cream", "tortillas", "bread",
  "pizza dough", "pie crust", "taco shells", "burger buns", "lasagna noodles",
  "fettuccine", "spaghetti", "rice noodles", "egg noodles", "ramen noodles",
  "white wine", "red wine", "chicken broth", "beef broth", "vegetable broth",
  "tomato sauce", "enchilada sauce", "bbq sauce", "caesar dressing", "ranch dressing",
  "balsamic vinegar", "vinegar", "ketchup", "mustard", "hot sauce", "salsa",
  "cilantro", "thyme", "rosemary", "oregano", "cumin", "paprika", "chili powder",
  "cinnamon", "nutmeg", "vanilla extract", "bay leaf", "dill", "ginger",
  "jalapeño", "avocado", "cucumber", "celery", "zucchini", "corn", "peas",
  "green beans", "kidney beans", "black beans", "chickpeas", "lentils",
  "ground beef", "ground chicken", "pork chops", "chicken breast", "chicken wings",
  "salmon", "tuna", "white fish", "tofu", "sausage", "pickles", "olives",
  "sesame oil", "sesame seeds", "peanuts", "walnuts", "honey", "maple syrup",
  "chocolate", "chocolate chips", "cocoa powder", "coffee", "green onion",
  "bean sprouts", "cabbage", "red onion", "artichoke hearts", "sun-dried tomatoes",
  "capers", "tahini", "coconut milk", "fish sauce", "breadcrumbs", "croutons",
  "banana", "apples", "berries", "ladyfinger cookies", "mascarpone cheese",
  "ricotta cheese", "gruyere cheese", "cheddar cheese", "arborio rice",
  "jasmine rice", "basmati rice", "wild rice", "quinoa", "couscous",
  "baking powder", "baking soda", "yeast", "cornstarch", "brown sugar",
  "powdered sugar", "molasses", "peanut butter", "almond butter", "jam",
  "worcestershire sauce", "teriyaki sauce", "hoisin sauce", "oyster sauce",
  "curry powder", "turmeric", "cardamom", "coriander", "fennel", "sage",
  "tarragon", "chives", "mint", "star anise", "cloves", "allspice",
  "red pepper flakes", "cayenne pepper", "white pepper", "garlic powder",
  "onion powder", "celery seed", "poppy seeds", "chia seeds", "flax seeds"
];


const App = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [maxTimeFilter, setMaxTimeFilter] = useState(120);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [ratings, setRatings] = useState(() => {
    const saved = localStorage.getItem('ratings');
    return saved ? JSON.parse(saved) : {};
  });
  const [servingSizeMultiplier, setServingSizeMultiplier] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('ratings', JSON.stringify(ratings));
  }, [ratings]);

  const filteredIngredients = COMMON_INGREDIENTS.filter(ing =>
    ing.toLowerCase().includes(searchInput.toLowerCase()) &&
    !selectedIngredients.includes(ing)
  );

  const addIngredient = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
      setSearchInput('');
    }
  };

  const removeIngredient = (ingredient) => {
    setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
  };

  const matchedRecipes = useMemo(() => {
    if (selectedIngredients.length === 0) return [];

    return RECIPES.map(recipe => {
      const matchedIngredients = recipe.ingredients.filter(ing =>
        selectedIngredients.some(userIng =>
          ing.toLowerCase().includes(userIng.toLowerCase()) ||
          userIng.toLowerCase().includes(ing.toLowerCase())
        )
      );
      const matchPercentage = (matchedIngredients.length / recipe.ingredients.length) * 100;
      const missingIngredients = recipe.ingredients.filter(ing =>
        !selectedIngredients.some(userIng =>
          ing.toLowerCase().includes(userIng.toLowerCase()) ||
          userIng.toLowerCase().includes(ing.toLowerCase())
        )
      );

      return {
        ...recipe,
        matchPercentage: Math.round(matchPercentage),
        matchedIngredients,
        missingIngredients
      };
    })
    .filter(recipe => {
      if (recipe.matchPercentage < 20) return false;
      if (dietaryFilter !== 'all' && !recipe.dietary.includes(dietaryFilter)) return false;
      if (difficultyFilter !== 'all' && recipe.difficulty !== difficultyFilter) return false;
      if (recipe.cookingTime > maxTimeFilter) return false;
      return true;
    })
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [selectedIngredients, dietaryFilter, difficultyFilter, maxTimeFilter]);

  const toggleFavorite = (recipeId) => {
    setFavorites(prev =>
      prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const setRating = (recipeId, rating) => {
    setRatings(prev => ({ ...prev, [recipeId]: rating }));
  };

  const recommendedRecipes = useMemo(() => {
    const topRatedIds = Object.entries(ratings)
      .filter(([_, rating]) => rating >= 4)
      .map(([id, _]) => parseInt(id));

    if (topRatedIds.length === 0) return [];

    const topRecipes = RECIPES.filter(r => topRatedIds.includes(r.id));
    const cuisines = [...new Set(topRecipes.map(r => r.cuisine))];
    const dietaryPrefs = [...new Set(topRecipes.flatMap(r => r.dietary))];

    return RECIPES.filter(r =>
      !topRatedIds.includes(r.id) &&
      (cuisines.includes(r.cuisine) || r.dietary.some(d => dietaryPrefs.includes(d)))
    ).slice(0, 3);
  }, [ratings]);

  if (selectedRecipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 text-white relative">
            <button
              onClick={() => {
                setSelectedRecipe(null);
                setServingSizeMultiplier(1);
              }}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-6xl mb-4">{selectedRecipe.image}</div>
            <h1 className="text-3xl font-bold">{selectedRecipe.name}</h1>
            <p className="text-orange-100 mt-2">{selectedRecipe.cuisine} Cuisine</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-4">
                <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold">{selectedRecipe.cookingTime} min</span>
                </div>
                <div className="flex items-center gap-2 bg-pink-100 px-4 py-2 rounded-full">
                  <ChefHat className="w-5 h-5 text-pink-600" />
                  <span className="font-semibold capitalize">{selectedRecipe.difficulty}</span>
                </div>
              </div>
              <button
                onClick={() => toggleFavorite(selectedRecipe.id)}
                className={`p-3 rounded-full transition ${
                  favorites.includes(selectedRecipe.id)
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-pink-100'
                }`}
              >
                <Heart className={`w-6 h-6 ${favorites.includes(selectedRecipe.id) ? 'fill-white' : ''}`} />
              </button>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Adjust Servings
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setServingSizeMultiplier(Math.max(0.5, servingSizeMultiplier - 0.5))}
                  className="px-4 py-2 bg-white rounded-lg font-bold hover:bg-gray-50"
                >
                  -
                </button>
                <span className="font-semibold text-lg">
                  {selectedRecipe.servings * servingSizeMultiplier} servings
                </span>
                <button
                  onClick={() => setServingSizeMultiplier(servingSizeMultiplier + 0.5)}
                  className="px-4 py-2 bg-white rounded-lg font-bold hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              <h3 className="font-bold text-lg mb-3">Nutritional Information (per serving)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold text-green-600">{selectedRecipe.nutrition.calories}</div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{selectedRecipe.nutrition.protein}</div>
                  <div className="text-sm text-gray-600">Protein</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{selectedRecipe.nutrition.carbs}</div>
                  <div className="text-sm text-gray-600">Carbs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{selectedRecipe.nutrition.fat}</div>
                  <div className="text-sm text-gray-600">Fat</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">Ingredients</h3>
              <ul className="space-y-2">
                {selectedRecipe.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="capitalize">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">Instructions</h3>
              <ol className="space-y-3">
                {selectedRecipe.instructions.map((instruction, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span className="flex-1 pt-1">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-bold text-lg mb-3">Rate This Recipe</h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setRating(selectedRecipe.id, star)}
                    className="transition hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        (ratings[selectedRecipe.id] || 0) >= star
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Smart Recipe Generator
          </h1>
          <p className="text-gray-600">Find amazing recipes based on ingredients you have</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              What ingredients do you have?
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search ingredients..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              />
            </div>
            {searchInput && filteredIngredients.length > 0 && (
              <div className="mt-2 bg-white border-2 border-gray-200 rounded-xl max-h-48 overflow-y-auto">
                {filteredIngredients.map(ing => (
                  <button
                    key={ing}
                    onClick={() => addIngredient(ing)}
                    className="w-full text-left px-4 py-2 hover:bg-orange-50 capitalize"
                  >
                    {ing}
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedIngredients.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Selected Ingredients ({selectedIngredients.length})
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedIngredients.map(ing => (
                  <div
                    key={ing}
                    className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full flex items-center gap-2"
                  >
                    <span className="capitalize">{ing}</span>
                    <button onClick={() => removeIngredient(ing)} className="hover:bg-white/20 rounded-full p-1">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
          >
            <Filter className="w-5 h-5" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Dietary Preference</label>
                <select
                  value={dietaryFilter}
                  onChange={(e) => setDietaryFilter(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                >
                  <option value="all">All</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten-free">Gluten Free</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                >
                  <option value="all">All Levels</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Max Time: {maxTimeFilter} min
                </label>
                <input
                  type="range"
                  min="10"
                  max="120"
                  step="5"
                  value={maxTimeFilter}
                  onChange={(e) => setMaxTimeFilter(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>

        {selectedIngredients.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-xl">
            <Utensils className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Start by adding ingredients</h3>
            <p className="text-gray-400">Search and select the ingredients you have available</p>
          </div>
        ) : matchedRecipes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-xl">
            <ChefHat className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No recipes found</h3>
            <p className="text-gray-400">Try adding more ingredients or adjusting your filters</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Found {matchedRecipes.length} Recipe{matchedRecipes.length !== 1 ? 's' : ''}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedRecipes.map(recipe => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <div className="bg-gradient-to-r from-orange-400 to-pink-400 p-6 text-center">
                    <div className="text-6xl mb-2">{recipe.image}</div>
                    <div className="inline-block bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-bold">
                      {recipe.matchPercentage}% Match
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{recipe.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{recipe.cuisine}</p>

                    <div className="flex gap-2 mb-3 flex-wrap">
                      <div className="flex items-center gap-1 text-sm bg-orange-100 px-2 py-1 rounded-full">
                        <Clock className="w-4 h-4" />
                        {recipe.cookingTime}m
                      </div>
                      <div className="flex items-center gap-1 text-sm bg-pink-100 px-2 py-1 rounded-full capitalize">
                        <ChefHat className="w-4 h-4" />
                        {recipe.difficulty}
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-xs font-semibold text-green-600 mb-1">
                        ✓ Have: {recipe.matchedIngredients.length} ingredients
                      </div>
                      {recipe.missingIngredients.length > 0 && (
                        <div className="text-xs text-orange-600">
                          Need: {recipe.missingIngredients.slice(0, 3).join(', ')}
                          {recipe.missingIngredients.length > 3 && ` +${recipe.missingIngredients.length - 3} more`}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              (ratings[recipe.id] || 0) >= star
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(recipe.id);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.includes(recipe.id)
                              ? 'fill-pink-500 text-pink-500'
                              : 'text-gray-400'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {recommendedRecipes.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
            <p className="text-gray-600 mb-6">Based on your ratings and preferences</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedRecipes.map(recipe => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <div className="bg-gradient-to-r from-purple-400 to-blue-400 p-6 text-center">
                    <div className="text-6xl mb-2">{recipe.image}</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{recipe.name}</h3>
                    <p className="text-sm text-gray-600">{recipe.cuisine} • {recipe.cookingTime}min</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {favorites.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 fill-pink-500 text-pink-500" />
              Your Favorites ({favorites.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {RECIPES.filter(r => favorites.includes(r.id)).map(recipe => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <div className="bg-gradient-to-r from-pink-400 to-rose-400 p-6 text-center">
                    <div className="text-6xl mb-2">{recipe.image}</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{recipe.name}</h3>
                    <p className="text-sm text-gray-600">{recipe.cuisine} • {recipe.cookingTime}min</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;