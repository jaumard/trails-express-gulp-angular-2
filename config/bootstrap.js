/**
 * Bootstrap function called when Trails server is ready
 * @param app Trails application
 */
module.exports = (app) => {
  const Hero = app.orm.Hero
  const heroesFixture = [{
    name: 'Jaumard (WTF!) :D'
  }, {
    name: 'Superman'
  }, {
    name: 'Batman'
  }, {
    name: 'Spiderman'
  }, {
    name: 'Ironman'
  }, {
    name: 'Hulk'
  }]

  return Hero.findAll().then(heroes => {
    if (heroes.length == 0) {
      return Hero.bulkCreate(heroesFixture)
    }
    //return Promise.resolve()
  }).catch(err => app.log.error(err))
}
