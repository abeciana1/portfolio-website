import { NextResponse, NextRequest } from "next/server";
import payload from 'payload';

const apiKeyMiddleware = (req: NextRequest) => {
  const authHeader = req.headers.get('authorization');

  
  if (!authHeader || !authHeader.startsWith('Token ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  console.log('apiKeyMiddleware auth header', authHeader)
  // return NextResponse.next();
}

export default apiKeyMiddleware;