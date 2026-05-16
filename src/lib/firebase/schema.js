/**
 * Firebase Firestore/Realtime Database Schema Documentation
 * Berna Smart Agro-Tech Complex
 */

export const FirestoreSchema = {
  // Collections
  LivestockBatch: {
    // Document ID: auto-generated or format 'LB-XXX'
    ID: 'string', 
    breed: 'string', // e.g., 'Somali Blackhead'
    weight_history: [
      {
        timestamp: 'timestamp',
        weight_kg: 'number'
      }
    ],
    fodder_intake: [
      {
        timestamp: 'timestamp',
        amount_kg: 'number'
      }
    ],
    health_status: 'string', // 'Healthy', 'Requires Checkup', 'Sick'
    expected_roi: 'number', // percentage
    status: 'string' // 'active', 'matured', 'sold'
  },

  SensorLogs: {
    // Time-series data best stored in sub-collections or Realtime DB depending on frequency
    Timestamp: 'timestamp',
    value: 'number',
    unit: 'string', // '°C', '%', 'pH', 'mS/cm'
    sensor_type: 'string' // 'temperature', 'humidity', 'ph', 'ec'
  },

  Investments: {
    userId: 'string',
    batchId: 'string',
    amount: 'number',
    paymentMethod: 'string', // 'zaad', 'edahab'
    status: 'string', // 'pending', 'completed', 'failed'
    timestamp: 'timestamp'
  }
};

// Note: For actual implementation, use the Firebase JS SDK to initialize app 
// and create standard refs/collections. 
// Example:
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, addDoc } from 'firebase/firestore';
