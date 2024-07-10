import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ogocpvpthdgelmqtyhey.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nb2NwdnB0aGRnZWxtcXR5aGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2MDg1MjAsImV4cCI6MjAzNjE4NDUyMH0.NDreEwKGDXdxnWSSpIg_sg9gd018NCcOL9wMcgfDuuo'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;