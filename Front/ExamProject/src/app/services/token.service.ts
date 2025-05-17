import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  
  constructor() { }
  
  getUserIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    
    try {
      // JWT tokens are in format: header.payload.signature
      // We need the payload part
      const payload = token.split('.')[1];
      // Decode the base64 encoded payload
      const decodedPayload = JSON.parse(atob(payload));
      // Return the user ID
      return decodedPayload.id;
    } catch (error) {
      console.error('Error decoding token', error);
      return '';
    }
  }
} 