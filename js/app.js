'use strict';

const keywords = [];

function Arcade(object) {
  this.url = object.image_url;
  this.title = object.title;
  this.description = object.description;
  this.keyword = object.keyword;
  this.horns = object.horns;
}

function displayImages() {
  let $selected = $(this).val();
  if ($selected === 'default') {
    $('section').fadeIn();
  } else {
    $('section').hide();
    $('.' + $selected).fadeIn();
  }
}

function appendToDropDown(keyword) {
  if (!keywords.includes(keyword)) {
    keywords.push(keyword);
  }
}

function appendToKeywordsArr() {
  keywords.sort();
  for (let i = 0; i < keywords.length; i++) {
    $('select').append(`<option value="${keywords[i]}">${keywords[i]}</option>`);
  }
}

function renderArcade(object, sourceID, target) {
  let $target = $(target);
  let templateMarkUp = $(sourceID).html();
  let newMarkup = Mustache.render(templateMarkUp, object);
  $target.append(newMarkup);
}

function getArcade(imageSet1) {
  $.ajax(imageSet1)
    .then(data => {
      data.forEach((object, idx) => {
        let arcade = new Arcade(object);
        renderArcade(arcade, "#page-1-template", ".target");
        appendToDropDown(object.keyword);
      })
      appendToKeywordsArr();
    });
}

function arcadePage1() {
  getArcade('./data/page-1.json');
}

$(document).ready(function() {
  $('select').on('change', displayImages);
  $('#button2').on('click', function() {
    getArcade('./data/page-2.json');
  });
  $('#button1').on('click', function() {
    arcadePage1();
  });
  getArcade('./data/page-1.json');
});

