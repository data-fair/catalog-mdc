import type CatalogPlugin from '@data-fair/types-catalogs'
import { configSchema, assertConfigValid, type MdcConfig } from '#types'
import { type MdcCapabilities, capabilities } from './lib/capabilities.ts'

const plugin: CatalogPlugin<MdcConfig, MdcCapabilities> = {
  async prepare (context) {
    const prepare = (await import('./lib/prepare.ts')).default
    return prepare(context)
  },

  async publishDataset (context) {
    const { publishDataset } = await import('./lib/publications.ts')
    return publishDataset(context)
  },

  async deletePublication (context) {
    const { deletePublication } = await import('./lib/publications.ts')
    return deletePublication(context)
  },

  metadata: {
    title: 'MyDataCatalogue',
    capabilities
  },

  configSchema,
  assertConfigValid
}
export default plugin
