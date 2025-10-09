# SMTP Configuration Guide

## Overview

The Sell Your Car form posts to the `/api/sell-inquiry` endpoint, which uses Nodemailer to deliver an email (with image attachments) to `amit.aditaya99@gmail.com`. To enable this in production, configure an SMTP provider for the domain you purchased on Namecheap and expose the credentials to the deployment environment through environment variables.

## Namecheap Email Setup

1. **Choose or activate an email service**
   - If you have Namecheap Private Email, log in to the [Namecheap dashboard](https://ap.www.namecheap.com/) → "Private Email" → create a mailbox (e.g. `notifications@yourdomain.com`).
   - Alternatively, connect a third-party provider (e.g. Google Workspace, Zoho). The following steps assume Namecheap Private Email.

2. **Create DNS records for the domain**
   - Navigate to `Domain List` → `Manage` → `Advanced DNS`.
   - Add/update MX records pointing to `mx1.privateemail.com` (priority 10) and `mx2.privateemail.com` (priority 10).
   - Add the SPF TXT record: `v=spf1 include:spf.privateemail.com ~all`.
   - Enable DKIM in the Private Email dashboard to generate a DKIM TXT record and add it in Advanced DNS. Propagation can take up to 24 hours.

3. **Verify mailbox access**
   - From the Private Email dashboard, confirm you can sign in to the mailbox via Webmail. This also surfaces SMTP settings (typically `mail.privateemail.com`, ports 465/587).

## Gather SMTP Credentials

Record the following values from your provider:

| Variable | Example value | Notes |
| --- | --- | --- |
| `SMTP_HOST` | `mail.privateemail.com` | SMTP hostname from Namecheap/private provider |
| `SMTP_PORT` | `587` (TLS) or `465` (SSL) | Use 465 with `SMTP_SECURE=true`, otherwise 587 |
| `SMTP_SECURE` | `true` or `false` | Set `true` when using port 465 |
| `SMTP_USER` | `notifications@yourdomain.com` | Full mailbox username |
| `SMTP_PASS` | `********` | Mailbox password or app-specific password |
| `SMTP_FROM` | `"DhaliAutos Concierge" <notifications@yourdomain.com>` | Optional override for the From header |

Store these values securely; do not commit them to git.

## Configure Deployment Environment

Set the variables above wherever your app is hosted (e.g. Vercel, AWS, DigitalOcean):

1. Locate the environment configuration UI/CLI for your platform.
2. Create environment variables with the names and values listed above. Ensure they are available to the production runtime and rebuild the project if required.
3. To test locally, create a `.env.local` file inside `dhali_autos/` with the same keys, then run `npm run dev`.

## How Email Delivery Works

1. The client form (`SellForm`) uses `FormData` to submit text fields plus up to 10 images to `/api/sell-inquiry`.
2. The API route parses the multipart payload, validates required fields, and converts uploaded `File` objects to Node.js `Buffer`s.
3. Nodemailer initializes an SMTP transport with the environment credentials and sends an email to `amit.aditaya99@gmail.com`, attaching the buffers so the recipient receives the images.
4. Failures (missing fields, SMTP errors) return an error response to the client, which surfaces the message to the user.

## Testing & Troubleshooting

- Use a test submission after DNS propagation completes to verify delivery and attachment integrity.
- If delivery fails, check the deployment logs for Nodemailer errors and confirm SPF/DKIM records are in place.
- Some providers block large attachments; limit image sizes or switch to a transactional email provider if needed.
- For staging environments, consider separate credentials or a sandbox address to avoid emailing real users during tests.
