import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import db from '../../../database/pool';

// SIMPLE GET REQUEST THAT VIEWS ALL USERS IN THE USERS TABLE
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

    // Step 1: Fetch user by email
    const result = await db.query(
      'SELECT id, first_name, password, role_id FROM users WHERE email = $1',
      [email],
    );

    const user = result.rows[0];

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 },
      );
    }

    // Step 2: Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 },
      );
    }

    // Step 3: Fetch the role name using the role_id
    const roleResult = await db.query(
      'SELECT role_name FROM roles WHERE id = $1',
      [user.role_id],
    );

    const role = roleResult.rows[0];

    if (!role) {
      return NextResponse.json(
        { error: 'Role not found for the user.' },
        { status: 500 },
      );
    }

    // Step 4: Return the user_id, role_name, and optionally first_name
    return NextResponse.json({
      user_id: user.id,
      role_name: role.role_name,
      first_name: user.first_name, // You can remove this if not needed
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
