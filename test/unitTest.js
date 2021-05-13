const WappuPokemonBot = require('../wappupokemon')
var assert = require('assert');
describe('Wappupokemon', function() {
    const wappuPokemonBot = new WappuPokemonBot.WappuPokemonBot()
  describe('daysToWappu()', function() {
    const targetDate = new Date(Date.UTC(2020,4,3,21))
    const currentDate = new Date(Date.UTC(2020,4,1,21))
    const daysRemaining = wappuPokemonBot.daysToWappu(currentDate, targetDate)
    it('should return a number', function() {
      assert.ok(!isNaN(daysRemaining));
    });
    it('should return an integer', function() {
      assert.ok(Number.isInteger(daysRemaining));
    });
    const daysAsMs = (days) => 1000 * 60 * 60 * 24 * days
    const dateBeforeTarget = (differenceInMs) => new Date(targetDate.getTime() - differenceInMs)
    const daysInAWeek = 7
    const weekInMs = daysAsMs(daysInAWeek)
    const weekBeforeDate = dateBeforeTarget(weekInMs)
    const weekRemaining = wappuPokemonBot.daysToWappu(weekBeforeDate, targetDate)
    it("should return 5 when exactly a week (5 full days remaining)", function() {
      assert.strictEqual(weekRemaining, 5)
    })
    const oneMillisecond = 1
    const weekPlusMinuteBeforeDate = dateBeforeTarget(weekInMs - oneMillisecond)
    const weekPlusMinuteRemaining = wappuPokemonBot.daysToWappu(weekPlusMinuteBeforeDate, targetDate)
    it("should return 4 when a millisecond less than a week remaining (4 full days remaining)", function() {
      assert.strictEqual(weekPlusMinuteRemaining, 4)
    })
    const dayInMs = daysAsMs(2)
    const dayBeforeDate = dateBeforeTarget(dayInMs)
    const dayRemaining = wappuPokemonBot.daysToWappu(dayBeforeDate, targetDate)
    it("should return 1 when exactly one day remaining", function() {
      assert.strictEqual(dayRemaining, 1)
    })

  });
});