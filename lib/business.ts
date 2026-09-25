// Business data shared by structured data (JSON-LD) across the site.

export const ORGANIZATION_ID = 'https://www.pbix.pl/#organization';

// TODO: fill in once the Poznań virtual office is chosen. Leave streetAddress
// empty and the address is omitted from JSON-LD entirely.
export const BUSINESS_ADDRESS = {
  streetAddress: '',
  postalCode: '',
  addressLocality: 'Poznań',
  addressRegion: 'wielkopolskie',
  addressCountry: 'PL',
};

export function postalAddressSchema() {
  if (!BUSINESS_ADDRESS.streetAddress) return undefined;
  return { '@type': 'PostalAddress', ...BUSINESS_ADDRESS };
}
