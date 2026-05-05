export type Lang = 'en' | 'fr';

export type Dictionary = {
  hero: {
    platinum: {
      tagline: string;
      title: string;
      description: string;
    };
    gold: {
      tagline: string;
      title: string;
      description: string;
    };
    enquireNow: string;
    scroll: string;
    alt: string;
  };
  howWeWork: {
    label: string;
    title: string;
    description: string;
    tiers: string;
  };
  modal: {
    enquire: string;
    chooseApproach: string;
    chooseApproachDesc: string;
    livingCollection: string;
    investmentCollection: string;
    gold: string;
    platinum: string;
    enquireCta: string;
    captureTitle: string;
    captureSubtitle: string;
    submitContact: string;
    submitting: string;
    sendFailed: string;
    thankYouContact: string;
    backToCollections: string;
    requestInfo: string;
    goldLiving: string;
    platinumInvestment: string;
    leaveDetails: string;
    preferredLanguage: string;
    fullName: string;
    email: string;
    phone: string;
    countryCode: string;
    selectInvestmentPlan: string;
    plan1bed: string;
    plan2bed: string;
    plan3bed: string;
    plan3bedPlus: string;
    planShares: string;
    reasonForInvestment: string;
    reasonOccupancy: string;
    reasonShortTerm: string;
    reasonLongTerm: string;
    submit: string;
  };
  footer: {
    explore: string;
    howWeWork: string;
    platinumCollection: string;
    goldCollection: string;
    stayUpdated: string;
    stayUpdatedDesc: string;
    enterEmail: string;
    subscribe: string;
    subscribing: string;
    subscribeFailed: string;
    thankYou: string;
    followUs: string;
    privacyPolicy: string;
    termsOfService: string;
    allRightsReserved: string;
  };
  gallery: {
    loading: string;
    home: string;
    photos: string;
    view: string;
    expandPhotoAria: string;
    lightboxClose: string;
    lightboxPrev: string;
    lightboxNext: string;
  };
  pricing: {
    Kes: string;
    Usd: string;
    from: string;
    tierStudio: string;
    tier1Bed: string;
    tier2Bed: string;
    tier3Bed: string;
    tierTownhouse: string;
    descriptionHeading: string;
    generalAmenitiesHeading: string;
    amenitiesBody: string;
  };
};

