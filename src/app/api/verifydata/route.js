// import { NextResponse } from "next/server";
// import sqlite3 from "sqlite3";
// import { open } from "sqlite";

// // Initialize the database instance (if not already initialized)
// let db = null;
// // Function to handle the POST request
// export async function POST(request) {
//   try {
//     if (!db) {
//       // If the database instance is not initialized, open the database connection
//       db = await open({
//         filename: "/home/oneth/Work/MspaceCode/next1/prisma/dev.db", // Specify the database file path
//         driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
//       });
//     }

//     // Create the "Subscription" table if it doesn't exist
//     db.run(`
//       CREATE TABLE IF NOT EXISTS "Subscription" (
//         "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
//         "phoneNumber" TEXT NOT NULL,
//         "username" TEXT NOT NULL,
//         "password" TEXT NOT NULL
//       );
//     `);

//     // Extract data from the request body
//     const body = await request.json();
//     const { phoneNumber, username, password } = body;
//     console.log(phoneNumber);
//     console.log('from API backend**');


//     // Check if the provided phone and username exist in the database
//     const query = "SELECT * FROM Subscription WHERE phoneNumber = ? AND username = ?";
//     const result = await db.get(query, [phoneNumber, username]);

//     if (result) {
//       // Phone and username match found
//       console.log("You are already subscribed");
//       return NextResponse.json({ message: "Phone and username are correct" });
//     } else {
//       // No match found
//       console.log("Phone and username do not match");
//       return NextResponse.json({ message: "Phone and username do not match" });
//     }
//   } catch (error) {
//     console.error(error.message);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }





import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Initialize the database instance (if not already initialized)
let db = null;

// Function to handle the POST request
export async function POST(request) {
  try {
    if (!db) {
      // If the database instance is not initialized, open the database connection
      db = await open({
        filename: "/home/oneth/Work/MspaceCode/next1/prisma/dev.db", // Specify the database file path
        driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
      });
    }

    // Create the "Subscription" table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS "Subscription" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "phoneNumber" TEXT NOT NULL,
        "username" TEXT NOT NULL,
        "password" TEXT NOT NULL
      );
    `);

    // Extract data from the request body
    const body = await request.json();
    const { phoneNumber, username, password } = body;
    console.log(phoneNumber);
    console.log('from API backend');
    

    // Check if the provided phone number already exists in the database
    const phoneExistsQuery = "SELECT * FROM Subscription WHERE phoneNumber = ?";
    const existingPhoneResult = await db.get(phoneExistsQuery, [phoneNumber]);

    if (existingPhoneResult) {
      // Phone number already exists in the database
      console.log("Phone number already subscribed");
      return NextResponse.json({ message: "Phone number already subscribed" });
    }

    // Check if the provided phone and username exist in the database
    const subscriptionExistsQuery = "SELECT * FROM Subscription WHERE phoneNumber = ? AND username = ?";
    const result = await db.get(subscriptionExistsQuery, [phoneNumber, username]);

    if (result) {
      // Phone and username match found
      console.log("Phone and username are correct");
    //   return NextResponse.json({ message: "You are already subscribed" });
    return NextResponse.json({ message: "Login successful", success: true });

    } else {
      // No match found, insert new subscription
      console.log("Phone and username do not match");
      // Insert the new subscription into the database
      const insertQuery = "INSERT INTO Subscription (phoneNumber, username, password) VALUES (?, ?, ?)";
      await db.run(insertQuery, [phoneNumber, username, password]);;
      console.log('Subscribed Successfully');
    //   return NextResponse.json({ message: "Subscription successful" });
    return NextResponse.json({ message: "Invalid login credentials", success: false });

    }
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}












// import { NextResponse } from "next/server";
// import sqlite3 from "sqlite3";
// import { open } from "sqlite";

// // Initialize the database instance (if not already initialized)
// let db = null;
// console.log('test1');

// // Function to handle the POST request
// export async function POST(request) {

//   try {
//     if (!db) {
//       // If the database instance is not initialized, open the database connection
//       db = await open({
//         filename: "/home/oneth/Work/MspaceCode/next1/prisma/dev.db", // Specify the database file path
//         driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
//       });
//     }

//     // Create the "Subscription" table if it doesn't exist
//     db.run(`
//       CREATE TABLE IF NOT EXISTS "Subscription" (
//         "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
//         "phoneNumber" TEXT NOT NULL,
//         "username" TEXT NOT NULL,
//         "password" TEXT NOT NULL
//       );
//     `);

//     // Extract data from the request body
//     const body = await request.json();
//     const { phoneNumber, username, password } = body;
//     console.log(phoneNumber);
//     console.log('from API backend');

//     // Check if the provided phone number already exists in the database
//     const phoneExistsQuery = "SELECT * FROM Subscription WHERE phoneNumber = ?";
//     const existingPhoneResult = await db.get(phoneExistsQuery, [phoneNumber]);

//     if (existingPhoneResult) {
//       // Phone number already exists in the database
//       console.log("Phone number already subscribed");
//       return NextResponse.json({ message: "Phone number already subscribed" });
//     }

//     // Check if the provided phone and username exist in the database
//     const subscriptionExistsQuery = "SELECT * FROM Subscription WHERE phoneNumber = ? AND username = ?";
//     const result = await db.get(subscriptionExistsQuery, [phoneNumber, username]);

//     if (result) {
//       // Phone and username match found
//       console.log("Phone and username are correct");
//       return NextResponse.json({ message: "Phone and username are correct" });
//     } else {
//       // No match found, insert new subscription
//       console.log("Phone and username do not match");
//       // Insert the new subscription into the database
//       const insertQuery = "INSERT INTO Subscription (phoneNumber, username, password) VALUES (?, ?, ?)";
//       await db.run(insertQuery, [phoneNumber, username, password]);
//       return NextResponse.json({ message: "Subscription successful" });
//     }
//   } catch (error) {
//     console.error(error.message);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }

