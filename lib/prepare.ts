import type { PrepareContext } from '@data-fair/types-catalogs'
import type { MdcCapabilities } from './capabilities.ts'
import type { MdcConfig } from '#types'

export default async ({ catalogConfig, capabilities, secrets }: PrepareContext<MdcConfig, MdcCapabilities>) => {
  // Manage secrets
  const apiKey = catalogConfig.apiKey
  // If the config contains a secretField, and it is not already hidden
  if (apiKey !== '**************************************************') {
    // Hide the secret in the catalogConfig, and copy it to secrets
    secrets.apiKey = apiKey
    catalogConfig.apiKey = '**************************************************'
  }

  return {
    catalogConfig,
    capabilities,
    secrets
  }
}
