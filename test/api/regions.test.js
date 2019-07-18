const expect = require('chai').expect
const vultr = require('../../src/index')
const config = require('../config')
const nock = require('nock')

const mock = {
  list: {
    '1': {
      DCID: '1',
      name: 'New Jersey',
      country: 'US',
      continent: 'North America',
      state: 'NJ',
      ddos_protection: true,
      block_storage: true,
      regioncode: 'EWR'
    },
    '2': {
      DCID: '2',
      name: 'Chicago',
      country: 'US',
      continent: 'North America',
      state: 'IL',
      ddos_protection: false,
      block_storage: false,
      regioncode: 'ORD'
    }
  }
}

describe('regions', () => {
  describe('list()', () => {
    beforeEach(() => {
      nock(config.baseUrl)
        .get('/v1/regions/list')
        .reply(200, mock.list)
    })

    it('does not require an API key', () => {
      const vultrInstance = vultr.initialize()

      vultrInstance.regions.list().then(response => {
        expect(typeof response).to.equal('object')
        expect(response).to.deep.equal(mock.list)
      })
    })

    it('lists all active regions', () => {
      const vultrInstance = vultr.initialize()

      vultrInstance.regions.list().then(response => {
        expect(typeof response).to.equal('object')
        expect(response).to.deep.equal(mock.list)
      })
    })
  })
})
