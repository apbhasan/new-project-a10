const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', (req, res) => {
  res.send('Smart / Artify server is running');
});

async function run() {
  try {
    // create db + collection handles (lazy connect)
    const db = client.db('smart_db');

    // old collection (still usable if you need it)
    const productsCollection = db.collection('products');

    // NEW collections for ARTIFY
    const artworksCollection = db.collection('artworks');
    const favoritesCollection = db.collection('favorites');

    // =========================
    //        PRODUCTS CRUD
    // =========================

    // GET: all products
    app.get('/products', async (req, res) => {
      try {
        const products = await productsCollection.find().toArray();
        res.send(products);
      } catch (err) {
        console.error('Error getting products:', err);
        res.status(500).send({ message: 'Failed to get products' });
      }
    });

    // GET: single product by id
    app.get('/products/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const product = await productsCollection.findOne(query);

        if (!product) {
          return res.status(404).send({ message: 'Product not found' });
        }

        res.send(product);
      } catch (err) {
        console.error('Error getting product:', err);
        res.status(500).send({ message: 'Failed to get product' });
      }
    });

    // POST: add a product
    app.post('/products', async (req, res) => {
      try {
        const newProduct = req.body;
        const result = await productsCollection.insertOne(newProduct);
        res.send(result);
      } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).send({ message: 'Failed to add product' });
      }
    });

    // PATCH: update a product by id (partial update)
    app.patch('/products/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const updatedFields = req.body;

        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: updatedFields,
        };

        const result = await productsCollection.updateOne(filter, updateDoc);

        if (result.matchedCount === 0) {
          return res.status(404).send({ message: 'Product not found' });
        }

        res.send(result);
      } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).send({ message: 'Failed to update product' });
      }
    });

    // DELETE: delete a product by id
    app.delete('/products/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const result = await productsCollection.deleteOne(query);

        if (result.deletedCount === 0) {
          return res.status(404).send({ message: 'Product not found' });
        }

        res.send(result);
      } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).send({ message: 'Failed to delete product' });
      }
    });

    // =========================
    //        ARTIFY CRUD
    // =========================

    // POST: add artwork
    app.post('/artworks', async (req, res) => {
      try {
        const artwork = req.body;
        // default fields
        artwork.likes = artwork.likes || 0;
        artwork.createdAt = new Date();

        const result = await artworksCollection.insertOne(artwork);
        res.send(result);
      } catch (err) {
        console.error('Error adding artwork:', err);
        res.status(500).send({ message: 'Failed to add artwork' });
      }
    });

    // GET: all artworks (with filters: visibility, email, search, category)
    app.get('/artworks', async (req, res) => {
      try {
        const { visibility, email, search, category } = req.query;
        const query = {};

        if (visibility) {
          query.visibility = visibility; // "Public" or "Private"
        }
        if (email) {
          query.userEmail = email;
        }
        if (category && category !== 'All') {
          query.category = category;
        }
        if (search) {
          query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { artistName: { $regex: search, $options: 'i' } },
          ];
        }

        const cursor = artworksCollection
          .find(query)
          .sort({ createdAt: -1 });

        const artworks = await cursor.toArray();
        res.send(artworks);
      } catch (err) {
        console.error('Error getting artworks:', err);
        res.status(500).send({ message: 'Failed to get artworks' });
      }
    });

    // GET: 6 most recent public artworks (Featured)
    app.get('/featured-artworks', async (req, res) => {
      try {
        const featured = await artworksCollection
          .find({ visibility: 'Public' })
          .sort({ createdAt: -1 })
          .limit(6)
          .toArray();

        res.send(featured);
      } catch (err) {
        console.error('Error getting featured artworks:', err);
        res.status(500).send({ message: 'Failed to get featured artworks' });
      }
    });

    // GET: single artwork by id
    app.get('/artworks/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const artwork = await artworksCollection.findOne(query);

        if (!artwork) {
          return res.status(404).send({ message: 'Artwork not found' });
        }

        res.send(artwork);
      } catch (err) {
        console.error('Error getting artwork:', err);
        res.status(500).send({ message: 'Failed to get artwork' });
      }
    });

    // PUT: update artwork by id (for My Gallery)
    app.put('/artworks/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const updatedFields = req.body;

        const filter = { _id: new ObjectId(id) };
        const updateDoc = { $set: updatedFields };

        const result = await artworksCollection.updateOne(filter, updateDoc);

        if (result.matchedCount === 0) {
          return res.status(404).send({ message: 'Artwork not found' });
        }

        res.send(result);
      } catch (err) {
        console.error('Error updating artwork:', err);
        res.status(500).send({ message: 'Failed to update artwork' });
      }
    });

    // DELETE: delete artwork by id
    app.delete('/artworks/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const result = await artworksCollection.deleteOne(query);

        if (result.deletedCount === 0) {
          return res.status(404).send({ message: 'Artwork not found' });
        }

        res.send(result);
      } catch (err) {
        console.error('Error deleting artwork:', err);
        res.status(500).send({ message: 'Failed to delete artwork' });
      }
    });

    // PATCH: like artwork (increase likes using $inc)
    app.patch('/artworks/:id/like', async (req, res) => {
      try {
        const id = req.params.id;
        const action = req.query.action || 'inc'; // 'inc' or 'dec' (optional)
        const value = action === 'dec' ? -1 : 1;

        const filter = { _id: new ObjectId(id) };
        const updateDoc = { $inc: { likes: value } };

        const result = await artworksCollection.updateOne(filter, updateDoc);

        if (result.matchedCount === 0) {
          return res.status(404).send({ message: 'Artwork not found' });
        }

        res.send(result);
      } catch (err) {
        console.error('Error liking artwork:', err);
        res.status(500).send({ message: 'Failed to like artwork' });
      }
    });

    // =========================
    //        FAVORITES
    // =========================

    // POST: add to favorites
    app.post('/favorites', async (req, res) => {
      try {
        const favorite = req.body; // { userEmail, artworkId, artworkSnapshot }
        favorite.addedAt = new Date();

        const result = await favoritesCollection.insertOne(favorite);
        res.send(result);
      } catch (err) {
        console.error('Error adding favorite:', err);
        res.status(500).send({ message: 'Failed to add favorite' });
      }
    });

    // GET: favorites by user email
    app.get('/favorites', async (req, res) => {
      try {
        const { email } = req.query;
        const query = email ? { userEmail: email } : {};
        const favorites = await favoritesCollection.find(query).toArray();
        res.send(favorites);
      } catch (err) {
        console.error('Error getting favorites:', err);
        res.status(500).send({ message: 'Failed to get favorites' });
      }
    });

    // DELETE: remove favorite by id
    app.delete('/favorites/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const result = await favoritesCollection.deleteOne(query);

        if (result.deletedCount === 0) {
          return res.status(404).send({ message: 'Favorite not found' });
        }

        res.send(result);
      } catch (err) {
        console.error('Error deleting favorite:', err);
        res.status(500).send({ message: 'Failed to delete favorite' });
      }
    });

    // this will cause a lazy connection + ping
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // keeping client open so routes can use it
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Smart server is running on port:${port}`);
});
