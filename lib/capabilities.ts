import type { Capability } from '@data-fair/types-catalogs'

export const capabilities = [
  'publication',
  'createFolderInRoot',
] satisfies Capability[]

export type MdcCapabilities = typeof capabilities
export default capabilities
