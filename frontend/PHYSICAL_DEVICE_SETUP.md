# Running on Physical iOS Device

## Prerequisites
1. ✅ Physical device connected via USB (WaPapa is detected)
2. ✅ Device is unlocked
3. ✅ Trust this computer on your device (if first time connecting)

## Method 1: Using Xcode (Easiest)

1. Open the workspace:
   ```bash
   open ios/frontend.xcworkspace
   ```

2. In Xcode:
   - Select the **frontend** project in the left sidebar
   - Select the **frontend** target
   - Go to **Signing & Capabilities** tab
   - Check **"Automatically manage signing"**
   - Select your **Team** (sign in with Apple ID if needed - free accounts work!)
   - In the device selector at the top, choose your device: **WaPapa**
   - Click the **Play** button (▶) to build and run

## Method 2: Using Expo CLI (After Xcode Setup)

After configuring signing in Xcode once, you can use:

```bash
npx expo run:ios --device
```

Or specify the device UDID:
```bash
npx expo run:ios --device "00008130-000669DE0A10001C"
```

## Troubleshooting

### "No code signing certificates available"
- You need to set up code signing in Xcode first (Method 1)
- Use a free Apple ID account (no paid developer account needed for development)

### Bundle Identifier Issues
- Current bundle ID: `com.anonymous.frontend`
- If you get conflicts, change it in `app.json` to something unique like:
  ```json
  "bundleIdentifier": "com.yourname.historify"
  ```
- Then run: `npx expo prebuild --clean`

### Device Not Trusted
- On your iPhone: Settings → General → VPN & Device Management
- Trust the developer certificate

### ViroReact New Architecture Warning
- Make sure `newArchEnabled: true` is set in `app.json` (✅ already set)
- Create `ios/.xcode.env` file with:
  ```
  export RCT_NEW_ARCH_ENABLED=1
  ```

## Device Information
- **Device Name**: WaPapa
- **iOS Version**: 18.5
- **UDID**: 00008130-000669DE0A10001C

