import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, name } = body;
    //password ekleme işi

    console.log(`Auth request: ${action} for ${email} with name ${name || 'N/A'}`);

    // For MVP: return a mock successful response
    return NextResponse.json({
      success: true,
      message: `${action === 'login' ? 'Login' : 'Signup'} successful`,
      user: { email, ...(name ? { name } : {}) }
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 500 }
    );
  }
}
