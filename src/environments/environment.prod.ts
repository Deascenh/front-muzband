import {EnvironmentInterface} from './environment.interface';

export const environment: EnvironmentInterface = {
  production: true,
  paired_api_base_url: 'https://muzband-api.deascenh.fr/api/',
  jwt_whitelisted_domains: ['muzband-api.deascenh.fr'],
  jwt_blacklisted_domains: [],
};
