const mongoose = require('mongoose');
const dotenv = require('dotenv');

async function main() {
  dotenv.config();

  await mongoose.connect('mongodb+srv://iiamsona:Sona@prodnote.t4rs943.mongodb.net/ProdNote?retryWrites=true&w=majority', { connectTimeoutMS: 3000 })
    .then(() => console.log('Connected to db successfully'))
    .catch(() => console.log('Failed to connect to db'));
  
  const app = require('./app');
}

main()