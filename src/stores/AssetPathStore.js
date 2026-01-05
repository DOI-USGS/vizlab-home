import { defineStore } from "pinia"

const join = (...parts) =>
  parts
    .filter(Boolean)
    .map((part, index) =>
      index === 0 ? part.replace(/\/+$/, "") : part.replace(/^\/+/, "").replace(/\/+$/, "")
    )
    .join("/")

export const useAssetPathStore = defineStore("AssetPathStore", () => {
  const s3Base = join(import.meta.env.VITE_APP_S3_PROD_URL)

  const buildThumbUrl = (path = "") => join(s3Base, "thumbnails", path)
  const buildIllustrationUrl = (filename = "") => join(s3Base, "illustration", filename)

  const buildSeriesUrl = (folder = "", filename = "") => {
    if (folder && filename) return join(s3Base, folder, filename)
    if (folder) return join(s3Base, folder)
    if (filename) return join(s3Base, filename)
    return s3Base
  }

  return {
    s3Base,
    buildThumbUrl,
    buildIllustrationUrl,
    buildSeriesUrl
  }
})
