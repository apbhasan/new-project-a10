// seed.js  -> run once to insert 20 artworks (8 from your Medium + 12 others)

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://apbhasan_db_user:PfRNgsjoOrALafyW@cluster0.hae7n81.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// 20 artworks total
// First 8: your Medium artworks (with different artist names)
const artworks = [
  // ======= YOUR MEDIUM ARTWORKS (artist names changed) =======

  {
    imageURL:
      "https://miro.medium.com/v2/resize:fit:4800/format:webp/0*nnRyTh6BSxCtr__A.jpeg",
    title: "City Echoes",
    category: "Painting",
    medium: "Digital painting",
    description:
      "Atmospheric urban composition exploring light, depth, and contrast.",
    dimensions: "3000x2000 px",
    price: 250,
    visibility: "Public",
    artistName: "Elena Rivers",
    artistPhoto: "https://i.ibb.co/7nL9gKz/user.png",
    userEmail: "elena@artify.com",
    likes: 0,
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
  },
  {
    imageURL:
      "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*7RuFjlfFIpkAPuo4XtUBow.png",
    title: "Roger Waters",
    category: "Digital",
    medium: "Digital illustration",
    description:
      "A stylized portrait study inspired by Roger Waters with bold shapes and colors.",
    dimensions: "3000x3000 px",
    price: 280,
    visibility: "Public",
    artistName: "Jonah Blake",
    artistPhoto: "https://i.ibb.co/7nL9gKz/user.png",
    userEmail: "jonah@artify.com",
    likes: 0,
    createdAt: new Date("2025-01-02T00:00:00.000Z"),
  },
  {
    imageURL:
      "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*cOvFLHe3lgQ9KriIdFD_LA.jpeg",
    title: "Sunny Snowy",
    category: "Painting",
    medium: "Digital landscape",
    description:
      "A calm scene mixing warm sunlight with cold snow, focusing on mood and atmosphere.",
    dimensions: "2000x1200 px",
    price: 230,
    visibility: "Public",
    artistName: "Mira Khanna",
    artistPhoto: "https://i.ibb.co/7nL9gKz/user.png",
    userEmail: "mira@artify.com",
    likes: 0,
    createdAt: new Date("2025-01-03T00:00:00.000Z"),
  },
  {
    imageURL:
      "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*uvZMgG92dSKQBWg6RdqSqw.jpeg",
    title: "Autumn Leaves",
    category: "Painting",
    medium: "Digital painting",
    description:
      "Warm and textured autumn foliage study capturing falling leaves and fading light.",
    dimensions: "3200x1800 px",
    price: 260,
    visibility: "Public",
    artistName: "Lucas Voss",
    artistPhoto: "https://i.ibb.co/7nL9gKz/user.png",
    userEmail: "lucas@artify.com",
    likes: 0,
    createdAt: new Date("2025-01-04T00:00:00.000Z"),
  },
  {
    imageURL:
      "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*PnAWL0tndDLgZwS6aKKSQQ.jpeg",
    title: "Painting with Sound",
    category: "Digital",
    medium: "Abstract digital art",
    description:
      "Abstract visualization inspired by sound waves and rhythm using color and form.",
    dimensions: "3000x2000 px",
    price: 240,
    visibility: "Public",
    artistName: "Ivy Laurent",
    artistPhoto: "https://i.ibb.co/7nL9gKz/user.png",
    userEmail: "ivy@artify.com",
    likes: 0,
    createdAt: new Date("2025-01-05T00:00:00.000Z"),
  },
  {
    imageURL:
      "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*oDmrqkWxWHmCAs5fOGytqQ.png",
    title: "Water Smoke",
    category: "Digital",
    medium: "Digital experiment",
    description:
      "An experimental piece playing with fluid forms that feel like a mix of water and smoke.",
    dimensions: "2800x1800 px",
    price: 220,
    visibility: "Public",
    artistName: "Noah Hart",
    artistPhoto: "https://i.ibb.co/7nL9gKz/user.png",
    userEmail: "noah@artify.com",
    likes: 0,
    createdAt: new Date("2025-01-06T00:00:00.000Z"),
  },
  {
    imageURL:
      "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*L6DCLS7Bv380CDp3tMANiQ.jpeg",
    title: "Nature Painting",
    category: "Painting",
    medium: "Digital nature study",
    description:
      "A nature-focused composition capturing light, foliage, and organic flow.",
    dimensions: "3200x2000 px",
    price: 270,
    visibility: "Public",
    artistName: "Sofia Marin",
    artistPhoto: "https://i.ibb.co/7nL9gKz/user.png",
    userEmail: "sofia@artify.com",
    likes: 0,
    createdAt: new Date("2025-01-07T00:00:00.000Z"),
  },
  {
    imageURL:
      "https://miro.medium.com/v2/resize:fit:2000/format:webp/0*qA-BB-C_Om9GFJ2k.jpg",
    title: "Human Activity",
    category: "Sketch",
    medium: "Digital sketch",
    description:
      "A sketch capturing human presence and motion through simplified forms.",
    dimensions: "2000x1200 px",
    price: 190,
    visibility: "Public",
    artistName: "Arjun Rao",
    artistPhoto: "https://i.ibb.co/7nL9gKz/user.png",
    userEmail: "arjun@artify.com",
    likes: 0,
    createdAt: new Date("2025-01-08T00:00:00.000Z"),
  },

  // ======= 12 MORE ARTWORK CARDS =======

  // Painting
  {
    imageURL:
      "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*CXxuavi17Rc5IQM-3gu93A.jpeg", // City Lights image
    title: "City Lights",
    category: "Painting",
    medium: "Acrylic",
    description:
      "Bold brush strokes capturing a rainy city street at night under neon signs.",
    dimensions: "20x30 in",
    price: 260,
    visibility: "Public",
    artistName: "Arif Rahman",
    artistPhoto: "https://i.ibb.co/7nL9gKz/user.png",
    userEmail: "arif@artify.com",
    likes: 0,
    createdAt: new Date("2025-01-10T00:00:00.000Z"),
  },
  {
    imageURL: "https://picsum.photos/id/1035/800/600",
    title: "Lotus Serenity",
    category: "Painting",
    medium: "Gouache",
    description:
      "Minimal still life of lotus flowers floating on dark reflective water.",
    dimensions: "16x20 in",
    price: 210,
    visibility: "Public",
    artistName: "Maya Sen",
    artistPhoto: "https://i.ibb.co/7nL9gKz/user.png",
    userEmail: "maya@artify.com",
    likes: 0,
    createdAt: new Date("2025-01-11T00:00:00.000Z"),
  },

  // Digital painting / concept art
  {
    imageURL: "https://picsum.photos/id/1043/800/600",
    title: "Neon Alley",
    category: "Digital",
    medium: "Procreate",
    description:
      "Cyberpunk alley illustration with neon signs, rain, and reflective puddles.",
    dimensions: "3000x2000 px",
    price: 90,
    visibility: "Public",
    artistName: "Rhea Collins",
    artistPhoto: "https://i.ibb.co/7nL9gKz/user.png",
    userEmail: "rhea@artify.com",
    likes: 0,
    createdAt: new Date("2025-01-12T00:00:00.000Z"),
  },
  {
    imageURL:
      "https://miro.medium.com/v2/resize:fit:4800/format:webp/0*xRC0MkrYITJ9U_kO.jpg", // Floating Islands image
    title: "Floating Islands",
    category: "Digital",
    medium: "Clip Studio Paint",
    description:
      "Concept art of floating islands above a cloudy ocean with fantasy vibes.",
    dimensions: "3200x1800 px",
    price: 110,
    visibility: "Public",
    artistName: "Keira Vaughn",
    artistPhoto: "https://i.ibb.co/7nL9gKz/user.png",
    userEmail: "keira@artify.com",
    likes: 0,
    createdAt: new Date("2025-01-14T00:00:00.000Z"),
  },

  // Sketch / drawing
  {
    imageURL: "https://picsum.photos/id/113/800/600",
    title: "Character Study",
    category: "Sketch",
    medium: "Pencil on paper",
    description:
      "Rough character exploration focusing on silhouettes and facial expressions.",
    dimensions: "A4",
    price: 40,
    visibility: "Public",
    artistName: "Isla Monroe",
    artistPhoto: "https://i.ibb.co/7nL9gKz/user.png",
    userEmail: "isla@artify.com",
    likes: 0,
    createdAt: new Date("2025-01-15T00:00:00.000Z"),
  },
  {
    imageURL: "https://picsum.photos/id/114/800/600",
    title: "Architectural Lines",
    category: "Sketch",
    medium: "Ink",
    description:
      "Quick line study of an old European street with perspective and rhythm.",
    dimensions: "A5",
    price: 35,
    visibility: "Public",
    artistName: "Leo Marchetti",
    artistPhoto: "https://i.ibb.co/7nL9gKz/user.png",
    userEmail: "leo@artify.com",
    likes: 0,
    createdAt: new Date("2025-01-16T00:00:00.000Z"),
  },

  // Photography-style (still works as artwork)
  {
    imageURL: "https://picsum.photos/id/1084/800/600",
    title: "Golden Path",
    category: "Photography",
    medium: "DSLR - 50mm",
    description:
      "Evening sun lighting up a forest path with golden tones and long shadows.",
    dimensions: "6000x4000 px",
    price: 80,
    visibility: "Public",
    artistName: "Lina Das",
    artistPhoto: "https://i.ibb.co/7nL9gKz/user.png",
    userEmail: "lina@artify.com",
    likes: 0,
    createdAt: new Date("2025-01-15T00:00:00.000Z"),
  },
  {
    imageURL: "https://picsum.photos/id/110/800/600",
    title: "City Reflections",
    category: "Photography",
    medium: "Mirrorless - 35mm",
    description:
      "Reflections of skyscrapers in puddles after the rain in a busy city.",
    dimensions: "5500x3600 px",
    price: 85,
    visibility: "Public",
    artistName: "Arif Rahman",
    artistPhoto: "https://i.ibb.co/7nL9gKz/user.png",
    userEmail: "arif@artify.com",
    likes: 0,
    createdAt: new Date("2025-01-16T00:00:00.000Z"),
  },

  // 3D / painted renders
  {
    imageURL: "https://picsum.photos/id/117/800/600",
    title: "Glass Torus",
    category: "3D",
    medium: "Blender Cycles",
    description:
      "Abstract glass torus floating over a reflective surface with studio lighting.",
    dimensions: "3840x2160 px",
    price: 130,
    visibility: "Public",
    artistName: "Mason Leigh",
    artistPhoto: "https://i.ibb.co/7nL9gKz/user.png",
    userEmail: "mason@artify.com",
    likes: 0,
    createdAt: new Date("2025-01-17T00:00:00.000Z"),
  },
  {
    imageURL:
      "https://miro.medium.com/v2/resize:fit:4800/format:webp/0*JyVKT646QtF192qg.png", // Low-Poly Island image
    title: "Low-Poly Island",
    category: "3D",
    medium: "Cinema 4D",
    description:
      "Stylized low-poly floating island scene with bright pastel colors.",
    dimensions: "3000x2000 px",
    price: 120,
    visibility: "Public",
    artistName: "Finn O'Connor",
    artistPhoto: "https://i.ibb.co/7nL9gKz/user.png",
    userEmail: "finn@artify.com",
    likes: 0,
    createdAt: new Date("2025-01-19T00:00:00.000Z"),
  },
  {
    imageURL:
      "https://miro.medium.com/v2/resize:fit:4800/format:webp/0*re4JLyLfJ-3KABoZ", // Robot Study image
    title: "Robot Study",
    category: "3D",
    medium: "ZBrush + Blender",
    description:
      "Hard-surface robot model with studio lighting and painted metal materials.",
    dimensions: "3200x1800 px",
    price: 150,
    visibility: "Public",
    artistName: "Nova Sterling",
    artistPhoto: "https://i.ibb.co/7nL9gKz/user.png",
    userEmail: "nova@artify.com",
    likes: 0,
    createdAt: new Date("2025-01-20T00:00:00.000Z"),
  },
];

async function run() {
  try {
    await client.connect();
    const db = client.db("smart_db");
    const artworksCollection = db.collection("artworks");

    // clear existing artworks first so you have exactly 20
    await artworksCollection.deleteMany({});

    const result = await artworksCollection.insertMany(artworks);
    console.log(`Inserted ${result.insertedCount} artworks.`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
