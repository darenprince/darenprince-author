const CROWN_DOCS = [
  {
    category: 'Corporate Infrastructure',
    items: [
      { title: 'Company Overview', hash: 'Company%20Overview' },
      { title: 'Executive Positioning', hash: 'Executive%20Positioning' },
      { title: 'Holdings Structure', hash: 'Holdings%20Structure' },
      { title: 'Portfolio Governance', hash: 'Portfolio%20Governance' },
      { title: 'Writing Standards', hash: 'Writing%20Standards' },
      { title: 'Brand Standards', hash: 'Brand%20Standards' },
      { title: 'Communication Standards', hash: 'Communication%20Standards' },
      { title: 'Ecosystem Philosophy', hash: 'Ecosystem%20Philosophy' },
      { title: 'Investor Relations', hash: 'Investor%20Relations' },
      { title: 'Licensing Governance', hash: 'Licensing%20Governance' },
      { title: 'Expansion Roadmap', hash: 'Expansion%20Roadmap' },
      { title: 'Acquisition Strategy', hash: 'Acquisition%20Strategy' }
    ]
  }
];

function filterDocs(query) {
  const normalized = query.toLowerCase().trim();
  return CROWN_DOCS.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.title.toLowerCase().includes(normalized)
    )
  })).filter(section => section.items.length > 0);
}
