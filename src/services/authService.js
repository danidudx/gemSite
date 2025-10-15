const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

console.log('🔧 Environment check:');
console.log('🔧 import.meta.env:', import.meta.env);
console.log('🔧 VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('🔧 Final API_BASE_URL:', API_BASE_URL);

export const syncUserToBackend = async (userData, idToken) => {
  try {
    console.log('🔄 Syncing user to backend...');
    console.log('📤 Request URL:', `${API_BASE_URL}/api/auth/sync-user`);
    console.log('📤 Request Body:', JSON.stringify(userData, null, 2));
    console.log('🔑 ID Token:', idToken ? 'Present' : 'Missing');
    
    const response = await fetch(`${API_BASE_URL}/api/auth/sync-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
      body: JSON.stringify(userData),
    });

    console.log('📥 Response Status:', response.status);
    console.log('📥 Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error Response Body:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Success Response Body:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('❌ Error syncing user to backend:', error);
    throw error;
  }
};

export default {
  syncUserToBackend,
};
