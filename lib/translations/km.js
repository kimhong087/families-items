// Khmer translations for the Khmer Living Archive

const km = {
  // Navigation
  nav: {
    home: "ទំព័រដើម",
    browse: "រុករក",
    contribute: "ចូលរួមចំណែក",
    myEntries: "ធាតុរបស់ខ្ញុំ",
    review: "ពិនិត្យ",
    login: "ចូលប្រើ",
    logout: "ចាកចេញ",
    signup: "ចុះឈ្មោះ",
    languageSwitcher: "ភាសា"
  },

  // Common UI elements
  common: {
    search: "ស្វែងរក",
    loading: "កំពុងផ្ទុក...",
    saving: "កំពុងរក្សាទុក...",
    submit: "ដាក់ស្នើ",
    save: "រក្សាទុក",
    cancel: "បោះបង់",
    edit: "កែសម្រួល",
    view: "មើល",
    delete: "លុប",
    confirm: "បញ្ជាក់",
    back: "ត្រឡប់ក្រោយ",
    next: "បន្ទាប់",
    more: "ច្រើនទៀត",
    less: "តិចជាងនេះ",
    close: "បិទ",
    open: "បើក",
    select: "ជ្រើសរើស",
    required: "ទាមទារ",
    optional: "ស្រេចចិត្ត",
    all: "ទាំងអស់",
    none: "គ្មាន"
  },

  // Hero section
  hero: {
    kicker: "មនុស្ស · វត្ថុ · រឿងរ៉ាវ · ជំនាន់",
    title: "រក្សាទុករឿងរ៉ាវខ្មែរសម្រាប់ថ្ងៃស្អែក។",
    searchPlaceholder: "ស្វែងរកតាមចំណងជើង ឈ្មោះខ្មែរ ឬរឿងរ៉ាវ…",
    searchButton: "ស្វែងរក",
    searchLabel: "ស្វែងរកក្នុងបណ្ណាល័យ"
  },

  // Archive section
  archive: {
    title: "រឿងរ៉ាវពីគ្រួសារខ្មែរ",
    countEntries: (count, total) => `${count} ${count === 1 ? 'ធាតុ' : 'ធាតុ'}${total ? ` ក្នុងចំណោម ${total}` : ''}`,
    published: "បានបោះពុម្ព",
    contributeButton: "ចូលរួមចំណែកធាតុ",
    loading: "កំពុងផ្ទុកធាតុ...",
    error: "មិនអាចផ្ទុកធាតុបាន",
    noResults: "រកមិនឃើញធាតុដែលត្រូវគ្នា",
    loadMore: "មើលបន្ថែម"
  },

  // Forms
  form: {
    title: "ចំណងជើង (អង់គ្លេស)",
    titlePlaceholder: "ឧ. ប្រាក់រៀលរបស់លោកយាយដែលលាក់ទុក",
    khmerName: "ចំណងជើង (ខ្មែរ)",
    khmerNamePlaceholder: "ឧ. លុយរៀលរបស់លោកយាយ",
    description: "ការពិពណ៌នា / រឿងរ៉ាវ",
    descriptionPlaceholder: "ប្រាប់ពីរឿងរ៉ាវនៅពីក្រោយធាតុនេះ…",
    descriptionHint: "យ៉ាងហោចណាស់ ១០០ តួអក្សរ។",
    place: "ទីកន្លែងដើម",
    placePlaceholder: "ជ្រើសរើសទីកន្លែង",
    contributor: "អ្នកចូលរួមចំណែក",
    contributorPlaceholder: "ឈ្មោះរបស់អ្នក",
    photo: "រូបថត",
    photoRequired: "ទាមទាររូបថត",
    photoOptional: "រូបថត (ស្រេចចិត្ត)",
    photoDropzone: "ទម្លាក់រូបភាពនៅទីនេះ ឬចុចដើម្បីរើសឯកសារ",
    photoSizeLimit: "អតិបរមា ៥ MB",
    photoTypes: "JPG, PNG, WebP",
    currentPhoto: "រូបថតបច្ចុប្បន្ន",
    removePhoto: "លុបរូបថត",
    submitEntry: "ដាក់ស្នើធាតុ",
    saveChanges: "រក្សាទុកការផ្លាស់ប្តូរ",
    validation: {
      required: "ត្រូវការវាលនេះ",
      minLength: (min) => `ត្រូវតែមានយ៉ាងហោចណាស់ ${min} តួអក្សរ`,
      invalidEmail: "សូមបញ្ចូលអាសយដ្ឋានអ៊ីមែលត្រឹមត្រូវ",
      passwordLength: "ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ ៦ តួអក្សរ",
      passwordMismatch: "ពាក្យសម្ងាត់មិនត្រូវគ្នា"
    }
  },

  // Authentication
  auth: {
    welcome: "សូមស្វាគមន៍",
    subtitle: "ចូលប្រើដើម្បីចូលរួមចំណែក រុករក និងជួយរក្សាទុកប្រវត្តិគ្រួសាររបស់យើង។",
    email: "អាសយដ្ឋានអ៊ីមែល",
    emailPlaceholder: "អ៊ីមែលរបស់អ្នក",
    password: "ពាក្យសម្ងាត់",
    passwordPlaceholder: "ពាក្យសម្ងាត់របស់អ្នក",
    confirmPassword: "បញ្ជាក់ពាក្យសម្ងាត់",
    name: "ឈ្មោះពេញ",
    namePlaceholder: "ឈ្មោះរបស់អ្នក",
    loginButton: "ចូលប្រើ",
    signupButton: "បង្កើតគណនី",
    pendingLogin: "កំពុងចូលប្រើ...",
    pendingSignup: "កំពុងបង្កើតគណនី...",
    invalidCredentials: "អាសយដ្ឋានអ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ",
    accountExists: "មានគណនីដែលប្រើអាសយដ្ឋានអ៊ីមែលនេះរួចហើយ",
    createAccountHint: "ថ្មីនៅក្នុងបណ្ណាល័យ?",
    haveAccountHint: "មានគណនីរួចហើយ?",
    loginLink: "ចូលប្រើ",
    signupLink: "បង្កើតគណនី"
  },

  // Entry pages
  entry: {
    by: "ដោយ",
    submitted: "បានបញ្ជូន",
    status: "ស្ថានភាព",
    actions: "សកម្មភាព",
    confirmDelete: "តើអ្នកប្រាកដថាចង់លុបធាតុនេះទេ?",
    deleteWarning: "សកម្មភាពនេះមិនអាចត្រឡប់ក្រោយបានទេ។",
    deleteSuccess: "បានលុបធាតុដោយជោគជ័យ",
    editEntry: "កែសម្រួលធាតុ",
    viewEntry: "មើលធាតុ"
  },

  // Status badges
  status: {
    pending: "កំពុងរង់ចាំ",
    published: "បានបោះពុម្ព",
    returned: "បានត្រឡប់"
  },

  // Dashboard pages
  dashboard: {
    myEntries: "ធាតុរបស់ខ្ញុំ",
    myEntriesDesc: "មើល និងតាមដានស្ថានភាពនៃការចូលរួមចំណែករបស់អ្នក។",
    reviewQueue: "ការពិនិត្យរង់ចាំ",
    reviewQueueDesc: "ពិនិត្យ និងបោះពុម្ពធាតុដែលបានដាក់ស្នើ។",
    noEntries: "មិនទាន់មានធាតុទេ",
    noEntriesDesc: "អ្នកមិនទាន់បានចូលរួមចំណែកធាតុណាមួយទេ។ ចាប់ផ្តើមដោយការចែករំលែកវត្ថុដែលសំខាន់សម្រាប់គ្រួសារខ្មែររបស់អ្នក។",
    contributeFirst: "ចូលរួមចំណែកធាតុដំបូងរបស់អ្នក",
    nothingStatus: (status) => `គ្មានអ្វី${status}នៅពេលនេះទេ`,
    statusWillAppear: "ធាតុដែលមានស្ថានភាពនេះនឹងលេចឡើងនៅទីនេះ។",
    loadError: "យើងមិនអាចផ្ទុកធាតុរបស់អ្នកបានទេ។ សូមផ្ទុកទំព័រឡើងវិញដើម្បីព្យាយាមម្តងទៀត។",
    filterByStatus: "តម្រងតាមស្ថានភាព"
  },

  // Review system
  review: {
    approve: "យល់ព្រម",
    reject: "ត្រឡប់",
    publish: "បោះពុម្ព",
    messageToAuthor: "សារទៅកាន់អ្នកនិពន្ធ",
    messagePlaceholder: "មតិអ្នកអានស្រេចចិត្តសម្រាប់អ្នកចូលរួមចំណែក...",
    reviewing: "កំពុងពិនិត្យ...",
    approvedSuccess: "ទទួលស្គាល់ និងបោះពុម្ពធាតុដោយជោគជ័យ",
    returnedSuccess: "បានត្រឡប់ធាតុទៅអ្នកនិពន្ធសម្រាប់ការកែសម្រួល",
    emptyQueue: "គ្មានធាតុកំពុងរង់ចាំការពិនិត្យទេ",
    emptyQueueDesc: "ធាតុដែលបានដាក់ស្នើនឹងលេចឡើងនៅទីនេះនៅពេលពួកគេត្រូវបានត្រៀមរួចសម្រាប់ការពិនិត្យ។"
  },

  // Footer
  footer: {
    curatedBy: "រៀបចំដោយ",
    source: "ប្រភព",
    builtBy: "បានស្ថាបនាឡើងនៅក្នុង ICT 340 — Vibe Coding, សាកលវិទ្យាល័យអាមេរិកាំងភ្នំពេញ, សរទរ 2026។"
  },

  // Notices and alerts
  notice: {
    error: "កំហុស",
    success: "ជោគជ័យ",
    info: "ព័ត៌មាន",
    warning: "ការព្រមាន",
    needLogin: "អ្នកត្រូវការចូលប្រើដើម្បីចូលរួមចំណែកធាតុ។",
    contributionSubmitted: "សូមអរគុណសម្រាប់ការចូលរួមចំណែករបស់អ្នក! ធាតុរបស់អ្នកកំពុងរង់ចាំការពិនិត្យ។",
    trackInMyEntries: "តាមដានវានៅក្នុងធាតុរបស់ខ្ញុំ",
    changesSaved: "បានរក្សាទុកការផ្លាស់ប្តូរដោយជោគជ័យ",
    loginRequired: "ទាមទារការចូលប្រើ",
    accessDenied: "អ្នកគ្មានសិទ្ធិចូលប្រើទំព័រនេះទេ។"
  },

  // Empty states
  emptyState: {
    title: "រកមិនឃើញលទ្ធផលទេ",
    description: "សូមព្យាយាមកែសម្រួលការស្វែងរក ឬតម្រងរបស់អ្នក។",
    action: "ព្យាយាមម្តងទៀត"
  }
};

export default km;