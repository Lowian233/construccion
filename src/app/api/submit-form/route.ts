import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const data = await request.json();
    
    // URL de tu Google Apps Script
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxHNERlzbfQZ61YTP9LYjFsD3YzTqB4o_MmvzYOMK_-Q5cwcNc3yYS9JAVw0PF0sb4-/exec';
    
    // Enviar los datos a Google Apps Script
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    // Si la respuesta no es correcta
    if (!response.ok) {
      throw new Error('Error al enviar datos a Google Sheets');
    }
    
    // Devolver respuesta exitosa
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error en submit-form:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
} 