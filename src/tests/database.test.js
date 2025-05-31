const { getDb } = require('../config/firebase');

async function testDatabaseConnection() {
  try {
    console.log('Testing database connection...');
    
    // Get database instance
    const db = getDb();
    
    // Try to fetch a single document from the animals collection
    const testQuery = await db.collection('animals').limit(1).get();
    
    console.log('✅ Successfully connected to Firebase');
    console.log(`Found ${testQuery.size} document(s)`);
    
    // Test write operation
    const testDoc = await db.collection('_test_connection').add({
      timestamp: new Date(),
      test: 'connectivity'
    });
    console.log('✅ Write operation successful');
    
    // Cleanup test document
    await testDoc.delete();
    console.log('✅ Cleanup successful');
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Stack trace:', error.stack);
    return false;
  }
}

// Run the test
testDatabaseConnection()
  .then(success => {
    if (!success) {
      process.exit(1);
    }
    process.exit(0);
  });