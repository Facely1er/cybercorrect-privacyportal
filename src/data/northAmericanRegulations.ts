export interface Regulation {
  id: string;
  name: string;
  fullName: string;
  description?: string;
  coverage?: string;
}

export const northAmericanRegulations: Regulation[] = [
  { 
    id: 'ferpa', 
    name: 'FERPA', 
    fullName: 'Family Educational Rights and Privacy Act',
    description: 'Federal law protecting student education records',
    coverage: 'All students and families'
  },
  { 
    id: 'coppa', 
    name: 'COPPA', 
    fullName: 'Children\'s Online Privacy Protection Act',
    description: 'Federal law protecting children under 13 online',
    coverage: 'Students under 13'
  },
  { 
    id: 'ccpa', 
    name: 'CCPA', 
    fullName: 'California Consumer Privacy Act',
    description: 'California state privacy law',
    coverage: 'California residents'
  },
  { 
    id: 'bipa', 
    name: 'BIPA', 
    fullName: 'Biometric Information Privacy Act',
    description: 'Illinois biometric data protection law',
    coverage: 'Illinois biometric data'
  },
  { 
    id: 'shield', 
    name: 'SHIELD', 
    fullName: 'Stop Hacks and Improve Electronic Data Security Act',
    description: 'New York data security law',
    coverage: 'New York residents'
  },
  { 
    id: 'cpra', 
    name: 'CPRA', 
    fullName: 'California Privacy Rights Act',
    description: 'Enhanced California privacy protections',
    coverage: 'California residents'
  },
  { 
    id: 'pipeda', 
    name: 'PIPEDA', 
    fullName: 'Personal Information Protection and Electronic Documents Act',
    description: 'Canadian federal privacy law',
    coverage: 'Canadian residents'
  },
  { 
    id: 'gdpr', 
    name: 'GDPR', 
    fullName: 'General Data Protection Regulation',
    description: 'European Union privacy regulation',
    coverage: 'EU data subjects'
  }
];