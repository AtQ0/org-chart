// app/api/users/route.ts
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import db from '../../../database/pool';

// SIMPLE GET REQUEST THAT VIEWS ALL USERS IN THE USERS TABLE IN DB
export async function GET() {
  try {
    const result = await db.query('SELECT * FROM users');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching data: ', error);
    return NextResponse.json(
      {
        error: 'internal server error',
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  }
}

// CHECK IF EMAIL AND PASSWORD EXISTS IN THE USERS TABLE IN DB
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 },
      );
    }

    const result = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    const user = result.rows[0];

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 },
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 },
      );
    }

    // Optional: strip password before returning
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
