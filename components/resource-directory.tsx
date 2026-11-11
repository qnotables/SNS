import Link from 'next/link'
import { ExternalLink, Search, Phone, MapPin } from 'lucide-react'
import { resourceCategories, resources, filterResources, type ResourceFilters } from '@/lib/resources'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'

export function ResourceDirectory({ filters }: { filters: ResourceFilters }) {
  const matches = filterResources(resources, filters)
  const areas = [...new Set(resources.map((resource) => resource.serviceArea))]
  return <>
    <form action="/veteran-resources" method="get" className="rounded-sm border border-border bg-card p-6 sm:p-8" aria-label="Search veteran resources">
      <FieldGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_auto] lg:items-end">
        <Field><FieldLabel htmlFor="resource-query">Search resources</FieldLabel><input id="resource-query" name="q" type="search" defaultValue={filters.q} maxLength={120} placeholder="Benefits, housing, education…" className="field-control" /></Field>
        <Field><FieldLabel htmlFor="resource-category">Category</FieldLabel><select id="resource-category" name="category" defaultValue={filters.category} className="field-control"><option value="">All categories</option>{resourceCategories.map((category) => <option key={category}>{category}</option>)}</select></Field>
        <Field><FieldLabel htmlFor="resource-area">Service area</FieldLabel><select id="resource-area" name="area" defaultValue={filters.area} className="field-control"><option value="">All service areas</option>{areas.map((area) => <option key={area}>{area}</option>)}</select></Field>
        <Button type="submit" size="lg"><Search data-icon="inline-start" aria-hidden="true" />Search directory</Button>
      </FieldGroup>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p className="text-sm leading-6 text-muted-foreground">Search and filters work without JavaScript. Bookmark the results to share them.</p><Link href="/veteran-resources" className="inline-flex min-h-11 items-center text-sm font-semibold text-olive underline underline-offset-4">Reset filters</Link></div>
    </form>
    <p id="resource-results" role="status" className="my-7 text-sm font-semibold text-muted-foreground">{matches.length} {matches.length === 1 ? 'resource' : 'resources'} found{filters.q ? ` for “${filters.q}”` : ''}</p>
    {matches.length ? <div className="grid gap-5 lg:grid-cols-2">{matches.map((resource) => <article key={resource.id} className="flex flex-col rounded-sm border border-border bg-card p-6 sm:p-8"><Badge variant="secondary">{resource.category}</Badge><p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{resource.organization}</p><h2 className="mt-2 text-2xl leading-tight text-navy">{resource.name}</h2><p className="mt-4 text-base leading-7 text-muted-foreground">{resource.description}</p><dl className="mt-6 flex flex-col gap-3 border-y border-border py-5 text-sm leading-6"><div><dt className="flex items-center gap-2 font-semibold text-foreground"><MapPin className="size-4" aria-hidden="true" />Service area</dt><dd className="mt-1 text-muted-foreground">{resource.serviceArea}</dd></div><div><dt className="font-semibold text-foreground">Eligibility</dt><dd className="mt-1 text-muted-foreground">{resource.eligibility}</dd></div></dl><div className="mt-5 flex flex-1 flex-wrap items-end justify-between gap-4"><a href={resource.website} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-semibold text-olive underline underline-offset-4">Official website<span className="sr-only"> for {resource.name} (opens in a new tab)</span><ExternalLink className="size-4" aria-hidden="true" /></a>{resource.phone && <a href={`tel:${resource.phone}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground underline underline-offset-4"><Phone className="size-4" aria-hidden="true" />{resource.phoneLabel}</a>}</div><p className="mt-4 text-xs leading-6 text-muted-foreground">Source checked: <time dateTime={resource.verificationDate}>November 10, 2026</time>. Availability and eligibility may change.</p></article>)}</div> : <Empty className="border border-border bg-card"><EmptyHeader><EmptyMedia variant="icon"><Search aria-hidden="true" /></EmptyMedia><EmptyTitle>No matching resources</EmptyTitle><EmptyDescription>Try a broader search, another category, or all service areas.</EmptyDescription></EmptyHeader><EmptyContent><Link href="/veteran-resources" className="font-semibold text-olive underline underline-offset-4">Clear all filters</Link></EmptyContent></Empty>}
  </>
}
