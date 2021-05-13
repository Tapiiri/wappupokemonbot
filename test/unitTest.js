const WappuPokemonBot = require('../wappupokemon')
var assert = require('assert');
describe('Wappupokemon', function() {
    const wappuPokemonBot = new WappuPokemonBot.WappuPokemonBot()
  describe('daysToWappu()', function() {
    const currentDate = new Date(Date.UTC(2020,4,1,21))
    const targetDate = new Date(Date.UTC(2020,4,3,21))
    const daysRemaining = wappuPokemonBot.daysToWappu(currentDate, targetDate)
    it('should return a number', function() {
      assert.ok(!isNaN(daysRemaining));
    });
    it('should return an integer', function() {
      assert.ok(Number.isInteger(daysRemaining));
    });
  });
});