// js/storage.js
import { supa } from './supabase-client.js';

const BUCKET_LOGOS = 'logos';
const BUCKET_ANEXOS = 'anexos';

async function uploadFile(file, bucket, path) {
  const { data, error } = await supa.storage
    .from(bucket)
    .upload(path, file, { cacheControl: '3600', upsert: true });

  if (error) throw error;
  return data;
}

function getPublicUrl(bucket, path) {
  const { data } = supa.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadLogo(empresaId, file) {
  const fileExt = file.name.split('.').pop().toLowerCase();
  const fileName = `${empresaId}/logo.${fileExt}`;
  await uploadFile(file, BUCKET_LOGOS, fileName);
  return getPublicUrl(BUCKET_LOGOS, fileName);
}

export async function uploadAnexo(empresaId, lancamentoId, file) {
  const fileExt = file.name.split('.').pop().toLowerCase();
  const timestamp = Date.now();
  const fileName = `${empresaId}/lancamentos/${lancamentoId}/${timestamp}-${file.name}`;
  
  await uploadFile(file, BUCKET_ANEXOS, fileName);
  
  return {
    id: timestamp.toString(),
    nome: file.name,
    url: getPublicUrl(BUCKET_ANEXOS, fileName),
    tamanho: file.size,
    tipo: file.type,
    criadoEm: new Date().toISOString()
  };
}

export function removerAnexoLocal(index) {
  // Função auxiliar para UI
}