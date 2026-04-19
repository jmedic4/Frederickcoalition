import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xtokipyyqcftwgwcqnby.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0b2tpcHl5cWNmdHdnd2NxbmJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MzUyMzksImV4cCI6MjA5MjExMTIzOX0.h3-cTLpxprC1hgi5e5Z9NzjVzRNVgsdqQ-jYRbLqUEg'

export const supabase = createClient(supabaseUrl, supabaseKey)