const en: Dictionary = {
  hero: {
    platinum: {
      tagline: 'Nyumbani Platinum',
      title: 'Own Nyumbani Platinum Living from $75,000',
      description:
        'Flexible payment plans available crafted to make premium living within reach without compromise. This is your opportunity to secure a home that reflects your standard and builds your long-term value.',
    },
    gold: {
      tagline: 'Nyumbani Gold',
      title: 'Start Smart with Nyumbani Gold from $16,000 | $267/month',
      description:
        "Flexible, interest-free payment plans with zero deposit making it easier than ever to step into property ownership without pressure. Whether you're buying your first home or investing in high-growth areas, Nyumbani Gold puts you ahead.",
    },
    enquireNow: 'Enquire Now',
    scroll: 'Scroll',
    alt: 'Modern luxury home',
  },
  howWeWork: {
    label: 'How we work',
    title: 'Simplifying real estate ownership across Africa',
    description:
      'Nyumbani is a Nairobi-headquartered property brokerage and investment advisory firm dedicated to simplifying real estate ownership for individuals, families, professionals, and diaspora investors across Africa. With the backing of ITM Group—a pan-African business powerhouse with footprints across 23 entities in Africa, Europe, and the UAE—Nyumbani is uniquely positioned to offer trusted, cross-border property solutions to both local and international clients.',
    tiers:
      'Nyumbani operates two client tiers: Nyumbani Platinum (premium, luxury-focused) and Nyumbani Gold (accessible, value-driven), ensuring every market segment can access professional property services aligned with international standards.',
  },
  modal: {
    enquire: 'Enquire',
    chooseApproach: 'Choose your approach',
    chooseApproachDesc:
      'Select Nyumbani Gold or Nyumbani Platinum to continue with your request.',
    livingCollection: 'Living collection',
    investmentCollection: 'Investment collection',
    gold: 'Nyumbani Gold',
    platinum: 'Nyumbani Platinum',
    enquireCta: 'Enquire',
    captureTitle: 'Welcome to Nyumbani',
    captureSubtitle:
      'Share your name and email—we will get in touch with tailored Gold and Platinum options.',
    submitContact: 'Send',
    submitting: 'Sending...',
    sendFailed: 'We could not send your request right now. Please try again.',
    thankYouContact: 'Thank you. Our team will contact you shortly.',
    backToCollections: 'Back to collections',
    requestInfo: 'Request Information',
    goldLiving: 'Nyumbani Gold — Living collection',
    platinumInvestment: 'Nyumbani Platinum — Investment collection',
    leaveDetails: 'Leave your details and our team will contact you shortly.',
    preferredLanguage: 'Preferred Language / Langue',
    fullName: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    countryCode: '+Code',
    selectInvestmentPlan: 'Select Investment Plan',
    plan1bed: '1 bedroom/Studio (USD 16K and below)',
    plan2bed: '2 bedroom (USD 30,000 and below)',
    plan3bed: '3 bedroom (USD 75,000 and below)',
    plan3bedPlus: '3 or more bedrooms (Above USD 75,000)',
    planShares: 'Shares and Bonds etc in Investment',
    reasonForInvestment: 'Reason for Investment',
    reasonOccupancy: 'Occupancy (Living In)',
    reasonShortTerm: 'Short Term Rental (e.g. Airbnb)',
    reasonLongTerm: 'Long Term Rental',
    submit: 'Submit Request',
  },
  footer: {
    explore: 'Explore',
    howWeWork: 'How We Work',
    platinumCollection: 'Platinum Collection',
    goldCollection: 'Gold Collection',
    stayUpdated: 'Stay Updated',
    stayUpdatedDesc:
      'Get the latest investment opportunities delivered to your inbox.',
    enterEmail: 'Enter your email*',
    subscribe: 'Subscribe',
    subscribing: 'Sending...',
    subscribeFailed: 'We could not submit your email right now. Please try again.',
    thankYou: 'Thank you. We have received your email.',
    followUs: 'Follow Us',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    allRightsReserved: 'All rights reserved.',
  },
  gallery: {
    loading: 'Loading…',
    home: 'Home',
    photos: 'photo(s) — click any image for full size',
    view: 'View',
    expandPhotoAria: 'Open full-screen photo',
    lightboxClose: 'Close gallery',
    lightboxPrev: 'Previous photo',
    lightboxNext: 'Next photo',
  },
  pricing: {
    Kes: 'KES',
    Usd: 'USD',
    from: 'from',
    tierStudio: 'Studios',
    tier1Bed: '1 Bedroom',
    tier2Bed: '2 Bedroom',
    tier3Bed: '3 Bedroom',
    tierTownhouse: 'Townhouses',
    descriptionHeading: 'Description',
    generalAmenitiesHeading: 'General Amenities',
    amenitiesBody:
      'CCTV surveillance, chill spots, ample parking, elevators, rooftopia, swimming pool, cascading gardens, community centre, common area generator, borehole water, access control, step-up terraces.',
  },
};

