import { NextRequest, NextResponse } from 'next/server';
import db from '../../../database/pool';

// SIMPLE GET REQUEST THAT VIEWS ALL ROLES IN THE ROLES TABLE
export async function GET() {
  try {
    const result = await db.query('SELECT * FROM roles');
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
