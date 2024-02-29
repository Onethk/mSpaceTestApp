import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db = null;

export async function GET(request) {

  console.log(JSON.parse(request.body));

  return NextResponse.json({ })

  
}

// Handles POST requests to /api
export async function POST(request) {
  console.log("test1")
  // ...
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: "/hms/workOneth/MspaceCode/next1/prisma/dev.db", // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
  }

  db.run(`
  CREATE TABLE IF NOT EXISTS "Subscription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
  `)
  const body = await request.json();
  const { phoneNumber, password } = body;
  console.log(phoneNumber);
  console.log('from API backend');

  const insertSql = `INSERT INTO Subscription(phoneNumber, password) VALUES(?, ?)`;
        

        db.run(insertSql, [phoneNumber,password], function (err) {
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

