export interface SupabaseConfig {
  url: string;
  key: string;
}

export declare function resolveSupabaseConfig(): Promise<SupabaseConfig>;
export declare function resolveSupabaseConfigSync(): SupabaseConfig;

export default resolveSupabaseConfig;
