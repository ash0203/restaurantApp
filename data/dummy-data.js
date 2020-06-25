import Product from '../models/food';

const PRODUCTS = [
  new Product(
    'p1',
    'u1',
    'Pizza',
    'https://www.kingarthurflour.com/sites/default/files/styles/featured_image/public/recipe_legacy/20-3-large.jpg?itok=1EY8KWJG',
    'pizza is love spicy with tangy taste will make your tastebuds crave ',
    150
  ),
  new Product(
    'p2',
    'u1',
    'Burger',
    'https://www.seriouseats.com/recipes/images/2015/07/20150702-sous-vide-hamburger-anova-primary.jpg',
    'Veg burger for a perfect brunch',
    99
  ),
  new Product(
    'p3',
    'u2',
    'Coffee',
    'https://images.pexels.com/photos/160834/coffee-cup-and-saucer-black-coffee-loose-coffee-beans-160834.jpeg?cs=srgb&dl=bean-beans-black-coffee-160834.jpg&fm=jpg',
    'Coffee for every season',
    50
  ),
  new Product(
    'p4',
    'u3',
    'The Book - Limited Edition',
    'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?cs=srgb&dl=blur-blurred-book-pages-46274.jpg&fm=jpg',
    "What the content is? Why would that matter? It's a limited edition!",
    120
  ),
  new Product(
    'p5',
    'u3',
    'Barbeque',
    'https://static.eazydiner.com/resized/720X280/restaurant%2F662393%2Frestaurant020190312114625.jpg',
    'get you tummy full unlimited food at reasonable price',
    290
  ),
  new Product(
    'p6',
    'u1',
    'pastery',
    'https://www.kingarthurflour.com/sites/default/files/styles/featured_image/public/2019-08/danish-pastry.jpg?itok=e758v0rP',
    "freshly baked pastery for everyone",
    30
  )
];

export default PRODUCTS;
