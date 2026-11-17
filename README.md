# Khmer Families's Items Archive

A living digital archive that preserves meaningful objects, photos, and stories from Khmer families across generations.

## What this is

This is a community archive built to collect and preserve stories behind meaningful objects owned by Khmer families. The archive contains personal items like grandmother's krama, old ceramic pots, family portraits, traditional betel sets, and hand-woven containers—each with a story that connects to Cambodia's living history. Visitors can browse published entries, logged-in users can contribute their own family stories, and appointed reviewers ensure quality before publication. Built as the capstone project for ICT 340 at the American University of Phnom Penh, this archive demonstrates a complete web application with authentication, data management, and community review workflows.

## Who it's for

This archive is built for Cambodian families and diaspora communities who want to preserve their material heritage. Every design decision centers Khmer users: the interface renders Khmer text with proper font stacks (Noto Sans/Serif Khmer), works on mobile phones first, loads quickly on slower connections, and credits every source by name with permission. Photos are optimized for bandwidth, forms validate Khmer characters, and search works across both English and Khmer fields. The contributor-first approach means anyone with a family story can participate, with clear status tracking for their submissions.

## How it works

- **Frontend**: Next.js 15 (App Router) deployed on Vercel
- **Backend & Auth**: Supabase with Row Level Security (RLS)
- **Database**: PostgreSQL with three core tables:
  - `entries`: Stores all archive items with columns for title (English/Khmer), description, contributor, place, photo URL, owner (user ID), status (pending/published/returned), and timestamps
  - `auth.users`: Supabase-managed user accounts
  - Custom reviewer system through `is_reviewer()` RPC function
- **Storage**: Supabase Storage for uploaded photos
- **Entry workflow**: 
  1. **Pending**: New contributions waiting for review (visible only to owner and reviewers)
  2. **Published**: Approved entries visible to everyone on the homepage
  3. **Returned**: Entries sent back for revision with feedback (visible only to owner)
- **Permissions**:
  - Anyone can browse published entries
  - Logged-in users can create new entries (auto status: pending)
  - Users can edit/delete only their own entries
  - Reviewers can publish or return pending entries via `review_entry()` RPC
  - Database RLS policies enforce all access rules at the data layer

## Security decisions

**The gatekeeper**: The `review_entry()` database function is the single point where entries change from pending to published or returned. It lives in the database (not the API) so no hidden "Publish" button in the UI can bypass it.

**Reviewer decisions implemented**:
1. **Returned entries show clear status**: When an entry is returned, contributors see "Returned for revision" with a prominent edit button—no vague error messages.
2. **Reviewers cannot retract publications**: Once published, an entry stays published. Reviewers focus on quality control, not content moderation.
3. **Contributors see their pending entries in search**: The "My entries" page shows all statuses; homepage search shows only published entries to avoid confusing partial visibility.
4. **Photo uploads are user-scoped**: Each user's photos go to their own storage folder; deleted entries clean up their photos.

These choices prioritize contributor trust—clear statuses, no silent rejections, and permanent attribution once published.

## AI use

| Model | Task | Verdict |
|-------|------|---------|
| Cline (DeepSeek Coder) | Sprint 3 implementation: Review interface, `review_entry()` RPC integration, pending entries queue | **Kept with verification** - Ran locally, tested with multiple accounts, confirmed RLS prevented unauthorized publishing |
| Cline (DeepSeek Coder) | Sprint 2 implementation: Supabase setup, authentication flows, entry submission with photo upload | **Rewritten partially** - Simplified form validation, added better error messages for photo upload failures |
| Cline (Claude 3.5 Sonnet) | Initial project setup: File structure, component patterns, CSS design system | **Kept as written** - Established consistent patterns followed throughout development |
| ChatGPT 4o | Khmer translation assistance for UI elements and example entries | **Verified with native speaker** - Cross-checked family-provided translations |

All AI-generated code was tested: logged in as different users (contributor, reviewer, stranger), attempted edge cases (edit others' entries, publish without permission), and verified database RLS blocked unauthorized actions. The security model was validated by checking browser console and network tabs during testing.

## Sources and credits

Every entry comes from a real family, credited with permission:

1. **Grandma's Hidden Riels** - Mengheng's family in Kompong Cham
2. **Dad's Old Music Player** - Kimhab's father in Phnom Penh  
3. **A Meaningful Coinbox** - Sun Savuth's grandmother in Phnom Penh
4. **Portrait of a young woman** - Roath Kimhong's grandmother
5. **Carved Wooden Container** - Prak Sophors' grandparents in Phnom Penh
6. **Grandmother's Krama** - Chan Sophea's family in Battambang Province
7. **Old Clay Cooking Pot** - Nou Vireak's grandmother in Takeo Province
8. **Grandmother's Sampot Hol** - Dith Vannak's great-grandmother in Takeo Province
9. **Grandpa's Betel Box** - Seng Chhaya's grandfather in Kampot Province

All photos were provided by the contributing families or taken by the curator with permission. Stock photos were not used; every image shows the actual object described.

## Running it locally

```bash
# Clone and install
git clone https://github.com/kimhong087/families-items.git
cd families-items
npm install

# Set up environment variables
# Create .env.local with:
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key

# Run development server
npm run dev
```

**Required environment variables** (values in Vercel/database):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

**Important**: The publishable key is intentionally public—it's designed to be exposed in browser code. No secrets are committed to the repository; all sensitive values live in `.env.local` and Vercel environment variables.

## Submission checklist

- Live URL loads logged out and shows published entries only: yes, [GitHub repository](https://github.com/kimhong087/families-items)
- A stranger cannot publish their own entry through the page or the console: yes, tested (November 10, 2026)
- Logged out, the API returns nothing pending or returned: yes, tested (November 10, 2026)
- Contributors can edit and delete only their own entries: yes
- No secrets anywhere in the repo history: yes, checked with `git log -p` search for keys/tokens
- At least eight real entries, each with a credited source: yes, 9 entries
- Khmer renders on every screen a user meets, including the queue: yes
- Works at phone width: yes, tested on Chrome DevTools (320px-768px)
- No test entries, lorem ipsum or TODO comments in shipped pages: yes
- No console errors on the main pages: yes
- jesseorndorff is a collaborator on this repo: yes
- Supabase project restored and awake on (date): November 10, 2026
- Demo video link opens in a private window: yes, [Video submission](https://drive.google.com/file/d/1D9Kqk4bZRzNl9Uv8Z8vj7p6qX2wY6tTg/view?usp=sharing)
- Reflection pasted in the Canvas submission: yes
- Posted in the Show Your Archive discussion: yes
- Q&A slot booked for (date and time): November 12, 2026, 2:00 PM
