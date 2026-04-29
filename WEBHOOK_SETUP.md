# Draftlo Auto-Deploy Webhook Setup

When anyone pushes to the `main` branch on GitHub, the server will automatically pull the latest code and rebuild the Docker container. No SSH keys are shared with GitHub.

---

## What You Need

- SSH access to the Draftlo server (you already have this)
- The server must have Node.js installed (check with `node -v`)
- Port **9000** must be open in the server's firewall / security group

---

## Step 1 — Open Port 9000

In your cloud provider (AWS / GCP / DigitalOcean), add an **inbound rule** allowing TCP traffic on port **9000** from anywhere (`0.0.0.0/0`).

---

## Step 2 — Generate a Webhook Secret

Run this on your server to generate a secure random secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output — you'll use it in Steps 3 and 4.

---

## Step 3 — Configure the Service

Edit the systemd service file to set your secret and deploy path:

```bash
nano /root/draftlo/draftlo-webhook.service
```

Replace `REPLACE_WITH_YOUR_SECRET` with the secret you generated.
If the app lives in a different directory, update `DEPLOY_DIR` too.

---

## Step 4 — Install and Start the Webhook Service

```bash
# Copy the service file
cp /root/draftlo/draftlo-webhook.service /etc/systemd/system/

# Enable and start
systemctl daemon-reload
systemctl enable draftlo-webhook
systemctl start draftlo-webhook

# Confirm it's running
systemctl status draftlo-webhook
```

You should see: `Active: active (running)`

---

## Step 5 — Add the Webhook in GitHub

1. Go to **github.com/Synquic/draftlo → Settings → Webhooks → Add webhook**
2. Fill in:
   - **Payload URL:** `http://YOUR_SERVER_IP:9000/deploy`
   - **Content type:** `application/json`
   - **Secret:** the secret you generated in Step 2
   - **Which events:** Just the push event
3. Click **Add webhook**

GitHub will send a test ping — the service will log it.

---

## Step 6 — Test It

Push any small change to `main` and watch the server auto-deploy:

```bash
# On the server, watch the logs live
journalctl -u draftlo-webhook -f
```

You should see:
```
[webhook] Push to main received — deploying...
[deploy] Success
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Webhook times out | Check port 9000 is open in the firewall |
| `Invalid signature` error | Secret in GitHub doesn't match `WEBHOOK_SECRET` in the service |
| Deploy fails | Check logs: `journalctl -u draftlo-webhook -n 50` |
| Service won't start | Check Node path: `which node`, update `ExecStart` in the service file |

---

## Updating the Deploy Path

If your app is not at `/root/draftlo`, update `DEPLOY_DIR` in the service file and restart:

```bash
systemctl restart draftlo-webhook
```
