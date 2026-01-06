import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const CREDENTIALS_FILE = path.join(process.cwd(), 'data', 'admin-credentials.json');

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Read admin credentials
    const fileContent = fs.readFileSync(CREDENTIALS_FILE, 'utf-8');
    const credentials = JSON.parse(fileContent);

    // Check username
    if (username !== credentials.username) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // For initial setup, if password is "admin", hash it
    if (password === 'admin' && credentials.password.startsWith('$2a$')) {
      // First time login with default password
      const isValid = await bcrypt.compare(password, credentials.password);

      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }
    } else {
      // Verify password
      const isValid = await bcrypt.compare(password, credentials.password);

      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }
    }

    // Create session token (simple version - in production use JWT)
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');

    return NextResponse.json({
      success: true,
      token,
      username
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
