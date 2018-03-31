const oakdexPokedex = require('oakdex-pokedex');
const timediff = require('timediff');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class WappuPokemonBot {

  construtor() {


  }


  daysToWappu(date,scope) {

    let daysLeft = timediff(date, new Date(Date.UTC(date.getFullYear(),4,1, 21)), 'YDHms');
    if (daysLeft.days == 0 && daysLeft.seconds <= 0)
      daysLeft = 0
    if (daysLeft < 0)
      daysLeft = timediff(date, new Date(Date.UTC(date.getFullYear() + 1,4,1, 21)), 'YDHms').days + 1;
    else {
      daysLeft = daysLeft.days;
    }
    return daysLeft;
  }


  findPokemon(number, callback) {
    oakdexPokedex.findPokemon(number, function (pokemon) {
      let name = "";
      if (pokemon)
        name = pokemon.names.en;
      callback(name, number, pokemon)
    });
  }

  getTodaysPokemon(scope, callback) {
    let date = new Date(1000 * scope.update.message.date);
    let daysLeft = this.daysToWappu(date, scope);
    return this.findPokemon(daysLeft, callback);
  }

  sendTodaysPokemon(scope) {
    this.getTodaysPokemon( scope, function (pokemon, number) {
          if (number == 0)
            scope.sendMessage("Hyvää Wappua!!");
          else
            scope.sendMessage("Päivän Wappupokemon on #" + number + " " + pokemon + "!");
    })
  }

  sendTodaysFact(scope) {
      this.getTodaysPokemon( scope, function (name, number, pokemon) {
        if (number == 0)
          scope.sendMessage("Wappu on kiva juttu.");
        else {
          let pokedexKeys = Object.keys(pokemon.pokedex_entries);
          let entriesLength = pokedexKeys.length;
          let messageId = this.getRandomIntInclusive(0, entriesLength-1);
          scope.sendMessage(pokemon.pokedex_entries[pokedexKeys[messageId]].en);
        }
      }.bind(this))
  }

  sendTodaysSticker(scope) {


      let date = new Date();
      let daysLeft = this.daysToWappu(date);
      let stickerNo = this.getStikerNumberFromDaysLeft(daysLeft);

      this.getStickerSet("ilmarit", function (res) {
        console.log("Jees", res)
        console.log(res.result.stickers[stickerNo]);
        scope.sendSticker(res.result.stickers[stickerNo].file_id);
      });

  }


  getStikerNumberFromDaysLeft(daysLeft) {
    if (daysLeft == 56)
      return 0
      //Wappu, hell breaks loose TODO: Figure out sticker for this
    else if (daysLeft > 56)
      return 0
      //Figure out something
    else
      return 56 - daysLeft;
  }

  getStickerSet(name, callback) {
    let url = "https://api.telegram.org/bot598270459:AAG_lB4OQAcusUovmDfkvDd44dJDok0Gny0/getStickerSet?name="+name;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var data = xhr.responseText;
        try {
          data = JSON.parse(data);
          callback(data);
        } catch (exc) {
          console.err(exc);
        }
      }
    }

    xhr.send();
  }


  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }
}


module.exports = {
  WappuPokemonBot: WappuPokemonBot
}
