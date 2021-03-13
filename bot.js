'use strict'

require('dotenv').config()
const token = process.env.TELEGRAM_BOT_TOKEN
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram(token)

const WappuPokemonBot = require('./wappupokemon')

class PingController extends TelegramBaseController {
    /**
     * @param {Scope} $
     */

    pokemonHandler($) {
      let wappuPokemonBot = new WappuPokemonBot.WappuPokemonBot();
      wappuPokemonBot.sendTodaysPokemon($);
    }

    factHandler($) {
      let wappuPokemonBot = new WappuPokemonBot.WappuPokemonBot();
      wappuPokemonBot.sendTodaysFact($);
    }

    stickerHandler($) {
      let wappuPokemonBot = new WappuPokemonBot.WappuPokemonBot();
      wappuPokemonBot.sendTodaysSticker($);
    }

    get routes() {
        return {
            'wappupokemon': 'pokemonHandler',
            'pokemonfact': 'factHandler',
            'sticker': 'stickerHandler'
        }
    }
}

tg.router
    .when(
        new TextCommand('/wappupokemon', 'wappupokemon'),
        new PingController()
    ).when(
        new TextCommand('/pokemonfact', 'pokemonfact'),
        new PingController()
    ).when(
        new TextCommand('/sticker', 'sticker'),
        new PingController()
    )
