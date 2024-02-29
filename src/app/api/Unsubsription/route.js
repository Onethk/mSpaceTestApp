// pages/api/deleteSubscription.js

import { NextResponse } from 'next/server';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export async function POST(request) {
    
  try {
    const body = await request.json();
    const { phoneNumber, password } = body;

    const db = await open({
      filename: '/hms/workOneth/MspaceCode/next1/prisma/dev.db',
      driver: sqlite3.Database
    });

    console.log("phonenumber",phoneNumber,"password",password)
    await db.run('DELETE FROM Subscription WHERE phoneNumber = ? AND password = ?', [phoneNumber, password]);

    await db.close();
    return NextResponse.json({message: 'Subscription deleted successfully'});

    // return res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    console.error('Error deleting subscription:', error);
    return NextResponse.json({ message: 'Internal server error' });

    // return res.status(500).json({ message: 'Internal server error' });
  }
}
