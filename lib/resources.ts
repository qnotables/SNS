export const resourceCategories = ['VA Benefits', 'Housing and Homelessness', 'Mental Health and Crisis Assistance', 'Employment and Career Development', 'Education and Training', 'Financial Assistance', 'Family Support', 'Community Organizations'] as const
export type ResourceCategory = typeof resourceCategories[number]
export type VeteranResource = {
  id: string
  organization: string
  name: string
  description: string
  category: ResourceCategory
  serviceArea: string
  eligibility: string
  website: string
  phone?: string
  phoneLabel?: string
  verificationDate: string
  sourceUrl: string
}

const checked = '2026-11-10'
export const resources: VeteranResource[] = [
  { id: 'va-disability', organization: 'U.S. Department of Veterans Affairs', name: 'VA Disability Compensation', category: 'VA Benefits', description: 'Official information on service-connected disability compensation, eligibility, applications, and accredited claims assistance.', serviceArea: 'Nationwide', eligibility: 'Veterans with qualifying service-connected conditions; VA determines eligibility.', website: 'https://www.va.gov/disability/', sourceUrl: 'https://www.va.gov/disability/', phone: '8008271000', phoneLabel: '800-827-1000', verificationDate: checked },
  { id: 'va-homeless', organization: 'U.S. Department of Veterans Affairs', name: 'VA Homeless Programs', category: 'Housing and Homelessness', description: 'A free, confidential, 24/7 national call center connecting veterans who are homeless or at risk with VA housing and support resources.', serviceArea: 'Nationwide', eligibility: 'Veterans experiencing homelessness or at risk, and people seeking help on their behalf. Individual program rules vary.', website: 'https://www.va.gov/homeless/', sourceUrl: 'https://www.va.gov/homeless/', phone: '8774243838', phoneLabel: '877-424-3838', verificationDate: checked },
  { id: 'veterans-crisis-line', organization: 'Veterans Crisis Line', name: 'Veterans Crisis Line', category: 'Mental Health and Crisis Assistance', description: 'Free, confidential support, 24/7. Dial 988, then press 1, text 838255, or use the official online chat.', serviceArea: 'Nationwide', eligibility: 'Veterans, service members, National Guard and Reserve members, and those who support them. VA enrollment is not required.', website: 'https://www.veteranscrisisline.net/', sourceUrl: 'https://www.veteranscrisisline.net/', phone: '988', phoneLabel: '988, then press 1', verificationDate: checked },
  { id: 'va-mental-health', organization: 'U.S. Department of Veterans Affairs', name: 'VA Mental Health Services', category: 'Mental Health and Crisis Assistance', description: 'Information about mental health care, counseling, and routes to support through VA and Vet Centers.', serviceArea: 'Nationwide', eligibility: 'Service-specific rules apply; some support is available without VA health care enrollment. Ask VA about your circumstances.', website: 'https://www.va.gov/health-care/health-needs-conditions/mental-health/', sourceUrl: 'https://www.va.gov/health-care/health-needs-conditions/mental-health/', verificationDate: checked },
  { id: 'va-careers', organization: 'U.S. Department of Veterans Affairs', name: 'VA Careers and Employment', category: 'Employment and Career Development', description: 'Explore Veteran Readiness and Employment, career planning, counseling, and employment support.', serviceArea: 'Nationwide', eligibility: 'Requirements vary by program, service history, and disability status. Check official criteria before applying.', website: 'https://www.va.gov/careers-employment/', sourceUrl: 'https://www.va.gov/careers-employment/', verificationDate: checked },
  { id: 'va-education', organization: 'U.S. Department of Veterans Affairs', name: 'VA Education and Training Benefits', category: 'Education and Training', description: 'Official GI Bill information, education eligibility, training options, and application guidance.', serviceArea: 'Nationwide', eligibility: 'Eligible veterans, service members, and qualified family members; benefits depend on the specific program.', website: 'https://www.va.gov/education/', sourceUrl: 'https://www.va.gov/education/', phone: '8884424551', phoneLabel: '888-442-4551', verificationDate: checked },
  { id: 'va-pension', organization: 'U.S. Department of Veterans Affairs', name: 'VA Pension Benefits', category: 'Financial Assistance', description: 'Information about needs-based pension benefits and additional support such as Aid and Attendance or Housebound benefits.', serviceArea: 'Nationwide', eligibility: 'Some wartime veterans and survivors qualify. Service, income, net worth, age, disability, and other rules apply; VA determines eligibility.', website: 'https://www.va.gov/pension/', sourceUrl: 'https://www.va.gov/pension/', verificationDate: checked },
  { id: 'va-family', organization: 'U.S. Department of Veterans Affairs', name: 'VA Family and Caregiver Benefits', category: 'Family Support', description: 'Information for spouses, dependents, survivors, and caregivers about health care, education, financial support, and caregiver services.', serviceArea: 'Nationwide', eligibility: 'Eligible spouses, dependents, survivors, and caregivers. Each benefit has its own requirements.', website: 'https://www.va.gov/family-and-caregiver-benefits/', sourceUrl: 'https://www.va.gov/family-and-caregiver-benefits/', phone: '8552603274', phoneLabel: '855-260-3274 (caregiver support)', verificationDate: checked },
  { id: 'va-crrc', organization: 'U.S. Department of Veterans Affairs', name: 'Community Resource and Referral Centers', category: 'Community Organizations', description: 'Official directory of local centers connecting veterans with community-based housing, health, career, and VA/non-VA services.', serviceArea: 'Local centers (see provider directory)', eligibility: 'Veterans who are homeless or at risk of homelessness. Contact a listed center for local availability and requirements.', website: 'https://www.va.gov/homeless/crrc.asp', sourceUrl: 'https://www.va.gov/homeless/crrc.asp', verificationDate: checked },
]

export type ResourceFilters = { q?: string; category?: string; area?: string }
export function filterResources(entries: VeteranResource[], { q = '', category = '', area = '' }: ResourceFilters) {
  const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean)
  return entries.filter((entry) => (!category || entry.category === category) && (!area || entry.serviceArea === area) && terms.every((term) => [entry.name, entry.organization, entry.description, entry.eligibility, entry.category].join(' ').toLowerCase().includes(term)))
}
