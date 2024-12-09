const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');

const app = express()
app.use(express.json())

const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error("Error connecting to DB :", err))
    const foodSchema = new mongoose.Schema({
        name: String,
        color: String,
      });
      
      // Create Food Model
      const Food = mongoose.model("Food", foodSchema);
      
      // Seed Function
      async function seedFoods() {
        // Define five foods with name and color
        const foods = [
          { name: "Apple", color: "Red" },
          { name: "Banana", color: "Yellow" },
          { name: "Grapes", color: "Purple" },
          { name: "Orange", color: "Orange" },
          { name: "Lettuce", color: "Green" },
        ];
      
        try {
          //empty the DB
          await Food.deleteMany({});
          // Insert foods
          await Food.insertMany(foods);
          console.log("Foods seeded successfully:", foods);
        } catch (error) {
          console.error("Error seeding foods:", error);
        }
        
      }
      
      // Run the seed function
      seedFoods();
app.use(cors())
app.get("/", async (req, res) => {
    try {
      const foods = await Food.find();
      res.send(foods);
    } catch (error) {
      res.status(500).json({ message: "Error fetching foods", error });
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})