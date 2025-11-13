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
    
    const db = client.db('smart_db');

    
    const productsCollection = db.collection('products');

    
    const artworksCollection = db.collection('artworks');
    const favoritesCollection = db.collection('favorites');

    
    app.get('/products', async (req, res) => {
      try {
        const products = await productsCollection.find().toArray();
        res.send(products);
      } catch (err) {
        console.error('Error getting products:', err);
        res.status(500).send({ message: 'Failed to get products' });
      }
    });

    
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

    
    app.post('/artworks', async (req, res) => {
      try {
        const artwork = req.body;
        
        artwork.likes = artwork.likes || 0;
        artwork.createdAt = new Date();

        const result = await artworksCollection.insertOne(artwork);
        res.send(result);
      } catch (err) {
        console.error('Error adding artwork:', err);
        res.status(500).send({ message: 'Failed to add artwork' });
      }
    });

    
    app.get('/artworks', async (req, res) => {
      try {
        const { visibility, email, search, category } = req.query;
        const query = {};

        if (visibility) {
          query.visibility = visibility;
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

    
    app.patch('/artworks/:id/like', async (req, res) => {
      try {
        const id = req.params.id;
        const action = req.query.action || 'inc';
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

    
    app.post('/favorites', async (req, res) => {
      try {
        const favorite = req.body; 
        favorite.addedAt = new Date();

        const result = await favoritesCollection.insertOne(favorite);
        res.send(result);
      } catch (err) {
        console.error('Error adding favorite:', err);
        res.status(500).send({ message: 'Failed to add favorite' });
      }
    });

    
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

    
    //await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Smart server is running on port:${port}`);
});
