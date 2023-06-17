const app = require('./src/config/server');

// Create or Update an item
app.post('/:col/:key', async (req, res) => {
    console.log(req.body)
  
    const col = req.params.col
    const key = req.params.key
    console.log(`from collection: ${col} post key: ${key} with params ${JSON.stringify(req.body)}`)
    const item = await db.collection(col).set(key, req.body)
    console.log(JSON.stringify(item, null, 2))
    res.json(item).end()
  })
  
  // Delete an item
  app.delete('/:col/:key', async (req, res) => {
    const col = req.params.col
    const key = req.params.key
    console.log(`from collection: ${col} delete key: ${key} with params ${JSON.stringify(req.params)}`)
    const item = await db.collection(col).delete(key)
    console.log(JSON.stringify(item, null, 2))
    res.json(item).end()
  })
  
  // Get a single item
  app.get('/testdb', async (req, res) => {
    dbPool.query('select * from test_tabla', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  })
  
  
  // Get a single item
  app.get('/:col/:key', async (req, res) => {
    const col = req.params.col
    const key = req.params.key
    console.log(`from collection: ${col} get key: ${key} with params ${JSON.stringify(req.params)}`)
    const item = await db.collection(col).get(key)
    console.log(JSON.stringify(item, null, 2))
    res.json(item).end()
  })
  
  // Get a full listing
  app.get('/:col', async (req, res) => {
    const col = req.params.col
    console.log(`list collection: ${col} with params: ${JSON.stringify(req.params)}`)
    const items = await db.collection(col).list()
    console.log(JSON.stringify(items, null, 2))
    res.json(items).end()
  })
  
  // Catch all handler for all other request.
  app.use('*', (req, res) => {
    res.json({ msg: 'no route handler found' }).end()
  })

  module.exports = app