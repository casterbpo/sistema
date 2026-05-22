const SUPABASE_URL = 'https://mojqonunykhrdmunojzu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vanFvbnVueWtocmRtdW5vanp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNDQyNzEsImV4cCI6MjA5NDgyMDI3MX0.GWlYgvN7TxEQdjuVoOKZkHZ6b16hruPtih-ykZ_ieEU';

const supa = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let EMPRESA_ID = null;

async function initEmpresa() {
  const eid = sessionStorage.getItem('empresa_ativa');
  if (eid) EMPRESA_ID = eid;
  return EMPRESA_ID;
}

export { supa, EMPRESA_ID, initEmpresa };