import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Clear Home For You'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
