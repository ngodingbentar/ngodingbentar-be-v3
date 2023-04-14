const bcrypt = require('bcryptjs');

const data = {
  users: [
    {
      name: 'Basir',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Paket buku sejarah',
      category: 'Shirts',
      image: '/images/p1.jpg',
      price: 120,
      weight: 500,
      countInStock: 10,
      author: 'Nike',
      description: 'high quality product',
      isPacket: true,
    },
    {
      name: 'Paket buku politik',
      category: 'Shirts',
      image: '/images/p2.jpg',
      price: 120,
      weight: 500,
      countInStock: 10,
      author: 'Nike',
      description: 'high quality product',
      isPacket: true,
    },
    {
      name: 'Nike Slim Shirt',
      category: 'Shirts',
      image: '/images/p1.jpg',
      price: 120,
      weight: 500,
      countInStock: 10,
      author: 'Nike',
      description: 'high quality product',
    },
    {
      name: 'Adidas Fit Shirt',
      category: 'Shirts',
      image: '/images/p2.jpg',
      price: 100,
      weight: 500,
      countInStock: 20,
      author: 'Adidas',
      description: 'high quality product',
      isRecomendation: true,
    },
    {
      name: 'Lacoste Free Shirt',
      category: 'Shirts',
      image: '/images/p3.jpg',
      price: 220,
      weight: 500,
      countInStock: 0,
      author: 'Lacoste',
      description: 'high quality product',
    },
    {
      name: 'Nike Slim Pant',
      category: 'Pants',
      image: '/images/p4.jpg',
      price: 78,
      weight: 100,
      countInStock: 15,
      author: 'Nike',
      description: 'high quality product',
      isRecomendation: true,
    },
    {
      name: 'Puma Slim Pant',
      category: 'Pants',
      image: '/images/p5.jpg',
      price: 65,
      weight: 500,
      countInStock: 5,
      author: 'Puma',
      description: 'high quality product',
    },
    {
      name: 'Adidas Fit Pant',
      category: 'Pants',
      image: '/images/p6.jpg',
      price: 139,
      weight: 500,
      countInStock: 12,
      author: 'Adidas',
      description: 'high quality product',
    },
  ],
  categories : [
    {
      name: "Fiksi",
      image: "https://aruspinggir-bucket.s3.ap-southeast-1.amazonaws.com/fidel-2.png"
    },
    {
      name: "Nonfiksi",
      image: "https://aruspinggir-bucket.s3.ap-southeast-1.amazonaws.com/fidel-2.png"
    },
    {
      name: "Novel",
      image: "https://aruspinggir-bucket.s3.ap-southeast-1.amazonaws.com/fidel-2.png"
    },
    {
      name: "Puisi",
      image: "https://aruspinggir-bucket.s3.ap-southeast-1.amazonaws.com/fidel-2.png"
    },
    {
      name: "Agama",
      image: "https://aruspinggir-bucket.s3.ap-southeast-1.amazonaws.com/fidel-2.png"
    },
    {
      name: "Politik",
      image: "https://aruspinggir-bucket.s3.ap-southeast-1.amazonaws.com/fidel-2.png"
    }
  ]  
};
// export default data;
module.exports = data;
