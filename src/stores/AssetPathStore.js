import { defineStore } from "pinia"

const join = (...parts) =>
  parts
    .filter(Boolean)
    .map((part, index) =>
      index === 0 ? part.replace(/\/+$/, "") : part.replace(/^\/+/, "").replace(/\/+$/, "")
    )
    .join("/")

const isAbsoluteUrl = (value = "") => /^https?:\/\//i.test(value)

export const useAssetPathStore = defineStore("AssetPathStore", () => {
  const s3Base = join(import.meta.env.VITE_APP_S3_PROD_URL)

  const buildThumbUrl = (path = "") => {
    const normalizedPath = (path ?? "").toString().trim()
    if (!normalizedPath) return ""
    if (isAbsoluteUrl(normalizedPath)) return normalizedPath
    return new URL(`../assets/images/thumbnails/${normalizedPath}`, import.meta.url).href
  }
  const buildIllustrationUrl = (filename = "") => join(s3Base, "illustration", filename)
  const buildChartUrl = (filename = "") => join(s3Base, "charts", filename)

  const resolveAssetPath = (path = "", builder = () => "") => {
    const normalizedPath = (path ?? "").toString().trim()
    if (!normalizedPath) return ""
    if (isAbsoluteUrl(normalizedPath)) return normalizedPath
    return builder(normalizedPath)
  }

  const resolveIllustrationAsset = (path = "") =>
    resolveAssetPath(path, (value) => buildIllustrationUrl(value))

  const resolveChartAsset = (path = "") =>
    resolveAssetPath(path, (value) => buildChartUrl(value))

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
    buildChartUrl,
    buildSeriesUrl,
    resolveIllustrationAsset,
    resolveChartAsset
  }
})
