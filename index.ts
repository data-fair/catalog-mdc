import type CatalogPlugin from '@data-fair/types-catalogs'
import { configSchema, assertConfigValid, type MdcConfig } from '#types'
import { type MdcCapabilities, capabilities } from './lib/capabilities.ts'

const plugin: CatalogPlugin<MdcConfig, MdcCapabilities> = {
  async prepare (context) {
    const prepare = (await import('./lib/prepare.ts')).default
    return prepare(context)
  },

  async list (context) {
    // this should not be required in our case, a typing problem ?
    return { count: 0, results: [], path: [] }
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
    description: 'Publiez des jeux de données vers une instance de MyDataCatalogue',
    capabilities
  },

  configSchema,
  assertConfigValid
}
export default plugin
