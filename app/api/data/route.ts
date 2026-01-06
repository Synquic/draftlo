import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'app-data.json');

// GET endpoint - Read data
export async function GET() {
  try {
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    const data = JSON.parse(fileContent);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return NextResponse.json(
      { error: 'Failed to read data' },
      { status: 500 }
    );
  }
}

// POST endpoint - Update data
export async function POST(request: Request) {
  try {
    const newData = await request.json();

    // Write the new data to the file
    fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Data updated successfully'
    });
  } catch (error) {
    console.error('Error writing data:', error);
    return NextResponse.json(
      { error: 'Failed to update data' },
      { status: 500 }
    );
  }
}

// PUT endpoint - Partial update (for specific fields)
export async function PUT(request: Request) {
  try {
    const updates = await request.json();

    // Read existing data
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    const currentData = JSON.parse(fileContent);

    // Merge updates with existing data
    const updatedData = { ...currentData, ...updates };

    // Write back to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(updatedData, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Data updated successfully',
      data: updatedData
    });
  } catch (error) {
    console.error('Error updating data:', error);
    return NextResponse.json(
      { error: 'Failed to update data' },
      { status: 500 }
    );
  }
}
