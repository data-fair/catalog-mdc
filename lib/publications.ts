import type { CatalogPlugin } from '@data-fair/types-catalogs'
import type { MdcConfig } from '#types'

import axios from '@data-fair/lib-node/axios.js'
import httpError from '@data-fair/lib-utils/http-errors.js'

function datasetPageDesc (dataset: Record<string, any>) {
  const desc = dataset.description ? dataset.description + '\n\n' : ''
  return desc + 'Cette source possède un jeu de données consultable dans l\'onglet "Données".'
}

export const publishDataset: CatalogPlugin<MdcConfig>['publishDataset'] = async (context) => {
  const source = {
    id: `df-${context.dataset.id}`, // maybe weird to impose an id, but MDC is not very good with undefined ids
    title: context.dataset.title || context.dataset.file?.name,
    type: 'tabular-dataset',
    format: 'data-fair',
    description: datasetPageDesc(context.dataset),
    attributes: context.dataset.schema.filter((f: any) => !f['x-calculated']).map((a: any) => ({ id: a.key })),
    recordCount: context.dataset.count || 0,
    dataFairDatasetId: context.dataset.id,
    tags: {
      keyword: [{ id: 'data-fair', title: 'Données Data Fair', type: 'keyword' }]
    }
  }
  const res = await axios.post(
    `${context.catalogConfig.url}/api/v1/sources`,
    source, { headers: { 'x-apiKey': context.secrets.apiKey } })
  if (!res.data.id || typeof res.data.id !== 'string') {
    throw httpError(501, `Erreur lors de l'envoi à ${context.catalogConfig.url} : le format de retour n'est pas correct.`)
  }
  context.publication.remoteFolder = {
    id: source.id,
    title: source.title,
    url: `${context.catalogConfig.url}/sources/${res.data.id}/view`
  }
  return context.publication
}

export const deletePublication: CatalogPlugin<MdcConfig>['deletePublication'] = async (context) => {
  if (!context.secrets.apiKey) throw new Error('Source deletion is not supported')
}
