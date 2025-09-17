const URL_KEYS = [
  'SUPABASE_DATABASE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_DATABASE_URL',
];

const KEY_KEYS = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_ANON_KEY',
  'SUPABASE_PUBLIC_ANON_KEY',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
];

const isBrowser = typeof window !== 'undefined';

/**
 * @template T
 * @param {(name: string) => T | undefined | null} reader
 * @param {string[]} keys
 * @returns {T | undefined}
 */
const readFirstDefined = (reader, keys) => {
  for (const key of keys) {
    const value = reader(key);
    if (value !== undefined && value !== null) {
      return value;
    }
  }
  return undefined;
};

/**
 * @param {{ [key: string]: string | undefined }} envLike
 */
const readFromEnvLike = (envLike) =>
  readFromReader((name) => envLike?.[name]);

/**
 * @param {(name: string) => string | undefined | null} reader
 */
const readFromReader = (reader) => ({
  url: readFirstDefined(reader, URL_KEYS),
  key: readFirstDefined(reader, KEY_KEYS),
});

const finalizeConfig = ({ url, key }) => ({
  url: url ?? '',
  key: key ?? '',
});

const resolveFromDeno = () => {
  if (typeof Deno === 'undefined' || typeof Deno.env === 'undefined') {
    return null;
  }
  const read = (name) => Deno.env.get(name) ?? undefined;
  return finalizeConfig(readFromReader(read));
};

const resolveFromNode = () => {
  if (isBrowser || typeof process === 'undefined' || typeof process.env === 'undefined') {
    return null;
  }
  return finalizeConfig(readFromEnvLike(process.env));
};

const resolveFromBrowserEnv = async () => {
  try {
    const envModule = await import('../assets/js/env.js');
    const env = (envModule && envModule.default) || envModule;
    if (env && typeof env === 'object') {
      return finalizeConfig(readFromEnvLike(env));
    }
  } catch (error) {
    console.warn('Supabase env.js not found; client not initialized', error);
  }
  return finalizeConfig({});
};

export const resolveSupabaseConfigSync = () =>
  resolveFromDeno() ?? resolveFromNode() ?? finalizeConfig({});

export const resolveSupabaseConfig = async () => {
  const denoConfig = resolveFromDeno();
  if (denoConfig) {
    return denoConfig;
  }

  const nodeConfig = resolveFromNode();
  if (nodeConfig) {
    return nodeConfig;
  }

  return resolveFromBrowserEnv();
};

export default resolveSupabaseConfig;
