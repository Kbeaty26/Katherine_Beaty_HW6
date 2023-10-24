import cors from "cors";
import express from "express";
import { Client } from "pg";

// This creates the "express" app.
const app = express();
const port = 5000;

app.use(cors());
app.use(express.static('../client'));

// Creating a new client instance for the PostgreSQL database
const client = new Client({
  // Connection string includes the username, password, host, and database name
  connectionString: "postgresql://p_user:p_password@localhost:5432/product_db",
});
// Establishing a connection to the database
client.connect();

app.get("/", async (_, res) => {
  try {
    // This is testing that the connection to the database works
    await client.query("SELECT 1");
    res.send("Hello World! Database connection is successful.");
  } catch (error) {
    console.error(error);
    res.status(500).json("Hello World! Database connection failed.");
  }
});

app.get("/products", async (req, res) =>{
  try{
    const page = req.query.page;
    const limit = req.query.limit;

    const offset = ((page as unknown as number) - 1) * (limit as unknown as number);
    const maxPages =  (1000 / (limit as unknown as number)) ;

    if ((page as unknown as number) > maxPages) {
      res.status(404).json('Page number is out of bounds.');
    } else if ((limit as unknown as number) > 1000) {
      res.status(404).json('Limit cannont be greater than the size of the database.');
    } else {
      const result3 = await client.query(
        `SELECT * FROM products ORDER BY id OFFSET ${offset} LIMIT ${limit}`);
      const data = result3.rows;
      res.json(data);
    }
    
  } catch (error){
    console.error(error)
    res.status(500).json('Unable to get data from the database.')
  }
}); 

app.get("/products/count", async (_, res) =>{
  try{
    const result = await client.query('SELECT count(*) FROM products');
    const products = result.rows[0].count;
   res.json(products);
  } catch (error){
    console.error(error);
    res.status(500).json('Unable to get count for database.');
  }
});

app.get("/products/:id", async (req, res) =>{
  try{
    const params = req.params.id;
    const result2 = await client.query(`SELECT name FROM products WHERE id = ${params}`);
    if (result2.rows.length == 0) {
      res.status(404).json('No item under that id exists.');
    } else {
      const item = result2.rows[0].name;
      res.json(item);
    }
  } catch (error){
    console.error(error);
    res.status(500).json('Internal server error.');
  }
});


// Start the server and listen on the specified port
// This is important as it allows the server to accept incoming network requests on this port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});