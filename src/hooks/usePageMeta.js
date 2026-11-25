import { useEffect } from 'react'
import { SITE_URL } from '../data/company'
import { PAGES } from '../data/pages'

// Keeps <title>, description and canonical in step with the current route.
export default function usePageMeta(pathname) {
  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
    const page = PAGES[path]
    document.title = page?.title ?? 'Page not found | MSA Transportation Inc'
    const set = (selector, attr, value) => document.querySelector(selector)?.setAttribute(attr, value)
    set('meta[name="robots"]', 'content', page ? 'index, follow' : 'noindex')
    if (!page) return
    set('meta[name="description"]', 'content', page.description)
    set('link[rel="canonical"]', 'href', SITE_URL + path)
  }, [pathname])
}
