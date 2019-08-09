const fetch = require('isomorphic-fetch');
const cheerio = require('cheerio');
const minStar = 100;
const startingURL = 'https://github.com/webpack/webpack/network/dependents?dependents_after=OTQ2ODEzNzk0OQ';

let iterations = 0;
const results = {'https://github.com/daybrush/moveable': 1315,'https://github.com/lando/lando': 1471};
function getThem (html) {
  const $ = cheerio.load(html);
  $(".Box-row.d-flex.flex-items-center")
    .map(function (_, el) {
      const $0 = cheerio.load(el);
      const stars = parseInt($0('.pl-3').text().replace(',', ''), 10);
      if (stars >= minStar) {
        const href = $0('a.text-bold').attr('href');
        results['https://github.com' + href] = stars;
      }
    });

  return $;
}
function clickNext ($) {
  const next = $('[data-test-selector="pagination"]').children().last().attr('href')
  if (next) setTimeout(() => get(next), 2000 + (Math.random() * 1000));
  else console.log(results);
}

function get (url) {
  iterations++;
  console.log(`page ${iterations}: ${url}`)
  if (iterations % 20 === 0) {
    console.log(JSON.stringify(results, null, 2));
  }
  fetch(url)
  .then(res => res.ok && res.text())
  .then(text => getThem(text))
  .then($ => clickNext($));
}

get(startingURL);