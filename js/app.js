'use strict';

// Animal Array
const animalArray = [];

let AnimalObj = function(filePath, title, descript, keyword, horns) {
  this.filePath = filePath;
  this.title = title;
  this.descript = descript;
  this.keyword = keyword;
  this.horns = horns;
  animalArray.push(this);
};

// Load data from JSON, instance objects, and populate HTML
$.get('../data/page-1.json', data => {
  data.forEach(ele => {
    new AnimalObj(ele.image_url, ele.title, ele.description, ele.keyword, ele.horns);
    const section = $('#photo-template').clone();
    section.children('h2').append(ele.title);
    section.children('img').attr('src', ele.image_url);
    section.children('img').attr('alt', ele.title);
    section.children('p').append(ele.description);
    $('main').append(section);
  });
});
