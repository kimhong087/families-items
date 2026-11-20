// English translations for the Khmer Living Archive

const en = {
  // Navigation
  nav: {
    home: "Home",
    browse: "Browse",
    contribute: "Contribute",
    myEntries: "My entries",
    review: "Review",
    login: "Log in",
    logout: "Log out",
    signup: "Sign up",
    languageSwitcher: "Language"
  },

  // Common UI elements
  common: {
    search: "Search",
    loading: "Loading...",
    saving: "Saving...",
    submit: "Submit",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    view: "View",
    delete: "Delete",
    confirm: "Confirm",
    back: "Back",
    next: "Next",
    more: "More",
    less: "Less",
    close: "Close",
    open: "Open",
    select: "Select",
    required: "Required",
    optional: "Optional",
    all: "All",
    none: "None"
  },

  // Hero section
  hero: {
    kicker: "People · Objects · Stories · Generations",
    title: "Preserving Khmer stories for tomorrow.",
    searchPlaceholder: "Search by title, Khmer name, or story…",
    searchButton: "Search",
    searchLabel: "Search the archive"
  },

  // Archive section
  archive: {
    title: "Stories from Khmer Families",
    countEntries: (count, total) => `${count} ${count === 1 ? 'entry' : 'entries'}${total ? ` of ${total}` : ''}`,
    published: "published",
    contributeButton: "Contribute an entry",
    loading: "Loading entries...",
    error: "Failed to load entries",
    noResults: "No matching entries found",
    loadMore: "Load more"
  },

  // Forms
  form: {
    title: "Title (English)",
    titlePlaceholder: "e.g. Grandma's Hidden Riels",
    khmerName: "Title (Khmer)",
    khmerNamePlaceholder: "ឧ. លុយរៀលរបស់លោកយាយ",
    description: "Description / Story",
    descriptionPlaceholder: "Tell the story behind this item…",
    descriptionHint: "At least 100 characters.",
    place: "Place of origin",
    placePlaceholder: "Select a place",
    contributor: "Contributor",
    contributorPlaceholder: "Your name",
    photo: "Photo",
    photoRequired: "A photo is required",
    photoOptional: "Photo (optional)",
    photoDropzone: "Drop an image here or click to browse",
    photoSizeLimit: "Maximum 5 MB",
    photoTypes: "JPG, PNG, WebP",
    currentPhoto: "Current photo",
    removePhoto: "Remove photo",
    submitEntry: "Submit entry",
    saveChanges: "Save changes",
    validation: {
      required: "This field is required",
      minLength: (min) => `Must be at least ${min} characters`,
      invalidEmail: "Please enter a valid email address",
      passwordLength: "Password must be at least 6 characters",
      passwordMismatch: "Passwords do not match"
    }
  },

  // Authentication
  auth: {
    welcome: "Welcome",
    subtitle: "Sign in to contribute, explore, and help preserve our family histories.",
    email: "Email address",
    emailPlaceholder: "your@email.com",
    password: "Password",
    passwordPlaceholder: "Your password",
    confirmPassword: "Confirm password",
    name: "Full name",
    namePlaceholder: "Your name",
    loginButton: "Sign in",
    signupButton: "Create account",
    pendingLogin: "Logging in...",
    pendingSignup: "Creating account...",
    invalidCredentials: "Invalid email or password",
    accountExists: "An account with this email already exists",
    createAccountHint: "New to the archive?",
    haveAccountHint: "Already have an account?",
    loginLink: "Log in",
    signupLink: "Create an account"
  },

  // Entry pages
  entry: {
    by: "by",
    submitted: "Submitted",
    status: "Status",
    actions: "Actions",
    confirmDelete: "Are you sure you want to delete this entry?",
    deleteWarning: "This action cannot be undone.",
    deleteSuccess: "Entry deleted successfully",
    editEntry: "Edit entry",
    viewEntry: "View entry"
  },

  // Status badges
  status: {
    pending: "Pending",
    published: "Published",
    returned: "Returned"
  },

  // Dashboard pages
  dashboard: {
    myEntries: "My Entries",
    myEntriesDesc: "View and track the status of your contributions.",
    reviewQueue: "Review Queue",
    reviewQueueDesc: "Review and publish submitted entries.",
    noEntries: "No entries yet",
    noEntriesDesc: "You haven't contributed any entries yet. Start by sharing an object that matters to your Khmer family.",
    contributeFirst: "Contribute your first entry",
    nothingStatus: (status) => `Nothing ${status} right now`,
    statusWillAppear: "Entries with this status will appear here.",
    loadError: "We couldn't load your entries. Please refresh the page to try again.",
    filterByStatus: "Filter by status"
  },

  // Review system
  review: {
    approve: "Approve",
    reject: "Return",
    publish: "Publish",
    messageToAuthor: "Message to author",
    messagePlaceholder: "Optional feedback for the contributor...",
    reviewing: "Reviewing...",
    approvedSuccess: "Entry approved and published",
    returnedSuccess: "Entry returned to author for revisions",
    emptyQueue: "No entries waiting for review",
    emptyQueueDesc: "Submitted entries will appear here when they're ready for review."
  },

  // Footer
  footer: {
    curatedBy: "Curated by",
    source: "Source",
    builtBy: "Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall 2026."
  },

  // Notices and alerts
  notice: {
    error: "Error",
    success: "Success",
    info: "Info",
    warning: "Warning",
    needLogin: "You need to log in to contribute an entry.",
    contributionSubmitted: "Thank you for your contribution! Your entry is waiting for review.",
    trackInMyEntries: "Track it in My entries",
    changesSaved: "Changes saved successfully",
    loginRequired: "Login required",
    accessDenied: "You don't have permission to access this page."
  },

  // Empty states
  emptyState: {
    title: "No results found",
    description: "Try adjusting your search or filters.",
    action: "Try again"
  }
};

export default en;