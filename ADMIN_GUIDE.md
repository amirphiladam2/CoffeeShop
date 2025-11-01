# Admin Page Guide - Ice Flavour Management

## What is the Admin Page?

The Admin page (`/admin`) is a special page only accessible to users with admin privileges. It allows you to manage:
- Coffee items (add, edit, delete)
- Ice flavours (add, edit, delete) ← **NEW FEATURE**
- View statistics (users, chats, coffees)

## How to Access the Admin Page

1. **Make sure you're logged in** with an admin account
2. **Look for the "Admin" button** in the navigation menu (top right)
3. **Click "Admin"** to go to `/admin`

If you don't see the "Admin" button, you need admin privileges set up in your database.

## What I Added: Ice Flavour Management

I added a new section to the Admin page where you can manage ice flavours. Here's what was added:

### Location in Admin Page:
```
Admin Dashboard
├── Statistics (Users, Chats, Coffees)
├── 🆕 Ice Flavour Management ← NEW SECTION
└── Coffee Management
```

### What You Can Do:

#### 1. **View Ice Flavours**
   - See all ice flavours in a grid layout
   - Each flavour shows:
     - Color circle (visual indicator)
     - Name (e.g., "Vanilla", "Caramel")
     - Description (if available)
     - Edit and Delete buttons

#### 2. **Add New Ice Flavour**
   - Click the "Add Ice Flavour" button (top right of Ice Flavour section)
   - Fill in the form:
     - **Name**: Required (e.g., "Vanilla", "Chocolate")
     - **Description**: Optional (e.g., "Classic vanilla ice flavour")
     - **Color**: Choose a color (click color picker or enter hex code like #FFF8DC)
   - Click "Add Ice Flavour"

#### 3. **Edit Ice Flavour**
   - Click the Edit button (pencil icon) next to any ice flavour
   - Modify the name, description, or color
   - Click "Update Ice Flavour"

#### 4. **Delete Ice Flavour**
   - Click the Delete button (trash icon) next to any ice flavour
   - Confirm deletion

#### 5. **Assign to Coffees**
   - When adding or editing a coffee, you'll see an "Ice Flavour" dropdown
   - Select an ice flavour from the list (or choose "None")
   - This links the ice flavour to that coffee item

## Step-by-Step: Adding Your First Ice Flavour

1. Go to `/admin` (you must be logged in as admin)
2. Scroll down to find the "Ice Flavour Management" section
3. Click "Add Ice Flavour" button
4. Enter:
   - Name: "Mint Chocolate"
   - Description: "Cool mint with chocolate chips"
   - Color: Pick a green color (#98FF98)
5. Click "Add Ice Flavour"
6. Done! You'll see it appear in the grid below

## Important: Run the Database Migration First!

Before you can use ice flavours, you need to run the database migration:

### Option 1: Supabase Dashboard
1. Go to your Supabase project dashboard
2. Click "SQL Editor"
3. Open the file: `supabase/migrations/20251103000000_ice_flavours.sql`
4. Copy and paste the SQL code
5. Click "Run"

### Option 2: Supabase CLI
```bash
supabase db push
```

## Visual Structure

```
┌─────────────────────────────────────────┐
│  Admin Dashboard                        │
├─────────────────────────────────────────┤
│  📊 Statistics                          │
│  Total Users | Total Chats | Coffees    │
├─────────────────────────────────────────┤
│  🆕 Ice Flavour Management              │
│  [Add Ice Flavour] button              │
│                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐│
│  │ 🟡 Vanilla│ │ 🟤 Caramel│ │ 🟫 Choc  ││
│  │ Edit 🗑️   │ │ Edit 🗑️   │ │ Edit 🗑️   ││
│  └──────────┘ └──────────┘ └──────────┘│
├─────────────────────────────────────────┤
│  ☕ Coffee Management                   │
│  [Add Coffee] button                    │
│  ... existing coffee list ...           │
└─────────────────────────────────────────┘
```

## Troubleshooting

**Q: I don't see the "Admin" button?**
- You need admin privileges. Check your `user_roles` table in Supabase.

**Q: Ice Flavour section is empty?**
- Make sure you ran the database migration first.
- The migration creates 8 default flavours, but you can add more.

**Q: Can't add ice flavours?**
- Check your browser console for errors
- Make sure you have admin role in `user_roles` table

## Example: Complete Workflow

1. **Add Ice Flavours:**
   - Go to Admin → Ice Flavour Management
   - Add: "Strawberry", "Coconut", "Hazelnut"

2. **Add Coffee with Ice Flavour:**
   - Go to Admin → Coffee Management
   - Click "Add Coffee"
   - Fill coffee details
   - In "Ice Flavour" dropdown, select "Strawberry"
   - Save

3. **Result:**
   - Coffee now has an ice flavour assigned
   - Can be used in your shop/cart system

