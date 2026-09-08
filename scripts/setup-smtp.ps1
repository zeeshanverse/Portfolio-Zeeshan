param(
  [string]$AppPassword
)

$ErrorActionPreference = "Stop"
$envPath = Join-Path $PSScriptRoot "..\.env"
if (-not (Test-Path $envPath)) { throw ".env not found at $envPath" }
if ([string]::IsNullOrWhiteSpace($AppPassword)) {
  $secure = Read-Host "Enter your Gmail App Password (16 characters)" -AsSecureString
  $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  try { $AppPassword = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr) } finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr) }
}
$content = Get-Content $envPath -Raw
$content = [regex]::Replace($content, '(?m)^SMTP_PASS=.*$', "SMTP_PASS=$AppPassword")
Set-Content -Path $envPath -Value $content -NoNewline
Write-Host "SMTP App Password configured in .env. Restart pnpm dev to apply it."
