import request from 'supertest'
import server from '../src/server'

describe('App Setup', () => {
  test('Should disable x-powered-by header', async () => {
    server.get('/test_x_powered_by', (req, res) => res.send(''))

    const res = await request(server).get('/test_x_powered_by')
    expect(res.headers['x-powered-by']).toBeUndefined()
  })
})
