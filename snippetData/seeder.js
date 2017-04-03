var db = require('../server/config/db.js');

//run this file node seeder.js to populate the database

//create variables for each table
var Language = db.Language;
var Snippet = db.Snippet;
var ResourceUrl = db.ResourceUrl;
var User = db.User;
var Favorite = db.Favorite;
var Category = db.Category;
var Subcategory = db.Subcategory;

// Hit me with them ghetto delays to let the tables procreate - Jason Kim
//wait 2000ms for the tables above to be created
setTimeout(function() {
  seedData();
}, 10000);

//add data to database
var seedData = function() {
  // Drop it like it's hot
  console.log('Dropping and re-creating tables');
  Language.sync({force: true})
  .then(() => Snippet.sync({force: true}))
  .then(() => ResourceUrl.sync({force: true}))
  .then(() => User.sync({force: true}))
  .then(() => Favorite.sync({force: true}))
  .then(() => Category.sync({force: true}))
  .then(() => Subcategory.sync({force: true}))

  // Insert default languages shown in dropdown
  .then(() => Language.create({ name: 'css', displayname: 'CSS' }))  //1
  .then(() => Language.create({ name: 'elixir', displayname: 'Elixir' }))
  .then(() => Language.create({ name: 'erlang', displayname: 'Erlang' }))
  .then(() => Language.create({ name: 'golang', displayname: 'Go' }))
  .then(() => Language.create({ name: 'handlebars', displayname: 'Handlebars' })) //5
  .then(() => Language.create({ name: 'html', displayname: 'HTML' }))
  .then(() => Language.create({ name: 'javascript', displayname: 'Javascript' }))
  .then(() => Language.create({ name: 'json', displayname: 'JSON' }))
  .then(() => Language.create({ name: 'jsx', displayname: 'JSX' }))
  .then(() => Language.create({ name: 'markdown', displayname: 'Markdown' })) //10
  .then(() => Language.create({ name: 'text', displayname: 'Plain Text' }))
  .then(() => Language.create({ name: 'php', displayname: 'PHP' }))
  .then(() => Language.create({ name: 'python', displayname: 'Python' }))
  .then(() => Language.create({ name: 'ruby', displayname: 'Ruby' }))
  .then(() => Language.create({ name: 'sass', displayname: 'Sass' })) //15
  .then(() => Language.create({ name: 'scss', displayname: 'SCSS' }))
  .then(() => Language.create({ name: 'sql', displayname: 'SQL' }))
  .then(() => Language.create({ name: 'stylus', displayname: 'Stylus' }))
  .then(() => Language.create({ name: 'typescript', displayname: 'Typescript' })) //19

  //Create user
  .then(() => User.create({ name: 'Stackets Fanatic', image: 'http://emblemsbf.com/img/61373.jpg', email: 'stkts4lyfe@coder.com '}))

  //Create Categories
  .then(() => Category.bulkCreate([
    {name: 'Backend'}, //1
    {name: 'Build Tools'},
    {name: 'Command Line'},
    {name: 'Deployment'},
    {name: 'Database'}, //5
    {name: 'Frontend'},
    {name: 'Testing'},
    {name: 'Authentication'} //8
  ]))

  //Create Subcategories
  .then(() => Subcategory.bulkCreate([
    {name: 'Node', CategoryId: 1},
    {name: 'Express', CategoryId: 1},
    {name: 'Hapi', CategoryId: 1},
    {name: 'Koa', CategoryId: 1},
    {name: 'Sails', CategoryId: 1},
    {name: 'Webpack', CategoryId: 2},
    {name: 'Gulp', CategoryId: 2},
    {name: 'Grunt', CategoryId: 2},
    {name: 'Yeoman', CategoryId: 2},
    {name: 'Babel', CategoryId: 2},
    {name: 'Git', CategoryId: 3},
    {name: 'Bash', CategoryId: 3},
    {name: 'General', CategoryId: 3},
    {name: 'Heroku', CategoryId: 4},
    {name: 'Zeit Now', CategoryId: 4},
    {name: 'Docker', CategoryId: 4},
    {name: 'AWS', CategoryId: 4},
    {name: 'DigitalOcean', CategoryId: 4},
    {name: 'Mongo', CategoryId: 5},
    {name: 'Mongoose', CategoryId: 5},
    {name: 'SQLite', CategoryId: 5},
    {name: 'mySQL', CategoryId: 5},
    {name: 'postgreSQL', CategoryId: 5},
    {name: 'Sequelize', CategoryId: 5},
    {name: 'Bookshelf', CategoryId: 5},
    {name: 'AngularJS', CategoryId: 6},
    {name: 'Angular 2', CategoryId: 6},
    {name: 'Backbone', CategoryId: 6},
    {name: 'Bootstrap', CategoryId: 6},
    {name: 'CSS', CategoryId: 6},
    {name: 'Ember', CategoryId: 6},
    {name: 'ES6', CategoryId: 6},
    {name: 'HTML', CategoryId: 6},
    {name: 'React', CategoryId: 6},
    {name: 'Redux', CategoryId: 6},
    {name: 'Vue', CategoryId: 6},
    {name: 'Mocha', CategoryId: 7},
    {name: 'Chai', CategoryId: 7},
    {name: 'Jasmine', CategoryId: 7},
    {name: 'Enzyme', CategoryId: 7},
    {name: 'Cucumber', CategoryId: 7},
    {name: 'Passport', CategoryId: 8},
    {name: 'Auth0', CategoryId: 8},
    {name: 'JWT', CategoryId: 8}
  ]));
};