const fr: Dictionary = {
  hero: {
    platinum: {
      tagline: 'Nyumbani Platinum',
      title: 'Possédez Nyumbani Platinum à partir de 75 000 $',
      description:
        'Des plans de paiement flexibles conçus pour rendre la vie premium accessible sans compromis. C’est votre opportunité de sécuriser un foyer qui reflète vos standards et renforce votre valeur à long terme.',
    },
    gold: {
      tagline: 'Nyumbani Gold',
      title: 'Commencez malin avec Nyumbani Gold à partir de 16 000 $ | 267 $/mois',
      description:
        "Des plans de paiement flexibles sans intérêt et sans dépôt, facilitant l'accès à la propriété immobilière sans pression. Que vous achetiez votre première maison ou investissiez dans des zones à forte croissance, Nyumbani Gold vous met en avance.",
    },
    enquireNow: "S'enquérir",
    scroll: 'Défiler',
    alt: 'Maison de luxe moderne',
  },
  howWeWork: {
    label: 'Comment nous travaillons',
    title: "Simplifier la propriété immobilière en Afrique",
    description:
      "Nyumbani est un courtier immobilier et cabinet de conseil en investissement basé à Nairobi, dédié à simplifier la propriété immobilière pour les individus, familles, professionnels et investisseurs de la diaspora à travers l'Afrique. Soutenu par ITM Group — un puissant groupe d'entreprises panafricain présent dans 23 entités en Afrique, en Europe et aux Émirats arabes unis — Nyumbani est idéalement positionné pour offrir des solutions immobilières transfrontalières fiables aux clients locaux et internationaux.",
    tiers:
      "Nyumbani opère deux niveaux de clientèle : Nyumbani Platinum (premium, axé sur le luxe) et Nyumbani Gold (accessible, axé sur la valeur), garantissant que chaque segment du marché peut accéder à des services immobiliers professionnels conformes aux standards internationaux.",
  },
  modal: {
    enquire: "S'enquérir",
    chooseApproach: 'Choisissez votre approche',
    chooseApproachDesc:
      'Sélectionnez Nyumbani Gold ou Nyumbani Platinum pour continuer votre demande.',
    livingCollection: 'Collection résidentielle',
    investmentCollection: "Collection d'investissement",
    gold: 'Nyumbani Gold',
    platinum: 'Nyumbani Platinum',
    enquireCta: "S'enquérir",
    captureTitle: 'Bienvenue chez Nyumbani',
    captureSubtitle:
      'Indiquez votre nom et votre adresse e-mail — nous vous recontacterons avec des offres Gold et Platinum adaptées.',
    submitContact: 'Envoyer',
    submitting: 'Envoi...',
    sendFailed: "Nous n'avons pas pu envoyer votre demande pour le moment. Veuillez reessayer.",
    thankYouContact: 'Merci. Notre équipe vous contactera sous peu.',
    backToCollections: 'Retour aux collections',
    requestInfo: "Demander des informations",
    goldLiving: 'Nyumbani Gold — Collection résidentielle',
    platinumInvestment: "Nyumbani Platinum — Collection d'investissement",
    leaveDetails:
      'Laissez vos coordonnées et notre équipe vous contactera sous peu.',
    preferredLanguage: 'Langue préférée / Language',
    fullName: 'Nom complet',
    email: 'Adresse e-mail',
    phone: 'Numéro de téléphone',
    countryCode: '+Code',
    selectInvestmentPlan: "Sélectionner un plan d'investissement",
    plan1bed: '1 chambre/Studio (16 000 $ et moins)',
    plan2bed: '2 chambres (30 000 $ et moins)',
    plan3bed: '3 chambres (75 000 $ et moins)',
    plan3bedPlus: '3 chambres ou plus (Plus de 75 000 $)',
    planShares: "Actions et obligations dans l'investissement",
    reasonForInvestment: "Raison de l'investissement",
    reasonOccupancy: 'Occupation (Y vivre)',
    reasonShortTerm: 'Location courte durée (ex. Airbnb)',
    reasonLongTerm: 'Location longue durée',
    submit: 'Soumettre la demande',
  },
  footer: {
    explore: 'Explorer',
    howWeWork: 'Comment nous travaillons',
    platinumCollection: 'Collection Platinum',
    goldCollection: 'Collection Gold',
    stayUpdated: 'Restez informé',
    stayUpdatedDesc:
      'Recevez les dernières opportunités d’investissement directement dans votre boîte mail.',
    enterEmail: 'Entrez votre e-mail*',
    subscribe: "S'abonner",
    subscribing: 'Envoi...',
    subscribeFailed: "Nous n'avons pas pu soumettre votre e-mail pour le moment. Veuillez reessayer.",
    thankYou: 'Merci. Nous avons bien reçu votre e-mail.',
    followUs: 'Suivez-nous',
    privacyPolicy: 'Politique de confidentialité',
    termsOfService: "Conditions d'utilisation",
    allRightsReserved: 'Tous droits réservés.',
  },
  gallery: {
    loading: 'Chargement…',
    home: 'Accueil',
    photos: 'photo(s) — cliquez sur une image pour la taille réelle',
    view: 'Voir',
    expandPhotoAria: 'Ouvrir la photo en plein écran',
    lightboxClose: 'Fermer la galerie',
    lightboxPrev: 'Photo précédente',
    lightboxNext: 'Photo suivante',
  },
  pricing: {
    Kes: 'KES',
    Usd: 'USD',
    from: 'à partir de',
    tierStudio: 'Studios',
    tier1Bed: '1 chambre',
    tier2Bed: '2 chambres',
    tier3Bed: '3 chambres',
    tierTownhouse: 'Maisons de ville',
    descriptionHeading: 'Description',
    generalAmenitiesHeading: 'Commodités générales',
    amenitiesBody:
      'Vidéosurveillance, espaces détente, parking généreux, ascenseurs, rooftopia, piscine, jardins en cascade, centre communautaire, groupe électrogène pour les espaces communs, forage, contrôle d’accès, terrasses étagées.',
  },
};

const dictionaries: Record<Lang, Dictionary> = { en, fr };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
