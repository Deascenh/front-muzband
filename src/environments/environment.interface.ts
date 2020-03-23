export interface EnvironmentInterface {
  production: boolean;
  paired_api_base_url: string;
  jwt_whitelisted_domains: string[];
  jwt_blacklisted_domains: string[];
}
