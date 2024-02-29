// import sqlite3 from 'sqlite3';
// import { open } from 'sqlite';
// import { NextResponse } from 'next/server';

// export async function POST(request){


//     try {

//         const body = await request.json();
//         // const { phoneNumber } = body;
//         const { phoneNumber, password } = body;


//         console.log(phoneNumber)

//       // Open the SQLite database
//       const db = await open({
//         filename: '/hms/workOneth/MspaceCode/next1/prisma/dev.db', // Provide the path to your SQLite database file
//         driver: sqlite3.Database
//       });

//       // Query the database to check if the phone number exists
//       const result = await db.get('SELECT COUNT(*) as count FROM Subscription WHERE phoneNumber = ?', [phoneNumber]);

//       if (result.count > 0) {
//         // Close the database connection
//          await db.close();
//         // Phone number exists
//         console.log("")
//         // return NextResponse.redirect('/SuccessPage');
//         return NextResponse.redirect(`${process.env.baseUrl2}/SuccessPage`)
//         // return NextResponse.json({ message: "Phonenumber exists" });
        
//     } else {
//         // Close the database connection
//         await db.close();
//         // Phone number doesn't exist
//         return NextResponse.json({ message: "Phonenumber not exists" });
//       }

      
//     } catch (error) {
//       console.error('Error checking phone number duplication:', error);
//       return NextResponse.json({ message: "Internal server error" });
//     }
  
// }

// import sqlite3 from 'sqlite3';
// import { open } from 'sqlite';
// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   try {
//       const body = await request.json();
//       const { phoneNumber, password } = body;

//       const db = await open({
//           filename: '/hms/workOneth/MspaceCode/next1/prisma/dev.db',
//           driver: sqlite3.Database
//       });

//       const result = await db.get('SELECT COUNT(*) as count FROM Subscription WHERE phoneNumber = ? AND password = ?', [phoneNumber, password]);

//       await db.close();
//       console.log(result);
//       if (result.count > 0) {
//           return NextResponse.redirect(`${process.env.baseUrl2}/SuccessPage`);
//       } else {
//           return NextResponse.json({ message: "Phone number or password is incorrect" });
//       }
//   } catch (error) {
//       console.error('Error checking login credentials:', error);
//       return NextResponse.json({ message: "Internal server error" });
//   }
// }










import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    console.log("testVerify");
      const body = await request.json();
      const { phoneNumber, password } = body;

      const db = await open({
          filename: '/hms/workOneth/MspaceCode/next1/prisma/dev.db',
          driver: sqlite3.Database
      });

      const result = await db.get('SELECT COUNT(*) as count FROM Subscription WHERE phoneNumber = ? AND password = ?', [phoneNumber, password]);

      await db.close();
      if (!result || result.count === 0) {
        // return NextResponse.redirect(`${process.env.baseUrl2}/LoginForm`);
        return NextResponse.json({ statusCode:"E1000",message: "Wrong Credentials" });
      } else {
          return NextResponse.redirect(`${process.env.baseUrl2}/ContentPage`);
      }
  } catch (error) {
      console.error('Error checking login credentials:', error);
      return NextResponse.json({ message: "Internal server error" });
  }
}
