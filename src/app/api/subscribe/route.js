import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db = null;

export async function GET(request) {
  // console.log(request);
  // Check if request has query parameters
  // if (!request.query) {
  //   return NextResponse.json({ message: "No query parameters provided for GET request" });
  // }

  // Get query parameters from the request
  // const body1 = await request.json();
  console.log(JSON.parse(request.body));

  return NextResponse.json({ })

  // const { phoneNumber, username, password } = body1;



  // // If either username or password is missing, return an error response
  // if (!username || !password) {
  //   return NextResponse.json({ message: "Username and password are required for GET request" });
  // }

  // // If the database instance is not initialized, open the database connection
  // if (!db) {
  //   db = await open({
  //     filename: "/home/oneth/Work/MspaceCode/next1/prisma/dev.db",
  //     driver: sqlite3.Database,
  //   });
  // }

  // // Check if the provided username and password exist in the database
  // const user = await db.get(
  //   "SELECT * FROM Subscription WHERE username = ? AND password = ?",
  //   [username, password]
  // );

  // if (user) {
  //   console.log(`User with username ${username} and password ${password} exists`);
  //   return NextResponse.json({ message: "User exists with the provided credentials" });
  // } else {
  //   console.log(`User not found with the provided credentials`);
  //   return NextResponse.json({ message: "User not found with the provided credentials" });
  // }
}

// Handles POST requests to /api
export async function POST(request) {
  // ...
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: "/home/oneth/Work/MspaceCode/next1/prisma/dev.db", // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
  }

  db.run(`
  CREATE TABLE IF NOT EXISTS "Subscription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phoneNumber" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
  `)
  const body = await request.json();
  const { phoneNumber, username, password } = body;
  console.log(phoneNumber);
  console.log('from API backend');

  const insertSql = `INSERT INTO Subscription(phoneNumber, username, password) VALUES(?, ?, ?)`;
        

        db.run(insertSql, [phoneNumber,username,password], function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted, ID ${id}`);
        });

  // const prisma = new PrismaClient();


  try {
      // const result = await prisma.subscription.create({
      //   data: {
      //     phoneNumber,
      //     username,
      //     password,
      //   },
      // });
      return NextResponse.json({ message: "Success" });

  }catch{

    return NextResponse.json({ message: "Failure" });

  }
}













// export async function POST(reqest, response) {

//   // if (req.method === 'POST') {
//   //   const { phoneNumber, username, password } = req.body;

//   //   console.log('Received data:', req.body);

    // try {
    //   const result = await prisma.subscription.create({
    //     data: {
    //       phoneNumber,
    //       username,
    //       password,
    //     },
    //   });

//   //     console.log('Data inserted:', result);

//   //     res.status(200).json({ success: true, data: result });
//   //   } catch (error) {
//   //     console.error('Database error:', error);
//   //     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   //   }
//   // } else {
//   //   res.status(405).json({ success: false, error: 'Method Not Allowed' });
//   // }
// }

