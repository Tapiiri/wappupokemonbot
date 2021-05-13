const oakdexPokedex = require('oakdex-pokedex');
const timediff = require('timediff');
require('dotenv').config()

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class WappuPokemonBot {

  daysToWappu(date,scope) {
    const daysLeft = timediff(date, new Date(Date.UTC(date.getFullYear(),4,1, 21)), 'YDHms');
    if (daysLeft.days == 0 && daysLeft.seconds <= 0) {
      return -1
    }
    if (daysLeft.days < 0) {
      const daysLeftToNextYear = timediff(date, new Date(Date.UTC(date.getFullYear() + 1,4,1, 21)), 'YDHms').days;
      return daysLeftToNextYear
    }
    return daysLeft.days;
  }

  testTime(scope, callback) {
      const date = new Date(1000 * scope.update.message.date);
      const timeLeft = timediff(date, new Date(Date.UTC(date.getFullYear(),4,1, 17)), 'YDHms');
      scope.sendMessage("" + timeLeft.hours + " " + timeLeft.minutes)
      scope.sendMessage(this.daysToWappu(date, scope))
  }


  findPokemon(number, callback) {
    oakdexPokedex.findPokemon(number, function (pokemon) {
      const name = pokemon
        ? pokemon.names.en
        : "Missingno";
      callback(name, number, pokemon)
    });
  }

  getTodaysPokemon(scope, callback) {
    const date = new Date(1000 * scope.update.message.date);
    const daysLeft = this.daysToWappu(date, scope);
    const todaysPokemon = this.findPokemon(daysLeft, callback);
    return todaysPokemon
  }

  sendTodaysPokemon(scope) {
    this.getTodaysPokemon( scope, function (pokemon, number) {
          if (number == -1)
            scope.sendMessage("Hyvää Wappua!!");
          else
            scope.sendMessage("Päivän Wappupokemon on #" + number + " " + pokemon + "!");
    })
  }

  getRandomIntInclusive(min, max) {
    const min = Math.ceil(min);
    const max = Math.floor(max);
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    return randomInt
  }

  getRandomPokedexEntry(entries) {
    const pokedexKeys = Object.keys(entries);
    const entriesLength = pokedexKeys.length;
    const messageId = this.getRandomIntInclusive(0, entriesLength-1);
    const entryKey = pokedexKeys[messageId];
    const pokedexEntry = entries[entryKey].en;
    return pokedexEntry
  }

  sendTodaysFact(scope) {
      this.getTodaysPokemon( scope, function (name, number, pokemon) {
        if (number == -1)
          scope.sendMessage("Wappu on kiva juttu.");
        else {
          const pokedexEntries = pokemon.pokedex_entries;
          const pokedexEntry = getRandomPokedexEntry(pokedexEntries);
          scope.sendMessage(pokedexEntry);
        }
      }.bind(this))
  }

  sendTodaysSticker(scope) {


      const date = new Date();
      const daysLeft = this.daysToWappu(date);
    
<<<<<<< HEAD
      const stickerNo = this.getStickerNumberFromDaysLeft(daysLeft);
=======
      let stickerNo = this.getStikerNumberFromDaysLeft(daysLeft);
>>>>>>> f50537905c74bfe8b4106d6b6fa955f2f585edbc
       

      this.getStickerSet("ilmarit", function (res) {
        const sticker = res.result.stickers[stickerNo].file_id;
        scope.sendSticker(sticker);
      });

  }


  getStickerNumberFromDaysLeft(daysLeft) {
    if (daysLeft > 56)
      return 56
    else
      return 56 - daysLeft;
  }

  getStickerSet(name, callback) {
<<<<<<< HEAD
    const token = process.env.TELEGRAM_BOT_TOKEN
    const url = "https://api.telegram.org/bot" + token + "/getStickerSet?name="+name;
=======
    let url = "https://api.telegram.org/bot"+ process.env.BOT_TOKEN + "/getStickerSet?name="+name;
>>>>>>> f50537905c74bfe8b4106d6b6fa955f2f585edbc

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var data = xhr.responseText;
        try {
          data = JSON.parse(data);
          callback(data);
        } catch (exc) {
          console.log(exc);
        }
      }
    }

    xhr.send();
  }
}


module.exports = {
  WappuPokemonBot: WappuPokemonBot
}
