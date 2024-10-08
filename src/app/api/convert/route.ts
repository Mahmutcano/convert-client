import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // POST isteklerini burada işleyin
  return NextResponse.json({ message: 'POST request received' });
}

export async function GET(req: Request) {
  // Eğer GET isteği de desteklemek istiyorsanız
  return NextResponse.json({ message: 'GET request received' });
}
