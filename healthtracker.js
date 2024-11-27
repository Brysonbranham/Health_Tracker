// Ensure Supabase is properly loaded
if (typeof supabase === 'undefined') {
    console.error('Supabase client is not available.');
  } else {
    // Use your provided Supabase project URL and API Key
    const SUPABASE_URL = 'https://qzshqqgbpnxxvgpsjibg.supabase.co'; 
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6c2hxcWdicG54eHZncHNqaWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMzAyOTAsImV4cCI6MjA0NzgwNjI5MH0.R2q6s3q1hV-yFoy8g5Vc7sD9AtElb4s9L4laHcptBIE';
  
    // Initialize Supabase client correctly
    const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  
    // Elements
    const workoutCountElement = document.getElementById('workout-count');
    const increaseBtn = document.getElementById('increase-btn');
    const decreaseBtn = document.getElementById('decrease-btn');
  
    // Function to fetch the current workout count
    async function getWorkoutCount() {
      const { data, error } = await supabase
        .from('workouts')
        .select('workout')
        .eq('session_id', 'default_session')
        .single(); // Fetch single row
  
      if (error) {
        console.error('Error fetching workout count:', error);
        return;
      }
  
      // Display current workout count
      workoutCountElement.textContent = `Current Workouts: ${data.workout || 0}`;
    }
  
    // Function to update the workout count (increment or decrement)
    async function updateWorkoutCount(change) {
      const { data, error } = await supabase
        .from('workouts')
        .upsert(
          {
            session_id: 'default_session',
            workout: supabase.raw('workout + ?', [change]),
          },
          { onConflict: ['session_id'] } // Use session_id as unique identifier
        );
  
      if (error) {
        console.error('Error updating workout count:', error);
        return;
      }
  
      // Refresh the workout count display
      getWorkoutCount();
    }
  
    // Initialize workout count
    getWorkoutCount();
  
    // Event listeners for buttons
    increaseBtn.addEventListener('click', () => {
      updateWorkoutCount(1); // Add one workout
    });
  
    decreaseBtn.addEventListener('click', () => {
      updateWorkoutCount(-1); // Remove one workout
    });
  }
  